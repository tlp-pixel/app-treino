import { HashRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Registrar from './pages/Registrar.jsx'
import Historico from './pages/Historico.jsx'
import Progresso from './pages/Progresso.jsx'

export default function App() {
  return (
    <HashRouter>
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100dvh', background: 'var(--cream)', position: 'relative' }}>
        <Routes>
          <Route path="/"          element={<Dashboard />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/progresso" element={<Progresso />} />
        </Routes>
        <BottomNav />
      </div>
    </HashRouter>
  )
}
