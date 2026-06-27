import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { saveTreino, getTreinos, getUltimaSerie } from '../hooks/useStorage.js'
import { pushToSheets } from '../hooks/useSheets.js'
import { PILATES_CHECKLIST, ZONAS_CORRIDA, SENSACAO_OPTIONS, MOBILIDADE_EXERCISES, ABC_TREINOS } from '../config.js'
import Card from '../components/Card.jsx'
import TiktokLink from '../components/TiktokLink.jsx'
import AtivacaoCard from '../components/AtivacaoCard.jsx'
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

const TIPOS_CORRIDA = [
  { id: 'leve',       label: '🟢 Leve / Base' },
  { id: 'longa',      label: '🏁 Corrida longa' },
  { id: 'intervalos', label: '🔴 Intervalos' },
  { id: 'tempo',      label: '🟡 Tempo run / Progressiva' },
  { id: 'teste',      label: '🏆 Teste de marco' },
]

function FormCorrida({ data, onChange }) {
  const tipo = data.tipo || 'leve'
  const set = (field) => (v) => onChange({ ...data, [field]: v })

  return (
    <>
      <FieldLabel>TIPO DE TREINO</FieldLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {TIPOS_CORRIDA.map(t => (
          <button key={t.id} onClick={() => onChange({ ...data, tipo: t.id })} style={{
            padding: '8px 14px', borderRadius: 20, border: '2px solid',
            borderColor: tipo === t.id ? 'var(--mint-dark)' : 'var(--gray-200)',
            background: tipo === t.id ? 'var(--mint)' : '#fff',
            fontSize: 13, fontWeight: tipo === t.id ? 600 : 400,
            color: tipo === t.id ? '#2a6648' : 'var(--gray-600)',
          }}>{t.label}</button>
        ))}
      </div>

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

      {(tipo === 'leve' || tipo === 'longa') && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <FieldLabel>DISTÂNCIA (km)</FieldLabel>
            <TextInput value={data.distancia || ''} onChange={set('distancia')} placeholder="Ex: 5.2" type="number" />
          </div>
          <div>
            <FieldLabel>PACE MÉDIO (min/km)</FieldLabel>
            <TextInput value={data.pace || ''} onChange={set('pace')} placeholder="Ex: 7:30" />
          </div>
        </div>
      )}

      {tipo === 'intervalos' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <FieldLabel>DIST. AQUECIMENTO (km)</FieldLabel>
              <TextInput value={data.distAquec || ''} onChange={set('distAquec')} placeholder="Ex: 1.5" type="number" />
            </div>
            <div>
              <FieldLabel>DIST. DESAQUECIMENTO (km)</FieldLabel>
              <TextInput value={data.distDesaquec || ''} onChange={set('distDesaquec')} placeholder="Ex: 0.5" type="number" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <FieldLabel>Nº DE TIROS</FieldLabel>
              <TextInput value={data.numTiros || ''} onChange={set('numTiros')} placeholder="Ex: 4" type="number" />
            </div>
            <div>
              <FieldLabel>DISTÂNCIA POR TIRO (m)</FieldLabel>
              <TextInput value={data.distTiro || ''} onChange={set('distTiro')} placeholder="Ex: 600" type="number" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <FieldLabel>PACE POR TIRO (min/km)</FieldLabel>
              <TextInput value={data.paceTiro || ''} onChange={set('paceTiro')} placeholder="Ex: 6:00" />
            </div>
            <div>
              <FieldLabel>RECUPERAÇÃO (seg)</FieldLabel>
              <TextInput value={data.recuperacao || ''} onChange={set('recuperacao')} placeholder="Ex: 90" type="number" />
            </div>
          </div>
        </>
      )}

      {tipo === 'tempo' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <FieldLabel>DIST. AQUECIMENTO (km)</FieldLabel>
              <TextInput value={data.distAquec || ''} onChange={set('distAquec')} placeholder="Ex: 1" type="number" />
            </div>
            <div>
              <FieldLabel>DIST. PRINCIPAL (km)</FieldLabel>
              <TextInput value={data.distPrincipal || ''} onChange={set('distPrincipal')} placeholder="Ex: 5" type="number" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <FieldLabel>PACE INICIAL (min/km)</FieldLabel>
              <TextInput value={data.paceInicial || ''} onChange={set('paceInicial')} placeholder="Ex: 6:30" />
            </div>
            <div>
              <FieldLabel>PACE FINAL (min/km)</FieldLabel>
              <TextInput value={data.paceFinal || ''} onChange={set('paceFinal')} placeholder="Ex: 6:00" />
            </div>
          </div>
          <FieldLabel>DIST. DESAQUECIMENTO (km)</FieldLabel>
          <TextInput value={data.distDesaquec || ''} onChange={set('distDesaquec')} placeholder="Ex: 1" type="number" />
        </>
      )}

      {tipo === 'teste' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <FieldLabel>DISTÂNCIA TOTAL (km)</FieldLabel>
              <TextInput value={data.distancia || ''} onChange={set('distancia')} placeholder="Ex: 8" type="number" />
            </div>
            <div>
              <FieldLabel>PACE ALVO (min/km)</FieldLabel>
              <TextInput value={data.paceAlvo || ''} onChange={set('paceAlvo')} placeholder="Ex: 6:30" />
            </div>
          </div>
          <FieldLabel>PACE REALIZADO (min/km)</FieldLabel>
          <TextInput value={data.pace || ''} onChange={set('pace')} placeholder="Ex: 6:25" />
          <FieldLabel>BATEU O MARCO?</FieldLabel>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['sim', '✅ Sim'], ['nao', '❌ Não']].map(([v, l]) => (
              <button key={v} onClick={() => onChange({ ...data, bateuMarco: v })} style={{
                flex: 1, padding: '10px', borderRadius: 12, border: '2px solid',
                borderColor: data.bateuMarco === v ? 'var(--mint-dark)' : 'var(--gray-200)',
                background: data.bateuMarco === v ? 'var(--mint)' : '#fff',
                fontWeight: 600, fontSize: 14, color: data.bateuMarco === v ? '#2a6648' : 'var(--gray-600)',
              }}>{l}</button>
            ))}
          </div>
        </>
      )}

      <FieldLabel>FC MÉDIA (bpm) — opcional</FieldLabel>
      <TextInput value={data.fc || ''} onChange={set('fc')} placeholder="Ex: 148" type="number" />

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

const PRIORITY_COLORS = {
  'Prioridade':   { bg: 'rgba(224,85,85,0.12)',  text: '#c05050', border: 'rgba(224,85,85,0.3)' },
  'Alto':         { bg: 'rgba(212,144,74,0.12)', text: '#b07030', border: 'rgba(212,144,74,0.3)' },
  'Complementar': { bg: 'rgba(106,173,122,0.12)',text: '#4a8a5a', border: 'rgba(106,173,122,0.3)' },
  'Finalização':  { bg: 'rgba(100,120,200,0.12)',text: '#5060a0', border: 'rgba(100,120,200,0.3)' },
}

function PriorityBadge({ priority }) {
  const c = PRIORITY_COLORS[priority] || {}
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap',
    }}>{priority}</span>
  )
}

function parseSeries(volume) {
  const m = volume.match(/^(\d+)×/)
  return m ? parseInt(m[1], 10) : 1
}

function ExercicioAcademiaCard({ ex, checked, onToggle, series, onSeriesChange, ultima }) {
  const [open, setOpen] = useState(false)
  const numSeries = parseSeries(ex.volume)

  return (
    <div style={{
      background: checked ? 'var(--gray-100)' : '#fff',
      borderRadius: 12, marginBottom: 10,
      border: '2px solid var(--gray-200)',
      opacity: checked ? 0.6 : 1,
      transition: 'opacity 0.2s',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer' }}
        onClick={() => setOpen(o => !o)}>
        <button onClick={e => { e.stopPropagation(); onToggle() }} style={{
          width: 24, height: 24, borderRadius: '50%', border: '2px solid',
          borderColor: checked ? 'var(--peach-dark)' : 'var(--gray-300)',
          background: checked ? 'var(--peach-dark)' : 'transparent',
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 12, fontWeight: 700,
        }}>{checked ? '✓' : ''}</button>

        <span style={{ flex: 1, fontWeight: 600, fontSize: 14, textDecoration: checked ? 'line-through' : 'none' }}>
          {ex.label}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <PriorityBadge priority={ex.priority} />
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
          {ex.porq && (
            <p style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 6, lineHeight: 1.6 }}>
              <span style={{ fontWeight: 600, color: 'var(--gray-800)' }}>Por quê: </span>{ex.porq}
            </p>
          )}
          {ex.dica && (
            <div style={{ marginTop: 8, padding: '8px 12px', background: 'var(--mint)', borderRadius: 8, fontSize: 12, color: '#2a6648' }}>
              💡 {ex.dica}
            </div>
          )}
          {ex.tiktok && <TiktokLink query={ex.tiktok} />}

          {ultima && (
            <p style={{ fontSize: 12, color: 'var(--peach-dark)', marginTop: 10, fontWeight: 600 }}>
              📌 Última vez: {ultima.map(v => v || '—').join(' / ')} kg
            </p>
          )}

          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', marginTop: 10, marginBottom: 6 }}>
            CARGA POR SÉRIE (kg)
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {Array.from({ length: numSeries }).map((_, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 10, color: 'var(--gray-400)', marginBottom: 4 }}>Série {i + 1}</p>
                <input
                  value={series?.[i] || ''}
                  onChange={e => onSeriesChange(i, e.target.value)}
                  placeholder={ultima?.[i] ? String(ultima[i]) : '0'}
                  onClick={e => e.stopPropagation()}
                  style={{
                    width: 52, border: '2px solid var(--gray-200)', borderRadius: 8,
                    padding: '6px 8px', fontSize: 14, textAlign: 'center', background: '#fff',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function FormAcademia({ data, onChange }) {
  const treino = data.treino || 'a'
  const treinoObj = ABC_TREINOS[treino]
  const exercicios = treinoObj.exercicios
  const seriesData = data.series || {}
  const feitos = data.feitos || []
  const ativacaoFeita = data.ativacao || []

  const setTreino = (t) => onChange({ ...data, treino: t, feitos: [], series: {}, ativacao: [] })
  const toggleFeito = (id) => {
    const next = feitos.includes(id) ? feitos.filter(f => f !== id) : [...feitos, id]
    onChange({ ...data, feitos: next })
  }
  const toggleAtivacao = (id) => {
    const next = ativacaoFeita.includes(id) ? ativacaoFeita.filter(f => f !== id) : [...ativacaoFeita, id]
    onChange({ ...data, ativacao: next })
  }
  const setSerie = (exId, idx, val) => {
    const exSeries = [...(seriesData[exId] || [])]
    exSeries[idx] = val
    onChange({ ...data, series: { ...seriesData, [exId]: exSeries } })
  }

  return (
    <>
      <FieldLabel>TREINO DO DIA</FieldLabel>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
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

      <FieldLabel>PRÉ-ATIVAÇÃO — marque o que fez</FieldLabel>
      {treinoObj.preAtivacao.map(item => (
        <AtivacaoCard
          key={item.id}
          item={item}
          checked={ativacaoFeita.includes(item.id)}
          onToggle={() => toggleAtivacao(item.id)}
        />
      ))}

      <FieldLabel>EXERCÍCIOS</FieldLabel>
      {exercicios.map(ex => (
        <ExercicioAcademiaCard
          key={ex.id}
          ex={ex}
          checked={feitos.includes(ex.id)}
          onToggle={() => toggleFeito(ex.id)}
          series={seriesData[ex.id]}
          onSeriesChange={(i, v) => setSerie(ex.id, i, v)}
          ultima={getUltimaSerie(treino, ex.id)}
        />
      ))}

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
      {MOBILIDADE_EXERCISES.map(ex => (
        <AtivacaoCard
          key={ex.id}
          item={ex}
          checked={(data.feitos || []).includes(ex.id)}
          onToggle={() => toggleEx(ex.id)}
          extra={
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <span style={{ fontSize: 10, color: PRIORITY_COLORS[ex.priority], fontWeight: 700 }}>{ex.priority}</span>
              <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{ex.time}</span>
            </span>
          }
        />
      ))}
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
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const existing = useState(() => editId ? getTreinos().find(t => t.id === editId) || null : null)[0]

  const [type, setType] = useState(existing?.type || null)
  const [date, setDate] = useState(existing?.date || new Date().toISOString().slice(0, 10))
  const [data, setData] = useState(existing?.data || {})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    if (!type) return
    setSaving(true)
    const treino = {
      id: existing?.id || Date.now().toString(),
      date,
      type,
      data,
      createdAt: existing?.createdAt || new Date().toISOString(),
    }
    saveTreino(treino)
    await pushToSheets(treino)
    setSaving(false)
    setSaved(true)
    setTimeout(() => navigate(existing ? '/historico' : '/'), 1200)
  }

  if (saved) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100dvh', gap: 16 }}>
        <div style={{ fontSize: 64 }}>✅</div>
        <p style={{ fontSize: 20, fontWeight: 700 }}>{existing ? 'Registro atualizado!' : 'Treino registrado!'}</p>
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
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>{existing ? 'Editar registro' : 'Registrar treino'}</h2>
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
        {existing ? (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
            borderRadius: 14, background: TYPE_COLORS[type], width: 'fit-content',
            fontSize: 14, fontWeight: 700,
          }}>
            {TYPE_LABELS[type]}
          </div>
        ) : (
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
        )}
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
          {saving ? 'Salvando...' : existing ? '💾 Salvar alterações' : '💾 Salvar treino'}
        </button>
      )}
    </div>
  )
}
