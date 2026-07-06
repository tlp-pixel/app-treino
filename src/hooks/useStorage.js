// Persistência local do app (modelo "Fonte da Verdade", v2).
// Store: { cur, prev, runs, history, marcos }
//  - cur:     inputs da sessão em andamento, por exercício (persistido p/ retomar)
//  - prev:    { [exId]: "resumo da última vez" } — alimenta o "Anterior ·"
//  - runs:    [{ id, iso, data, dist, tempo, pace, fc, nota }]
//  - history: [{ id, iso, data, bloco, nome, done, total, registros:[...] }]
//  - marcos:  [bool, bool, bool] — marcos de corrida desbloqueados

const KEY = 'thali-treino-v2'

export function emptyStore() {
  return { cur: {}, prev: {}, runs: [], history: [], marcos: [false, false, false], planoChecks: {}, customBlocks: {} }
}

export function loadStore() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY))
    if (raw && typeof raw === 'object') return { ...emptyStore(), ...raw }
  } catch { /* ignora */ }
  return emptyStore()
}

export function saveStore(store) {
  try { localStorage.setItem(KEY, JSON.stringify(store)) } catch { /* ignora */ }
}

// store está "vazio" = nunca registrou nada aqui (gatilho de recuperação via Sheets)
export function isEmptyStore(s) {
  return !s || ((s.history || []).length === 0 && (s.runs || []).length === 0)
}

// ---- helpers de data ----
const MESES = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
export function hojeISO() { return new Date().toISOString().slice(0, 10) }
export function isoToCurto(iso) {
  const d = new Date(iso + 'T12:00:00')
  return d.getDate() + ' ' + MESES[d.getMonth()]
}
export function hojeCurto() { return isoToCurto(hojeISO()) }

// ---- derivados (não persistidos) ----

// streak = dias consecutivos com atividade (sessão OU corrida), terminando
// hoje ou ontem.
export function computeStreak(store) {
  const dias = [...new Set([...(store.history || []), ...(store.runs || [])].map(e => e.iso).filter(Boolean))].sort().reverse()
  if (!dias.length) return 0
  const hoje = hojeISO()
  const ontem = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  if (dias[0] !== hoje && dias[0] !== ontem) return 0
  let streak = 0
  let cur = new Date(dias[0] + 'T12:00:00')
  for (const d of dias) {
    const dd = new Date(d + 'T12:00:00')
    const diff = Math.round((cur - dd) / 86400000)
    if (diff > 1) break
    streak++
    cur = dd
  }
  return streak
}

// 14 dias de atividade pro heatmap do Progresso (mais antigo → hoje)
export function computeDias14(store) {
  const ativos = new Set([...(store.history || []), ...(store.runs || [])].map(e => e.iso).filter(Boolean))
  const out = []
  for (let i = 13; i >= 0; i--) {
    const iso = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10)
    out.push(ativos.has(iso))
  }
  return out
}

// Tendência de carga dos principais compostos, a partir do histórico real.
// Maior peso registrado num exercício (considera séries e legado carga/esq/dir).
function pesoMax(r) {
  const vals = []
  if (Array.isArray(r.series)) {
    r.series.forEach(s => {
      if (s && typeof s === 'object') { vals.push(parseFloat(s.e), parseFloat(s.d)) }
      else vals.push(parseFloat(s))
    })
  } else {
    vals.push(parseFloat(r.carga), parseFloat(r.cargaDir), parseFloat(r.cargaEsq))
  }
  const nums = vals.filter(v => !isNaN(v))
  return nums.length ? Math.max(...nums) : null
}

const COMPOSTOS = ['Ponte glútea com barra', 'Deadlift romeno', 'Agachamento livre', 'Leg press 45°', 'Remada curvada com barra', 'Agachamento búlgaro']
export function computeTrend(store, unidade = 'kg') {
  const porNome = {}
  // history vem do mais novo pro mais antigo; invertemos pra ordem cronológica
  ;[...(store.history || [])].reverse().forEach(h => {
    (h.registros || []).forEach(r => {
      if (r.kind !== 'peso') return
      const val = pesoMax(r)
      if (!val || !COMPOSTOS.includes(r.nome)) return
      ;(porNome[r.nome] = porNome[r.nome] || []).push(val)
    })
  })
  return Object.keys(porNome).map(nome => {
    const arr = porNome[nome].slice(-6)
    const max = Math.max(...arr, 1)
    return {
      nome,
      atual: arr[arr.length - 1] + ' ' + unidade,
      bars: arr.map((v, i) => ({ h: Math.round((v / max) * 100), ultima: i === arr.length - 1 })),
    }
  })
}
