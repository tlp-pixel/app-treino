import { useState } from 'react'
import { useTreino } from '../store/TreinoContext.jsx'
import { CORRIDA, semanaAtualCorrida } from '../data/treinoData.js'
import { SectionLabel, Mono, Serif } from '../components/ui.jsx'

const DIAS = [['ter', 'Ter'], ['qui', 'Qui'], ['sab', 'Sáb']]

export default function Corrida() {
  const { store, togglePlanoCheck, toggleMarco, corridasFeitas } = useTreino()
  const atual = semanaAtualCorrida()
  const [faseAberta, setFaseAberta] = useState(atual.n)
  const checks = store.planoChecks || {}

  return (
    <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{CORRIDA.desc}</p>

      {/* você está aqui */}
      <div style={{ background: 'var(--ink)', color: 'var(--surface)', borderRadius: 14, padding: '15px 16px' }}>
        <Mono size={10} color="var(--peach)" style={{ letterSpacing: '.1em', textTransform: 'uppercase' }}>Você está na</Mono>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
          <Serif size={22} color="var(--surface)">Semana {atual.n}</Serif>
          <Mono size={11} color="#C9C0B5">de 26 · {atual.fase}</Mono>
        </div>
        <div style={{ height: 5, background: 'rgba(255,255,255,.15)', borderRadius: 3, overflow: 'hidden', margin: '10px 0 6px' }}>
          <div style={{ height: '100%', width: `${Math.round(atual.n / 26 * 100)}%`, background: 'var(--terracotta)', borderRadius: 3 }} />
        </div>
        <Mono size={10.5} color="#C9C0B5">{corridasFeitas} treino{corridasFeitas === 1 ? '' : 's'} marcado{corridasFeitas === 1 ? '' : 's'}</Mono>
      </div>

      {/* checklist */}
      <div>
        <SectionLabel>Plano · marca o que já fez</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CORRIDA.plano26.map(fase => (
            <div key={fase.fase}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--gold)', letterSpacing: '.04em', textTransform: 'uppercase', margin: '6px 0 6px 2px' }}>{fase.fase}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {fase.semanas.map(s => {
                  const aberta = faseAberta === s.n
                  const agora = s.n === atual.n
                  const dias = [['ter', s.ter], ['qui', s.qui], ['sab', s.sab]]
                  const feitos = DIAS.filter(([k]) => checks[`${s.n}-${k}`]).length
                  const completa = feitos === 3
                  return (
                    <div key={s.n} style={{ background: agora ? 'var(--sand)' : '#fff', border: `1px solid ${agora ? 'var(--gold)' : 'var(--border)'}`, borderRadius: 10, overflow: 'hidden' }}>
                      <button onClick={() => setFaseAberta(aberta ? null : s.n)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '10px 13px', background: 'transparent', textAlign: 'left' }}>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, flex: '0 0 28px', color: agora ? 'var(--gold)' : 'var(--ink)' }}>S{s.n}</span>
                        <span style={{ flex: 1, fontSize: 12.5, color: 'var(--ink-soft)' }}>{s.label}</span>
                        {agora && <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#fff', background: 'var(--terracotta)', borderRadius: 10, padding: '1px 7px' }}>agora</span>}
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 700, color: completa ? 'var(--green)' : 'var(--faint)' }}>{completa ? '✓' : `${feitos}/3`}</span>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--faint)' }}>{aberta ? '▴' : '▾'}</span>
                      </button>
                      {aberta && (
                        <div style={{ padding: '0 13px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {dias.map(([k, txt]) => {
                            const on = !!checks[`${s.n}-${k}`]
                            return (
                              <div key={k} onClick={() => togglePlanoCheck(`${s.n}-${k}`)} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', padding: '4px 0' }}>
                                <span style={{ width: 22, height: 22, borderRadius: 6, flex: '0 0 auto', border: `2px solid ${on ? 'var(--green)' : 'var(--border)'}`, background: on ? 'var(--green)' : '#fff', color: '#fff', fontSize: 12, display: 'grid', placeItems: 'center', marginTop: 1 }}>{on ? '✓' : ''}</span>
                                <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--terracotta)', flex: '0 0 26px', paddingTop: 3 }}>{DIAS.find(d => d[0] === k)[1]}</span>
                                <span style={{ flex: 1, fontSize: 12.5, lineHeight: 1.45, color: on ? 'var(--faint)' : 'var(--ink-soft)', textDecoration: on ? 'line-through' : 'none' }}>{txt}</span>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* zonas (referência) */}
      <div>
        <SectionLabel>Zonas · FC é o árbitro</SectionLabel>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          {CORRIDA.zonas.map((z, i) => (
            <div key={z.zona} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderTop: i ? '1px solid #F0E8DB' : 'none' }}>
              <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600 }}>{z.zona}</span>
              <Mono size={12} color="var(--ink-soft)">{z.pace}</Mono>
              <Mono size={11.5} color="var(--terracotta)" style={{ flex: '0 0 64px', textAlign: 'right' }}>{z.fc}</Mono>
            </div>
          ))}
        </div>
      </div>

      {/* fases + marcos */}
      <div>
        <SectionLabel>As três fases</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CORRIDA.fases.map((f, i) => {
            const on = store.marcos[i]
            return (
              <div key={f.n} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 15 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <Mono size={11} color="var(--terracotta)">{f.n} · {f.dur}</Mono>
                  <span style={{ flex: 1 }} />
                  <button onClick={() => toggleMarco(i)} style={{ fontFamily: 'var(--mono)', fontSize: 10, border: `1px solid ${on ? 'var(--green)' : 'var(--gold)'}`, color: on ? 'var(--green)' : 'var(--gold)', background: 'transparent', borderRadius: 14, padding: '3px 9px' }}>{on ? 'Desbloqueado' : 'Em progresso'}</button>
                </div>
                <Serif size={18} style={{ marginBottom: 5 }}>{f.nome}</Serif>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 9 }}>{f.goal}</div>
                <div style={{ fontSize: 12, background: 'var(--sand)', borderRadius: 8, padding: '8px 10px', lineHeight: 1.45 }}>
                  <b style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--gold)', letterSpacing: '.06em' }}>MARCO · </b>{f.marco}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* princípios */}
      <div>
        <SectionLabel>Princípios do plano</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {CORRIDA.principios.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 9, fontSize: 13, lineHeight: 1.5, color: 'var(--ink-soft)' }}>
              <span style={{ color: 'var(--gold)', flex: '0 0 auto' }}>—</span>{p}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
