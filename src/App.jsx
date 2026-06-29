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
  const [tab, setTab] = useState('painel')
  const [activeBlock, setActiveBlock] = useState(null)
  const [retro, setRetro] = useState(null) // { iso, label } | null

  const inSession = tab === 'treinos' && !!activeBlock
  const blocoObj = activeBlock ? BLOCOS.find(b => b.id === activeBlock) : null

  const nav = {
    go: (t) => { setTab(t); setActiveBlock(null) },
    openBlock: (id) => { setTab('treinos'); setActiveBlock(id) },
    closeSession: () => setActiveBlock(null),
    startRetro: (r) => { setRetro(r); setTab('treinos'); setActiveBlock(null) },
    cancelRetro: () => setRetro(null),
    retro,
  }

  const title = inSession ? blocoObj.nome : TITULOS[tab]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 480, minHeight: '100vh', background: 'var(--surface)', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 0 80px rgba(42,38,34,.10)' }}>
        <TopBar title={title} streak={streak} inSession={inSession} onBack={nav.closeSession} />
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
