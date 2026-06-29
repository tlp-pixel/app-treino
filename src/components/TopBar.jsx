export default function TopBar({ title, streak, canBack, onBack }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: 'rgba(251,247,240,.93)', backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border)', padding: '13px 18px 11px',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      {canBack && (
        <button onClick={onBack} style={{
          border: '1px solid var(--border)', background: '#fff', color: 'var(--ink)',
          width: 34, height: 34, borderRadius: 10, fontSize: 17, lineHeight: 1, flex: '0 0 auto',
        }}>‹</button>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--terracotta)' }}>
          Fonte da Verdade
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 21, fontWeight: 500, letterSpacing: '-.01em', lineHeight: 1.15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {title}
        </div>
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', textAlign: 'right', flex: '0 0 auto' }}>
        <span style={{ color: 'var(--terracotta)', fontWeight: 700 }}>{streak}</span> dias
      </div>
    </div>
  )
}
