import { useState, useMemo } from 'react'
import { getTreinos, deleteTreino } from '../hooks/useStorage.js'
import { ZONAS_CORRIDA, PILATES_CHECKLIST, SENSACAO_OPTIONS } from '../config.js'
import Card from '../components/Card.jsx'
import Tag from '../components/Tag.jsx'
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react'

const MESES_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
const DIAS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const TYPE_COLORS = {
  corrida:  'var(--mint)',
  pilates:  'var(--lavender)',
  academia: 'var(--peach)',
}

function CalendarioMes({ year, month, treinos }) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date().toISOString().slice(0, 10)

  const byDay = {}
  treinos.forEach(t => {
    const day = parseInt(t.date.slice(8))
    if (!byDay[day]) byDay[day] = []
    byDay[day].push(t.type)
  })

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const todayDate = new Date()
  const isThisMonth = todayDate.getFullYear() === year && todayDate.getMonth() === month

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
        {DIAS_PT.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: 10, color: 'var(--gray-400)', fontWeight: 600, padding: '4px 0' }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const types = byDay[day] || []
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const isToday = isThisMonth && todayDate.getDate() === day
          return (
            <div key={day} style={{
              aspectRatio: '1',
              borderRadius: 8,
              background: types.length > 0 ? (types.length > 1 ? 'var(--pink)' : TYPE_COLORS[types[0]]) : isToday ? 'var(--pink)' : 'var(--gray-100)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              border: isToday ? '2px solid var(--pink-dark)' : '2px solid transparent',
            }}>
              <span style={{ fontSize: 12, fontWeight: isToday ? 700 : 400, color: types.length > 0 ? '#333' : isToday ? 'var(--pink-dark)' : 'var(--gray-400)' }}>{day}</span>
              {types.length > 1 && <span style={{ fontSize: 8 }}>+{types.length}</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TreinoCard({ treino, onDelete }) {
  const [open, setOpen] = useState(false)
  const zona = ZONAS_CORRIDA.find(z => z.id === treino.data?.zona)
  const sensacao = SENSACAO_OPTIONS.find(s => s.value === treino.data?.sensacao)

  return (
    <Card style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => setOpen(o => !o)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Tag type={treino.type} />
          <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>
            {new Date(treino.date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })}
          </span>
          {treino.type === 'corrida' && treino.data?.distancia && (
            <span style={{ fontSize: 14, fontWeight: 600 }}>{treino.data.distancia} km · {treino.data.pace}/km</span>
          )}
          {treino.type === 'academia' && treino.data?.grupo && (
            <span style={{ fontSize: 14, fontWeight: 600 }}>{treino.data.grupo}</span>
          )}
        </div>
        <button style={{ background: 'none', fontSize: 18 }}>{open ? '▲' : '▼'}</button>
      </div>

      {open && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--gray-200)' }}>
          {treino.type === 'corrida' && (
            <>
              {zona && <p style={{ fontSize: 13 }}>Zona: <strong>{zona.label}</strong></p>}
              {treino.data?.fc && <p style={{ fontSize: 13 }}>FC média: <strong>{treino.data.fc} bpm</strong></p>}
              {sensacao && <p style={{ fontSize: 13 }}>Sensação: {sensacao.label}</p>}
              {treino.data?.obs && <p style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 6 }}>{treino.data.obs}</p>}
            </>
          )}
          {treino.type === 'pilates' && (
            <>
              <p style={{ fontSize: 13 }}>Presença: <strong>{treino.data?.presenca === 'sim' ? '✅ Fui' : '❌ Não fui'}</strong></p>
              {(treino.data?.checks || []).length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 4 }}>CHECKLIST POSTURAL</p>
                  {treino.data.checks.map(id => {
                    const item = PILATES_CHECKLIST.find(c => c.id === id)
                    return item ? <p key={id} style={{ fontSize: 13 }}>✓ {item.label}</p> : null
                  })}
                </div>
              )}
              {treino.data?.foco && <p style={{ fontSize: 13, marginTop: 6 }}>{treino.data.foco}</p>}
              {treino.data?.evolucoes && <p style={{ fontSize: 13, color: '#4a3a6e', marginTop: 4 }}>🌟 {treino.data.evolucoes}</p>}
            </>
          )}
          {treino.type === 'academia' && (
            <>
              {(treino.data?.exercicios || []).map((ex, i) => (
                <p key={i} style={{ fontSize: 13 }}>{ex.nome} — {ex.series}x{ex.reps}{ex.carga ? ` · ${ex.carga}kg` : ''}</p>
              ))}
              {sensacao && <p style={{ fontSize: 13, marginTop: 6 }}>Sensação: {sensacao.label}</p>}
              {treino.data?.obs && <p style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 4 }}>{treino.data.obs}</p>}
            </>
          )}
          <button onClick={() => onDelete(treino.id)} style={{
            marginTop: 12, display: 'flex', alignItems: 'center', gap: 6,
            color: '#e05a5a', background: 'none', fontSize: 13,
          }}>
            <Trash2 size={14} /> Excluir registro
          </button>
        </div>
      )}
    </Card>
  )
}

export default function Historico() {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())
  const [, forceUpdate] = useState(0)

  const allTreinos = getTreinos()
  const mesAtual = allTreinos.filter(t => {
    const d = new Date(t.date + 'T12:00:00')
    return d.getFullYear() === year && d.getMonth() === month
  })

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const handleDelete = (id) => {
    deleteTreino(id)
    forceUpdate(n => n + 1)
  }

  return (
    <div style={{ padding: '24px 16px 100px' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Histórico</h2>

      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <button onClick={prevMonth} style={{ background: 'none', color: 'var(--gray-600)', padding: 8 }}><ChevronLeft size={20} /></button>
          <span style={{ fontWeight: 700, fontSize: 16 }}>{MESES_PT[month]} {year}</span>
          <button onClick={nextMonth} style={{ background: 'none', color: 'var(--gray-600)', padding: 8 }}><ChevronRight size={20} /></button>
        </div>
        <CalendarioMes year={year} month={month} treinos={mesAtual} />
        <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
          {[['corrida', '🏃 Corrida'], ['pilates', '🧘 Pilates'], ['academia', '🏋️ Academia']].map(([type, label]) => (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: TYPE_COLORS[type] }} />
              <span style={{ fontSize: 11, color: 'var(--gray-600)' }}>{label}</span>
            </div>
          ))}
        </div>
      </Card>

      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: 'var(--gray-600)' }}>
        {mesAtual.length} treino{mesAtual.length !== 1 ? 's' : ''} em {MESES_PT[month]}
      </h3>

      {mesAtual.length === 0 ? (
        <p style={{ color: 'var(--gray-400)', textAlign: 'center', marginTop: 40, fontSize: 14 }}>Nenhum treino registrado neste mês</p>
      ) : (
        [...mesAtual].sort((a, b) => b.date.localeCompare(a.date)).map(t => (
          <TreinoCard key={t.id} treino={t} onDelete={handleDelete} />
        ))
      )}
    </div>
  )
}
