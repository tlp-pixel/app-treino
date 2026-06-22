import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveTreino } from '../hooks/useStorage.js'
import { pushToSheets } from '../hooks/useSheets.js'
import { PILATES_CHECKLIST, ZONAS_CORRIDA, GRUPOS_MUSCULARES, SENSACAO_OPTIONS } from '../config.js'
import Card from '../components/Card.jsx'
import { ChevronLeft, Plus, Trash2 } from 'lucide-react'

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

function FormAcademia({ data, onChange }) {
  const [novoEx, setNovoEx] = useState('')

  const addExercicio = () => {
    if (!novoEx.trim()) return
    const exercicios = data.exercicios || []
    onChange({ ...data, exercicios: [...exercicios, { nome: novoEx.trim(), series: '', reps: '', carga: '' }] })
    setNovoEx('')
  }

  const updateEx = (i, field, val) => {
    const exercicios = [...(data.exercicios || [])]
    exercicios[i] = { ...exercicios[i], [field]: val }
    onChange({ ...data, exercicios })
  }

  const removeEx = (i) => {
    const exercicios = (data.exercicios || []).filter((_, idx) => idx !== i)
    onChange({ ...data, exercicios })
  }

  return (
    <>
      <FieldLabel>GRUPO MUSCULAR</FieldLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {GRUPOS_MUSCULARES.map(g => (
          <button key={g} onClick={() => onChange({ ...data, grupo: g })} style={{
            padding: '8px 14px', borderRadius: 20, border: '2px solid',
            borderColor: data.grupo === g ? 'var(--peach-dark)' : 'var(--gray-200)',
            background: data.grupo === g ? 'var(--peach)' : '#fff',
            fontSize: 13, fontWeight: data.grupo === g ? 600 : 400,
            color: data.grupo === g ? '#6e4a2a' : 'var(--gray-600)',
          }}>{g}</button>
        ))}
      </div>

      <FieldLabel>EXERCÍCIOS</FieldLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {(data.exercicios || []).map((ex, i) => (
          <Card key={i} color="var(--gray-100)" style={{ padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{ex.nome}</span>
              <button onClick={() => removeEx(i)} style={{ background: 'none', color: 'var(--gray-400)', padding: 4 }}>
                <Trash2 size={16} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[['series', 'Séries'], ['reps', 'Reps'], ['carga', 'Carga (kg)']].map(([field, label]) => (
                <div key={field}>
                  <p style={{ fontSize: 10, color: 'var(--gray-400)', marginBottom: 4 }}>{label}</p>
                  <input value={ex[field]} onChange={e => updateEx(i, field, e.target.value)}
                    placeholder={field === 'carga' ? '0' : '—'}
                    style={{ width: '100%', border: '2px solid var(--gray-200)', borderRadius: 8, padding: '6px 10px', fontSize: 14, background: '#fff' }} />
                </div>
              ))}
            </div>
          </Card>
        ))}

        <div style={{ display: 'flex', gap: 8 }}>
          <input value={novoEx} onChange={e => setNovoEx(e.target.value)}
            placeholder="Nome do exercício..." onKeyDown={e => e.key === 'Enter' && addExercicio()}
            style={{ flex: 1, border: '2px solid var(--gray-200)', borderRadius: 12, padding: '10px 14px', fontSize: 14, background: '#fff' }} />
          <button onClick={addExercicio} style={{
            padding: '10px 14px', borderRadius: 12, background: 'var(--peach)', color: '#6e4a2a', fontWeight: 700,
          }}>
            <Plus size={18} />
          </button>
        </div>
      </div>

      <FieldLabel>COMO ME SENTI</FieldLabel>
      <SensacaoSelect value={data.sensacao} onChange={v => onChange({ ...data, sensacao: v })} />

      <FieldLabel>OBSERVAÇÕES</FieldLabel>
      <textarea value={data.obs || ''} onChange={e => onChange({ ...data, obs: e.target.value })}
        placeholder="Peso novo, dor, PR, algo que notou..."
        style={{ width: '100%', border: '2px solid var(--gray-200)', borderRadius: 12, padding: '10px 14px', fontSize: 14, minHeight: 80, resize: 'vertical', background: '#fff' }} />
    </>
  )
}

// ---- MAIN ----

const TYPE_LABELS = { corrida: '🏃 Corrida', pilates: '🧘 Pilates', academia: '🏋️ Academia' }
const TYPE_COLORS = { corrida: 'var(--mint)', pilates: 'var(--lavender)', academia: 'var(--peach)' }

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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
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
          {type === 'corrida' && <FormCorrida data={data} onChange={setData} />}
          {type === 'pilates' && <FormPilates data={data} onChange={setData} />}
          {type === 'academia' && <FormAcademia data={data} onChange={setData} />}
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
