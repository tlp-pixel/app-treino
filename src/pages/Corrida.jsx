import { useState } from 'react'
import { useTreino } from '../store/TreinoContext.jsx'
import { CORRIDA, semanaAtualCorrida } from '../data/treinoData.js'
import { SectionLabel, Mono, Serif } from '../components/ui.jsx'

const EMPTY = { dist: '', tempo: '', pace: '', fc: '', nota: '' }

function DarkField({ label, value, onChange, placeholder, inputMode }) {
  return (
    <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 8.5, textTransform: 'uppercase', color: '#b3a99d', letterSpacing: '.06em' }}>{label}</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} inputMode={inputMode}
        style={{ border: '1px solid #4a443c', background: '#34302a', color: 'var(--surface)', borderRadius: 8, padding: '8px 9px', fontFamily: 'var(--mono)', fontSize: 13, width: '100%' }} />
    </label>
  )
}

export default function Corrida() {
  const { store, addRun, toggleMarco } = useTreino()
  const atual = semanaAtualCorrida()
  const [form, setForm] = useState(EMPTY)
  const [strava, setStrava] = useState(false)
  const [faseAberta, setFaseAberta] = useState(atual.n) // semana de hoje já abre expandida
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const onAdd = () => { addRun(form); setForm(EMPTY); setStrava(false) }

  return (
    <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{CORRIDA.desc}</p>

      {/* registrar */}
      <div style={{ background: 'var(--ink)', color: 'var(--surface)', borderRadius: 16, padding: 18 }}>
        <Mono size={10.5} color="var(--peach)" style={{ letterSpacing: '.12em', textTransform: 'uppercase' }}>Registrar corrida</Mono>
        <div style={{ display: 'flex', gap: 8, margin: '13px 0 9px' }}>
          <DarkField label="Distância km" value={form.dist} onChange={set('dist')} placeholder="6.0" inputMode="decimal" />
          <DarkField label="Tempo" value={form.tempo} onChange={set('tempo')} placeholder="42:00" />
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 11 }}>
          <DarkField label="Pace /km" value={form.pace} onChange={set('pace')} placeholder="6:45" />
          <DarkField label="FC média" value={form.fc} onChange={set('fc')} placeholder="155" inputMode="numeric" />
        </div>
        <input value={form.nota} onChange={e => set('nota')(e.target.value)} placeholder="Como foi? (pé esq, QL, pace…)"
          style={{ width: '100%', border: '1px solid #4a443c', background: '#34302a', color: 'var(--surface)', borderRadius: 8, padding: '8px 9px', fontSize: 13, marginBottom: 12 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onAdd} style={{ flex: 1, background: 'var(--terracotta)', color: '#fff', borderRadius: 20, padding: 10, fontFamily: 'var(--mono)', fontSize: 12 }}>Salvar corrida</button>
          <button onClick={() => setStrava(true)} style={{ background: 'transparent', border: '1px solid #5b544c', color: 'var(--surface)', borderRadius: 20, padding: '10px 14px', fontFamily: 'var(--mono)', fontSize: 12 }}>Conectar Strava</button>
        </div>
        {strava && <div style={{ marginTop: 9, fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--peach)' }}>Integração Strava entra numa próxima versão (importa distância, pace e FC automaticamente).</div>}
      </div>

      {/* últimas corridas */}
      <div>
        <SectionLabel>Últimas corridas</SectionLabel>
        {store.runs.length === 0 ? (
          <div style={{ background: '#fff', border: '1px dashed var(--border)', borderRadius: 12, padding: 16, fontSize: 13, color: 'var(--faint)', textAlign: 'center' }}>Nenhuma corrida registrada ainda.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {store.runs.map(r => (
              <div key={r.id} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '13px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: r.nota ? 5 : 0 }}>
                  <Serif size={19} weight={600}>{r.dist} km</Serif>
                  <Mono size={11}>{r.pace}/km · {r.fc} bpm</Mono>
                  <span style={{ flex: 1 }} />
                  <Mono size={10.5} color="var(--faint)">{r.data}</Mono>
                </div>
                {r.nota && <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.45 }}>{r.nota}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* zonas */}
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

      {/* fases */}
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

      {/* plano detalhado 26 semanas */}
      <div>
        <SectionLabel>Plano detalhado · 26 semanas</SectionLabel>
        <div style={{ background: 'var(--ink)', color: 'var(--surface)', borderRadius: 12, padding: '12px 15px', marginBottom: 10 }}>
          <Mono size={10} color="var(--peach)" style={{ letterSpacing: '.1em', textTransform: 'uppercase' }}>Você está na</Mono>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
            <Serif size={20} color="var(--surface)">Semana {atual.n}</Serif>
            <Mono size={11} color="#C9C0B5">de 26 · {atual.fase}</Mono>
          </div>
          <div style={{ height: 5, background: 'rgba(255,255,255,.15)', borderRadius: 3, overflow: 'hidden', marginTop: 9 }}>
            <div style={{ height: '100%', width: `${Math.round(atual.n / 26 * 100)}%`, background: 'var(--terracotta)', borderRadius: 3 }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CORRIDA.plano26.map(fase => (
            <div key={fase.fase}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--gold)', letterSpacing: '.04em', textTransform: 'uppercase', margin: '6px 0 6px 2px' }}>{fase.fase}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {fase.semanas.map(s => {
                  const aberta = faseAberta === s.n
                  const agora = s.n === atual.n
                  return (
                    <div key={s.n} style={{ background: agora ? 'var(--sand)' : '#fff', border: `1px solid ${agora ? 'var(--gold)' : 'var(--border)'}`, borderRadius: 10, overflow: 'hidden' }}>
                      <button onClick={() => setFaseAberta(aberta ? null : s.n)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '10px 13px', background: 'transparent', textAlign: 'left' }}>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, flex: '0 0 28px', color: agora ? 'var(--gold)' : 'var(--ink)' }}>S{s.n}</span>
                        <span style={{ flex: 1, fontSize: 12.5, color: 'var(--ink-soft)' }}>{s.label}</span>
                        {agora && <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#fff', background: 'var(--terracotta)', borderRadius: 10, padding: '1px 7px' }}>agora</span>}
                        {s.tipo && <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: s.tipo === 'Teste' ? 'var(--terracotta)' : 'var(--blue)', border: `1px solid ${s.tipo === 'Teste' ? 'var(--terracotta)' : 'var(--blue)'}`, borderRadius: 10, padding: '1px 7px' }}>{s.tipo}</span>}
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--faint)' }}>{aberta ? '▴' : '▾'}</span>
                      </button>
                      {aberta && (
                        <div style={{ padding: '0 13px 12px', display: 'flex', flexDirection: 'column', gap: 7 }}>
                          {[['Ter', s.ter], ['Qui', s.qui], ['Sáb', s.sab]].map(([d, txt]) => (
                            <div key={d} style={{ display: 'flex', gap: 9, fontSize: 12.5, lineHeight: 1.45 }}>
                              <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--terracotta)', flex: '0 0 26px', paddingTop: 1 }}>{d}</span>
                              <span style={{ color: 'var(--ink-soft)' }}>{txt}</span>
                            </div>
                          ))}
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
