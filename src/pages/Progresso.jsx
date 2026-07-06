import { useState } from 'react'
import { useTreino } from '../store/TreinoContext.jsx'
import { BLOCOS, CORRIDA } from '../data/treinoData.js'
import { isoToCurto, hojeISO } from '../hooks/useStorage.js'
import { SectionLabel, Mono, Serif } from '../components/ui.jsx'

export default function Progresso({ nav }) {
  const { store, streak, totalSessoes, corridasFeitas, dias14, trend, toggleMarco } = useTreino()
  const [retroIso, setRetroIso] = useState(hojeISO())

  // progresso por bloco: quantas sessões e a última (history vem do mais novo)
  const porBloco = BLOCOS.map(b => {
    const hist = store.history.filter(h => h.bloco === b.id)
    const ultima = hist[0]
    return { id: b.id, nome: b.nome, count: hist.length, ultima }
  })

  return (
    <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* stats */}
      <div style={{ display: 'flex', gap: 9 }}>
        <div style={{ flex: 1, background: 'var(--ink)', color: 'var(--surface)', borderRadius: 14, padding: 15, textAlign: 'center' }}>
          <Serif size={30} weight={600} color="var(--surface)">{streak}</Serif>
          <Mono size={9} color="#C9C0B5" style={{ textTransform: 'uppercase', letterSpacing: '.06em' }}>dias seguidos</Mono>
        </div>
        {[[totalSessoes, 'sessões'], [corridasFeitas, 'corridas']].map(([n, l]) => (
          <div key={l} style={{ flex: 1, background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: 15, textAlign: 'center' }}>
            <Serif size={30} weight={600}>{n}</Serif>
            <Mono size={9} color="var(--faint)" style={{ textTransform: 'uppercase', letterSpacing: '.06em' }}>{l}</Mono>
          </div>
        ))}
      </div>

      {/* atividade 14 dias */}
      <div>
        <SectionLabel>Atividade · 14 dias</SectionLabel>
        <div style={{ display: 'flex', gap: 5 }}>
          {dias14.map((on, i) => (
            <div key={i} style={{ flex: 1, height: 30, borderRadius: 5, background: on ? 'var(--terracotta)' : '#F0E8DB', border: `1px solid ${on ? 'var(--terracotta)' : 'var(--border)'}` }} />
          ))}
        </div>
      </div>

      {/* progresso por bloco */}
      <div>
        <SectionLabel>Por bloco</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {porBloco.map(b => (
            <div key={b.id} onClick={() => nav.openBlock(b.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 14px', cursor: 'pointer' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{b.nome}</div>
                <Mono size={11} color="var(--faint)">
                  {b.count === 0 ? 'ainda não registrado' : `${b.count} ${b.count === 1 ? 'sessão' : 'sessões'} · última ${b.ultima.data}`}
                </Mono>
              </div>
              {b.ultima && <Mono size={12} color="var(--green)" weight={700}>{b.ultima.done}/{b.ultima.total}</Mono>}
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--faint)' }}>›</span>
            </div>
          ))}
        </div>
      </div>

      {/* tendência de carga */}
      <div>
        <SectionLabel>Carga · principais compostos</SectionLabel>
        {trend.length === 0 ? (
          <div style={{ background: '#fff', border: '1px dashed var(--border)', borderRadius: 12, padding: 16, fontSize: 13, color: 'var(--faint)', textAlign: 'center' }}>
            Registre sessões com carga pra ver a evolução dos compostos aqui.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {trend.map(t => (
              <div key={t.nome} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '13px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 9 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600 }}>{t.nome}</span>
                  <Mono size={12} color="var(--terracotta)">{t.atual}</Mono>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 42 }}>
                  {t.bars.map((b, i) => (
                    <div key={i} style={{ flex: 1, height: `${b.h}%`, minHeight: 5, background: b.ultima ? 'var(--terracotta)' : '#E0BFA0', borderRadius: '4px 4px 0 0' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* marcos */}
      <div>
        <SectionLabel>Marcos de corrida</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CORRIDA.fases.map((f, i) => {
            const on = store.marcos[i]
            return (
              <div key={f.n} style={{ display: 'flex', alignItems: 'center', gap: 11, background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '13px 14px' }}>
                <button onClick={() => toggleMarco(i)} style={{ width: 24, height: 24, borderRadius: '50%', border: `2px solid ${on ? 'var(--green)' : 'var(--gold)'}`, background: on ? 'var(--green)' : '#fff', color: '#fff', fontSize: 13, lineHeight: 1, flex: '0 0 auto' }}>{on ? '✓' : ''}</button>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{f.n} · {f.nome}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.4 }}>{f.marco}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* registro retroativo */}
      <div style={{ background: 'var(--blue-bg)', border: '1px solid #cdd9e2', borderRadius: 14, padding: 16 }}>
        <SectionLabel color="var(--blue)" style={{ marginBottom: 8 }}>Registro retroativo</SectionLabel>
        <div style={{ fontSize: 13, color: '#3a4a57', lineHeight: 1.5, marginBottom: 11 }}>Esqueceu de marcar? Escolhe a data e registra o treino depois.</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input type="date" value={retroIso} onChange={e => setRetroIso(e.target.value)}
            style={{ flex: 1, border: '1px solid #cdd9e2', background: '#fff', borderRadius: 8, padding: '9px 10px', fontFamily: 'var(--mono)', fontSize: 12 }} />
          <button onClick={() => nav.startRetro({ iso: retroIso, label: isoToCurto(retroIso) })}
            style={{ background: 'var(--blue)', color: '#fff', borderRadius: 8, padding: '9px 14px', fontFamily: 'var(--mono)', fontSize: 12, whiteSpace: 'nowrap' }}>Registrar</button>
        </div>
      </div>
    </div>
  )
}
