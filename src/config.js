// Cole aqui a URL do seu Google Apps Script Web App após o setup
// Guia: veja SETUP_SHEETS.md na raiz do projeto
export const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxaiG8ui4a6FRG3EGeg7x439e47cJloil75xrbVx5K0Nst7_UkGQRXp8xEJvfNmHw0/exec'

// Checklist postural — baseada no briefing AGC (fev/2025)
export const PILATES_CHECKLIST = [
  { id: 'cadeia_post',  label: 'Cadeia posterior (isquiotibiais + panturrilha)' },
  { id: 'escapula',     label: 'Posição e retração das escápulas' },
  { id: 'iliopsoas',    label: 'Alongamento de iliopsoas / flexores do quadril' },
  { id: 'peitoral',     label: 'Alongamento de peitoral' },
  { id: 'gluteo_med',   label: 'Ativação de glúteo médio' },
  { id: 'core',         label: 'Estabilização lombar / core profundo' },
  { id: 'pronacao',     label: 'Consciência de pronação dos pés' },
  { id: 'cervical',     label: 'Postura cervical / retração de cabeça' },
]

// Zonas de corrida calibradas em 21/06/2025
export const ZONAS_CORRIDA = [
  { id: 'leve',   label: '🟢 Leve / Base',        pace: '7:45–8:15/km', fc: '125–140 bpm' },
  { id: 'ritmo',  label: '🟡 Ritmo',               pace: '6:40–7:00/km', fc: '145–158 bpm' },
  { id: 'tiro',   label: '🔴 Tiro / Intervalo',    pace: '5:50–6:10/km', fc: '160–170 bpm' },
  { id: 'alvo',   label: '🏁 Pace alvo 10k',       pace: '6:00–6:15/km', fc: '168–175 bpm' },
]

export const GRUPOS_MUSCULARES = [
  'Quadríceps',
  'Glúteo / Posterior',
  'Superiores (costas + bíceps)',
  'Peito + Tríceps',
  'Ombro',
  'Full Body',
  'Core',
]

export const SENSACAO_OPTIONS = [
  { value: 1, label: '😴 Pesado demais' },
  { value: 2, label: '😐 Razoável' },
  { value: 3, label: '🙂 Bem' },
  { value: 4, label: '💪 Ótimo' },
  { value: 5, label: '🔥 Incrível' },
]
