# Configurando Google Sheets como banco de dados

## 1. Criar a planilha

1. Acesse [sheets.google.com](https://sheets.google.com)
2. Crie uma nova planilha chamada **"Treinos Thali"**
3. Renomeie a primeira aba para `corrida`, crie mais duas: `pilates`, `academia`
4. Na aba **corrida**, coloque na linha 1:
   `id | date | distancia | pace | zona | fc | sensacao | obs`
5. Na aba **pilates**:
   `id | date | presenca | checks | foco | evolucoes`
6. Na aba **academia**:
   `id | date | grupo | exercicios | sensacao | obs`

## 2. Criar o Apps Script

1. Na planilha, vá em **Extensões → Apps Script**
2. Apague o código que aparecer e cole este:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(data.type) || ss.insertSheet(data.type);
    const d = data.data || {};

    if (data.type === 'corrida') {
      sheet.appendRow([data.id, data.date, d.distancia, d.pace, d.zona, d.fc, d.sensacao, d.obs]);
    } else if (data.type === 'pilates') {
      sheet.appendRow([data.id, data.date, d.presenca, (d.checks||[]).join(','), d.foco, d.evolucoes]);
    } else if (data.type === 'academia') {
      const exs = (d.exercicios||[]).map(e => `${e.nome} ${e.series}x${e.reps} ${e.carga}kg`).join(' | ');
      sheet.appendRow([data.id, data.date, d.grupo, exs, d.sensacao, d.obs]);
    }

    return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
  } catch(err) {
    return ContentService.createTextOutput('ERRO: ' + err.message);
  }
}
```

## 3. Publicar como Web App

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

Pronto! A partir daí, cada treino salvo no app vai também para a planilha automaticamente.
