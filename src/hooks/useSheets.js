// Integração com Google Sheets via Apps Script Web App
// Configure SHEETS_URL em src/config.js após seguir o guia de setup

import { SHEETS_URL } from '../config.js'

export async function pushToSheets(treino) {
  if (!SHEETS_URL) return { ok: false, reason: 'not_configured' }
  try {
    const res = await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(treino),
    })
    const text = await res.text()
    return { ok: text.includes('OK'), raw: text }
  } catch (e) {
    return { ok: false, reason: e.message }
  }
}

export async function fetchFromSheets() {
  if (!SHEETS_URL) return null
  try {
    const res = await fetch(SHEETS_URL + '?action=getAll')
    return await res.json()
  } catch { return null }
}
