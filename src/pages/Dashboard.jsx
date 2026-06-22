import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTreinos, getStreak } from '../hooks/useStorage.js'
import Card from '../components/Card.jsx'
import Tag from '../components/Tag.jsx'
import { Flame, Dumbbell, User, Trash2 } from 'lucide-react'

const ROTINA = ['Pilates', 'Pilates + Corrida', 'Academia — Quadríceps', 'Corrida', 'Descanso / Academia', 'Corrida longa + Academia Sup.', 'Academia Glúteo / Descanso']
const DIAS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const MESES_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']

function formatDate(iso) {
  const d = new Date(iso + 'T12:00:00')
  return `${DIAS_PT[d.getDay()]}, ${d.getDate()} de ${MESES_PT[d.getMonth()]}`
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [, forceUpdate] = useState(0)
  const treinos = getTreinos()
  const streak = getStreak()
  const today = new Date().toISOString().slice(0, 10)
  const dayOfWeek = new Date().getDay()

  const treinosHoje = treinos.filter(t => t.date === today)

  const semana = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - d.getDay() + i)
      return d.toISOString().slice(0, 10)
    })
    const counts = {}
    treinos.forEach(t => { if (days.includes(t.date)) counts[t.date] = (counts[t.date] || 0) + 1 })
    return days.map(d => ({ date: d, count: counts[d] || 0, isToday: d === today }))
  }, [treinos, today])

  const resumoSemana = useMemo(() => {
    const tipos = { corrida: 0, pilates: 0, academia: 0 }
    semana.forEach(({ date }) => treinos.filter(t => t.date === date).forEach(t => { if (tipos[t.type] !== undefined) tipos[t.type]++ }))
    return tipos
  }, [semana, treinos])

  return (
    <div style={{ padding: '24px 16px 100px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <p style={{ fontSize: 13, color: 'var(--gray-400)', fontWeight: 500 }}>
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          <h1 style={{ fontSize: 26, fontWeight: 700, marginTop: 2 }}>Olá, Thali 👋</h1>
        </div>
        <button onClick={() => navigate('/perfil')} style={{
          background: 'var(--lavender)', border: 'none', borderRadius: 12,
          padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6,
          color: '#4a3a6e', fontSize: 13, fontWeight: 600,
        }}>
          <User size={16} /> Perfil
        </button>
      </div>

      {/* Streak + Hoje */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <Card color="var(--pink)" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Flame size={28} color="#c0556e" />
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#c0556e' }}>{streak}</div>
            <div style={{ fontSize: 11, color: '#c0556e', fontWeight: 500 }}>dias seguidos</div>
          </div>
        </Card>
        <Card color="var(--mint)" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Dumbbell size={24} color="#2a6648" />
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#2a6648' }}>{treinosHoje.length}</div>
            <div style={{ fontSize: 11, color: '#2a6648', fontWeight: 500 }}>treino{treinosHoje.length !== 1 ? 's' : ''} hoje</div>
          </div>
        </Card>
      </div>

      {/* Hoje na rotina */}
      <Card style={{ marginBottom: 16, background: 'var(--lavender)' }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#4a3a6e', marginBottom: 4 }}>HOJE NA SUA ROTINA</p>
        <p style={{ fontSize: 15, fontWeight: 600, color: '#2d2050' }}>{ROTINA[dayOfWeek]}</p>
      </Card>

      {/* Semana */}
      <Card style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 12 }}>ESTA SEMANA</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {semana.map(({ date, count, isToday }) => {
            const d = new Date(date + 'T12:00:00')
            return (
              <div key={date} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 10, color: isToday ? 'var(--pink-dark)' : 'var(--gray-400)', fontWeight: isToday ? 700 : 400 }}>
                  {DIAS_PT[d.getDay()]}
                </span>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: count > 0 ? 'var(--mint)' : isToday ? 'var(--pink)' : 'var(--gray-100)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: isToday ? '2px solid var(--pink-dark)' : '2px solid transparent',
                  fontWeight: 700, fontSize: 13,
                  color: count > 0 ? '#2a6648' : isToday ? 'var(--pink-dark)' : 'var(--gray-400)',
                }}>
                  {count > 0 ? count : isToday ? '·' : ''}
                </div>
              </div>
            )
          })}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 14, justifyContent: 'center' }}>
          {[['🏃', 'Corrida', resumoSemana.corrida], ['🧘', 'Pilates', resumoSemana.pilates], ['🏋️', 'Academia', resumoSemana.academia]].map(([icon, label, count]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--gray-600)' }}>
              <span>{icon}</span><span>{count}x {label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Último treino */}
      {treinos.length > 0 && (
        <Card>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 10 }}>ÚLTIMO TREINO</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <Tag type={treinos[0].type} />
              <p style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 6 }}>{formatDate(treinos[0].date)}</p>
              {treinos[0].type === 'corrida' && treinos[0].data?.distancia && (
                <p style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>
                  {treinos[0].data.distancia} km · {treinos[0].data.pace || '—'}/km
                </p>
              )}
              {treinos[0].type === 'academia' && treinos[0].data?.grupo && (
                <p style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{treinos[0].data.grupo}</p>
              )}
              {treinos[0].type === 'pilates' && (
                <p style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>Pilates ✓</p>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* CTA */}
      <button
        onClick={() => navigate('/registrar')}
        style={{
          marginTop: 20, width: '100%', padding: '16px',
          background: 'var(--pink-dark)', color: '#fff',
          borderRadius: 'var(--radius)', fontSize: 16, fontWeight: 700,
          boxShadow: '0 4px 16px rgba(232,160,180,0.5)',
        }}
      >
        + Registrar treino de hoje
      </button>

      {/* Reset */}
      <button
        onClick={() => {
          if (confirm('Apagar TODOS os treinos registrados? Essa ação não pode ser desfeita.')) {
            localStorage.removeItem('treinos_thali')
            forceUpdate(n => n + 1)
          }
        }}
        style={{
          marginTop: 12, width: '100%', padding: '12px',
          background: 'none', color: 'var(--gray-400)',
          borderRadius: 'var(--radius)', fontSize: 13, fontWeight: 500,
          border: '1px solid var(--gray-200)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}
      >
        <Trash2 size={14} /> Resetar todos os dados
      </button>
    </div>
  )
}
