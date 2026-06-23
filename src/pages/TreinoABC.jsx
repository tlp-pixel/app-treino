import { useState } from 'react'
import { ABC_TREINOS } from '../config.js'
import Card from '../components/Card.jsx'

const PRIORITY_COLORS = {
  'Prioridade':   { bg: 'rgba(224,85,85,0.12)',  text: '#c05050', border: 'rgba(224,85,85,0.3)' },
  'Alto':         { bg: 'rgba(212,144,74,0.12)', text: '#b07030', border: 'rgba(212,144,74,0.3)' },
  'Complementar': { bg: 'rgba(106,173,122,0.12)',text: '#4a8a5a', border: 'rgba(106,173,122,0.3)' },
  'Finalização':  { bg: 'rgba(100,120,200,0.12)',text: '#5060a0', border: 'rgba(100,120,200,0.3)' },
}

function Badge({ priority }) {
  const c = PRIORITY_COLORS[priority] || {}
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap',
    }}>{priority}</span>
  )
}

function ExercicioCard({ ex, checked, onToggle }) {
  const [open, setOpen] = useState(false)
  const [timerLeft, setTimerLeft] = useState(null)
  const [timerRunning, setTimerRunning] = useState(false)
  const [intervalId, setIntervalId] = useState(null)

  const startTimer = () => {
    if (timerRunning) {
      clearInterval(intervalId)
      setTimerRunning(false)
      setTimerLeft(null)
      return
    }
    let t = ex.timer
    setTimerLeft(t)
    setTimerRunning(true)
    const id = setInterval(() => {
      t--
      setTimerLeft(t)
      if (t <= 0) { clearInterval(id); setTimerRunning(false); setTimerLeft(0) }
    }, 1000)
    setIntervalId(id)
  }

  const fmt = (s) => s > 60 ? `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}` : `${s}s`

  return (
    <div style={{
      background: checked ? 'var(--gray-100)' : '#fff',
      borderRadius: 12, marginBottom: 10,
      border: `2px solid ${checked ? 'var(--gray-200)' : 'var(--gray-200)'}`,
      opacity: checked ? 0.5 : 1,
      transition: 'opacity 0.2s',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer' }}
        onClick={() => setOpen(o => !o)}>
        <button onClick={e => { e.stopPropagation(); onToggle() }} style={{
          width: 24, height: 24, borderRadius: '50%', border: '2px solid',
          borderColor: checked ? 'var(--mint-dark)' : 'var(--gray-300)',
          background: checked ? 'var(--mint-dark)' : 'transparent',
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 12, fontWeight: 700,
        }}>{checked ? '✓' : ''}</button>

        <span style={{ flex: 1, fontWeight: 600, fontSize: 14, textDecoration: checked ? 'line-through' : 'none' }}>
          {ex.label}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <Badge priority={ex.priority} />
          <span style={{
            fontFamily: 'monospace', fontSize: 12, color: 'var(--peach-dark)',
            background: 'var(--peach)', padding: '2px 8px', borderRadius: 4,
          }}>{ex.volume}</span>
          <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{open ? '▲' : '▼'}</span>
        </div>
      </div>

      {open && (
        <div style={{ padding: '0 16px 14px 52px', borderTop: '1px solid var(--gray-100)' }}>
          <p style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 10, lineHeight: 1.6 }}>
            <span style={{ fontWeight: 600, color: 'var(--gray-800)' }}>Ajuste: </span>{ex.ajuste}
          </p>
          {ex.dica && (
            <div style={{ marginTop: 8, padding: '8px 12px', background: 'var(--mint)', borderRadius: 8, fontSize: 12, color: '#2a6648' }}>
              💡 {ex.dica}
            </div>
          )}
          {ex.tiktok && (
            <a
              href={`https://www.tiktok.com/search?q=${encodeURIComponent(ex.tiktok)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 10,
                padding: '5px 12px', borderRadius: 8,
                background: '#1a1a2e', color: '#fff',
                fontSize: 12, fontWeight: 600, textDecoration: 'none',
              }}
            >
              🎵 {ex.tiktok}
            </a>
          )}
          {ex.timer && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
              <button onClick={startTimer} style={{
                padding: '6px 14px', borderRadius: 8,
                background: timerRunning ? 'var(--pink)' : 'var(--peach)',
                color: timerRunning ? '#c0556e' : '#6e4a2a',
                border: 'none', fontWeight: 600, fontSize: 13,
              }}>
                {timerRunning ? '■ Parar' : `▶ Timer ${fmt(ex.timer)}`}
              </button>
              {timerLeft !== null && (
                <span style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 700,
                  color: timerLeft === 0 ? 'var(--mint-dark)' : 'var(--gray-800)' }}>
                  {timerLeft === 0 ? '✓ Feito!' : fmt(timerLeft)}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function TreinoABC() {
  const [aba, setAba] = useState('a')
  const [checked, setChecked] = useState({})

  const treino = ABC_TREINOS[aba]
  const checks = checked[aba] || {}
  const total = treino.exercicios.length
  const done = treino.exercicios.filter(e => checks[e.id]).length
  const pct = total ? (done / total * 100) : 0

  const toggle = (id) => {
    setChecked(prev => ({
      ...prev,
      [aba]: { ...(prev[aba] || {}), [id]: !(prev[aba]?.[id]) }
    }))
  }

  const reset = () => setChecked(prev => ({ ...prev, [aba]: {} }))

  return (
    <div style={{ padding: '24px 16px 100px' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Treino ABC</h2>
      <p style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 20 }}>8 semanas sem trocar exercícios. Sempre 5 min de ativação antes de pegar peso.</p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {Object.entries(ABC_TREINOS).map(([key, t]) => (
          <button key={key} onClick={() => setAba(key)} style={{
            padding: '10px 18px', borderRadius: 12, border: '2px solid',
            borderColor: aba === key ? 'var(--peach-dark)' : 'var(--gray-200)',
            background: aba === key ? 'var(--peach)' : '#fff',
            fontWeight: aba === key ? 700 : 500, fontSize: 13,
            color: aba === key ? '#6e4a2a' : 'var(--gray-600)',
          }}>{t.label}</button>
        ))}
      </div>

      {/* Info do dia */}
      <Card color="var(--peach)" style={{ marginBottom: 16 }}>
        <p style={{ fontWeight: 700, fontSize: 14, color: '#6e4a2a' }}>{treino.dia}</p>
        <p style={{ fontSize: 12, color: '#8e6a4a', marginTop: 4 }}>
          Pré-ativação: {treino.preAtivacao}
        </p>
      </Card>

      {/* Progresso */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 8 }}>PROGRESSO DE HOJE</p>
            <div style={{ height: 8, background: 'var(--gray-100)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg, var(--peach-dark), var(--mint-dark))', width: `${pct}%`, transition: 'width 0.4s' }} />
            </div>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 700, color: 'var(--peach-dark)', whiteSpace: 'nowrap' }}>
            {done}/{total}
          </span>
        </div>
      </Card>

      {/* Exercícios */}
      {treino.exercicios.map(ex => (
        <ExercicioCard key={ex.id} ex={ex} checked={!!checks[ex.id]} onToggle={() => toggle(ex.id)} />
      ))}

      {/* Reset */}
      <button onClick={reset} style={{
        marginTop: 8, background: 'none', border: '1px solid var(--gray-200)',
        color: 'var(--gray-400)', borderRadius: 10, padding: '8px 16px', fontSize: 13,
      }}>
        ↺ Resetar progresso do {treino.label}
      </button>
    </div>
  )
}
