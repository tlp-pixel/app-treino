import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { BLOCOS } from '../data/treinoData.js'
import {
  loadStore, saveStore, emptyStore, isEmptyStore, hojeISO, isoToCurto,
  computeStreak, computeDias14, computeTrend,
} from '../hooks/useStorage.js'
import { syncToSheets, fetchStore } from '../hooks/useSheets.js'

const Ctx = createContext(null)
export const useTreino = () => useContext(Ctx)

// Resumo curto da última vez (alimenta o "Anterior ·")
function fmtPrev(c, ex, unidade) {
  if (ex.kind === 'peso') {
    const load = ex.lado
      ? 'E ' + (c.cargaEsq || '–') + '/D ' + (c.cargaDir || '–') + ' ' + unidade
      : (c.carga || '–') + ' ' + unidade
    return load + (c.reps ? ' · ' + c.reps + ' reps' : '') + (c.rpe ? ' · RPE ' + c.rpe : '')
  }
  return (c.medida || 'feito') + (c.rpe ? ' · RPE ' + c.rpe : '')
}

export function TreinoProvider({ unidade = 'kg', children }) {
  const [store, setStore] = useState(loadStore)
  const storeRef = useRef(store)
  storeRef.current = store

  // Recuperação: se nunca registrou nada aqui, tenta puxar da planilha.
  useEffect(() => {
    if (!isEmptyStore(storeRef.current)) return
    let alive = true
    fetchStore().then(remote => {
      if (alive && remote && !isEmptyStore(remote)) commit(remote, false)
    })
    return () => { alive = false }
  }, [])

  // Aplica mudança: estado + localStorage (+ Sheets quando sync=true)
  function commit(next, sync) {
    setStore(next)
    saveStore(next)
    if (sync) syncToSheets(next)
  }
  function mutate(fn, sync = false) {
    const next = fn({ ...storeRef.current })
    storeRef.current = next
    commit(next, sync)
  }

  // ---- ações de sessão ----
  const setCur = (id, field, value) => mutate(s => {
    s.cur = { ...s.cur, [id]: { ...(s.cur[id] || {}), [field]: value } }
    return s
  })
  const toggleDone = (id) => mutate(s => {
    s.cur = { ...s.cur, [id]: { ...(s.cur[id] || {}), done: !(s.cur[id] && s.cur[id].done) } }
    return s
  })

  const salvar = (blockId, iso) => {
    const bloco = BLOCOS.find(b => b.id === blockId)
    if (!bloco) return
    const dataISO = iso || hojeISO()
    mutate(s => {
      const registros = []
      const prev = { ...s.prev }
      const cur = { ...s.cur }
      let done = 0
      bloco.exercicios.forEach(exr => {
        const c = s.cur[exr.id]
        if (c && c.done) {
          done++
          registros.push({
            id: exr.id, nome: exr.nome, prio: exr.prio, kind: exr.kind, lado: exr.lado,
            carga: c.carga || '', cargaEsq: c.cargaEsq || '', cargaDir: c.cargaDir || '',
            reps: c.reps || '', rpe: c.rpe || '', medida: c.medida || '', nota: c.nota || '',
          })
          prev[exr.id] = fmtPrev(c, exr, unidade)
        }
        delete cur[exr.id] // limpa a sessão em andamento desse bloco
      })
      s.cur = cur
      s.prev = prev
      s.history = [{
        id: Date.now().toString(), iso: dataISO, data: isoToCurto(dataISO),
        bloco: blockId, nome: bloco.nome, done, total: bloco.exercicios.length, registros,
      }, ...s.history]
      return s
    }, true)
  }

  const addRun = (form) => {
    if (!form.dist) return
    const iso = hojeISO()
    mutate(s => {
      s.runs = [{
        id: Date.now().toString(), iso, data: isoToCurto(iso),
        dist: form.dist, tempo: form.tempo || '—', pace: form.pace || '—',
        fc: form.fc || '—', nota: form.nota || '',
      }, ...s.runs]
      return s
    }, true)
  }

  const toggleMarco = (i) => mutate(s => {
    const marcos = [...s.marcos]
    marcos[i] = !marcos[i]
    s.marcos = marcos
    return s
  }, true)

  const reset = () => commit(emptyStore(), true)

  // ---- derivados ----
  const derived = {
    streak: computeStreak(store),
    totalSessoes: store.history.length,
    runsCount: store.runs.length,
    dias14: computeDias14(store),
    trend: computeTrend(store, unidade),
  }

  const value = {
    store, unidade, ...derived,
    setCur, toggleDone, salvar, addRun, toggleMarco, reset,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
