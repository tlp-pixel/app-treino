# Configurando Google Sheets como banco de dados

## 1. Criar a planilha

1. Acesse [sheets.google.com](https://sheets.google.com)
2. Crie uma nova planilha chamada **"Treinos Thali"**
3. As abas (`corrida`, `pilates`, `academia`, `mobilidade`) são criadas automaticamente pelo script na primeira vez que cada tipo de treino for salvo — não precisa criar manualmente.

## 2. Criar o Apps Script

1. Na planilha, vá em **Extensões → Apps Script**
2. Apague todo o código que aparecer e cole este:

```javascript
// Rótulos dos exercícios do Treino ABC, usados só para deixar a aba "academia" legível.
const EXERCICIOS = {
  a1: 'Ponte glútea com barra', a2: 'Deadlift romeno', a3: 'Agachamento búlgaro',
  a4: 'Abdução cabo em pé — glúteo médio', a5: 'Stiff unilateral', a6: 'Leg curl deitado',
  a7: 'Dead bug — finalização',
  b1: 'Agachamento livre', b2: 'Leg press 45°', b3: 'Agachamento sumô com haltere',
  b4: 'Afundo caminhando', b5: 'Cadeira extensora', b6: 'Panturrilha em pé',
  b7: 'Prancha com respiração',
  c1: 'Remada curvada com barra', c2: 'Face pull com corda', c3: 'Puxada (lat pulldown) — pegada média',
  c4: 'Desenvolvimento com halteres', c5: 'Rosca direta', c6: 'Tríceps corda',
  c7: 'Band pull-apart — finalização',
};
const TREINO_LABEL = { a: 'A — Glúteos', b: 'B — Quadríceps', c: 'C — Superior' };

const HEADERS = {
  corrida: ['id', 'createdAt', 'date', 'tipo', 'zona', 'distancia', 'pace', 'fc',
    'distAquec', 'distDesaquec', 'numTiros', 'distTiro', 'paceTiro', 'recuperacao',
    'distPrincipal', 'paceInicial', 'paceFinal', 'paceAlvo', 'bateuMarco', 'sensacao', 'obs'],
  pilates: ['id', 'createdAt', 'date', 'presenca', 'checks', 'foco', 'evolucoes', 'sensacao'],
  academia: ['id', 'createdAt', 'date', 'treino', 'exercicio_id', 'exercicio', 'feito',
    'serie1', 'serie2', 'serie3', 'serie4', 'sensacao', 'obs'],
  mobilidade: ['id', 'createdAt', 'date', 'feitos', 'obs'],
};

function getSheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(HEADERS[name]);
  }
  return sheet;
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const d = data.data || {};

    if (data.type === 'corrida') {
      getSheet_('corrida').appendRow([
        data.id, data.createdAt, data.date, d.tipo, d.zona, d.distancia, d.pace, d.fc,
        d.distAquec, d.distDesaquec, d.numTiros, d.distTiro, d.paceTiro, d.recuperacao,
        d.distPrincipal, d.paceInicial, d.paceFinal, d.paceAlvo, d.bateuMarco, d.sensacao, d.obs,
      ]);
    } else if (data.type === 'pilates') {
      getSheet_('pilates').appendRow([
        data.id, data.createdAt, data.date, d.presenca, (d.checks || []).join(', '), d.foco, d.evolucoes, d.sensacao,
      ]);
    } else if (data.type === 'academia') {
      const sheet = getSheet_('academia');
      const treinoLabel = TREINO_LABEL[d.treino] || d.treino;
      const series = d.series || {};
      const feitos = d.feitos || [];
      // Remove linhas antigas desse mesmo registro (caso seja uma edição) antes de reescrever.
      removeRowsById_(sheet, data.id);
      Object.keys(series).forEach(function (exId) {
        const pesos = series[exId] || [];
        sheet.appendRow([
          data.id, data.createdAt, data.date, treinoLabel, exId, EXERCICIOS[exId] || exId,
          feitos.indexOf(exId) > -1 ? 'sim' : 'não',
          pesos[0] || '', pesos[1] || '', pesos[2] || '', pesos[3] || '',
          d.sensacao, d.obs,
        ]);
      });
    } else if (data.type === 'mobilidade') {
      getSheet_('mobilidade').appendRow([
        data.id, data.createdAt, data.date, (d.feitos || []).join(', '), d.obs,
      ]);
    }

    // Se for edição de um treino que não seja academia, substitui a linha antiga em vez de duplicar.
    if (data.type !== 'academia') {
      dedupeKeepLast_(getSheet_(data.type), data.id);
    }

    return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput('ERRO: ' + err.message);
  }
}

function removeRowsById_(sheet, id) {
  const values = sheet.getDataRange().getValues();
  for (let i = values.length - 1; i >= 1; i--) {
    if (String(values[i][0]) === String(id)) sheet.deleteRow(i + 1);
  }
}

function dedupeKeepLast_(sheet, id) {
  const values = sheet.getDataRange().getValues();
  const rowsWithId = [];
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(id)) rowsWithId.push(i + 1);
  }
  // Mantém só a última linha adicionada (a que acabou de ser inserida), remove as anteriores.
  for (let i = 0; i < rowsWithId.length - 1; i++) sheet.deleteRow(rowsWithId[i]);
}

// GET .../exec?action=getAll — devolve todos os treinos reconstruídos no formato do app,
// usado para restaurar dados caso o armazenamento local do navegador seja perdido.
function doGet(e) {
  try {
    if (e.parameter.action !== 'getAll') {
      return ContentService.createTextOutput('OK');
    }
    const treinos = [];

    readSheetRows_('corrida').forEach(function (r) {
      treinos.push({
        id: r.id, date: r.date, type: 'corrida', createdAt: r.createdAt,
        data: {
          tipo: r.tipo, zona: r.zona, distancia: r.distancia, pace: r.pace, fc: r.fc,
          distAquec: r.distAquec, distDesaquec: r.distDesaquec, numTiros: r.numTiros,
          distTiro: r.distTiro, paceTiro: r.paceTiro, recuperacao: r.recuperacao,
          distPrincipal: r.distPrincipal, paceInicial: r.paceInicial, paceFinal: r.paceFinal,
          paceAlvo: r.paceAlvo, bateuMarco: r.bateuMarco, sensacao: r.sensacao, obs: r.obs,
        },
      });
    });

    readSheetRows_('pilates').forEach(function (r) {
      treinos.push({
        id: r.id, date: r.date, type: 'pilates', createdAt: r.createdAt,
        data: {
          presenca: r.presenca,
          checks: r.checks ? String(r.checks).split(',').map(function (s) { return s.trim(); }).filter(Boolean) : [],
          foco: r.foco, evolucoes: r.evolucoes, sensacao: r.sensacao,
        },
      });
    });

    readSheetRows_('mobilidade').forEach(function (r) {
      treinos.push({
        id: r.id, date: r.date, type: 'mobilidade', createdAt: r.createdAt,
        data: {
          feitos: r.feitos ? String(r.feitos).split(',').map(function (s) { return s.trim(); }).filter(Boolean) : [],
          obs: r.obs,
        },
      });
    });

    // Academia: várias linhas (uma por exercício) compartilham o mesmo id — agrupa de volta.
    const academiaById = {};
    readSheetRows_('academia').forEach(function (r) {
      if (!academiaById[r.id]) {
        const treinoKey = Object.keys(TREINO_LABEL).find(function (k) { return TREINO_LABEL[k] === r.treino; }) || r.treino;
        academiaById[r.id] = {
          id: r.id, date: r.date, type: 'academia', createdAt: r.createdAt,
          data: { treino: treinoKey, series: {}, feitos: [], sensacao: r.sensacao, obs: r.obs },
        };
      }
      const entry = academiaById[r.id];
      entry.data.series[r.exercicio_id] = [r.serie1, r.serie2, r.serie3, r.serie4];
      if (r.feito === 'sim') entry.data.feitos.push(r.exercicio_id);
    });
    Object.keys(academiaById).forEach(function (id) { treinos.push(academiaById[id]); });

    return ContentService.createTextOutput(JSON.stringify({ treinos: treinos })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput('ERRO: ' + err.message).setMimeType(ContentService.MimeType.TEXT);
  }
}

function readSheetRows_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(name);
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0];
  return values.slice(1).map(function (row) {
    const obj = {};
    headers.forEach(function (h, i) { obj[h] = row[i]; });
    return obj;
  });
}
```

## 3. Publicar como Web App

Se você já tinha implantado antes, **não crie uma implantação nova** — isso geraria uma URL diferente e quebraria o app. Em vez disso:

1. No editor do Apps Script, clique em **Implantar → Gerenciar implantações**
2. Clique no ícone de lápis (editar) na implantação existente
3. Em **Versão**, escolha **Nova versão**
4. Clique em **Implantar**

Se for a primeira vez:

1. Clique em **Implantar → Nova implantação**
2. Tipo: **App da Web**
3. Execute como: **Eu (seu email)**
4. Quem tem acesso: **Qualquer pessoa**
5. Clique em **Implantar** → autorize → copie a URL

## 4. Colocar a URL no app

1. Abra o arquivo `src/config.js`
2. Cole a URL na variável `SHEETS_URL`:
   ```js
   export const SHEETS_URL = 'https://script.google.com/macros/s/SEU_ID_AQUI/exec'
   ```
3. Salve e faça o deploy novamente

## Por que isso importa

Esse script faz duas coisas:

- **Salva** cada treino na aba certa, com uma linha por exercício na aba de academia (`data / treino / exercício / série 1 / peso...`), do jeito que faz sentido pra ler na planilha.
- **Permite restaurar**: o app busca `?action=getAll` toda vez que abre e devolve pro armazenamento local qualquer treino que esteja na planilha mas tenha desaparecido do navegador — protege contra perda de dados (ex: o iPhone limpando dados de sites que ficam alguns dias sem ser abertos).

Pronto! A partir daí, cada treino salvo no app vai também para a planilha automaticamente, e funciona como backup de verdade.
