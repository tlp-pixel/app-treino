import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

// `to` é a URL completa de busca do TikTok (montada em treinoData).
// O app do TikTok no celular nem sempre abre direto na busca (depende do
// universal link), então mantemos um botão de copiar o termo como garantia.
export default function TiktokLink({ to }) {
  const [copied, setCopied] = useState(false)
  let termo = ''
  try { termo = decodeURIComponent(new URL(to).searchParams.get('q') || '') } catch { /* ignora */ }

  const copy = async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(termo)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch { /* clipboard indisponível */ }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 12 }}>
      <a href={to} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--terracotta)',
        textDecoration: 'none', border: '1px solid var(--terracotta)', borderRadius: 20, padding: '6px 13px',
      }}>▶ Ver no TikTok ↗</a>
      <button onClick={copy} title="Copiar termo de busca" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 30, height: 30, borderRadius: 20, background: 'transparent',
        border: '1px solid var(--border)', color: copied ? 'var(--green)' : 'var(--faint)', flexShrink: 0,
      }}>
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  )
}
