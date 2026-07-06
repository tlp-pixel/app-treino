# Backup no Google Sheets — "Fonte da Verdade"

O app salva tudo no navegador e manda uma cópia pra uma planilha do Google.
Serve pra: (1) você ler teus registros numa tabela legível — **uma linha por
série** (data / treino / exercício / série / peso); (2) **recuperar** se o
navegador perder os dados.

> ⚠️ O formato mudou de novo (peso por série + checklist da corrida + treinos
> editáveis). Cola o código novo abaixo e **reimplanta** (mesma URL).

## 1. Abrir o Apps Script

Planilha **Treinos Thali** → **Extensões → Apps Script**. As abas (`sessoes`,
`plano`, `marcos`, `_backup`) são criadas sozinhas.

## 2. Colar o código

Apaga tudo e cola:

```javascript
const SHEETS = {
  sessoes: ['Data', 'Treino', 'Exercício', 'Prioridade', 'Série', 'Peso', 'Reps', 'RPE', 'Nota'],
  plano:   ['Semana', 'Dia'],
  marcos:  ['Fase', 'Desbloqueado'],
};
const FASES = ['Fase 1 — Base Aeróbica', 'Fase 2 — Construção de Velocidade', 'Fase 3 — Volume e Resistência'];

function sheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}
function reescrever_(name, header, rows) {
  const sh = sheet_(name);
  sh.clear();
  sh.appendRow(header);
  if (rows.length) sh.getRange(2, 1, rows.length, header.length).setValues(rows);
}

function doPost(e) {
  try {
    const store = (JSON.parse(e.postData.contents).store) || {};

    // 1) Backup bruto (recuperação perfeita) numa aba escondida.
    sheet_('_backup').getRange(1, 1).setValue(JSON.stringify(store));

    // 2) Sessões — uma linha por série.
    const linhas = [];
    (store.history || []).forEach(function (h) {
      (h.registros || []).forEach(function (r) {
        if (r.kind === 'peso' && Array.isArray(r.series) && r.series.length) {
          r.series.forEach(function (s, i) {
            const peso = (s && typeof s === 'object')
              ? ('E ' + (s.e || '–') + ' / D ' + (s.d || '–'))
              : (s || '');
            linhas.push([h.data, h.nome, r.nome, r.prio, 'Série ' + (i + 1), peso, r.reps || '', r.rpe || '', r.nota || '']);
          });
        } else {
          linhas.push([h.data, h.nome, r.nome, r.prio, '—', r.medida || '', r.reps || '', r.rpe || '', r.nota || '']);
        }
      });
    });
    reescrever_('sessoes', SHEETS.sessoes, linhas);

    // 3) Plano de corrida — treinos marcados.
    const checks = store.planoChecks || {};
    const plano = Object.keys(checks).filter(function (k) { return checks[k]; }).map(function (k) {
      const p = k.split('-');
      return ['Semana ' + p[0], (p[1] || '').toUpperCase()];
    });
    reescrever_('plano', SHEETS.plano, plano);

    // 4) Marcos.
    const marcos = (store.marcos || []).map(function (m, i) {
      return [FASES[i] || ('Fase ' + (i + 1)), m ? 'sim' : 'não'];
    });
    reescrever_('marcos', SHEETS.marcos, marcos);

    return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput('ERRO: ' + err.message).setMimeType(ContentService.MimeType.TEXT);
  }
}

// GET .../exec?action=getAll → devolve o store pra recuperação.
function doGet(e) {
  try {
    if (e.parameter.action !== 'getAll') return ContentService.createTextOutput('OK');
    const raw = sheet_('_backup').getRange(1, 1).getValue();
    const store = raw ? JSON.parse(raw) : {};
    return ContentService
      .createTextOutput(JSON.stringify({
        history: store.history || [], runs: store.runs || [],
        marcos: store.marcos || [false, false, false], prev: store.prev || {},
        planoChecks: store.planoChecks || {}, customBlocks: store.customBlocks || {},
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput('ERRO: ' + err.message).setMimeType(ContentService.MimeType.TEXT);
  }
}
```

## 3. Reimplantar (mesma URL!)

A URL já está no app. **Não crie implantação nova** — edita a existente:

1. **Implantar → Gerenciar implantações**
2. Lápis (editar) na implantação atual
3. **Versão → Nova versão** → **Implantar**

Pronto. Cada sessão salva vira linhas por série na aba `sessoes`, os treinos de
corrida marcados vão pra `plano`, e o app recupera tudo do `_backup` se o
armazenamento local sumir.
