// ============================================================================
// FONTE DA VERDADE — dados do app de treino da Thali
// Reconstrói o treino-data.js do protótipo. Conteúdo baseado na ficha postural
// AGC (fev/2025), no Treino ABC e no plano de corrida de 26 semanas.
// ============================================================================

// Cores por prioridade (badge + borda esquerda do card). P0 = corretivo
// inegociável, P1 = base de força, P2 = estrutural, P3 = complementar.
export const PRIO = {
  P0: { nome: 'Inegociável',   desc: 'O corretivo que conserta a cadeia. Faz mesmo nos dias curtos.',        cor: '#BC4A35', bg: '#F8EAE6' },
  P1: { nome: 'Base de força', desc: 'O composto principal do dia. É onde mora o ganho de força.',           cor: '#C2872E', bg: '#F8EFDF' },
  P2: { nome: 'Estrutural',    desc: 'Trabalho secundário — assimetria, unilateral, padrão de movimento.',   cor: '#5E7C97', bg: '#E8EEF3' },
  P3: { nome: 'Complementar',  desc: 'Isolado e acessório. Bom de ter; é o primeiro a cair se faltar tempo.', cor: '#6B635A', bg: '#F0E8DB' },
}

const tk = (q) => 'https://www.tiktok.com/search?q=' + encodeURIComponent(q)

// Stampa cor/bg a partir da prioridade pra simplificar os componentes.
function ex(o) {
  const p = PRIO[o.prio] || PRIO.P3
  return { kind: 'peso', lado: false, ...o, cor: p.cor, bg: p.bg, tiktok: o.tiktok ? tk(o.tiktok) : null }
}

// ---------------------------------------------------------------------------
// BLOCOS
// ---------------------------------------------------------------------------
export const BLOCOS = [
  {
    id: 'ativacoes',
    nome: 'Ativação',
    kicker: 'Pré-treino · pré-corrida',
    when: '10 min',
    desc: 'Dez minutos antes de carregar ou correr. Com pronação severa e glúteo médio inibido, entrar "frio" é risco real — isso acorda o que precisa estar ligado.',
    exercicios: [
      ex({ id: 'pa1', prio: 'P0', kind: 'medida', nome: 'Short foot — arco esquerdo', tag: 'Pronação', dose: '3×30s',
        como: 'Pé apoiado no chão. Sem dobrar os dedos, "encurta" o pé puxando a base do dedão na direção do calcanhar, levantando o arco. Segura.',
        atencao: 'Os dedos ficam relaxados — o movimento é só do arco. Foco no pé esquerdo (pronação ++++).',
        porque: 'Reativa o arco que desaba na pronação. É o primeiro elo da cadeia — sustentar aqui muda tudo acima.',
        tiktok: 'short foot exercise arch' }),
      ex({ id: 'pa2', prio: 'P0', kind: 'medida', lado: 'E/D', nome: 'Clamshell', tag: 'Glúteo médio', dose: '2×15',
        como: 'De lado, joelhos dobrados e colados. Abre o joelho de cima sem rodar o tronco pra trás, pés juntos.',
        atencao: 'Sente o lateral do glúteo queimar, não a lombar. Se sentir lombar, está compensando.',
        porque: 'Acende o glúteo médio antes de carregar peso — sem isso o quadril cai e o joelho fica vulnerável.',
        tiktok: 'clamshell glute medius' }),
      ex({ id: 'pa3', prio: 'P0', kind: 'medida', nome: 'Monster walk com elástico', tag: 'Glúteo médio', dose: '2×10/lado',
        como: 'Elástico nos tornozelos, semi-agachada. Passos largos pro lado mantendo a tensão constante no elástico.',
        atencao: 'Joelhos não colapsam pra dentro. Tensão o tempo todo.',
        porque: 'Ativa o glúteo médio no plano que importa pra corrida — o que segura a pelve no apoio de cada passo.',
        tiktok: 'monster walk band' }),
      ex({ id: 'pa4', prio: 'P0', kind: 'medida', lado: 'E/D', nome: 'Ponte unilateral', tag: 'Glúteo · padrão', dose: '2×10',
        como: 'Deitada, um pé apoiado, a outra perna estendida. Sobe o quadril com o glúteo de apoio, pausa 2s no topo.',
        atencao: 'Pelve nivelada — não deixa um lado cair.',
        porque: 'Prepara o padrão de extensão de quadril unilateral exigido no RDL e no stiff.',
        tiktok: 'single leg glute bridge' }),
      ex({ id: 'pa5', prio: 'P1', kind: 'medida', nome: 'Chin tuck', tag: 'Cervical', dose: '10×5s',
        como: 'Sentada ou em pé, empurra o queixo pra trás (como fazer papada), segura 5s. É retração, não flexão — não inclina a cabeça.',
        atencao: 'Movimento horizontal, sem olhar pra baixo.',
        porque: 'Combate a cabeça anteriorizada que comprime a cervical — alivia a dor de pescoço.',
        tiktok: 'chin tuck exercise' }),
    ],
  },
  {
    id: 'diaria',
    nome: 'Rotina diária',
    kicker: 'Postural · todo dia',
    when: '15 min',
    desc: 'A manutenção da cadeia esquerda, independente de treino. Mobilidade e alongamento dos encurtamentos da ficha — é o que impede o padrão de voltar.',
    exercicios: [
      ex({ id: 'd1', prio: 'P0', kind: 'medida', nome: 'Mobilidade torácica no rolo', tag: 'Torácica', dose: '2 min',
        como: 'Foam roller na altura das escápulas, braços cruzados no peito. Extensão sobre o rolo, segmento por segmento, do meio pra cima.',
        atencao: 'Não joga a lombar — o movimento é da torácica.',
        porque: 'A hipercifose torácica trava ombro, cervical e lombar ao mesmo tempo. É o ponto central do teu padrão.',
        tiktok: 'thoracic extension foam roller' }),
      ex({ id: 'd2', prio: 'P0', kind: 'medida', lado: 'E/D', nome: 'Hip flexor stretch ajoelhado — iliopsoas', tag: 'Iliopsoas', dose: '3 min',
        como: 'Um joelho no chão, outro pé à frente. Empurra o quadril pra frente mantendo a lombar neutra.',
        atencao: 'Não arqueia as costas — o alongamento vem do quadril, não da lombar.',
        porque: 'Encurtamento imperativo na ficha. Causa direta da anteversão pélvica e da dor lombar.',
        tiktok: 'kneeling hip flexor stretch' }),
      ex({ id: 'd3', prio: 'P0', kind: 'medida', lado: 'E/D', nome: 'Quadrado lombar lateral — foco esquerdo', tag: 'QL', dose: '2 min',
        como: 'Em pé, braço esquerdo acima da cabeça, inclinação lateral suave pra direita. Sente o estiramento no lateral do tronco esquerdo.',
        atencao: '90s no lado esquerdo, 60s no direito — é assimétrico de propósito.',
        porque: 'Tua dor principal relatada. O QL esquerdo está comprimido pela assimetria pélvica.',
        tiktok: 'quadratus lumborum stretch' }),
      ex({ id: 'd4', prio: 'P1', kind: 'medida', nome: 'Peitoral na parede', tag: 'Peitoral', dose: '2 min',
        como: 'Braço em L a 90° apoiado na parede, gira o tronco pra fora devagar. Sente o peitoral estirar, não o ombro.',
        atencao: 'Se dói na frente do ombro, diminui o ângulo.',
        porque: 'Peitoral severo + escápulas abduzidas = ombros enrolados e cifose.',
        tiktok: 'pec stretch wall' }),
      ex({ id: 'd5', prio: 'P1', kind: 'medida', nome: '90/90 — mobilidade de quadril', tag: 'Quadril', dose: '3 min',
        como: 'Sentada no chão com as pernas em 90/90 (uma à frente, uma ao lado). Inclina o tronco sobre cada perna, ereto.',
        atencao: 'Tronco não arredonda.',
        porque: 'Trabalha rotação interna e externa do quadril — exatamente o identificado bilateral na ficha.',
        tiktok: '90 90 hip mobility' }),
      ex({ id: 'd6', prio: 'P1', kind: 'medida', nome: 'Panturrilha no degrau', tag: 'Panturrilha', dose: '3 min',
        como: 'Pé na borda do degrau. (1) Joelho estendido — gastrocnêmio, 60s. (2) Joelho levemente dobrado — sóleo, 60s.',
        atencao: 'Desce o calcanhar com controle, sem balançar.',
        porque: 'Panturrilha severa bilateral piora a pronação, que piora joelho e lombar na corrida.',
        tiktok: 'calf stretch step' }),
      ex({ id: 'd7', prio: 'P1', kind: 'medida', nome: 'Suboccipital — base do crânio', tag: 'Cervical', dose: '1 min',
        como: 'Deitada de costas, joelhos dobrados. Faz o chin tuck e segura. Com as mãos, leve pressão na base do crânio pra baixo.',
        atencao: 'Pressão suave, sem forçar o pescoço.',
        porque: 'Cabeça anteriorizada comprime os suboccipitais — origem da tua dor cervical e de cabeça tensional.',
        tiktok: 'suboccipital release' }),
      ex({ id: 'd8', prio: 'P2', kind: 'medida', nome: 'Open book — rotação torácica', tag: 'Torácica', dose: '2 min',
        como: 'Deitada de lado, joelhos dobrados a 90°. O braço de cima abre pro outro lado seguindo os olhos. Segura 3s, volta.',
        atencao: 'Os joelhos ficam juntos no chão — a rotação é só de tronco.',
        porque: 'Trabalha romboide, rotação torácica e abertura do peitoral ao mesmo tempo.',
        tiktok: 'open book thoracic rotation' }),
    ],
  },
  {
    id: 'treinoA',
    nome: 'Treino A — Glúteos',
    kicker: 'Força · posterior',
    when: 'Sábado · ~60 min',
    desc: 'O dia do glúteo. Máximo pra força, médio pra estabilidade. É o treino que mais ataca a raiz da tua cadeia — o glúteo que não liga.',
    exercicios: [
      ex({ id: 'a1', prio: 'P1', nome: 'Ponte glútea com barra', tag: 'Glúteo máx', dose: '4×12', anterior: '45 kg · 12 reps',
        como: 'Barra na dobra do quadril, pés na largura do quadril. Sobe empurrando pelo calcanhar, trava o glúteo 2s no topo, desce com controle.',
        atencao: 'Retroversão da pelve antes de subir. Não hiperestende no topo — quem fecha é o glúteo, não a lombar.',
        porque: 'Principal exercício pra fortalecer o glúteo máximo, que está fraco e sobrecarregando a lombar.',
        tiktok: 'glute bridge barbell form' }),
      ex({ id: 'a2', prio: 'P1', nome: 'Deadlift romeno', tag: 'Cadeia post', dose: '4×10', anterior: '40 kg · 10 reps',
        como: 'Barra rente às pernas, joelhos levemente flexionados. Empurra o quadril pra trás até sentir o isquio esticar, volta fechando o glúteo.',
        atencao: 'Lombar neutra rigorosa — não força lordose. Ativa o core antes de pegar a barra.',
        porque: 'Fortalece a cadeia posterior e ensina a dobrar o quadril sem perder a lombar neutra — a postura que você usa correndo.',
        tiktok: 'romanian deadlift form' }),
      ex({ id: 'a3', prio: 'P2', lado: 'E/D', nome: 'Agachamento búlgaro', tag: 'Unilateral', dose: '3×10',
        como: 'Pé de trás no banco, tronco vertical. Desce reto, o joelho da frente sobre o 2º dedo, sobe pelo calcanhar da frente.',
        atencao: 'Começa pelo lado mais fraco. Não deixa o joelho cair pra dentro.',
        porque: 'Unilateral — corrige a assimetria entre as pernas e exige estabilidade de quadril.',
        tiktok: 'bulgarian split squat form' }),
      ex({ id: 'a4', prio: 'P0', lado: 'E/D', nome: 'Abdução no cabo em pé — glúteo médio', tag: 'Glúteo médio', dose: '3×15',
        como: 'Cabo no tornozelo, tronco firme. Abre a perna pro lado só com o quadril, sem inclinar o corpo. Controla na volta.',
        atencao: 'O movimento vem só do quadril lateral. Não inclina o tronco pra compensar amplitude.',
        porque: 'Isola o glúteo médio — o que impede o joelho de cair pra dentro ao correr. É P0 na tua cadeia.',
        tiktok: 'cable hip abduction' }),
      ex({ id: 'a5', prio: 'P2', lado: 'E/D', nome: 'Stiff unilateral', tag: 'Cadeia post', dose: '3×10',
        como: 'Em pé numa perna, desce o tronco mandando o quadril pra trás, a perna livre estende atrás. Volta fechando o glúteo.',
        atencao: 'Lombar neutra o tempo todo. Para quando sentir o isquio estirar.',
        porque: 'Reforça o lado mais fraco isolado, sem o lado dominante esconder a diferença.',
        tiktok: 'single leg stiff deadlift' }),
      ex({ id: 'a6', prio: 'P3', nome: 'Leg curl deitado', tag: 'Isquio', dose: '3×12',
        como: 'Deitada, calcanhares no apoio. Flexiona os joelhos trazendo o peso, segura 1s, desce devagar.',
        atencao: 'Sem compensar com a lombar. Pode ser unilateral.',
        porque: 'Fortalece os isquiotibiais, parte da cadeia posterior encurtada que puxa a pelve.',
        tiktok: 'lying leg curl form' }),
      ex({ id: 'a7', prio: 'P0', kind: 'medida', nome: 'Dead bug — finalização', tag: 'Core', dose: '3×8/lado',
        como: 'Deitada, braços e joelhos a 90°. Estende braço e perna opostos com a lombar colada no chão, volta. Alterna.',
        atencao: 'Se a lombar descolar do chão, reduz a amplitude.',
        porque: 'Fecha o treino estabilizando o core pra proteger a lombar nos próximos dias.',
        tiktok: 'dead bug exercise core' }),
    ],
  },
  {
    id: 'treinoB',
    nome: 'Treino B — Quadríceps',
    kicker: 'Força · pernas',
    when: 'Segunda · ~55 min',
    desc: 'O dia da perna inteira. Carga nos compostos, vigilância constante com o valgo — o joelho que cai pra dentro é a cadeia falando.',
    exercicios: [
      ex({ id: 'b1', prio: 'P1', nome: 'Agachamento livre', tag: 'Quadríceps', dose: '4×10', anterior: '30 kg · 10 reps',
        como: 'Barra nas costas, pés na largura dos ombros. Desce com o peito aberto até a coxa paralela, sobe empurrando o chão.',
        atencao: 'Lombar neutra — não força lordose. Joelhos acompanham os dedos, sem valgo.',
        porque: 'Base do treino de perna — fortalece tudo, com atenção pro joelho não cair pra dentro.',
        tiktok: 'squat form technique' }),
      ex({ id: 'b2', prio: 'P1', nome: 'Leg press 45°', tag: 'Quadríceps', dose: '4×12', anterior: '120 kg · 12 reps',
        como: 'Pés médio-altos na plataforma, largura do quadril. Desce até ~90°, empurra sem travar o joelho no fim.',
        atencao: 'Joelhos acompanham os dedos o tempo todo. Vigilância com valgo — especialmente o direito.',
        porque: 'Permite carga alta com menos exigência de equilíbrio — bom pra ganhar força com técnica.',
        tiktok: 'leg press 45 form' }),
      ex({ id: 'b3', prio: 'P2', nome: 'Agachamento sumô com haltere', tag: 'Adutores', dose: '3×12',
        como: 'Pés bem abertos, pontas pra fora, haltere entre as pernas. Desce mantendo o tronco ereto, sobe fechando o glúteo.',
        atencao: 'Joelhos abrem na linha das pontas dos pés.',
        porque: 'Trabalha os adutores encurtados e abre o quadril, ajudando a destravar a rotação interna.',
        tiktok: 'sumo squat dumbbell' }),
      ex({ id: 'b4', prio: 'P2', lado: 'E/D', nome: 'Afundo caminhando', tag: 'Unilateral', dose: '3×10',
        como: 'Passos longos alternando, descendo o joelho de trás em direção ao chão. Tronco ereto.',
        atencao: 'Joelho da frente não passa muito da ponta do pé. Expõe assimetria dir/esq.',
        porque: 'Unilateral — mostra e corrige a diferença de força entre as pernas.',
        tiktok: 'walking lunge form' }),
      ex({ id: 'b5', prio: 'P3', nome: 'Cadeira extensora', tag: 'VMO', dose: '3×15',
        como: 'Sentada, tornozelos no apoio. Estende até quase travar, segura 1s no topo, desce devagar.',
        atencao: 'Se o joelho desvia pra dentro, a carga está alta demais.',
        porque: 'Isola o quadríceps, em especial o VMO que estabiliza o joelho.',
        tiktok: 'leg extension form' }),
      ex({ id: 'b6', prio: 'P3', nome: 'Panturrilha em pé', tag: 'Panturrilha', dose: '4×15',
        como: 'Em pé, ponta dos pés num degrau. Sobe o máximo, segura 1s, desce até sentir o alongamento.',
        atencao: 'Amplitude completa — é encurtamento severo bilateral.',
        porque: 'A panturrilha está encurtada nos dois lados — fortalecer em amplitude solta e melhora a pronação.',
        tiktok: 'calf raise standing form' }),
      ex({ id: 'b7', prio: 'P0', kind: 'medida', nome: 'Prancha com respiração', tag: 'Core', dose: '3×25s',
        como: 'Apoio nos antebraços, corpo em linha reta. Respira normalmente mantendo o core firme e a lombar neutra.',
        atencao: 'Não prende o ar. O quadril não cai nem sobe.',
        porque: 'Estabilização do core sem apneia — ensina o padrão certo de ativação.',
        tiktok: 'plank breathing core' }),
    ],
  },
  {
    id: 'treinoC',
    nome: 'Treino C — Superior',
    kicker: 'Força · tronco',
    when: 'Quarta · ~55 min',
    desc: 'O dia de cima. Tudo puxa pra trás — costas e parte de trás do ombro — pra desfazer os ombros enrolados e a cifose. Empurrar é o acessório.',
    exercicios: [
      ex({ id: 'c1', prio: 'P1', nome: 'Remada curvada com barra', tag: 'Costas', dose: '4×10', anterior: '30 kg · 10 reps',
        como: 'Tronco inclinado ~45°, lombar neutra. Puxa a barra ao umbigo levando o cotovelo pra trás, junta as escápulas 1s, desce.',
        atencao: 'Cotovelo puxa pra trás, não pra cima. Sente o romboide contrair.',
        porque: 'Fortalece costas e parte de trás do ombro pra contrabalançar os ombros enrolados.',
        tiktok: 'barbell row form back' }),
      ex({ id: 'c2', prio: 'P0', nome: 'Face pull com corda', tag: 'Postura ombro', dose: '4×15',
        como: 'Corda na altura do rosto, puxa em direção à testa abrindo os cotovelos, termina com rotação externa (punhos atrás das orelhas). Pode fazer todo dia.',
        atencao: 'Cotovelos altos. Não encurva o pescoço ao puxar.',
        porque: 'Rotação externa + retração de escápula — o oposto direto do ombro projetado pra frente. P0 da tua postura.',
        tiktok: 'face pull cable form' }),
      ex({ id: 'c3', prio: 'P2', nome: 'Puxada (lat pulldown) — pegada média', tag: 'Dorsal', dose: '4×10',
        como: 'Pegada média, tronco levemente inclinado. Puxa a barra ao peito levando o cotovelo pra baixo e atrás.',
        atencao: 'Pegada não muito aberta. Sem balançar o tronco.',
        porque: 'Fortalece o dorsal e ajuda a manter a postura sem sobrecarregar a cervical.',
        tiktok: 'lat pulldown form' }),
      ex({ id: 'c4', prio: 'P2', nome: 'Desenvolvimento com halteres', tag: 'Ombro', dose: '3×10',
        como: 'Sentada, halteres na altura das orelhas. Empurra pra cima sem travar o cotovelo, desce controlado.',
        atencao: 'Não estende a lombar pra ganhar amplitude. Core ativo.',
        porque: 'Fortalece o ombro em amplitude segura.',
        tiktok: 'dumbbell shoulder press form' }),
      ex({ id: 'c5', prio: 'P3', nome: 'Rosca direta', tag: 'Bíceps', dose: '3×12',
        como: 'Cotovelos fixos ao lado do corpo, sobe o peso sem balançar o tronco.',
        atencao: 'Sem embalo. Controla na descida.',
        porque: 'Acessório pra equilíbrio do braço.',
        tiktok: 'barbell curl form' }),
      ex({ id: 'c6', prio: 'P3', nome: 'Tríceps na corda', tag: 'Tríceps', dose: '3×12',
        como: 'Cotovelos colados ao corpo, estende a corda pra baixo abrindo no fim, volta devagar.',
        atencao: 'Só o antebraço se move.',
        porque: 'Acessório — fecha o equilíbrio do braço.',
        tiktok: 'tricep rope pushdown' }),
      ex({ id: 'c7', prio: 'P0', kind: 'medida', nome: 'Band pull-apart — finalização', tag: 'Postura', dose: '3×15',
        como: 'Elástico nas mãos à frente, na altura do peito. Abre os braços até as escápulas se encontrarem, volta devagar.',
        atencao: 'Fecha o dia sempre com retração — reforça o padrão corretivo.',
        porque: 'Reforça a retração de escápula — o padrão que você precisa repetir o dia todo.',
        tiktok: 'band pull apart form' }),
    ],
  },
]

// ---------------------------------------------------------------------------
// CORRIDA — semana-base, zonas, 3 fases, princípios e plano detalhado 26 sem.
// ---------------------------------------------------------------------------
const semana = (dia, treino, g = false) => ({ dia, treino, g })

export const CORRIDA = {
  desc: 'O plano vai de base aeróbica a 15k até dezembro, em três fases. FC é o árbitro — o pace é consequência. Cada marco desbloqueia o próximo.',
  regra_flex: 'pode trocar os dias livremente, desde que não emende dois dias pesados (corrida longa, tiro ou perna).',
  semana_base: [
    semana('Seg', 'Treino B — Quadríceps', true),
    semana('Ter', 'Pilates + corrida leve'),
    semana('Qua', 'Treino C — Superior', true),
    semana('Qui', 'Corrida (treino principal)'),
    semana('Sex', 'Descanso ou mobilidade'),
    semana('Sáb', 'Corrida longa + Treino A'),
    semana('Dom', 'Descanso / rotina diária'),
  ],
  zonas: [
    { zona: '🟢 Leve / Base',     pace: '7:45–8:15/km', fc: '125–140' },
    { zona: '🟡 Ritmo',           pace: '6:40–7:00/km', fc: '145–158' },
    { zona: '🔴 Tiro / Intervalo', pace: '5:50–6:10/km', fc: '160–170' },
    { zona: '🏁 Pace alvo 10k',    pace: '6:00–6:15/km', fc: '168–175' },
  ],
  fases: [
    { n: 'Fase 1', nome: 'Base Aeróbica', dur: 'jun → ago · 10 sem', goal: 'Correr 8km contínuos a 6:45/km com folga.',
      marco: '8km · últimos 2km a 6:30/km · FC < 170 bpm · Sáb 30/ago' },
    { n: 'Fase 2', nome: 'Construção de Velocidade', dur: 'set → out · 8 sem', goal: 'Sustentar 10km a 6:00–6:15/km.',
      marco: '10km a 6:10/km · FC < 175 bpm · Sáb 25/out' },
    { n: 'Fase 3', nome: 'Volume e Resistência', dur: 'out → dez · 8 sem', goal: 'Chegar a 15km a 6:00–6:10/km.',
      marco: '15km a 6:10/km sustentado · Sáb 20/dez' },
  ],
  principios: [
    'Progressão de 10% — volume nunca sobe mais que ~10% por semana.',
    'Descarga a cada 3 semanas — reduz 20–30% do volume pra supercompensar.',
    'Nunca dois dias pesados seguidos.',
    'FC é o árbitro — se passar do alvo, reduz o pace.',
    'Ativação pré-corrida sempre — glúteo médio + arco esquerdo antes de sair.',
    'Zonas revisáveis a cada marco desbloqueado.',
  ],
  // Plano detalhado, semana a semana (mantido da versão anterior do app).
  plano26: [
    { fase: 'Fase 1 — Base Aeróbica', semanas: [
      { n: 1,  label: '22–28 jun',    tipo: null,        ter: 'Leve 4km · 7:45–8:15/km', qui: 'Tiros: aquec 1,5km · 4×600m a 6:00–6:10 · rec 90s · desaquec 500m', sab: 'Longa 6km · 7:45–8:00/km' },
      { n: 2,  label: '29 jun–5 jul', tipo: null,        ter: 'Leve 4km · 7:45–8:15/km', qui: 'Tiros: aquec 1,5km · 4×600m a 6:00–6:10 · rec 90s · desaquec 500m', sab: 'Longa 7km · 7:45–8:00/km' },
      { n: 3,  label: '6–12 jul',     tipo: null,        ter: 'Leve 5km · 7:45–8:15/km', qui: 'Tiros: aquec 1,5km · 4×800m a 6:10–6:20 · rec 90s · desaquec 500m', sab: 'Longa 8km · 7:45–8:00/km' },
      { n: 4,  label: '13–19 jul',    tipo: 'Descarga',  ter: 'Leve 3km · 8:00–8:30/km', qui: 'Leve 4km · 7:45–8:00/km', sab: 'Longa 6km · 7:45–8:15/km' },
      { n: 5,  label: '20–26 jul',    tipo: null,        ter: 'Leve 5km · 7:45–8:15/km', qui: 'Tiros: aquec 1,5km · 4×800m a 6:10–6:20 · rec 90s · desaquec 500m', sab: 'Longa 8km · 7:30–7:45/km' },
      { n: 6,  label: '27 jul–2 ago', tipo: null,        ter: 'Leve 5km · 7:30–8:00/km', qui: 'Tempo: aquec 1km · 3km a 6:30–6:45 · desaquec 1km', sab: 'Longa 9km · 7:30–7:45/km' },
      { n: 7,  label: '3–9 ago',      tipo: null,        ter: 'Leve 5km · 7:30–8:00/km', qui: 'Tempo: aquec 1km · 4km a 6:30–6:45 · desaquec 1km', sab: 'Longa 10km · 7:30–7:45/km' },
      { n: 8,  label: '10–16 ago',    tipo: 'Descarga',  ter: 'Leve 4km · 8:00–8:30/km', qui: 'Leve 4km · 7:45–8:00/km', sab: 'Longa 7km · 7:45–8:00/km' },
      { n: 9,  label: '17–23 ago',    tipo: null,        ter: 'Leve 5km · 7:30–8:00/km', qui: 'Tempo: aquec 1km · 5km a 6:30–6:45 · desaquec 1km', sab: 'Longa 10km · 7:20–7:40/km' },
      { n: 10, label: '24–30 ago',    tipo: 'Teste',     ter: 'Leve 4km · 7:45–8:00/km', qui: 'Leve 3km · 8:00/km · pernas frescas', sab: '🔓 TESTE: 8km · 6km a 7:00 + 2km a 6:30 · FC < 170' },
    ]},
    { fase: 'Fase 2 — Construção de Velocidade', semanas: [
      { n: 11, label: '1–7 set',      tipo: null,        ter: 'Leve 5km · 7:30–8:00/km', qui: 'Tiros 1km: aquec 1,5km · 4×1km a 5:50–6:00 · rec 2min · desaquec 500m', sab: 'Longa 10km · 7:15–7:30/km' },
      { n: 12, label: '8–14 set',     tipo: null,        ter: 'Leve 5km · 7:30–8:00/km', qui: 'Tiros 1km: aquec 1,5km · 4×1km a 5:50–6:00 · rec 2min · desaquec 500m', sab: 'Longa 11km · 7:15–7:30/km' },
      { n: 13, label: '15–21 set',    tipo: null,        ter: 'Leve 6km · 7:30–8:00/km', qui: 'Tiros 1km: aquec 1,5km · 5×1km a 5:50–6:00 · rec 2min · desaquec 500m', sab: 'Longa 12km · 7:15–7:30/km' },
      { n: 14, label: '22–28 set',    tipo: 'Descarga',  ter: 'Leve 4km · 8:00/km', qui: 'Leve 5km · 7:30–8:00/km', sab: 'Longa 8km · 7:30/km' },
      { n: 15, label: '29 set–5 out', tipo: null,        ter: 'Leve 6km · 7:30–8:00/km', qui: 'Tempo: aquec 1km · 5km a 6:10–6:20 · desaquec 1km', sab: 'Longa 12km · 7:00–7:20/km' },
      { n: 16, label: '6–12 out',     tipo: null,        ter: 'Leve 6km · 7:30–8:00/km', qui: 'Tempo: aquec 1km · 6km a 6:10–6:20 · desaquec 1km', sab: 'Longa 13km · 7:00–7:15/km' },
      { n: 17, label: '13–19 out',    tipo: null,        ter: 'Leve 6km · 7:15–7:45/km', qui: 'Tempo: aquec 1km · 7km a 6:10 · desaquec 1km', sab: 'Longa 14km · 7:00–7:15/km' },
      { n: 18, label: '20–26 out',    tipo: 'Teste',     ter: 'Leve 5km · 7:30–8:00/km', qui: 'Leve 3km · 8:00/km · pernas frescas', sab: '🔓 TESTE: 10km · pace alvo 6:10/km · FC < 175' },
    ]},
    { fase: 'Fase 3 — Volume e Resistência', semanas: [
      { n: 19, label: '27 out–2 nov', tipo: null,        ter: 'Leve 6km · 7:30–8:00/km', qui: 'Tempo: aquec 1km · 8km a 6:15–6:20 · desaquec 1km', sab: 'Longa 14km · 7:00–7:15/km' },
      { n: 20, label: '3–9 nov',      tipo: null,        ter: 'Leve 6km · 7:15–7:45/km', qui: 'Tempo: aquec 1km · 9km a 6:10–6:20 · desaquec 1km', sab: 'Longa 15km · 7:00–7:15/km' },
      { n: 21, label: '10–16 nov',    tipo: null,        ter: 'Leve 7km · 7:15–7:45/km', qui: 'Tempo: aquec 1km · 10km a 6:10 · desaquec 1km', sab: 'Longa 16km · 6:55–7:10/km' },
      { n: 22, label: '17–23 nov',    tipo: 'Descarga',  ter: 'Leve 5km · 7:45–8:00/km', qui: 'Leve 6km · 7:30–8:00/km', sab: 'Longa 10km · 7:15/km' },
      { n: 23, label: '24–30 nov',    tipo: null,        ter: 'Leve 7km · 7:15–7:45/km', qui: 'Progressiva: aquec 1km · 6km de 6:30 fechando 6:00 · desaquec 1km', sab: 'Longa 15km · 6:55–7:10/km' },
      { n: 24, label: '1–7 dez',      tipo: null,        ter: 'Leve 7km · 7:15–7:45/km', qui: 'Progressiva: aquec 1km · 8km de 6:30 fechando 6:00 · desaquec 1km', sab: 'Longa 16km · 6:50–7:05/km' },
      { n: 25, label: '8–14 dez',     tipo: null,        ter: 'Leve 7km · 7:15–7:45/km', qui: 'Progressiva: aquec 1km · 10km de 6:30 fechando 6:00 · desaquec 1km', sab: 'Longa 17km · 6:50–7:00/km' },
      { n: 26, label: '15–21 dez',    tipo: 'Teste',     ter: 'Leve 6km · 7:30/km', qui: 'Leve 4km · 8:00/km · pernas frescas', sab: '🏆 TESTE FINAL: 15km · pace alvo 6:10/km' },
    ]},
  ],
}

// ---------------------------------------------------------------------------
// CADEIA ESQUERDA — a história causal que conecta tudo (tela Saber)
// ---------------------------------------------------------------------------
export const CADEIA = {
  titulo: 'A cadeia esquerda',
  sub: 'Quase tudo na tua ficha é um efeito dominó que começa embaixo, no pé esquerdo, e sobe. Entender a corrente é entender por que cada exercício existe.',
  elos: [
    { t: 'Pé esquerdo — pronação ++++', d: 'O arco desaba a cada passo. É a base de tudo: a torre inclina a partir daqui.' },
    { t: 'Tíbia e joelho rodam pra dentro', d: 'A perna segue o pé, o joelho vai a valgo. Sobrecarga silenciosa em cada quilômetro.' },
    { t: 'Glúteo médio inibido', d: 'Não segura a pelve. Sem ele, o quadril cai do lado do passo — e o corpo procura quem compense.' },
    { t: 'Quadrado lombar esquerdo compensa', d: 'É ele que assume. Trabalha dobrado, encurta e dói. Tua dor lombar principal mora aqui.' },
    { t: 'Anteversão + hiperlordose', d: 'O iliopsoas encurtado puxa a pelve pra frente. A lombar fecha, a barriga projeta.' },
    { t: 'Cifose + cabeça à frente', d: 'Em cima, as costas arredondam e a cabeça vai pra frente. O pescoço comprime — dor cervical e de cabeça.' },
  ],
  punch: 'acordar o glúteo médio esquerdo e sustentar o arco. Resolve o elo que segura a corrente inteira — é a alavanca de maior retorno do teu treino.',
}

// ---------------------------------------------------------------------------
// TRIAGEM por tempo disponível (painel)
// ---------------------------------------------------------------------------
export const TRIAGEM = [
  { t: '5 min',  min: 5,  d: 'Só os P0 da ativação: short foot esquerdo + glúteo médio (clamshell ou abdução). É o mínimo que segura a cadeia.' },
  { t: '10 min', min: 10, d: 'Ativação completa + 1 composto principal (P1) do dia. Pula os isolados sem culpa.' },
  { t: '20 min', min: 20, d: 'Ativação + todos os P0 e P1 do bloco. Deixa P2 e P3 de fora.' },
  { t: 'Tudo',   min: 99, d: 'Sessão inteira: ativação, P0 a P3 e a finalização corretiva.' },
]

// ---------------------------------------------------------------------------
// PRINCÍPIOS gerais (tela Saber)
// ---------------------------------------------------------------------------
export const PRINCIPIOS = [
  { t: 'FC é o árbitro', d: 'Na corrida, se a frequência passa do alvo, reduz o pace. O relógio não manda — o coração manda.' },
  { t: 'Corretivo antes de carga', d: 'Ativa o glúteo médio e o arco antes de pegar peso. Carregar em cima de um padrão errado só reforça o padrão.' },
  { t: 'Progressão de 10%', d: 'Volume e carga sobem no máximo ~10% por semana. Tendão e osso adaptam mais devagar que músculo.' },
  { t: 'Unilateral expõe a verdade', d: 'Um lado por vez não deixa o lado forte esconder o fraco. Começa sempre pelo lado mais fraco.' },
  { t: 'Descarga a cada 3 semanas', d: 'Reduz 20–30% do volume pra supercompensar. Descanso é parte do treino, não pausa dele.' },
  { t: 'Dor lombar = checar glúteo', d: 'Se a lombar reclama num exercício de quadril, quase sempre é o glúteo que não ligou. Para, reativa, volta.' },
]

// ---------------------------------------------------------------------------
// PENDENTES — ações fora do treino (tela Saber)
// ---------------------------------------------------------------------------
export const PENDENTES = [
  { k: 'Biomecânica', d: 'Avaliar o tênis com análise de pisada — pronação severa bilateral (esq ++++). Palmilha pode ser necessária antes de subir volume.' },
  { k: 'Pilates', d: 'Levar pro pilates o foco em iliopsoas, peitoral e glúteo médio — alinhado com a ficha postural.' },
  { k: 'Reavaliação', d: 'Refazer a avaliação postural a cada ~3 meses pra recalibrar prioridades e zonas.' },
]

export const CAVEAT = 'Esse app organiza a tua ficha da AGC (fev/2025) e o plano de corrida num lugar só — não substitui acompanhamento profissional. Dor aguda, nova ou que piora é sinal de parar e procurar teu fisio ou treinador. As cargas e paces são ponto de partida, não regra: teu corpo no dia tem a palavra final.'

export const DATA = { BLOCOS, CORRIDA, CADEIA, PRIO, TRIAGEM, PRINCIPIOS, PENDENTES, CAVEAT }
export default DATA
