// Cole aqui a URL do seu Google Apps Script Web App após o setup
// Guia: veja SETUP_SHEETS.md na raiz do projeto
export const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxaiG8ui4a6FRG3EGeg7x439e47cJloil75xrbVx5K0Nst7_UkGQRXp8xEJvfNmHw0/exec'

// Checklist postural — baseada no briefing AGC (fev/2025)
export const PILATES_CHECKLIST = [
  { id: 'cadeia_post',  label: 'Cadeia posterior (isquiotibiais + panturrilha)' },
  { id: 'escapula',     label: 'Posição e retração das escápulas' },
  { id: 'iliopsoas',    label: 'Alongamento de iliopsoas / flexores do quadril' },
  { id: 'peitoral',     label: 'Alongamento de peitoral' },
  { id: 'gluteo_med',   label: 'Ativação de glúteo médio' },
  { id: 'core',         label: 'Estabilização lombar / core profundo' },
  { id: 'pronacao',     label: 'Consciência de pronação dos pés' },
  { id: 'cervical',     label: 'Postura cervical / retração de cabeça' },
]

// Zonas de corrida calibradas em 21/06/2025
export const ZONAS_CORRIDA = [
  { id: 'leve',   label: '🟢 Leve / Base',        pace: '7:45–8:15/km', fc: '125–140 bpm' },
  { id: 'ritmo',  label: '🟡 Ritmo',               pace: '6:40–7:00/km', fc: '145–158 bpm' },
  { id: 'tiro',   label: '🔴 Tiro / Intervalo',    pace: '5:50–6:10/km', fc: '160–170 bpm' },
  { id: 'alvo',   label: '🏁 Pace alvo 10k',       pace: '6:00–6:15/km', fc: '168–175 bpm' },
]

export const MOBILIDADE_EXERCISES = [
  { id: 'tor_rolo',    label: 'Mobilidade torácica no rolo',          priority: 'Imperativo', time: '2 min',
    como: 'Foam roller na altura das escápulas, braços cruzados no peito. Extensão sobre o rolo segmento por segmento, do meio para cima.',
    porq: 'Hipercifose torácica trava ombro, cervical e lombar ao mesmo tempo. É o ponto central do seu padrão.',
    timer: 120 },
  { id: 'chin_tuck',   label: 'Chin tuck — correção cervical',         priority: 'Imperativo', time: '2 min',
    como: 'Sentada ou em pé, empurra o queixo para trás (como se fosse fazer papada). Segura 5 seg, solta. Não inclina a cabeça — é retração, não flexão.',
    porq: 'Cabeça anteriorizada +++ direita. Exercício mais direto para corrigir e aliviar a dor cervical.' },
  { id: 'hip_flexor',  label: 'Hip flexor stretch ajoelhado — Iliopsoas', priority: 'Imperativo', time: '3 min',
    como: 'Joelho direito no chão, pé esquerdo à frente. Empurra o quadril para frente mantendo lombar neutra. Não arqueia as costas.',
    porq: 'Encurtamento IMPERATIVO na ficha. Causa direta da anteversão pélvica e da dor lombar.',
    timer: 90 },
  { id: 'peitoral',    label: 'Peitoral na parede',                    priority: 'Alto', time: '2 min',
    como: 'Braço em L a 90° apoiado na parede, gira o tronco para fora devagar. Sente o peitoral estirar, não o ombro.',
    porq: 'Peitoral severo + escápulas abduzidas = ombros enrolados + cifose.' },
  { id: '90_90',       label: '90/90 — mobilidade de quadril',         priority: 'Alto', time: '3 min',
    como: 'Sentada no chão com as pernas em 90/90 (uma à frente, uma ao lado). Inclina o tronco sobre cada perna. Tronco ereto, não arredondado.',
    porq: 'Trabalha rotação interna e externa do quadril — exatamente o identificado bilateral na ficha.',
    timer: 45 },
  { id: 'ql_lateral',  label: 'Quadrado lombar lateral — foco esquerdo', priority: 'Alto', time: '2 min',
    como: 'Em pé, braço esquerdo acima da cabeça, inclinação lateral suave para a direita. Sente o estiramento no lateral do tronco esquerdo.',
    porq: 'Sua dor principal relatada. QL esquerdo comprimido pela assimetria pélvica.' },
  { id: 'panturrilha', label: 'Panturrilha no degrau',                  priority: 'Alto', time: '3 min',
    como: 'Pé na borda do degrau. (1) Joelho estendido — gastrocnêmio, 60 seg. (2) Joelho levemente dobrado — sóleo, 60 seg.',
    porq: 'Panturrilha severa bilateral → piora pronação → piora joelho e lombar na corrida.' },
  { id: 'suboccipital',label: 'Suboccipital stretch — base do crânio', priority: 'Alto', time: '1 min',
    como: 'Deitada de costas, joelhos dobrados. Faz o chin tuck e segura. Com as mãos, faz leve pressão na base do crânio para baixo.',
    porq: 'Cabeça anteriorizada comprime os suboccipitais — origem da sua dor cervical.' },
  { id: 'open_book',   label: 'Open book — rotação torácica',           priority: 'Médio', time: '2 min',
    como: 'Deitada de lado, joelhos dobrados a 90°. Braço superior abre para o outro lado seguindo os olhos. Segura 3 seg, volta.',
    porq: 'Trabalha romboide + rotação torácica + abertura do peitoral ao mesmo tempo.' },
]

export const ABC_TREINOS = {
  a: {
    label: 'Treino A — Glúteos',
    dia: 'Sábado · ~60 min',
    preAtivacao: [
      { id: 'pre_a1', label: 'Clamshell 15/lado' },
      { id: 'pre_a2', label: 'Ponte unilateral 10/lado' },
    ],
    exercicios: [
      { id: 'a1', label: 'Ponte glútea com barra',       volume: '4×12', priority: 'Prioridade',
        ajuste: 'Retroversão pélvica antes de subir. Pausa 2 seg no topo. Não hiperextende no final — glúteo fecha, não lombar abre.',
        dica: 'Se sentir lombar no topo, você está usando o iliopsoas pra subir, não o glúteo.',
        tiktok: 'glute bridge barbell form' },
      { id: 'a2', label: 'Deadlift romeno',              volume: '4×10', priority: 'Prioridade',
        ajuste: 'Neutro lombar rigoroso — não força lordose no início. Para quando isquio estirar. Ativa core antes de pegar a barra.',
        tiktok: 'romanian deadlift form' },
      { id: 'a3', label: 'Agachamento búlgaro',          volume: '3×10/lado', priority: 'Alto',
        ajuste: 'Tronco vertical, joelho sobre o 2° dedo do pé. Começa pelo lado mais fraco. Não deixa o joelho cair para dentro.',
        tiktok: 'bulgarian split squat form' },
      { id: 'a4', label: 'Abdução cabo em pé — glúteo médio', volume: '3×15/lado', priority: 'Alto',
        ajuste: 'Tronco estável — movimento vem só do quadril lateral. Não inclina o tronco para compensar amplitude.',
        tiktok: 'cable hip abduction' },
      { id: 'a5', label: 'Stiff unilateral',             volume: '3×10/lado', priority: 'Alto',
        ajuste: 'Trabalha assimetria dir/esq. Para quando sentir isquio estirar. Lombar neutra o tempo todo.',
        tiktok: 'single leg stiff deadlift' },
      { id: 'a6', label: 'Leg curl deitado',             volume: '3×12', priority: 'Complementar',
        ajuste: 'Carga moderada, controlado na descida. Sem compensar com lombar. Pode ser unilateral.' },
      { id: 'a7', label: 'Dead bug — finalização',       volume: '3×8/lado', priority: 'Finalização',
        ajuste: 'Lombar colada no chão o tempo todo. Se sair, reduz o range. Lento e controlado.',
        tiktok: 'dead bug exercise core' },
    ]
  },
  b: {
    label: 'Treino B — Quadríceps',
    dia: 'Segunda · ~55 min',
    preAtivacao: [
      { id: 'pre_b1', label: 'Dead bug 8/lado' },
      { id: 'pre_b2', label: 'Monster walk 10/lado' },
    ],
    exercicios: [
      { id: 'b1', label: 'Agachamento livre',            volume: '4×10', priority: 'Prioridade',
        ajuste: 'Neutro lombar — não força lordose. Profundidade com controle. Joelhos rastreando os dedos, sem valgo.',
        tiktok: 'squat form technique' },
      { id: 'b2', label: 'Leg press 45°',               volume: '4×12', priority: 'Prioridade',
        ajuste: 'Pés médio-altos, joelhos rastreando os dedos o tempo todo. Vigilância constante com valgo — especialmente no direito.',
        tiktok: 'leg press 45 form' },
      { id: 'b3', label: 'Agachamento sumô com haltere', volume: '3×12', priority: 'Alto',
        ajuste: 'Trabalha adutores + abertura de quadril. Bom complemento para o padrão de rotação interna bilateral.',
        tiktok: 'sumo squat dumbbell' },
      { id: 'b4', label: 'Afundo caminhando',           volume: '3×10/lado', priority: 'Alto',
        ajuste: 'Tronco ereto, joelho não passa muito o pé. Unilateral — expõe assimetria dir/esq.',
        tiktok: 'walking lunge form' },
      { id: 'b5', label: 'Cadeira extensora',           volume: '3×15', priority: 'Complementar',
        ajuste: 'Carga leve-moderada, amplitude controlada. Foco no VMO. Se o joelho desviar para dentro — carga alta demais.' },
      { id: 'b6', label: 'Panturrilha em pé',           volume: '4×15', priority: 'Complementar',
        ajuste: 'Encurtamento severo bilateral. Entra no treino como fortalecimento em amplitude.',
        tiktok: 'calf raise standing form' },
      { id: 'b7', label: 'Prancha com respiração',      volume: '3×25 seg', priority: 'Finalização',
        ajuste: 'Respira normalmente — não prende o ar. Core ativo sem apneia. Lombar neutra.', timer: 25 },
    ]
  },
  c: {
    label: 'Treino C — Superior',
    dia: 'Quarta · ~55 min',
    preAtivacao: [
      { id: 'pre_c1', label: 'Band pull-apart 15' },
      { id: 'pre_c2', label: 'Face pull elástico 15' },
      { id: 'pre_c3', label: 'Deep neck flexor 10×5 seg' },
    ],
    exercicios: [
      { id: 'c1', label: 'Remada curvada com barra',    volume: '4×10', priority: 'Prioridade',
        ajuste: 'Primeiro exercício do dia. Pausa 1 seg com escápulas juntas. Cotovelo puxa para trás, não para cima. Sente o romboide contrair.',
        tiktok: 'barbell row form back' },
      { id: 'c2', label: 'Face pull com corda',         volume: '4×15', priority: 'Prioridade',
        ajuste: 'Cotovelos altos, rotação externa no final — punhos atrás das orelhas. Não encurva o pescoço ao puxar.',
        dica: 'Pode fazer em todos os dias de treino — não tem limite aqui.',
        tiktok: 'face pull cable form' },
      { id: 'c3', label: 'Puxada (lat pulldown) — pegada média', volume: '4×10', priority: 'Alto',
        ajuste: 'Pegada média — não muito aberta. Cotovelo puxa para baixo e levemente para trás. Tronco levemente inclinado.',
        tiktok: 'lat pulldown form' },
      { id: 'c4', label: 'Desenvolvimento com halteres', volume: '3×10', priority: 'Alto',
        ajuste: 'Amplitude até a orelha — não força acima. Sem extender a lombar para ganhar amplitude. Core ativo.',
        tiktok: 'dumbbell shoulder press form' },
      { id: 'c5', label: 'Rosca direta',                volume: '3×12', priority: 'Complementar',
        ajuste: 'Sem restrição postural específica. Não balança o tronco para ganhar carga.',
        tiktok: 'barbell curl form' },
      { id: 'c6', label: 'Tríceps corda',               volume: '3×12', priority: 'Complementar',
        ajuste: 'Tronco levemente inclinado, cotovelos fixos ao lado do corpo.',
        tiktok: 'tricep rope pushdown' },
      { id: 'c7', label: 'Band pull-apart — finalização', volume: '3×15', priority: 'Finalização',
        ajuste: 'Escápulas se encontram atrás. Fecha o dia sempre com retração — reforça o padrão corretivo.',
        tiktok: 'band pull apart form' },
    ]
  }
}

export const GRUPOS_MUSCULARES = [
  'Quadríceps',
  'Glúteo / Posterior',
  'Superiores (costas + bíceps)',
  'Peito + Tríceps',
  'Ombro',
  'Full Body',
  'Core',
]

export const SENSACAO_OPTIONS = [
  { value: 1, label: '😴 Pesado demais' },
  { value: 2, label: '😐 Razoável' },
  { value: 3, label: '🙂 Bem' },
  { value: 4, label: '💪 Ótimo' },
  { value: 5, label: '🔥 Incrível' },
]
