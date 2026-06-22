const TYPE_COLORS = {
  corrida:  { bg: 'var(--mint)',    text: '#2a6648' },
  pilates:  { bg: 'var(--lavender)',text: '#4a3a6e' },
  academia: { bg: 'var(--peach)',   text: '#6e4a2a' },
}

export default function Tag({ type }) {
  const c = TYPE_COLORS[type] || { bg: 'var(--gray-200)', text: 'var(--gray-600)' }
  const labels = { corrida: '🏃 Corrida', pilates: '🧘 Pilates', academia: '🏋️ Academia' }
  return (
    <span style={{
      background: c.bg,
      color: c.text,
      borderRadius: 20,
      padding: '3px 10px',
      fontSize: 12,
      fontWeight: 600,
    }}>
      {labels[type] || type}
    </span>
  )
}
