# Backup no Google Sheets — "Fonte da Verdade"

O app salva tudo no navegador e, em paralelo, manda uma cópia pra uma planilha
do Google. Isso serve pra duas coisas:

1. **Você ler teus registros** numa tabela legível — uma linha por exercício,
   no formato data / treino / exercício / série / peso.
2. **Recuperar** se o navegador perder os dados (ex: iPhone limpando dados de
   sites que ficam dias sem abrir) — o app puxa de volta da planilha ao abrir.

> ⚠️ O modelo de dados mudou (RPE, carga por série, esq/dir, corridas, marcos).
> Cole o código novo abaixo e **reimplante** — sem isso, o backup não funciona.

## 1. Abrir o Apps Script

Na planilha **Treinos Thali** → menu **Extensões → Apps Script**. As abas
(`sessoes`, `corridas`, `marcos`, `_backup`) são criadas sozinhas — não precisa
montar nada à mão.

## 2. Colar o código

Apaga tudo que estiver lá e cola isto:

```javascript
const SHEETS = {
  sessoes:  ['Data', 'Treino', 'Exercício', 'Prioridade', 'Feito', 'Carga', 'Carga Esq', 'Carga Dir', 'Reps', 'RPE', 'Medida', 'Nota'],
  corridas: ['Data', 'Distância (km)', 'Tempo', 'Pace /km', 'FC média', 'Nota'],
  marcos:   ['Fase', 'Desbloqueado'],
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
    const body = JSON.parse(e.postData.contents);
    const store = body.store || {};

    // 1) Backup bruto (recuperação perfeita) — guardado numa aba escondida.
    const bk = sheet_('_backup');
    bk.clear();
    bk.getRange(1, 1).setValue(JSON.stringify(store));

    // 2) Aba legível de sessões — uma linha por exercício registrado.
    const linhas = [];
    (store.history || []).forEach(function (h) {
      (h.registros || []).forEach(function (r) {
        linhas.push([
          h.data, h.nome, r.nome, r.prio, r.feito === false ? 'não' : 'sim',
          r.carga || '', r.cargaEsq || '', r.cargaDir || '', r.reps || '',
          r.rpe || '', r.medida || '', r.nota || '',
        ]);
      });
    });
    reescrever_('sessoes', SHEETS.sessoes, linhas);

    // 3) Corridas.
    const corridas = (store.runs || []).map(function (r) {
      return [r.data, r.dist, r.tempo, r.pace, r.fc, r.nota || ''];
    });
    reescrever_('corridas', SHEETS.corridas, corridas);

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
    const bk = sheet_('_backup');
    const raw = bk.getRange(1, 1).getValue();
    const store = raw ? JSON.parse(raw) : {};
    return ContentService
      .createTextOutput(JSON.stringify({
        history: store.history || [], runs: store.runs || [],
        marcos: store.marcos || [false, false, false], prev: store.prev || {},
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput('ERRO: ' + err.message).setMimeType(ContentService.MimeType.TEXT);
  }
}
```

## 3. Reimplantar (manter a mesma URL!)

A URL já está configurada no app (`src/hooks/useSheets.js`). **Não crie uma nova
implantação** — isso geraria outra URL e quebraria o backup. Em vez disso:

1. **Implantar → Gerenciar implantações**
2. Clica no lápis (editar) na implantação que já existe
3. Em **Versão**, escolhe **Nova versão**
4. **Implantar**

Se for a primeiríssima vez (nunca implantou):

1. **Implantar → Nova implantação** → tipo **App da Web**
2. Executar como **Eu**, quem acessa **Qualquer pessoa**
3. **Implantar** → autoriza → copia a URL e cola em `SHEETS_URL` no
   `src/hooks/useSheets.js`.

Pronto. Cada sessão salva e cada corrida vão pra planilha automaticamente, e o
app recupera de lá se o armazenamento local sumir.
