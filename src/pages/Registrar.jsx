import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveTreino } from '../hooks/useStorage.js'
import { pushToSheets } from '../hooks/useSheets.js'
import { PILATES_CHECKLIST, ZONAS_CORRIDA, SENSACAO_OPTIONS, MOBILIDADE_EXERCISES, ABC_TREINOS } from '../config.js'
import Card from '../components/Card.jsx'
import { ChevronLeft } from 'lucide-react'

function SensacaoSelect({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {SENSACAO_OPTIONS.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)} style={{
          padding: '8px 14px',
          borderRadius: 20,
          border: '2px solid',
          borderColor: value === opt.value ? 'var(--pink-dark)' : 'var(--gray-200)',
          background: value === opt.value ? 'var(--pink)' : '#fff',
          fontSize: 13,
          fontWeight: value === opt.value ? 600 : 400,
          color: value === opt.value ? '#c0556e' : 'var(--gray-600)',
        }}>
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function FieldLabel({ children }) {
  return <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 8, marginTop: 16 }}>{children}</p>
}

function TextInput({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} type={type}
      style={{ width: '100%', border: '2px solid var(--gray-200)', borderRadius: 12, padding: '10px 14px', fontSize: 14, background: '#fff' }} />
  )
}

// ---- FORMS ----

function FormCorrida({ data, onChange }) {
  return (
    <>
      <FieldLabel>ZONA DE TREINO</FieldLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ZONAS_CORRIDA.map(z => (
          <button key={z.id} onClick={() => onChange({ ...data, zona: z.id })} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 14px', borderRadius: 12, border: '2px solid',
            borderColor: data.zona === z.id ? 'var(--mint-dark)' : 'var(--gray-200)',
            background: data.zona === z.id ? 'var(--mint)' : '#fff',
            textAlign: 'left',
          }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{z.label}</span>
            <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{z.pace}</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <FieldLabel>DISTÂNCIA (km)</FieldLabel>
          <TextInput value={data.distancia || ''} onChange={v => onChange({ ...data, distancia: v })} placeholder="Ex: 5.2" type="number" />
        </div>
        <div>
          <FieldLabel>PACE (min/km)</FieldLabel>
          <TextInput value={data.pace || ''} onChange={v => onChange({ ...data, pace: v })} placeholder="Ex: 7:30" />
        </div>
      </div>

      <FieldLabel>FC MÉDIA (bpm) — opcional</FieldLabel>
      <TextInput value={data.fc || ''} onChange={v => onChange({ ...data, fc: v })} placeholder="Ex: 148" type="number" />

      <FieldLabel>COMO ME SENTI</FieldLabel>
      <SensacaoSelect value={data.sensacao} onChange={v => onChange({ ...data, sensacao: v })} />

      <FieldLabel>OBSERVAÇÕES</FieldLabel>
      <textarea value={data.obs || ''} onChange={e => onChange({ ...data, obs: e.target.value })}
        placeholder="Algo que queira lembrar desse treino..."
        style={{ width: '100%', border: '2px solid var(--gray-200)', borderRadius: 12, padding: '10px 14px', fontSize: 14, minHeight: 80, resize: 'vertical', background: '#fff' }} />
    </>
  )
}

function FormPilates({ data, onChange }) {
  const toggleCheck = (id) => {
    const checks = data.checks || []
    const next = checks.includes(id) ? checks.filter(c => c !== id) : [...checks, id]
    onChange({ ...data, checks: next })
  }

  return (
    <>
      <FieldLabel>PRESENÇA</FieldLabel>
      <div style={{ display: 'flex', gap: 8 }}>
        {[['sim', '✅ Fui'], ['nao', '❌ Não fui']].map(([v, l]) => (
          <button key={v} onClick={() => onChange({ ...data, presenca: v })} style={{
            flex: 1, padding: '10px', borderRadius: 12, border: '2px solid',
            borderColor: data.presenca === v ? 'var(--lavender)' : 'var(--gray-200)',
            background: data.presenca === v ? 'var(--lavender)' : '#fff',
            fontWeight: 600, fontSize: 14, color: data.presenca === v ? '#4a3a6e' : 'var(--gray-600)',
          }}>{l}</button>
        ))}
      </div>

      <FieldLabel>CHECKLIST POSTURAL — o que foi trabalhado?</FieldLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {PILATES_CHECKLIST.map(item => {
          const checked = (data.checks || []).includes(item.id)
          return (
            <button key={item.id} onClick={() => toggleCheck(item.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px', borderRadius: 12, border: '2px solid',
              borderColor: checked ? 'var(--lavender)' : 'var(--gray-200)',
              background: checked ? 'var(--lavender)' : '#fff',
              textAlign: 'left',
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: 6, border: '2px solid',
                borderColor: checked ? '#7a5fa0' : 'var(--gray-300)',
                background: checked ? '#7a5fa0' : 'transparent',
                flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 12,
              }}>{checked ? '✓' : ''}</div>
              <span style={{ fontSize: 13, fontWeight: checked ? 600 : 400, color: checked ? '#4a3a6e' : 'var(--gray-600)' }}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>

      <FieldLabel>FOCO DA AULA / EXERCÍCIOS</FieldLabel>
      <textarea value={data.foco || ''} onChange={e => onChange({ ...data, foco: e.target.value })}
        placeholder="Ex: Trabalhou muito respiração e mobilidade de quadril..."
        style={{ width: '100%', border: '2px solid var(--gray-200)', borderRadius: 12, padding: '10px 14px', fontSize: 14, minHeight: 80, resize: 'vertical', background: '#fff' }} />

      <FieldLabel>EVOLUÇÕES PERCEBIDAS</FieldLabel>
      <textarea value={data.evolucoes || ''} onChange={e => onChange({ ...data, evolucoes: e.target.value })}
        placeholder="Ex: Escapulas ficando mais no lugar, dor lombar melhorou..."
        style={{ width: '100%', border: '2px solid var(--gray-200)', borderRadius: 12, padding: '10px 14px', fontSize: 14, minHeight: 70, resize: 'vertical', background: '#fff' }} />
    </>
  )
}

const PRIORITY_BADGE = {
  'Prioridade':   { bg: 'rgba(224,85,85,0.12)',  text: '#c05050' },
  'Alto':         { bg: 'rgba(212,144,74,0.12)', text: '#b07030' },
  'Complementar': { bg: 'rgba(106,173,122,0.12)',text: '#4a8a5a' },
  'Finalização':  { bg: 'rgba(100,120,200,0.12)',text: '#5060a0' },
}

function FormAcademia({ data, onChange }) {
  const treino = data.treino || 'a'
  const exercicios = ABC_TREINOS[treino].exercicios
  const cargas = data.cargas || {}
  const feitos = data.feitos || []

  const setTreino = (t) => onChange({ ...data, treino: t, feitos: [], cargas: {} })
  const toggleFeito = (id) => {
    const next = feitos.includes(id) ? feitos.filter(f => f !== id) : [...feitos, id]
    onChange({ ...data, feitos: next })
  }
  const setCarga = (id, val) => onChange({ ...data, cargas: { ...cargas, [id]: val } })

  return (
    <>
      <FieldLabel>TREINO DO DIA</FieldLabel>
      <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
        {Object.entries(ABC_TREINOS).map(([key, t]) => (
          <button key={key} onClick={() => setTreino(key)} style={{
            flex: 1, padding: '10px 6px', borderRadius: 12, border: '2px solid',
            borderColor: treino === key ? 'var(--peach-dark)' : 'var(--gray-200)',
            background: treino === key ? 'var(--peach)' : '#fff',
            fontWeight: treino === key ? 700 : 500, fontSize: 13,
            color: treino === key ? '#6e4a2a' : 'var(--gray-600)',
          }}>{t.label.replace('Treino ', '')}</button>
        ))}
      </div>
      <p style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 12 }}>
        Pré-ativação: {ABC_TREINOS[treino].preAtivacao}
      </p>

      <FieldLabel>EXERCÍCIOS — marque o que fez e anote a carga</FieldLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {exercicios.map(ex => {
          const done = feitos.includes(ex.id)
          const badge = PRIORITY_BADGE[ex.priority] || {}
          return (
            <div key={ex.id} style={{
              borderRadius: 12, border: '2px solid',
              borderColor: done ? 'var(--peach-dark)' : 'var(--gray-200)',
              background: done ? 'var(--peach)' : '#fff',
              overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px' }}>
                <button onClick={() => toggleFeito(ex.id)} style={{
                  width: 22, height: 22, borderRadius: '50%', border: '2px solid', flexShrink: 0,
                  borderColor: done ? '#a06030' : 'var(--gray-300)',
                  background: done ? '#a06030' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 11, fontWeight: 700,
                }}>{done ? '✓' : ''}</button>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, textDecoration: done ? 'line-through' : 'none', color: done ? '#6e4a2a' : 'inherit' }}>
                    {ex.label}
                  </p>
                  <div style={{ display: 'flex', gap: 6, marginTop: 3, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 4, background: badge.bg, color: badge.text }}>
                      {ex.priority}
                    </span>
                    <span style={{ fontSize: 10, color: 'var(--peach-dark)', fontFamily: 'monospace', fontWeight: 700 }}>
                      {ex.volume}
                    </span>
                  </div>
                </div>
                <input
                  value={cargas[ex.id] || ''}
                  onChange={e => setCarga(ex.id, e.target.value)}
                  placeholder="kg"
                  onClick={e => e.stopPropagation()}
                  style={{
                    width: 52, border: '2px solid var(--gray-200)', borderRadius: 8,
                    padding: '6px 8px', fontSize: 14, textAlign: 'center', background: '#fff',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <FieldLabel>COMO ME SENTI</FieldLabel>
      <SensacaoSelect value={data.sensacao} onChange={v => onChange({ ...data, sensacao: v })} />

      <FieldLabel>OBSERVAÇÕES</FieldLabel>
      <textarea value={data.obs || ''} onChange={e => onChange({ ...data, obs: e.target.value })}
        placeholder="PR, dor, algo que notou..."
        style={{ width: '100%', border: '2px solid var(--gray-200)', borderRadius: 12, padding: '10px 14px', fontSize: 14, minHeight: 70, resize: 'vertical', background: '#fff' }} />
    </>
  )
}

function FormMobilidade({ data, onChange }) {
  const toggleEx = (id) => {
    const feitos = data.feitos || []
    const next = feitos.includes(id) ? feitos.filter(f => f !== id) : [...feitos, id]
    onChange({ ...data, feitos: next })
  }
  const PRIORITY_COLORS = { 'Imperativo': '#e05555', 'Alto': '#d4904a', 'Médio': '#6aad7a' }

  return (
    <>
      <FieldLabel>EXERCÍCIOS FEITOS</FieldLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {MOBILIDADE_EXERCISES.map(ex => {
          const checked = (data.feitos || []).includes(ex.id)
          return (
            <button key={ex.id} onClick={() => toggleEx(ex.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
              borderRadius: 12, border: '2px solid', textAlign: 'left',
              borderColor: checked ? 'var(--mint-dark)' : 'var(--gray-200)',
              background: checked ? 'var(--mint)' : '#fff',
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: 6, border: '2px solid',
                borderColor: checked ? 'var(--mint-dark)' : 'var(--gray-300)',
                background: checked ? 'var(--mint-dark)' : 'transparent',
                flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 12,
              }}>{checked ? '✓' : ''}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 13, fontWeight: checked ? 600 : 400 }}>{ex.label}</span>
                <span style={{ fontSize: 10, marginLeft: 8, color: PRIORITY_COLORS[ex.priority], fontWeight: 600 }}>{ex.priority}</span>
              </div>
              <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{ex.time}</span>
            </button>
          )
        })}
      </div>
      <FieldLabel>OBSERVAÇÕES</FieldLabel>
      <textarea value={data.obs || ''} onChange={e => onChange({ ...data, obs: e.target.value })}
        placeholder="Como foi? Algo que sentiu diferente..."
        style={{ width: '100%', border: '2px solid var(--gray-200)', borderRadius: 12, padding: '10px 14px', fontSize: 14, minHeight: 70, resize: 'vertical', background: '#fff' }} />
    </>
  )
}

// ---- MAIN ----

const TYPE_LABELS = { corrida: '🏃 Corrida', pilates: '🧘 Pilates', academia: '🏋️ Academia', mobilidade: '🧩 Mobilidade' }
const TYPE_COLORS = { corrida: 'var(--mint)', pilates: 'var(--lavender)', academia: 'var(--peach)', mobilidade: 'var(--sky)' }

export default function Registrar() {
  const navigate = useNavigate()
  const [type, setType] = useState(null)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [data, setData] = useState({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    if (!type) return
    setSaving(true)
    const treino = {
      id: Date.now().toString(),
      date,
      type,
      data,
      createdAt: new Date().toISOString(),
    }
    saveTreino(treino)
    await pushToSheets(treino)
    setSaving(false)
    setSaved(true)
    setTimeout(() => navigate('/'), 1200)
  }

  if (saved) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100dvh', gap: 16 }}>
        <div style={{ fontSize: 64 }}>✅</div>
        <p style={{ fontSize: 20, fontWeight: 700 }}>Treino registrado!</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '16px 16px 100px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'var(--gray-600)', padding: 4 }}>
          <ChevronLeft size={24} />
        </button>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>Registrar treino</h2>
      </div>

      {/* Data */}
      <Card style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 8 }}>DATA</p>
        <input type="date" value={date} onChange={e => setDate(e.target.value)}
          style={{ border: '2px solid var(--gray-200)', borderRadius: 12, padding: '10px 14px', fontSize: 14, width: '100%', background: '#fff' }} />
      </Card>

      {/* Tipo */}
      <Card style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 12 }}>TIPO DE TREINO</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {Object.entries(TYPE_LABELS).map(([t, label]) => (
            <button key={t} onClick={() => { setType(t); setData({}) }} style={{
              padding: '14px 8px', borderRadius: 14, border: '2px solid',
              borderColor: type === t ? '#999' : 'var(--gray-200)',
              background: type === t ? TYPE_COLORS[t] : '#fff',
              fontSize: 13, fontWeight: type === t ? 700 : 400,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              boxShadow: type === t ? 'var(--shadow)' : 'none',
            }}>
              <span style={{ fontSize: 24 }}>{label.split(' ')[0]}</span>
              <span>{label.split(' ')[1]}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Form */}
      {type && (
        <Card style={{ marginBottom: 16 }}>
          {type === 'corrida'    && <FormCorrida data={data} onChange={setData} />}
          {type === 'pilates'    && <FormPilates data={data} onChange={setData} />}
          {type === 'academia'   && <FormAcademia data={data} onChange={setData} />}
          {type === 'mobilidade' && <FormMobilidade data={data} onChange={setData} />}
        </Card>
      )}

      {type && (
        <button onClick={handleSave} disabled={saving} style={{
          width: '100%', padding: 16, background: 'var(--pink-dark)', color: '#fff',
          borderRadius: 'var(--radius)', fontSize: 16, fontWeight: 700,
          opacity: saving ? 0.7 : 1,
          boxShadow: '0 4px 16px rgba(232,160,180,0.4)',
        }}>
          {saving ? 'Salvando...' : '💾 Salvar treino'}
        </button>
      )}
    </div>
  )
}
