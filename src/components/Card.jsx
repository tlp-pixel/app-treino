export default function Card({ children, style = {}, color }) {
  return (
    <div style={{
      background: color || '#fff',
      borderRadius: 'var(--radius)',
      padding: '16px 18px',
      boxShadow: 'var(--shadow)',
      ...style,
    }}>
      {children}
    </div>
  )
}
