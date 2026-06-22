import { NavLink } from 'react-router-dom'
import { Home, PlusCircle, Calendar, TrendingUp } from 'lucide-react'

const links = [
  { to: '/',          icon: Home,        label: 'Início'   },
  { to: '/registrar', icon: PlusCircle,  label: 'Registrar'},
  { to: '/historico', icon: Calendar,    label: 'Histórico'},
  { to: '/progresso', icon: TrendingUp,  label: 'Progresso'},
]

export default function BottomNav() {
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#fff',
      borderTop: '1px solid var(--gray-200)',
      display: 'flex',
      paddingBottom: 'env(safe-area-inset-bottom)',
      zIndex: 100,
    }}>
      {links.map(({ to, icon: Icon, label }) => (
        <NavLink key={to} to={to} end={to === '/'} style={({ isActive }) => ({
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          padding: '10px 0 8px',
          color: isActive ? 'var(--pink-dark)' : 'var(--gray-400)',
          textDecoration: 'none',
          fontSize: 10,
          fontWeight: 500,
          transition: 'color 0.2s',
        })}>
          <Icon size={22} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
