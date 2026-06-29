import { useState } from 'react'
import { useTreino } from '../store/TreinoContext.jsx'
import { BLOCOS, CORRIDA, CADEIA, TRIAGEM } from '../data/treinoData.js'
import { SectionLabel, Mono, Serif, Card } from '../components/ui.jsx'

const DIAS_L = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export default function Painel({ nav }) {
  const { store, streak, totalSessoes, runsCount } = useTreino()
  const [tri, setTri] = useState(null)

  const now = new Date()
  const wbIdx = (now.getDay() + 6) % 7 // semana_base é Seg-first
  const todayRow = CORRIDA.semana_base[wbIdx]
  const todayTxt = todayRow.treino
  const isRunDay = todayRow.run
  const gymBlock = todayRow.block

  // tocar num dia vai direto pro ponto: treino → sessão; corrida → aba corrida; senão → rotina diária
  const destino = (w) => () => w.block ? nav.openBlock(w.block) : w.run ? nav.go('corrida') : nav.openBlock('diaria')

  let primaryLabel, primaryAction, secondaryLabel, secondaryAction, todaySub
  if (isRunDay) {
    primaryLabel = 'Registrar corrida'; primaryAction = () => nav.go('corrida')
    secondaryLabel = 'Ativação pré-corrida'; secondaryAction = () => nav.openBlock('ativacoes')
    todaySub = 'A ativação pré-corrida (glúteo médio + arco esquerdo) é P0 — é o que impede o QL de compensar.'
  } else if (gymBlock) {
    primaryLabel = 'Abrir treino'; primaryAction = () => nav.openBlock(gymBlock)
    secondaryLabel = 'Ativação pré-treino'; secondaryAction = () => nav.openBlock('ativacoes')
    todaySub = 'Faz a ativação primeiro — acorda o glúteo médio antes de carregar.'
  } else {
    primaryLabel = 'Rotina diária'; primaryAction = () => nav.openBlock('diaria')
    secondaryLabel = 'Ver treinos'; secondaryAction = () => nav.go('treinos')
    todaySub = 'Dia leve. A rotina postural diária mantém a cadeia esquerda sob controle, independente de treino.'
  }

  // fase de corrida em progresso = primeiro marco não desbloqueado
  const fi = store.marcos.findIndex(m => !m)
  const faseAtual = CORRIDA.fases[fi < 0 ? 2 : fi]

  const p0List = BLOCOS.find(b => b.id === 'ativacoes').exercicios.filter(e => e.prio === 'P0')

  const selTri = TRIAGEM.find(t => t.min === tri)

  return (
    <div style={{ padding: '18px 18px 4px', display: 'flex', flexDirection: 'column', gap: 18 }}>

      {/* card de hoje */}
      <div style={{ background: 'var(--ink)', color: 'var(--surface)', borderRadius: 18, padding: 20 }}>
        <Mono size={10.5} color="var(--peach)" style={{ letterSpacing: '.14em', textTransform: 'uppercase' }}>{DIAS_L[now.getDay()]} · hoje</Mono>
        <Serif size={24} color="var(--surface)" style={{ margin: '6px 0 8px' }}>{todayTxt}</Serif>
        <div style={{ fontSize: 13.5, color: '#C9C0B5', lineHeight: 1.5 }}>{todaySub}</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
          <button onClick={primaryAction} style={{ background: 'var(--terracotta)', color: '#fff', borderRadius: 22, padding: '9px 16px', fontFamily: 'var(--mono)', fontSize: 12 }}>{primaryLabel}</button>
          <button onClick={secondaryAction} style={{ background: 'transparent', color: 'var(--surface)', border: '1px solid #5b544c', borderRadius: 22, padding: '9px 16px', fontFamily: 'var(--mono)', fontSize: 12 }}>{secondaryLabel}</button>
        </div>
      </div>

      {/* triagem por minuto */}
      <div>
        <SectionLabel>Sem tempo? Triagem por minuto</SectionLabel>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {TRIAGEM.map(t => {
            const on = tri === t.min
            return (
              <button key={t.min} onClick={() => setTri(on ? null : t.min)} style={{
                fontFamily: 'var(--mono)', fontSize: 12, padding: '7px 13px', borderRadius: 20,
                border: `1px solid ${on ? 'var(--ink)' : 'var(--border)'}`,
                background: on ? 'var(--ink)' : '#fff', color: on ? 'var(--surface)' : 'var(--muted)',
              }}>{t.t}</button>
            )
          })}
        </div>
        {selTri && (
          <div style={{ marginTop: 11, background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '13px 15px', fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-soft)' }}>
            {selTri.d}
          </div>
        )}
      </div>

      {/* semana-base */}
      <div>
        <SectionLabel>Semana-base</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {CORRIDA.semana_base.map((w, i) => {
            const hoje = i === wbIdx
            return (
              <div key={w.dia} onClick={destino(w)} style={{
                display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                background: hoje ? 'var(--ink)' : '#fff', border: '1px solid var(--border)',
                borderLeft: `3px solid ${hoje ? 'var(--terracotta)' : (w.g ? 'var(--gold)' : 'var(--border)')}`,
                borderRadius: 10, padding: '9px 12px',
              }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, flex: '0 0 34px', color: hoje ? 'var(--peach)' : (w.g ? 'var(--gold)' : 'var(--faint)') }}>{w.dia}</span>
                <span style={{ flex: 1, fontSize: 13, lineHeight: 1.35, color: hoje ? 'var(--surface)' : 'var(--ink-soft)' }}>{w.treino}</span>
                <span style={{ fontSize: 13, color: hoje ? 'var(--peach)' : 'var(--faint)' }}>›</span>
              </div>
            )
          })}
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--faint)', marginTop: 8, lineHeight: 1.5 }}>Regra · {CORRIDA.regra_flex}</div>
      </div>

      {/* fase de corrida */}
      <Card>
        <Mono size={10.5} color="var(--gold)" style={{ letterSpacing: '.06em' }}>{faseAtual.n} · em progresso</Mono>
        <Serif size={19} style={{ margin: '4px 0' }}>{faseAtual.nome}</Serif>
        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 11 }}>{faseAtual.goal}</div>
        <div style={{ fontSize: 12.5, background: 'var(--sand)', borderRadius: 9, padding: '9px 11px', lineHeight: 1.45 }}>
          <b style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--gold)', display: 'block', marginBottom: 2, letterSpacing: '.06em' }}>DESBLOQUEIO</b>
          {faseAtual.marco}
        </div>
        <button onClick={() => nav.go('corrida')} style={{ marginTop: 12, background: 'transparent', color: 'var(--terracotta)', fontFamily: 'var(--mono)', fontSize: 12, padding: 0 }}>Ver plano de corrida ›</button>
      </Card>

      {/* inegociável P0 */}
      <div style={{ background: 'var(--rose-bg)', border: '1px solid var(--rose-bd)', borderRadius: 14, padding: 17 }}>
        <SectionLabel color="var(--terracotta)" style={{ marginBottom: 10 }}>Inegociável hoje · P0</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {p0List.map(p => (
            <div key={p.id} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 13, lineHeight: 1.4, color: 'var(--ink-soft)' }}>
              <span style={{ color: 'var(--terracotta)', fontWeight: 700 }}>·</span>{p.nome}
            </div>
          ))}
        </div>
        <button onClick={() => nav.openBlock('ativacoes')} style={{ marginTop: 12, background: 'var(--terracotta)', color: '#fff', borderRadius: 20, padding: '8px 14px', fontFamily: 'var(--mono)', fontSize: 11.5 }}>Abrir ativações</button>
      </div>

      {/* cadeia teaser */}
      <Card onClick={() => nav.go('saber')}>
        <SectionLabel style={{ marginBottom: 7 }}>Por que tudo isso?</SectionLabel>
        <Serif size={18} style={{ marginBottom: 6 }}>{CADEIA.titulo}</Serif>
        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{CADEIA.sub.split('. ')[0]}.</div>
        <div style={{ marginTop: 9, fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--terracotta)' }}>Entender o porquê ›</div>
      </Card>

      {/* stats */}
      <div style={{ display: 'flex', gap: 9 }}>
        {[[streak, 'streak'], [totalSessoes, 'sessões'], [runsCount, 'corridas']].map(([n, l]) => (
          <div key={l} style={{ flex: 1, background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 13, textAlign: 'center' }}>
            <Serif size={26} weight={600}>{n}</Serif>
            <Mono size={9.5} color="var(--faint)" style={{ textTransform: 'uppercase', letterSpacing: '.06em' }}>{l}</Mono>
          </div>
        ))}
      </div>
    </div>
  )
}
