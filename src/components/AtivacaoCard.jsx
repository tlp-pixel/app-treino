import { useState } from 'react'

// Card expansível para itens de pré-ativação/mobilidade: checkbox + explicação
// de como fazer e por quê, no mesmo estilo dos exercícios do Treino ABC.
export default function AtivacaoCard({ item, checked, onToggle, extra }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      background: checked ? 'var(--gray-100)' : '#fff',
      borderRadius: 12, marginBottom: 8,
      border: '2px solid var(--gray-200)',
      opacity: checked ? 0.6 : 1,
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', cursor: 'pointer' }}
        onClick={() => setOpen(o => !o)}>
        <button onClick={e => { e.stopPropagation(); onToggle() }} style={{
          width: 22, height: 22, borderRadius: '50%', border: '2px solid',
          borderColor: checked ? 'var(--peach-dark)' : 'var(--gray-300)',
          background: checked ? 'var(--peach-dark)' : 'transparent',
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 11, fontWeight: 700,
        }}>{checked ? '✓' : ''}</button>
        <span style={{ flex: 1, fontWeight: 600, fontSize: 13, textDecoration: checked ? 'line-through' : 'none' }}>
          {item.label}
        </span>
        {extra}
        <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div style={{ padding: '0 16px 12px 50px', borderTop: '1px solid var(--gray-100)' }}>
          {item.como && (
            <p style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 10, lineHeight: 1.6 }}>
              <span style={{ fontWeight: 600, color: 'var(--gray-800)' }}>Como fazer: </span>{item.como}
            </p>
          )}
          {item.porq && (
            <p style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 6, lineHeight: 1.6 }}>
              <span style={{ fontWeight: 600, color: 'var(--gray-800)' }}>Por quê: </span>{item.porq}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
