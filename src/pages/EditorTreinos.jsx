import { useState, useEffect } from 'react'
import { useTreino } from '../store/TreinoContext.jsx'
import { blocoParaMD } from '../data/treinoData.js'
import { SectionLabel, Mono } from '../components/ui.jsx'

const ABAS = [['treinoA', 'A — Glúteos'], ['treinoB', 'B — Quadríceps'], ['treinoC', 'C — Superior']]

const EXEMPLO = `| Exercício | Séries | Reps | Por quê | Como |
|---|---|---|---|---|
| Ponte glútea com barra | 4 | 12 | fortalece o glúteo máximo | sobe empurrando o calcanhar, trava o glúteo no topo |
| Deadlift romeno | 4 | 10 | cadeia posterior | quadril pra trás, lombar neutra |`

export default function EditorTreinos() {
  const { getBloco, store, setCustomBlock, resetCustomBlock } = useTreino()
  const [id, setId] = useState('treinoA')
  const [md, setMd] = useState('')
  const [msg, setMsg] = useState('')

  // pré-preenche com o treino atual (custom se houver) ao trocar de aba
  useEffect(() => { setMd(blocoParaMD(getBloco(id))); setMsg('') }, [id]) // eslint-disable-line

  const custom = !!(store.customBlocks && store.customBlocks[id])
  const salvar = () => { setCustomBlock(id, md); setMsg('✓ Treino salvo.') }
  const voltarPadrao = () => { resetCustomBlock(id); setMd(blocoParaMD(getBloco(id))); setMsg('Voltou pro treino padrão.') }

  return (
    <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
        Cola ou edita a tabela markdown de cada treino. Uma linha por exercício, colunas:
        <b> Exercício · Séries · Reps · Por quê · Como</b>. Ao salvar, vira a fonte dos exercícios daquele treino — e o log passa a pedir o peso de cada série.
      </p>

      {/* seletor A/B/C */}
      <div style={{ display: 'flex', gap: 8 }}>
        {ABAS.map(([k, label]) => {
          const on = id === k
          return (
            <button key={k} onClick={() => setId(k)} style={{
              flex: 1, padding: '9px 6px', borderRadius: 12, border: `2px solid ${on ? 'var(--terracotta)' : 'var(--border)'}`,
              background: on ? 'var(--terracotta)' : '#fff', color: on ? '#fff' : 'var(--muted)',
              fontFamily: 'var(--mono)', fontSize: 12, fontWeight: on ? 700 : 400,
            }}>{label.split(' ')[0]}</button>
          )
        })}
      </div>
      <Mono size={11} color="var(--faint)">{ABAS.find(a => a[0] === id)[1]}{custom ? ' · personalizado' : ' · padrão'}</Mono>

      <textarea value={md} onChange={e => { setMd(e.target.value); setMsg('') }} spellCheck={false}
        style={{ width: '100%', minHeight: 260, border: '1px solid var(--border)', borderRadius: 12, padding: '12px 13px', fontFamily: 'var(--mono)', fontSize: 12.5, lineHeight: 1.5, background: '#fff', resize: 'vertical' }} />

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={salvar} style={{ flex: 1, background: 'var(--ink)', color: 'var(--surface)', borderRadius: 20, padding: 12, fontFamily: 'var(--mono)', fontSize: 12 }}>Salvar treino</button>
        {custom && <button onClick={voltarPadrao} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', borderRadius: 20, padding: '12px 14px', fontFamily: 'var(--mono)', fontSize: 12 }}>Voltar ao padrão</button>}
      </div>
      {msg && <Mono size={11} color="var(--green)">{msg}</Mono>}

      {/* exemplo */}
      <div>
        <SectionLabel>Exemplo de formato</SectionLabel>
        <pre style={{ background: '#FDFAF4', border: '1px dashed var(--border)', borderRadius: 10, padding: '11px 12px', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', overflowX: 'auto', lineHeight: 1.5, margin: 0, whiteSpace: 'pre' }}>{EXEMPLO}</pre>
        <Mono size={10.5} color="var(--faint)" style={{ display: 'block', marginTop: 8, lineHeight: 1.5 }}>
          Dica: o cabeçalho e a linha de traços são opcionais. "Por quê" e "Como" aparecem ao expandir o exercício no treino.
        </Mono>
      </div>
    </div>
  )
}
