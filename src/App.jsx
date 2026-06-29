import { useState } from 'react'
import { TreinoProvider, useTreino } from './store/TreinoContext.jsx'
import { BLOCOS } from './data/treinoData.js'
import TopBar from './components/TopBar.jsx'
import TabBar from './components/TabBar.jsx'
import Painel from './pages/Painel.jsx'
import Treinos from './pages/Treinos.jsx'
import Sessao from './pages/Sessao.jsx'
import Corrida from './pages/Corrida.jsx'
import Progresso from './pages/Progresso.jsx'
import Saber from './pages/Saber.jsx'

const TITULOS = { painel: 'Painel', treinos: 'Treinos', corrida: 'Corrida', progresso: 'Progresso', saber: 'Saber' }

function Shell() {
  const { streak } = useTreino()
  // navegação por estado + pilha de histórico (pra ter "voltar" em qualquer tela)
  const [view, setView] = useState({ tab: 'painel', activeBlock: null, retro: null })
  const [hist, setHist] = useState([])
  const { tab, activeBlock, retro } = view

  const inSession = tab === 'treinos' && !!activeBlock
  const blocoObj = activeBlock ? BLOCOS.find(b => b.id === activeBlock) : null

  // navega empilhando a tela atual no histórico (ignora no-op)
  const go = (patch) => {
    const next = { tab: view.tab, activeBlock: null, retro: null, ...patch }
    if (next.tab === view.tab && next.activeBlock === view.activeBlock && next.retro === view.retro) return
    setHist(h => [...h, view])
    setView(next)
  }
  const back = () => {
    if (!hist.length) return
    setView(hist[hist.length - 1])
    setHist(hist.slice(0, -1))
  }

  const nav = {
    go: (t) => go({ tab: t }),
    openBlock: (id) => go({ tab: 'treinos', activeBlock: id }),
    closeSession: back,
    startRetro: (r) => go({ tab: 'treinos', retro: r }),
    cancelRetro: () => setView(v => ({ ...v, retro: null })),
    retro,
  }

  const title = inSession ? blocoObj.nome : TITULOS[tab]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 480, minHeight: '100vh', background: 'var(--surface)', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 0 80px rgba(42,38,34,.10)' }}>
        <TopBar title={title} streak={streak} canBack={hist.length > 0} onBack={back} />
        <div className="scrl" style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '0 0 92px' }}>
          {tab === 'painel' && <Painel nav={nav} />}
          {tab === 'treinos' && !inSession && <Treinos nav={nav} />}
          {tab === 'treinos' && inSession && <Sessao bloco={blocoObj} nav={nav} />}
          {tab === 'corrida' && <Corrida nav={nav} />}
          {tab === 'progresso' && <Progresso nav={nav} />}
          {tab === 'saber' && <Saber nav={nav} />}
        </div>
        <TabBar tab={tab} onChange={nav.go} />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <TreinoProvider unidade="kg">
      <Shell />
    </TreinoProvider>
  )
}
