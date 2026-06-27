import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

// O app do TikTok no celular nem sempre abre direto na busca (depende do
// universal link). Por isso o link tenta abrir a busca, e o botão de copiar
// garante um jeito que sempre funciona: cola o termo na busca do TikTok.
export default function TiktokLink({ query }) {
  const [copied, setCopied] = useState(false)

  const copy = async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(query)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch { /* clipboard indisponível, ignora */ }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
      <a
        href={`https://www.tiktok.com/search?q=${encodeURIComponent(query)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '5px 12px', borderRadius: 8,
          background: '#1a1a2e', color: '#fff',
          fontSize: 12, fontWeight: 600, textDecoration: 'none',
        }}
      >
        🎵 {query}
      </a>
      <button onClick={copy} title="Copiar termo de busca" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 28, height: 28, borderRadius: 8, background: 'var(--gray-100)',
        color: copied ? 'var(--mint-dark)' : 'var(--gray-400)', flexShrink: 0,
      }}>
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  )
}
