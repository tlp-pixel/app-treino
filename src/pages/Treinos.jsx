import { useTreino } from '../store/TreinoContext.jsx'
import { Serif, Mono } from '../components/ui.jsx'

export default function Treinos({ nav }) {
  const { store, blocos } = useTreino()

  return (
    <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 11 }}>
      {nav.retro && (
        <div style={{ background: 'var(--blue-bg)', border: '1px solid #cdd9e2', borderRadius: 12, padding: '12px 14px', fontSize: 13, color: '#3a4a57', lineHeight: 1.45 }}>
          Registro retroativo em <b>{nav.retro.label}</b> — escolhe o treino abaixo.{' '}
          <button onClick={nav.cancelRetro} style={{ background: 'none', color: 'var(--blue)', fontFamily: 'var(--mono)', fontSize: 11, textDecoration: 'underline', padding: 0 }}>cancelar</button>
        </div>
      )}

      {blocos.map(b => {
        const done = b.exercicios.filter(e => store.cur[e.id] && store.cur[e.id].done).length
        const p0 = b.exercicios.filter(e => e.prio === 'P0').length
        return (
          <div key={b.id} onClick={() => nav.openBlock(b.id)} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 17px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Mono size={10} color="var(--terracotta)" style={{ letterSpacing: '.06em', textTransform: 'uppercase' }}>{b.kicker}</Mono>
              <span style={{ flex: 1 }} />
              {done > 0 && <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--green)', background: 'var(--green-bg)', padding: '2px 7px', borderRadius: 5 }}>{done} feito</span>}
            </div>
            <Serif size={20} style={{ marginBottom: 5 }}>{b.nome}</Serif>
            <div style={{ display: 'flex', gap: 14, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>
              <span>{b.when}</span><span>{b.exercicios.length} exercícios</span><span style={{ color: 'var(--terracotta)' }}>{p0} P0</span>
            </div>
          </div>
        )
      })}

      <button onClick={nav.openEditor} style={{
        marginTop: 4, background: 'transparent', border: '1px dashed var(--border)',
        color: 'var(--muted)', borderRadius: 12, padding: '12px', fontFamily: 'var(--mono)', fontSize: 12,
      }}>✎ Editar exercícios dos treinos A/B/C</button>
    </div>
  )
}
