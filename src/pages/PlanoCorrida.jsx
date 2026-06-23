import { useState, useMemo } from 'react'
import { FASES, getSemanaAtual, getTreinoHoje, TOTAL_SEMANAS } from '../data/planoCorrida.js'
import Card from '../components/Card.jsx'

const STORAGE_KEY = 'plano_corrida_feitos'

function getFeitos() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}
function saveFeitos(f) { localStorage.setItem(STORAGE_KEY, JSON.stringify(f)) }

const TIPO_COLORS = {
  'Corrida leve':     { bg: 'var(--mint)',     text: '#2a6648' },
  'Intervalos':       { bg: 'var(--pink)',      text: '#c0556e' },
  'Intervalos 1km':   { bg: 'var(--pink)',      text: '#c0556e' },
  'Tempo run':        { bg: 'var(--peach)',     text: '#6e4a2a' },
  'Progressiva':      { bg: 'var(--peach)',     text: '#6e4a2a' },
  'Corrida longa':    { bg: 'var(--lavender)',  text: '#4a3a6e' },
  '🔓 TESTE DE MARCO':{ bg: '#FFF3CD',         text: '#856404' },
  '🏆 TESTE FINAL':   { bg: '#D4EDDA',         text: '#155724' },
}

function TreinoChip({ tipo }) {
  const c = TIPO_COLORS[tipo] || { bg: 'var(--gray-100)', text: 'var(--gray-600)' }
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: c.bg, color: c.text, whiteSpace: 'nowrap' }}>
      {tipo}
    </span>
  )
}

function SemanaCard({ semana, expanded, onToggle, feitos, onToggleFeito, isCurrent }) {
  const dias = [
    { key: `${semana.n}-ter`, dia: 'Ter', ...semana.ter },
    { key: `${semana.n}-qui`, dia: 'Qui', ...semana.qui },
    { key: `${semana.n}-sab`, dia: 'Sáb', ...semana.sab },
  ]
  const done = dias.filter(d => feitos[d.key]).length

  const tipoColor = semana.tipo === 'DESCARGA' ? 'var(--sky)' : semana.tipo === 'TESTE' ? '#FFF3CD' : isCurrent ? 'var(--mint)' : '#fff'

  return (
    <div style={{
      borderRadius: 14, marginBottom: 10, overflow: 'hidden',
      border: `2px solid ${isCurrent ? 'var(--mint-dark)' : 'var(--gray-200)'}`,
      boxShadow: isCurrent ? '0 4px 16px rgba(100,200,150,0.15)' : 'none',
    }}>
      <div onClick={onToggle} style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px',
        background: tipoColor, cursor: 'pointer',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>Semana {semana.n}</span>
            {isCurrent && <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--mint-dark)', background: '#fff', padding: '2px 8px', borderRadius: 20 }}>AGORA</span>}
            {semana.tipo && <span style={{ fontSize: 10, fontWeight: 700, color: semana.tipo === 'DESCARGA' ? '#2a5080' : '#856404' }}>{semana.tipo}</span>}
          </div>
          <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{semana.label}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: done === 3 ? 'var(--mint-dark)' : 'var(--gray-400)', fontWeight: 700 }}>{done}/3</span>
          <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {expanded && (
        <div style={{ background: '#fff' }}>
          {dias.map(({ key, dia, tipo, detalhe }) => (
            <div key={key} style={{
              display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px',
              borderTop: '1px solid var(--gray-100)',
              opacity: feitos[key] ? 0.5 : 1,
            }}>
              <button onClick={() => onToggleFeito(key)} style={{
                width: 22, height: 22, borderRadius: '50%', border: '2px solid',
                borderColor: feitos[key] ? 'var(--mint-dark)' : 'var(--gray-300)',
                background: feitos[key] ? 'var(--mint-dark)' : 'transparent',
                flexShrink: 0, color: '#fff', fontSize: 11, fontWeight: 700, marginTop: 2,
              }}>{feitos[key] ? '✓' : ''}</button>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: 'var(--peach-dark)', width: 28 }}>{dia}</span>
                  <TreinoChip tipo={tipo} />
                </div>
                <p style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.5, textDecoration: feitos[key] ? 'line-through' : 'none' }}>{detalhe}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PlanoCorrida() {
  const [feitos, setFeitos] = useState(getFeitos)
  const [expandedSemana, setExpandedSemana] = useState(null)
  const [faseAberta, setFaseAberta] = useState(1)

  const atual = useMemo(() => getSemanaAtual(), [])

  const toggleFeito = (key) => {
    setFeitos(prev => {
      const next = { ...prev, [key]: !prev[key] }
      saveFeitos(next)
      return next
    })
  }

  const toggleSemana = (n) => setExpandedSemana(prev => prev === n ? null : n)

  const treinoHoje = atual ? getTreinoHoje(atual.semana) : null
  const semanaGlobal = atual?.semanaGlobal || 1

  // Progresso geral
  const totalFeitos = Object.values(feitos).filter(Boolean).length
  const totalTreinos = TOTAL_SEMANAS * 3
  const pctGeral = Math.round((totalFeitos / totalTreinos) * 100)

  // Fase ativa baseada na semana atual
  const faseAtual = atual?.fase || FASES[0]

  return (
    <div style={{ padding: '24px 16px 100px' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Plano de Corrida</h2>
      <p style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 20 }}>10k e 15k até dezembro · 26 semanas</p>

      {/* Semana atual + treino hoje */}
      {atual ? (
        <>
          <Card color="var(--mint)" style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--mint-dark)', letterSpacing: '0.08em' }}>VOCÊ ESTÁ NA</p>
                <p style={{ fontSize: 18, fontWeight: 700, color: '#1a4a30', marginTop: 2 }}>Semana {semanaGlobal} · {atual.fase.label.replace('Fase ', 'F').split('—')[0].trim()}</p>
                <p style={{ fontSize: 12, color: '#2a6648', marginTop: 2 }}>{atual.semana.label}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 28, fontWeight: 800, color: 'var(--mint-dark)' }}>{semanaGlobal}</p>
                <p style={{ fontSize: 10, color: '#2a6648' }}>de {TOTAL_SEMANAS}</p>
              </div>
            </div>
            {/* Barra de progresso geral */}
            <div style={{ marginTop: 12 }}>
              <div style={{ height: 6, background: 'rgba(0,0,0,0.1)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 3, background: 'var(--mint-dark)', width: `${((semanaGlobal-1)/TOTAL_SEMANAS)*100}%` }} />
              </div>
              <p style={{ fontSize: 11, color: '#2a6648', marginTop: 4 }}>{Math.round(((semanaGlobal-1)/TOTAL_SEMANAS)*100)}% do plano completo</p>
            </div>
          </Card>

          {/* Treino hoje */}
          {treinoHoje ? (
            <Card color="var(--peach)" style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--peach-dark)', letterSpacing: '0.08em', marginBottom: 6 }}>TREINO DE HOJE</p>
              <TreinoChip tipo={treinoHoje.tipo} />
              <p style={{ fontSize: 14, color: '#5a3a1a', marginTop: 8, lineHeight: 1.6 }}>{treinoHoje.detalhe}</p>
            </Card>
          ) : (
            <Card style={{ marginBottom: 12, background: 'var(--gray-100)' }}>
              <p style={{ fontSize: 13, color: 'var(--gray-400)', textAlign: 'center' }}>Hoje não tem corrida no plano 🛌</p>
            </Card>
          )}

          {/* Próximo marco */}
          <Card color="#FFF3CD" style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#856404', letterSpacing: '0.08em', marginBottom: 6 }}>PRÓXIMO MARCO</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#533F03' }}>{faseAtual.marco.desc}</p>
            <p style={{ fontSize: 12, color: '#856404', marginTop: 4 }}>📅 {faseAtual.marco.data}</p>
            <div style={{ marginTop: 10, height: 6, background: 'rgba(0,0,0,0.1)', borderRadius: 3, overflow: 'hidden' }}>
              {(() => {
                const faseSemanas = faseAtual.semanas
                const faseStart = faseSemanas[0].n
                const faseEnd = faseSemanas[faseSemanas.length-1].n
                const pct = Math.min(100, ((semanaGlobal - faseStart) / (faseEnd - faseStart + 1)) * 100)
                return <div style={{ height: '100%', borderRadius: 3, background: '#856404', width: `${pct}%` }} />
              })()}
            </div>
            <p style={{ fontSize: 11, color: '#856404', marginTop: 4 }}>
              Semana {semanaGlobal} de {faseAtual.semanas[faseAtual.semanas.length-1].n} na fase atual
            </p>
          </Card>
        </>
      ) : (
        <Card color="var(--mint)" style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#1a4a30' }}>🏆 Plano concluído!</p>
          <p style={{ fontSize: 13, color: '#2a6648', marginTop: 4 }}>Você completou as 26 semanas. Incrível!</p>
        </Card>
      )}

      {/* Semanas por fase */}
      {FASES.map(fase => (
        <div key={fase.id} style={{ marginBottom: 8 }}>
          <button onClick={() => setFaseAberta(f => f === fase.id ? null : fase.id)} style={{
            width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 16px', borderRadius: 14, marginBottom: 8,
            background: faseAtual?.id === fase.id ? 'var(--mint)' : 'var(--gray-100)',
            border: `2px solid ${faseAtual?.id === fase.id ? 'var(--mint-dark)' : 'var(--gray-200)'}`,
          }}>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontWeight: 700, fontSize: 15 }}>{fase.label}</p>
              <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>{fase.periodo} · {fase.objetivo}</p>
            </div>
            <span style={{ fontSize: 12, color: 'var(--gray-400)', marginLeft: 8 }}>{faseAberta === fase.id ? '▲' : '▼'}</span>
          </button>

          {faseAberta === fase.id && fase.semanas.map(semana => (
            <SemanaCard
              key={semana.n}
              semana={semana}
              expanded={expandedSemana === semana.n}
              onToggle={() => toggleSemana(semana.n)}
              feitos={feitos}
              onToggleFeito={toggleFeito}
              isCurrent={atual?.semanaGlobal === semana.n}
            />
          ))}
        </div>
      ))}

      {/* Princípios */}
      <Card style={{ marginTop: 16 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-400)', marginBottom: 10, letterSpacing: '0.08em' }}>PRINCÍPIOS DO PLANO</p>
        {[
          '📈 Progressão de 10% — volume nunca sobe mais que 10% por semana',
          '🔄 Descarga a cada 3 semanas — reduz 20–30% do volume',
          '⚡ Nunca dois dias pesados seguidos',
          '💓 FC é o árbitro — se passar do alvo, reduz o pace',
          '🎯 Zonas revisáveis a cada marco desbloqueado',
        ].map((p, i) => (
          <p key={i} style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 6, lineHeight: 1.5 }}>{p}</p>
        ))}
      </Card>
    </div>
  )
}
