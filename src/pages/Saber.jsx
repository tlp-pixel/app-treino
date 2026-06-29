import { useState } from 'react'
import { useTreino } from '../store/TreinoContext.jsx'
import { CADEIA, PRIO, PRINCIPIOS, PENDENTES, CAVEAT } from '../data/treinoData.js'
import { SectionLabel, Mono, Serif } from '../components/ui.jsx'

export default function Saber() {
  const { reset } = useTreino()
  const [resetText, setResetText] = useState('')
  const [done, setDone] = useState(false)
  const canReset = resetText.trim().toLowerCase() === 'reset'

  return (
    <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 22 }}>

      {/* a cadeia */}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: 20 }}>
        <Serif size={22} style={{ marginBottom: 4 }}>{CADEIA.titulo}</Serif>
        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 18 }}>{CADEIA.sub}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {CADEIA.elos.map((e, i) => (
            <div key={i} style={{ display: 'flex', gap: 13, alignItems: 'flex-start', paddingBottom: 16 }}>
              <div style={{ flex: '0 0 auto', width: 28, height: 28, borderRadius: '50%', display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, color: '#fff', background: `hsl(${8 + i * 4},55%,${48 + i * 2}%)` }}>{i + 1}</div>
              <div style={{ paddingTop: 2 }}>
                <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{e.t}</div>
                <div style={{ color: 'var(--muted)', fontSize: 12.5, lineHeight: 1.45, marginTop: 2 }}>{e.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--rose-bg)', border: '1px solid var(--rose-bd)', borderRadius: 10, padding: '13px 15px', fontSize: 13.5, lineHeight: 1.55 }}>
          <b style={{ color: 'var(--terracotta)' }}>Alavanca máxima · </b>{CADEIA.punch}
        </div>
      </div>

      {/* os quatro níveis */}
      <div>
        <SectionLabel style={{ marginBottom: 10 }}>Os quatro níveis</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {['P0', 'P1', 'P2', 'P3'].map(k => {
            const p = PRIO[k]
            return (
              <div key={k} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', background: '#fff', border: '1px solid var(--border)', borderRadius: 11, padding: '12px 14px' }}>
                <span style={{ flex: '0 0 auto', width: 13, height: 13, borderRadius: 4, marginTop: 3, background: p.cor }} />
                <div style={{ fontSize: 13, lineHeight: 1.45 }}>
                  <b style={{ fontFamily: 'var(--mono)', fontSize: 11, color: p.cor }}>{k} · {p.nome}</b> — <span style={{ color: 'var(--muted)' }}>{p.desc}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* princípios */}
      <div>
        <SectionLabel style={{ marginBottom: 10 }}>Princípios que valem pra tudo</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {PRINCIPIOS.map((p, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid var(--border)', borderLeft: '4px solid var(--gold)', borderRadius: 11, padding: '13px 15px' }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{p.t}</div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.55 }}>{p.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* pendentes */}
      <div>
        <SectionLabel style={{ marginBottom: 10 }}>Ações pendentes · fora do treino</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {PENDENTES.map((a, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 11, padding: '13px 15px' }}>
              <Mono size={10.5} color="var(--terracotta)" style={{ letterSpacing: '.04em', textTransform: 'uppercase' }}>{a.k}</Mono>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.55, marginTop: 5 }}>{a.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* caveat */}
      <div style={{ background: '#FDFAF4', border: '1px solid var(--border)', borderRadius: 12, padding: 16, fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}>
        <b style={{ color: 'var(--ink)' }}>Ressalva honesta. </b>{CAVEAT}
      </div>

      {/* reset */}
      <div style={{ background: 'var(--rose-bg)', border: '1px solid var(--rose-bd)', borderRadius: 14, padding: 17 }}>
        <SectionLabel color="var(--terracotta)" style={{ marginBottom: 8 }}>Zona de perigo · resetar progresso</SectionLabel>
        <div style={{ fontSize: 13, color: '#6b4a40', lineHeight: 1.5, marginBottom: 12 }}>Apaga todos os registros, corridas e marcos. Não dá pra desfazer. Digite <b>reset</b> pra liberar o botão.</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input value={resetText} onChange={e => { setResetText(e.target.value); setDone(false) }} placeholder="digite: reset"
            style={{ flex: 1, border: '1px solid var(--rose-bd)', background: '#fff', borderRadius: 8, padding: '9px 11px', fontFamily: 'var(--mono)', fontSize: 13 }} />
          <button disabled={!canReset} onClick={() => { reset(); setResetText(''); setDone(true) }}
            style={{ background: canReset ? 'var(--terracotta)' : '#d8c4bd', color: '#fff', borderRadius: 8, padding: '9px 16px', fontFamily: 'var(--mono)', fontSize: 12, cursor: canReset ? 'pointer' : 'not-allowed' }}>Resetar</button>
        </div>
        {done && <div style={{ marginTop: 10, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--green)' }}>✓ Progresso resetado.</div>}
      </div>
    </div>
  )
}
