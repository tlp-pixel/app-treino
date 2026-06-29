// Backup no Google Sheets via Apps Script Web App.
// O app envia o store inteiro; o Apps Script reescreve as abas legíveis
// (sessoes / corridas / marcos) — formato data / treino / exercício / série / peso.
// Guia e código do script: SETUP_SHEETS.md.

export const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxaiG8ui4a6FRG3EGeg7x439e47cJloil75xrbVx5K0Nst7_UkGQRXp8xEJvfNmHw0/exec'

// Envia o estado completo (fire-and-forget). O script reescreve as abas.
export async function syncToSheets(store) {
  if (!SHEETS_URL) return { ok: false, reason: 'not_configured' }
  try {
    const res = await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ type: 'sync', store }),
    })
    const text = await res.text()
    return { ok: text.includes('OK'), raw: text }
  } catch (e) {
    return { ok: false, reason: e.message }
  }
}

// Recupera o store reconstruído da planilha (usado quando o armazenamento
// local foi perdido — ex: iOS limpando dados do site).
export async function fetchStore() {
  if (!SHEETS_URL) return null
  try {
    const res = await fetch(SHEETS_URL + '?action=getAll')
    const json = await res.json()
    if (json && (Array.isArray(json.history) || Array.isArray(json.runs))) {
      return {
        cur: {}, prev: json.prev || {},
        runs: json.runs || [], history: json.history || [],
        marcos: json.marcos || [false, false, false],
      }
    }
    return null
  } catch { return null }
}
