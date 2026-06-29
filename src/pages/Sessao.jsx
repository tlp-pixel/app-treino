import { useState } from 'react'
import { useTreino } from '../store/TreinoContext.jsx'
import TiktokLink from '../components/TiktokLink.jsx'

const ORDER = { P0: 0, P1: 1, P2: 2, P3: 3 }
const FILTERS = [['P0', 'Só P0'], ['P1', 'P0–P1'], ['P2', 'P0–P2'], ['ALL', 'Tudo']]

function ExercicioCard({ ex, c, expanded, onExpand, unidade }) {
  const { setCur, toggleDone } = useTreino()
  const done = !!c.done

  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderLeft: `5px solid ${ex.cor}`, borderRadius: 12, padding: '14px 14px 14px 15px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 5, background: ex.bg, color: ex.cor }}>{ex.prio}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '.05em', color: 'var(--faint)', textTransform: 'uppercase' }}>{ex.tag}</span>
        <span style={{ flex: 1 }} />
        <button onClick={() => toggleDone(ex.id)} style={{
          border: `1px solid ${done ? 'var(--green)' : 'var(--border)'}`, background: done ? 'var(--green)' : '#fff',
          color: done ? '#fff' : 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 11, padding: '5px 11px', borderRadius: 20, whiteSpace: 'nowrap',
        }}>{done ? '✓ Feito' : 'Marcar'}</button>
      </div>

      <div style={{ fontWeight: 600, fontSize: 15.5, lineHeight: 1.25, marginBottom: 2 }}>
        {ex.nome}
        {ex.lado && <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--terracotta)', border: '1px solid var(--terracotta)', borderRadius: 4, padding: '1px 5px', marginLeft: 5, verticalAlign: 'middle' }}>{ex.lado}</span>}
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', marginBottom: 9 }}>{ex.dose}</div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--faint)', background: '#FDFAF4', border: '1px dashed var(--border)', borderRadius: 8, padding: '6px 9px', marginBottom: 11 }}>
        Anterior · {c._anterior}
      </div>

      {/* inputs por tipo */}
      {ex.kind === 'peso' && ex.lado && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 11 }}>
          <CampoMono label="Carga esq" value={c.cargaEsq || ''} onChange={v => setCur(ex.id, 'cargaEsq', v)} />
          <CampoMono label="Carga dir" value={c.cargaDir || ''} onChange={v => setCur(ex.id, 'cargaDir', v)} />
          <CampoMono label="Reps" value={c.reps || ''} onChange={v => setCur(ex.id, 'reps', v)} />
        </div>
      )}
      {ex.kind === 'peso' && !ex.lado && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 11 }}>
          <CampoMono flex={1.3} label={`Carga (${unidade})`} value={c.carga || ''} onChange={v => setCur(ex.id, 'carga', v)} />
          <CampoMono label="Reps" value={c.reps || ''} onChange={v => setCur(ex.id, 'reps', v)} />
        </div>
      )}
      {ex.kind === 'medida' && (
        <div style={{ marginBottom: 11 }}>
          <CampoMono label="Medida (tempo / reps / elástico)" value={c.medida || ''} onChange={v => setCur(ex.id, 'medida', v)} placeholder={ex.dose} />
        </div>
      )}

      {/* RPE */}
      <div style={{ marginBottom: 11 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 8.5, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 5 }}>Esforço · RPE</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map(n => {
            const on = c.rpe === n
            return (
              <button key={n} onClick={() => setCur(ex.id, 'rpe', n)} style={{
                flex: 1, border: `1px solid ${on ? 'var(--ink)' : 'var(--border)'}`, background: on ? 'var(--ink)' : '#fff',
                color: on ? '#fff' : '#a89e92', fontFamily: 'var(--mono)', fontSize: 11, padding: '6px 0', borderRadius: 6,
              }}>{n}</button>
            )
          })}
        </div>
      </div>

      <input value={c.nota || ''} onChange={e => setCur(ex.id, 'nota', e.target.value)} placeholder="Anotação livre…"
        style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 9px', fontSize: 13, marginBottom: 11 }} />

      <button onClick={onExpand} style={{ width: '100%', textAlign: 'left', background: '#FDFAF4', border: '1px solid var(--border)', borderRadius: 8, padding: '9px 11px', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{expanded ? 'Ocultar instruções' : 'Como · atenção · por quê'}</span><span>{expanded ? '▴' : '▾'}</span>
      </button>

      {expanded && (
        <div style={{ padding: '11px 2px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '5px 10px', fontSize: 13, lineHeight: 1.5 }}>
            <RotuloCol>Como</RotuloCol><span>{ex.como}</span>
            {ex.atencao && (<><RotuloCol cor="var(--terracotta)">Atenção</RotuloCol><span style={{ color: '#9a4634' }}>{ex.atencao}</span></>)}
            <RotuloCol>Por quê</RotuloCol><span style={{ color: 'var(--muted)' }}>{ex.porque}</span>
          </div>
          {ex.tiktok && <TiktokLink to={ex.tiktok} />}
        </div>
      )}
    </div>
  )
}

function CampoMono({ label, value, onChange, placeholder, flex = 1 }) {
  return (
    <label style={{ flex, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 8.5, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)' }}>{label}</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || '–'} inputMode="decimal"
        style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '8px 9px', fontFamily: 'var(--mono)', fontSize: 13, width: '100%' }} />
    </label>
  )
}
function RotuloCol({ children, cor = 'var(--faint)' }) {
  return <span style={{ fontFamily: 'var(--mono)', fontSize: 8.5, letterSpacing: '.06em', textTransform: 'uppercase', color: cor, paddingTop: 2 }}>{children}</span>
}

export default function Sessao({ bloco, nav }) {
  const { store, salvar, unidade } = useTreino()
  const [filter, setFilter] = useState('ALL')
  const [expanded, setExpanded] = useState({})

  const fmax = filter === 'ALL' ? 9 : ORDER[filter]
  const doneCount = bloco.exercicios.filter(e => store.cur[e.id] && store.cur[e.id].done).length

  const onSalvar = () => {
    salvar(bloco.id, nav.retro?.iso)
    nav.cancelRetro()
    nav.closeSession()
    nav.go('progresso')
  }

  return (
    <div style={{ padding: '16px 16px 4px' }}>
      {nav.retro && (
        <div style={{ background: 'var(--blue-bg)', border: '1px solid #cdd9e2', borderRadius: 10, padding: '9px 12px', fontFamily: 'var(--mono)', fontSize: 11, color: '#3a4a57', marginBottom: 12 }}>● Registro retroativo · {nav.retro.label}</div>
      )}
      <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.55, margin: '0 0 14px' }}>{bloco.desc}</p>

      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--faint)', marginRight: 2 }}>Triagem</span>
        {FILTERS.map(([f, label]) => {
          const on = filter === f
          const c0 = f === 'P0'
          return (
            <button key={f} onClick={() => setFilter(f)} style={{
              fontFamily: 'var(--mono)', fontSize: 11, padding: '5px 11px', borderRadius: 18,
              border: `1px solid ${on ? (c0 ? 'var(--terracotta)' : 'var(--ink)') : 'var(--border)'}`,
              background: on ? (c0 ? 'var(--terracotta)' : 'var(--ink)') : '#fff', color: on ? '#fff' : 'var(--muted)',
            }}>{label}</button>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {bloco.exercicios.map(ex => {
          const c = { ...(store.cur[ex.id] || {}), _anterior: store.prev[ex.id] || ex.anterior || '—' }
          const dim = ORDER[ex.prio] > fmax
          return (
            <div key={ex.id} style={{ opacity: dim ? 0.34 : 1 }}>
              <ExercicioCard
                ex={ex} c={c} unidade={unidade}
                expanded={!!expanded[ex.id]}
                onExpand={() => setExpanded(s => ({ ...s, [ex.id]: !s[ex.id] }))}
              />
            </div>
          )
        })}
      </div>

      <div style={{ padding: '16px 0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 15px' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)' }}><b style={{ color: 'var(--green)' }}>{doneCount}</b> / {bloco.exercicios.length} feito</span>
          <button onClick={onSalvar} style={{ background: 'var(--ink)', color: 'var(--surface)', borderRadius: 20, padding: '10px 20px', fontFamily: 'var(--mono)', fontSize: 12 }}>Salvar sessão</button>
        </div>
      </div>
    </div>
  )
}
