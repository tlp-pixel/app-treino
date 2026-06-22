import { useMemo } from 'react'
import { getTreinos } from '../hooks/useStorage.js'
import Card from '../components/Card.jsx'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts'

function paceToMinutes(pace) {
  if (!pace) return null
  const parts = pace.toString().replace(',', ':').split(':')
  if (parts.length === 2) return parseFloat(parts[0]) + parseFloat(parts[1]) / 60
  return parseFloat(pace)
}

function minutesToPace(min) {
  if (!min) return '—'
  const m = Math.floor(min)
  const s = Math.round((min - m) * 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

const ZONE_LABELS = { leve: '🟢 Leve', ritmo: '🟡 Ritmo', tiro: '🔴 Tiro', alvo: '🏁 Alvo 10k' }
const MESES_SHORT = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

export default function Progresso() {
  const treinos = getTreinos()

  const corridas = useMemo(() =>
    treinos
      .filter(t => t.type === 'corrida' && t.data?.distancia)
      .map(t => ({
        date: t.date,
        label: new Date(t.date + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
        distancia: parseFloat(t.data.distancia),
        paceMin: paceToMinutes(t.data.pace),
        pace: t.data.pace,
        zona: t.data.zona,
        fc: t.data.fc ? parseInt(t.data.fc) : null,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-20)
  , [treinos])

  const totalKm = useMemo(() =>
    treinos.filter(t => t.type === 'corrida' && t.data?.distancia)
      .reduce((sum, t) => sum + parseFloat(t.data.distancia || 0), 0)
  , [treinos])

  const totalTreinos = treinos.length
  const totalCorridas = treinos.filter(t => t.type === 'corrida').length
  const totalPilates = treinos.filter(t => t.type === 'pilates').length
  const totalAcademia = treinos.filter(t => t.type === 'academia').length

  const checklistStats = useMemo(() => {
    const counts = {}
    treinos.filter(t => t.type === 'pilates').forEach(t => {
      (t.data?.checks || []).forEach(id => { counts[id] = (counts[id] || 0) + 1 })
    })
    return counts
  }, [treinos])

  const zonasCounts = useMemo(() => {
    const counts = { leve: 0, ritmo: 0, tiro: 0, alvo: 0 }
    treinos.filter(t => t.type === 'corrida').forEach(t => {
      if (t.data?.zona) counts[t.data.zona] = (counts[t.data.zona] || 0) + 1
    })
    return Object.entries(counts).map(([zona, count]) => ({ zona: ZONE_LABELS[zona] || zona, count }))
  }, [treinos])

  const CustomTooltipPace = ({ active, payload }) => {
    if (!active || !payload?.length) return null
    const d = payload[0].payload
    return (
      <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 10, padding: '8px 12px', fontSize: 12 }}>
        <p style={{ fontWeight: 700 }}>{d.label}</p>
        <p>Pace: <strong>{d.pace}/km</strong></p>
        <p>Distância: <strong>{d.distancia} km</strong></p>
        {d.fc && <p>FC: <strong>{d.fc} bpm</strong></p>}
      </div>
    )
  }

  return (
    <div style={{ padding: '24px 16px 100px' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Progresso</h2>

      {/* Totais */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <Card color="var(--mint)" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#2a6648' }}>{totalKm.toFixed(1)}</div>
          <div style={{ fontSize: 11, color: '#2a6648', fontWeight: 600 }}>km rodados total</div>
        </Card>
        <Card color="var(--pink)" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#c0556e' }}>{totalTreinos}</div>
          <div style={{ fontSize: 11, color: '#c0556e', fontWeight: 600 }}>treinos registrados</div>
        </Card>
        <Card color="var(--lavender)" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#4a3a6e' }}>{totalPilates}</div>
          <div style={{ fontSize: 11, color: '#4a3a6e', fontWeight: 600 }}>aulas de pilates</div>
        </Card>
        <Card color="var(--peach)" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#6e4a2a' }}>{totalAcademia}</div>
          <div style={{ fontSize: 11, color: '#6e4a2a', fontWeight: 600 }}>treinos academia</div>
        </Card>
      </div>

      {/* Gráfico distância */}
      {corridas.length > 1 && (
        <Card style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 16 }}>EVOLUÇÃO — DISTÂNCIA (km)</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={corridas} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-200)" />
              <XAxis dataKey="label" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltipPace />} />
              <Bar dataKey="distancia" fill="var(--mint-dark)" radius={[4, 4, 0, 0]} name="km" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Gráfico pace */}
      {corridas.length > 1 && corridas.some(c => c.paceMin) && (
        <Card style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 4 }}>EVOLUÇÃO — PACE (min/km)</p>
          <p style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 12 }}>Linha descendo = você ficando mais rápida 🚀</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={corridas} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-200)" />
              <XAxis dataKey="label" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={minutesToPace} domain={['auto', 'auto']} reversed />
              <Tooltip content={<CustomTooltipPace />} />
              <Line type="monotone" dataKey="paceMin" stroke="var(--pink-dark)" strokeWidth={2.5} dot={{ fill: 'var(--pink-dark)', r: 4 }} name="pace" connectNulls />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Zonas */}
      {zonasCounts.some(z => z.count > 0) && (
        <Card style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 12 }}>DISTRIBUIÇÃO DE ZONAS</p>
          {zonasCounts.map(({ zona, count }) => (
            <div key={zona} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 13, width: 120, flexShrink: 0 }}>{zona}</span>
              <div style={{ flex: 1, height: 12, background: 'var(--gray-100)', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 6, background: 'var(--mint-dark)',
                  width: `${(count / Math.max(...zonasCounts.map(z => z.count), 1)) * 100}%`,
                  transition: 'width 0.5s',
                }} />
              </div>
              <span style={{ fontSize: 12, color: 'var(--gray-600)', width: 24, textAlign: 'right' }}>{count}x</span>
            </div>
          ))}
        </Card>
      )}

      {/* Checklist postural Pilates */}
      {Object.keys(checklistStats).length > 0 && (
        <Card>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 12 }}>PILATES — CHECKLIST POSTURAL (total de vezes trabalhado)</p>
          {Object.entries(checklistStats).sort((a, b) => b[1] - a[1]).map(([id, count]) => {
            const labels = {
              cadeia_post: 'Cadeia posterior', escapula: 'Escápulas', iliopsoas: 'Iliopsoas',
              peitoral: 'Peitoral', gluteo_med: 'Glúteo médio', core: 'Core / lombar',
              pronacao: 'Pronação dos pés', cervical: 'Postura cervical',
            }
            return (
              <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 12, width: 130, flexShrink: 0 }}>{labels[id] || id}</span>
                <div style={{ flex: 1, height: 10, background: 'var(--gray-100)', borderRadius: 6, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 6, background: 'var(--lavender)',
                    width: `${(count / Math.max(...Object.values(checklistStats), 1)) * 100}%`,
                  }} />
                </div>
                <span style={{ fontSize: 12, color: 'var(--gray-600)', width: 24, textAlign: 'right' }}>{count}x</span>
              </div>
            )
          })}
        </Card>
      )}

      {totalTreinos === 0 && (
        <div style={{ textAlign: 'center', marginTop: 60, color: 'var(--gray-400)' }}>
          <p style={{ fontSize: 40 }}>📊</p>
          <p style={{ fontSize: 15, marginTop: 12 }}>Registre seus primeiros treinos<br />para ver seu progresso aqui!</p>
        </div>
      )}
    </div>
  )
}
