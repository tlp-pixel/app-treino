import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { BLOCOS, parseTreinoMD } from '../data/treinoData.js'
import {
  loadStore, saveStore, emptyStore, isEmptyStore, hojeISO, isoToCurto,
  computeStreak, computeDias14, computeTrend,
} from '../hooks/useStorage.js'
import { syncToSheets, fetchStore } from '../hooks/useSheets.js'

const Ctx = createContext(null)
export const useTreino = () => useContext(Ctx)

// Resumo curto da última vez (alimenta o "Anterior ·"), a partir das séries.
function fmtPrev(c, ex, unidade) {
  if (ex.kind === 'peso') {
    const s = c.series || []
    let load
    if (ex.lado) {
      const e = s.map(x => (x && x.e) || '–').join('/')
      const d = s.map(x => (x && x.d) || '–').join('/')
      load = `E ${e} · D ${d} ${unidade}`
    } else {
      load = (s.some(Boolean) ? s.map(x => x || '–').join('/') : '–') + ' ' + unidade
    }
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
      if (alive && remote && !isEmptyStore(remote)) commit({ ...emptyStore(), ...remote }, false)
    })
    return () => { alive = false }
  }, [])

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

  // Bloco resolvido: usa os exercícios custom (editados por markdown) se houver.
  const getBloco = (id) => {
    const base = BLOCOS.find(b => b.id === id)
    if (!base) return null
    const custom = store.customBlocks && store.customBlocks[id]
    return custom && custom.length ? { ...base, exercicios: custom } : base
  }
  const blocos = BLOCOS.map(b => getBloco(b.id))

  // ---- sessão ----
  const setCur = (id, field, value) => mutate(s => {
    s.cur = { ...s.cur, [id]: { ...(s.cur[id] || {}), [field]: value } }
    return s
  })
  const setSerie = (id, i, value) => mutate(s => {
    const cur = { ...(s.cur[id] || {}) }
    const series = Array.isArray(cur.series) ? [...cur.series] : []
    series[i] = value
    cur.series = series
    s.cur = { ...s.cur, [id]: cur }
    return s
  })
  const setSerieLado = (id, i, side, value) => mutate(s => {
    const cur = { ...(s.cur[id] || {}) }
    const series = Array.isArray(cur.series) ? [...cur.series] : []
    series[i] = { ...(series[i] || {}), [side]: value }
    cur.series = series
    s.cur = { ...s.cur, [id]: cur }
    return s
  })
  const toggleDone = (id) => mutate(s => {
    s.cur = { ...s.cur, [id]: { ...(s.cur[id] || {}), done: !(s.cur[id] && s.cur[id].done) } }
    return s
  })

  const salvar = (blockId, iso) => {
    const bloco = getBloco(blockId)
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
            series: c.series || [], reps: c.reps || '', rpe: c.rpe || '', medida: c.medida || '', nota: c.nota || '',
          })
          prev[exr.id] = fmtPrev(c, exr, unidade)
        }
        delete cur[exr.id]
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

  const toggleMarco = (i) => mutate(s => {
    const marcos = [...s.marcos]
    marcos[i] = !marcos[i]
    s.marcos = marcos
    return s
  }, true)

  // ---- plano de corrida (checklist) ----
  const togglePlanoCheck = (key) => mutate(s => {
    s.planoChecks = { ...(s.planoChecks || {}), [key]: !(s.planoChecks && s.planoChecks[key]) }
    return s
  }, true)

  // ---- edição de treinos por markdown ----
  const setCustomBlock = (id, md) => mutate(s => {
    s.customBlocks = { ...(s.customBlocks || {}), [id]: parseTreinoMD(md, id) }
    return s
  }, true)
  const resetCustomBlock = (id) => mutate(s => {
    const cb = { ...(s.customBlocks || {}) }
    delete cb[id]
    s.customBlocks = cb
    return s
  }, true)

  const reset = () => commit(emptyStore(), true)

  const derived = {
    streak: computeStreak(store),
    totalSessoes: store.history.length,
    corridasFeitas: Object.values(store.planoChecks || {}).filter(Boolean).length,
    dias14: computeDias14(store),
    trend: computeTrend(store, unidade),
  }

  const value = {
    store, unidade, blocos, getBloco, ...derived,
    setCur, setSerie, setSerieLado, toggleDone, salvar, toggleMarco,
    togglePlanoCheck, setCustomBlock, resetCustomBlock, reset,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
