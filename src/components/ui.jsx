// Primitivos visuais compartilhados — refletem os padrões repetidos do mockup.

// Rótulo em Space Mono, caixa alta, espaçado (cabeçalho de seção).
export function SectionLabel({ children, color = 'var(--faint)', style }) {
  return (
    <div style={{
      fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '.1em',
      textTransform: 'uppercase', color, marginBottom: 9, ...style,
    }}>{children}</div>
  )
}

// Texto curto em Space Mono.
export function Mono({ children, size = 12, color = 'var(--muted)', weight = 400, style }) {
  return (
    <span style={{ fontFamily: 'var(--mono)', fontSize: size, color, fontWeight: weight, ...style }}>
      {children}
    </span>
  )
}

// Título serifado (Fraunces).
export function Serif({ children, size = 20, weight = 500, color = 'var(--ink)', style }) {
  return (
    <div style={{ fontFamily: 'var(--serif)', fontSize: size, fontWeight: weight, color, lineHeight: 1.15, ...style }}>
      {children}
    </div>
  )
}

// Card branco padrão.
export function Card({ children, style, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14,
      padding: 17, ...(onClick ? { cursor: 'pointer' } : null), ...style,
    }}>{children}</div>
  )
}

// Input estilo mockup (claro). Use dark para os campos sobre fundo escuro.
export function Field({ label, value, onChange, placeholder, dark, inputMode, style }) {
  return (
    <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, ...style }}>
      {label && (
        <span style={{ fontFamily: 'var(--mono)', fontSize: 8.5, letterSpacing: '.06em', textTransform: 'uppercase', color: dark ? '#b3a99d' : 'var(--faint)' }}>
          {label}
        </span>
      )}
      <input
        value={value} onChange={onChange} placeholder={placeholder} inputMode={inputMode}
        style={{
          border: dark ? '1px solid #4a443c' : '1px solid var(--border)',
          background: dark ? '#34302a' : '#fff', color: dark ? 'var(--surface)' : 'var(--ink)',
          borderRadius: 8, padding: '8px 9px', fontFamily: 'var(--mono)', fontSize: 13, width: '100%',
        }}
      />
    </label>
  )
}
