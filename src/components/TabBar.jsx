const TABS = [
  ['painel', 'Painel'],
  ['treinos', 'Treinos'],
  ['corrida', 'Corrida'],
  ['progresso', 'Progresso'],
  ['saber', 'Saber'],
]

export default function TabBar({ tab, onChange }) {
  return (
    <div style={{
      position: 'sticky', bottom: 0, zIndex: 30,
      background: 'rgba(251,247,240,.96)', backdropFilter: 'blur(10px)',
      borderTop: '1px solid var(--border)', display: 'flex',
      padding: '2px 6px calc(4px + env(safe-area-inset-bottom))',
    }}>
      {TABS.map(([key, label]) => {
        const active = tab === key
        return (
          <button key={key} onClick={() => onChange(key)} style={{
            flex: 1, background: 'transparent', padding: '9px 2px 10px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.03em',
            color: active ? 'var(--ink)' : '#a89e92',
          }}>
            <span style={{ width: 18, height: 3, borderRadius: 2, background: active ? 'var(--terracotta)' : 'transparent' }} />
            {label}
          </button>
        )
      })}
    </div>
  )
}
