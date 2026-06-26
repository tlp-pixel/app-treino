// Salva e lê treinos do localStorage (fallback enquanto Google Sheets não está configurado)
// Cada treino: { id, date, type, data }

const KEY = 'treinos_thali'

export function getTreinos() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch { return [] }
}

export function saveTreino(treino) {
  const all = getTreinos()
  const idx = all.findIndex(t => t.id === treino.id)
  if (idx >= 0) all[idx] = treino
  else all.unshift(treino)
  localStorage.setItem(KEY, JSON.stringify(all))
}

export function deleteTreino(id) {
  const all = getTreinos().filter(t => t.id !== id)
  localStorage.setItem(KEY, JSON.stringify(all))
}

export function getTreinosByMonth(year, month) {
  return getTreinos().filter(t => {
    const d = new Date(t.date + 'T12:00:00')
    return d.getFullYear() === year && d.getMonth() === month
  })
}

// Retorna o array de cargas por série usadas da última vez que esse exercício
// foi registrado nesse treino (a/b/c), ou null se nunca foi registrado.
export function getUltimaSerie(treinoKey, exId) {
  const all = getTreinos()
    .filter(t => t.type === 'academia' && t.data?.treino === treinoKey && t.data?.series?.[exId]?.some(v => v))
    .sort((a, b) => (b.date + b.createdAt).localeCompare(a.date + a.createdAt))
  return all.length ? all[0].data.series[exId] : null
}

export function getStreak() {
  const all = getTreinos()
  if (!all.length) return 0
  const dates = [...new Set(all.map(t => t.date))].sort().reverse()
  const today = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  if (dates[0] !== today && dates[0] !== yesterday) return 0
  let streak = 0
  let cur = new Date(dates[0] + 'T12:00:00')
  for (const d of dates) {
    const dd = new Date(d + 'T12:00:00')
    const diff = Math.round((cur - dd) / 86400000)
    if (diff > 1) break
    if (diff <= 1) { streak++; cur = dd }
  }
  return streak
}
