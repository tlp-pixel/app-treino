export const PLANO_INICIO = '2026-06-22'

export const FASES = [
  {
    id: 1,
    label: 'Fase 1 — Base Aeróbica',
    periodo: 'jun → ago · 10 semanas',
    objetivo: 'Correr 8km contínuos a 6:45/km',
    marco: { desc: '8km · últimos 2km a 6:30/km · FC <170 bpm', data: 'Sáb 30/ago', semana: 10 },
    semanas: [
      { n: 1,  label: '22–28 jun',       tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '4km · 7:45–8:15/km' },
        qui: { tipo: 'Intervalos',    detalhe: 'Aquec. 1,5km · 4×600m a 6:00–6:10/km · rec. 90s · Desaquec. 500m' },
        sab: { tipo: 'Corrida longa', detalhe: '6km · 7:45–8:00/km' } },
      { n: 2,  label: '29 jun–5 jul',    tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '4km · 7:45–8:15/km' },
        qui: { tipo: 'Intervalos',    detalhe: 'Aquec. 1,5km · 4×600m a 6:00–6:10/km · rec. 90s · Desaquec. 500m' },
        sab: { tipo: 'Corrida longa', detalhe: '7km · 7:45–8:00/km' } },
      { n: 3,  label: '6–12 jul',        tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '5km · 7:45–8:15/km' },
        qui: { tipo: 'Intervalos',    detalhe: 'Aquec. 1,5km · 4×800m a 6:10–6:20/km · rec. 90s · Desaquec. 500m' },
        sab: { tipo: 'Corrida longa', detalhe: '8km · 7:45–8:00/km' } },
      { n: 4,  label: '13–19 jul',       tipo: 'DESCARGA',
        ter: { tipo: 'Corrida leve',  detalhe: '3km · 8:00–8:30/km' },
        qui: { tipo: 'Corrida leve',  detalhe: '4km · 7:45–8:00/km' },
        sab: { tipo: 'Corrida longa', detalhe: '6km · 7:45–8:15/km' } },
      { n: 5,  label: '20–26 jul',       tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '5km · 7:45–8:15/km' },
        qui: { tipo: 'Intervalos',    detalhe: 'Aquec. 1,5km · 4×800m a 6:10–6:20/km · rec. 90s · Desaquec. 500m' },
        sab: { tipo: 'Corrida longa', detalhe: '8km · 7:30–7:45/km' } },
      { n: 6,  label: '27 jul–2 ago',    tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '5km · 7:30–8:00/km' },
        qui: { tipo: 'Tempo run',     detalhe: 'Aquec. 1km · 3km a 6:30–6:45/km · Desaquec. 1km' },
        sab: { tipo: 'Corrida longa', detalhe: '9km · 7:30–7:45/km' } },
      { n: 7,  label: '3–9 ago',         tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '5km · 7:30–8:00/km' },
        qui: { tipo: 'Tempo run',     detalhe: 'Aquec. 1km · 4km a 6:30–6:45/km · Desaquec. 1km' },
        sab: { tipo: 'Corrida longa', detalhe: '10km · 7:30–7:45/km' } },
      { n: 8,  label: '10–16 ago',       tipo: 'DESCARGA',
        ter: { tipo: 'Corrida leve',  detalhe: '4km · 8:00–8:30/km' },
        qui: { tipo: 'Corrida leve',  detalhe: '4km · 7:45–8:00/km' },
        sab: { tipo: 'Corrida longa', detalhe: '7km · 7:45–8:00/km' } },
      { n: 9,  label: '17–23 ago',       tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '5km · 7:30–8:00/km' },
        qui: { tipo: 'Tempo run',     detalhe: 'Aquec. 1km · 5km a 6:30–6:45/km · Desaquec. 1km' },
        sab: { tipo: 'Corrida longa', detalhe: '10km · 7:20–7:40/km' } },
      { n: 10, label: '24–30 ago',       tipo: 'TESTE',
        ter: { tipo: 'Corrida leve',  detalhe: '4km · 7:45–8:00/km' },
        qui: { tipo: 'Corrida leve',  detalhe: '3km · 8:00/km · pernas frescas' },
        sab: { tipo: '🔓 TESTE DE MARCO', detalhe: '8km · primeiros 6km a 7:00/km · últimos 2km a 6:30/km · FC alvo <170' } },
    ]
  },
  {
    id: 2,
    label: 'Fase 2 — Construção de Velocidade',
    periodo: 'set → out · 8 semanas',
    objetivo: 'Correr 10km a 6:00–6:15/km',
    marco: { desc: '10km a 6:10/km · FC <175 bpm', data: 'Sáb 25/out', semana: 18 },
    semanas: [
      { n: 11, label: '1–7 set',          tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '5km · 7:30–8:00/km' },
        qui: { tipo: 'Intervalos 1km',detalhe: 'Aquec. 1,5km · 4×1km a 5:50–6:00/km · rec. 2min · Desaquec. 500m' },
        sab: { tipo: 'Corrida longa', detalhe: '10km · 7:15–7:30/km' } },
      { n: 12, label: '8–14 set',         tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '5km · 7:30–8:00/km' },
        qui: { tipo: 'Intervalos 1km',detalhe: 'Aquec. 1,5km · 4×1km a 5:50–6:00/km · rec. 2min · Desaquec. 500m' },
        sab: { tipo: 'Corrida longa', detalhe: '11km · 7:15–7:30/km' } },
      { n: 13, label: '15–21 set',        tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '6km · 7:30–8:00/km' },
        qui: { tipo: 'Intervalos 1km',detalhe: 'Aquec. 1,5km · 5×1km a 5:50–6:00/km · rec. 2min · Desaquec. 500m' },
        sab: { tipo: 'Corrida longa', detalhe: '12km · 7:15–7:30/km' } },
      { n: 14, label: '22–28 set',        tipo: 'DESCARGA',
        ter: { tipo: 'Corrida leve',  detalhe: '4km · 8:00/km' },
        qui: { tipo: 'Corrida leve',  detalhe: '5km · 7:30–8:00/km' },
        sab: { tipo: 'Corrida longa', detalhe: '8km · 7:30/km' } },
      { n: 15, label: '29 set–5 out',     tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '6km · 7:30–8:00/km' },
        qui: { tipo: 'Tempo run',     detalhe: 'Aquec. 1km · 5km a 6:10–6:20/km · Desaquec. 1km' },
        sab: { tipo: 'Corrida longa', detalhe: '12km · 7:00–7:20/km' } },
      { n: 16, label: '6–12 out',         tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '6km · 7:30–8:00/km' },
        qui: { tipo: 'Tempo run',     detalhe: 'Aquec. 1km · 6km a 6:10–6:20/km · Desaquec. 1km' },
        sab: { tipo: 'Corrida longa', detalhe: '13km · 7:00–7:15/km' } },
      { n: 17, label: '13–19 out',        tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '6km · 7:15–7:45/km' },
        qui: { tipo: 'Tempo run',     detalhe: 'Aquec. 1km · 7km a 6:10/km · Desaquec. 1km' },
        sab: { tipo: 'Corrida longa', detalhe: '14km · 7:00–7:15/km' } },
      { n: 18, label: '20–26 out',        tipo: 'TESTE',
        ter: { tipo: 'Corrida leve',  detalhe: '5km · 7:30–8:00/km' },
        qui: { tipo: 'Corrida leve',  detalhe: '3km · 8:00/km · pernas frescas' },
        sab: { tipo: '🔓 TESTE DE MARCO', detalhe: '10km · pace alvo 6:10/km · FC alvo <175' } },
    ]
  },
  {
    id: 3,
    label: 'Fase 3 — Volume e Resistência',
    periodo: 'out → dez · 8 semanas',
    objetivo: 'Correr 15km a 6:00–6:10/km',
    marco: { desc: '15km a 6:10/km sustentado', data: 'Sáb 20/dez', semana: 26 },
    semanas: [
      { n: 19, label: '27 out–2 nov',     tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '6km · 7:30–8:00/km' },
        qui: { tipo: 'Tempo run',     detalhe: 'Aquec. 1km · 8km a 6:15–6:20/km · Desaquec. 1km' },
        sab: { tipo: 'Corrida longa', detalhe: '14km · 7:00–7:15/km' } },
      { n: 20, label: '3–9 nov',          tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '6km · 7:15–7:45/km' },
        qui: { tipo: 'Tempo run',     detalhe: 'Aquec. 1km · 9km a 6:10–6:20/km · Desaquec. 1km' },
        sab: { tipo: 'Corrida longa', detalhe: '15km · 7:00–7:15/km' } },
      { n: 21, label: '10–16 nov',        tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '7km · 7:15–7:45/km' },
        qui: { tipo: 'Tempo run',     detalhe: 'Aquec. 1km · 10km a 6:10/km · Desaquec. 1km' },
        sab: { tipo: 'Corrida longa', detalhe: '16km · 6:55–7:10/km' } },
      { n: 22, label: '17–23 nov',        tipo: 'DESCARGA',
        ter: { tipo: 'Corrida leve',  detalhe: '5km · 7:45–8:00/km' },
        qui: { tipo: 'Corrida leve',  detalhe: '6km · 7:30–8:00/km' },
        sab: { tipo: 'Corrida longa', detalhe: '10km · 7:15/km' } },
      { n: 23, label: '24–30 nov',        tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '7km · 7:15–7:45/km' },
        qui: { tipo: 'Progressiva',   detalhe: 'Aquec. 1km · 6km: começa 6:30/km fecha 6:00/km · Desaquec. 1km' },
        sab: { tipo: 'Corrida longa', detalhe: '15km · 6:55–7:10/km' } },
      { n: 24, label: '1–7 dez',          tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '7km · 7:15–7:45/km' },
        qui: { tipo: 'Progressiva',   detalhe: 'Aquec. 1km · 8km: começa 6:30/km fecha 6:00/km · Desaquec. 1km' },
        sab: { tipo: 'Corrida longa', detalhe: '16km · 6:50–7:05/km' } },
      { n: 25, label: '8–14 dez',         tipo: null,
        ter: { tipo: 'Corrida leve',  detalhe: '7km · 7:15–7:45/km' },
        qui: { tipo: 'Progressiva',   detalhe: 'Aquec. 1km · 10km: começa 6:30/km fecha 6:00/km · Desaquec. 1km' },
        sab: { tipo: 'Corrida longa', detalhe: '17km · 6:50–7:00/km' } },
      { n: 26, label: '15–21 dez',        tipo: 'TESTE',
        ter: { tipo: 'Corrida leve',  detalhe: '6km · 7:30/km' },
        qui: { tipo: 'Corrida leve',  detalhe: '4km · 8:00/km · pernas frescas' },
        sab: { tipo: '🏆 TESTE FINAL', detalhe: '15km · pace alvo 6:10/km' } },
    ]
  }
]

export const TOTAL_SEMANAS = 26

// Retorna { fase, semana, semanaLocal } com base na data de hoje
export function getSemanaAtual() {
  const inicio = new Date(PLANO_INICIO + 'T00:00:00')
  const hoje = new Date()
  const diffDays = Math.floor((hoje - inicio) / 86400000)
  const semanaNum = Math.floor(diffDays / 7) + 1 // 1-based

  if (semanaNum < 1) return { fase: FASES[0], semana: FASES[0].semanas[0], semanaGlobal: 1 }
  if (semanaNum > TOTAL_SEMANAS) return null // plano concluído

  for (const fase of FASES) {
    const found = fase.semanas.find(s => s.n === semanaNum)
    if (found) return { fase, semana: found, semanaGlobal: semanaNum }
  }
  return null
}

export function getTreinoHoje(semana) {
  if (!semana) return null
  const dow = new Date().getDay() // 0=Dom...6=Sáb
  if (dow === 2) return { dia: 'Ter', ...semana.ter }  // Terça
  if (dow === 4) return { dia: 'Qui', ...semana.qui }  // Quinta
  if (dow === 6) return { dia: 'Sáb', ...semana.sab }  // Sábado
  return null
}
