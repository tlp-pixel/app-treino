import Card from '../components/Card.jsx'

const POSTURAL = [
  { regiao: 'Cabeça',   achado: 'Protrusão +++ direita, ++ esquerda. Inclinação para direita' },
  { regiao: 'Ombros',   achado: 'Protrusão ++++ direito, ++ esquerdo. Rotação interna bilateral' },
  { regiao: 'Escápulas',achado: 'Depressão +++ direita. Abdução +++ direita. Tilt direito' },
  { regiao: 'Coluna',   achado: 'Hiperlordose cervical, hipercifose torácica, hiperlordose lombar. Escoliose em S à direita' },
  { regiao: 'Quadril',  achado: 'Anteversão pélvica bilateral. Inclinação inferior à esquerda. Rotação interna bilateral' },
  { regiao: 'Joelhos',  achado: 'Valgo bilateral (++ direito). Hiperextensão direita' },
  { regiao: 'Pés',      achado: 'Pronação +++ direita, ++++ esquerda' },
]

const ENCURTAMENTOS = [
  { estrutura: 'Iliopsoas',               grau: 'Imperativo', cor: '#e05555' },
  { estrutura: 'Peitoral',                grau: 'Severo', cor: '#e05555' },
  { estrutura: 'Panturrilha bilateral',   grau: 'Severo bilateral', cor: '#e05555' },
  { estrutura: 'Adutores',               grau: 'Severo', cor: '#e05555' },
  { estrutura: 'Reto femoral',           grau: 'Moderado', cor: '#d4904a' },
  { estrutura: 'Grande dorsal',          grau: 'Presente', cor: '#6aad7a' },
  { estrutura: 'Isquiotibiais',          grau: 'Tensão protetora', cor: '#6aad7a' },
]

const DORES = [
  { dor: 'Lombar esquerda / Quadrado Lombar', causa: 'Anteversão pélvica + assimetria pélvica', cor: '#e05555' },
  { dor: 'Cervical',                          causa: 'Cabeça anteriorizada +++ direita', cor: '#d4904a' },
  { dor: 'Romboide / entre escápulas',        causa: 'Escápulas abduzidas + peitoral severo', cor: '#d4904a' },
  { dor: 'Joelho (risco latente)',            causa: 'Pronação severa bilateral + valgo', cor: '#6a7aad' },
]

const ZONAS = [
  { zona: '🟢 Leve / Base', pace: '7:45–8:15/km', fc: '125–140 bpm' },
  { zona: '🟡 Ritmo',       pace: '6:40–7:00/km', fc: '145–158 bpm' },
  { zona: '🔴 Tiro',        pace: '5:50–6:10/km', fc: '160–170 bpm' },
  { zona: '🏁 Alvo 10k',    pace: '6:00–6:15/km', fc: '168–175 bpm' },
]

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', letterSpacing: '0.1em', marginBottom: 10, textTransform: 'uppercase' }}>{title}</p>
      {children}
    </div>
  )
}

export default function Perfil() {
  return (
    <div style={{ padding: '24px 16px 100px' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Meu Perfil</h2>
      <p style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 24 }}>Avaliação AGC Treinamento · fev/2025</p>

      {/* Diagnóstico */}
      <Section title="Diagnóstico clínico">
        <Card color="var(--pink)">
          <p style={{ fontWeight: 700, fontSize: 15, color: '#c0556e', marginBottom: 6 }}>Síndrome Cruzada Inferior (Lower Crossed — Janda)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['Tensão excessiva no septo posterior do quadril', 'Inibição de glúteo médio (causa de desnível pélvico na corrida)', 'Pronação severa bilateral causando sobrecarga em cadeia ascendente', 'Encurtamento severo de peitoral + escápulas abduzidas → cifose torácica', 'Cabeça anteriorizada +++ → compressão suboccipital → dor cervical'].map((item, i) => (
              <p key={i} style={{ fontSize: 13, color: '#9a3555' }}>· {item}</p>
            ))}
          </div>
        </Card>
      </Section>

      {/* Mapa de dores */}
      <Section title="Mapa de dores">
        <Card>
          {DORES.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: i < DORES.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: d.cor, flexShrink: 0, marginTop: 4 }} />
              <div>
                <p style={{ fontWeight: 600, fontSize: 14 }}>{d.dor}</p>
                <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>{d.causa}</p>
              </div>
            </div>
          ))}
        </Card>
      </Section>

      {/* Encurtamentos */}
      <Section title="Encurtamentos identificados">
        <Card>
          {ENCURTAMENTOS.map((e, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < ENCURTAMENTOS.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
              <p style={{ fontSize: 14 }}>{e.estrutura}</p>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: e.cor + '22', color: e.cor }}>{e.grau}</span>
            </div>
          ))}
        </Card>
      </Section>

      {/* Avaliação postural */}
      <Section title="Avaliação postural por região">
        <Card>
          {POSTURAL.map((p, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: i < POSTURAL.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', marginBottom: 3 }}>{p.regiao.toUpperCase()}</p>
              <p style={{ fontSize: 13 }}>{p.achado}</p>
            </div>
          ))}
        </Card>
      </Section>

      {/* Plano corrida */}
      <Section title="Plano de corrida — meta dezembro 2025">
        <Card color="var(--mint)" style={{ marginBottom: 10 }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: '#2a6648', marginBottom: 8 }}>🏁 Meta: 10k e 15k até dezembro</p>
          <p style={{ fontSize: 13, color: '#2a6648' }}>Fase 1 — Base Aeróbica (jun → ago)</p>
          <p style={{ fontSize: 12, color: '#4a8a68', marginTop: 4 }}>Marco: 8km sem parar a 6:30–6:45/km com FC {'<'} 170 bpm</p>
        </Card>
        <Card>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-400)', marginBottom: 10 }}>ZONAS DE TREINO (calibradas 21/06/2025)</p>
          {ZONAS.map((z, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < ZONAS.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
              <p style={{ fontSize: 14, fontWeight: 600 }}>{z.zona}</p>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 13, fontWeight: 600 }}>{z.pace}</p>
                <p style={{ fontSize: 11, color: 'var(--gray-400)' }}>{z.fc}</p>
              </div>
            </div>
          ))}
        </Card>
      </Section>

      {/* Rotina */}
      <Section title="Rotina semanal">
        <Card>
          {[['Seg','Pilates'], ['Ter','Pilates + Corrida leve'], ['Qua','Academia — Quadríceps'], ['Qui','Corrida (treino principal)'], ['Sex','Descanso ou Academia'], ['Sáb','Corrida longa + Academia Superiores'], ['Dom','Academia Glúteo / Descanso']].map(([dia, treino]) => (
            <div key={dia} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: dia !== 'Dom' ? '1px solid var(--gray-100)' : 'none' }}>
              <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: 'var(--peach-dark)', width: 32, flexShrink: 0 }}>{dia}</span>
              <span style={{ fontSize: 13 }}>{treino}</span>
            </div>
          ))}
        </Card>
      </Section>

      {/* Alerta tênis */}
      <Card color="var(--lavender)">
        <p style={{ fontWeight: 700, fontSize: 13, color: '#4a3a6e', marginBottom: 6 }}>⚠️ Alerta sobre tênis</p>
        <p style={{ fontSize: 13, color: '#6a5a8e', lineHeight: 1.6 }}>
          Pronação <strong>severa bilateral</strong> (esq ++++). Se o tênis atual não tem controle de pronação, cada km sobrecarrega joelho, quadril e lombar. Avaliar com especialista em biomecânica de corrida antes de aumentar volume.
        </p>
      </Card>
    </div>
  )
}
