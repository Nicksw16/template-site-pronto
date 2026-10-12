// Dados do site. Tudo entre [colchetes] é espaço reservado: trocar pelos dados reais.
export const WA = '55DDDNUMERO' // 55 + DDD + número, só dígitos
// Vídeo do topo (opcional). Ex.: '/video/hero.mp4' (MP4 H.264, mudo, 6–10 s, ≤ 3 MB). Vazio = só a foto.
export const HERO_VIDEO = ''
export const INSTAGRAM = '[instagram]'
export const CIDADE = '[Cidade - UF]'
export const ENDERECO = '[Rua, nº, Bairro, Cidade - UF, CEP]'
export const HORARIO = '[Seg–Sex 9h–18h · Sáb 9h–13h]'
export const CNPJ = '[CNPJ]'
export const EMAIL = '[e-mail]'
export const TELEFONE_VISIVEL = '[(DDD) número]'

export const waLink = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`

const base = 'Olá! Vi o site da Villa Aurora e quero um orçamento. Data: __ · Convidados: __ · Tipo de festa: '
export const waGeral = waLink(base + '__')
export const waFesta = (tipo: string) => waLink(base + tipo)
export const waCardapio = (nome: string) => waLink(base + '__ · Cardápio: ' + nome)
export const waVisita = waLink(
  'Olá! Vi o site da Villa Aurora e quero agendar uma visita. Data: __ · Convidados: __ · Tipo de festa: __',
)
export const instagramUrl = `https://instagram.com/${INSTAGRAM}`
export const mapaUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ENDERECO)}`

export const preco = 'A partir de [R$ por convidado]'

export type Item = { titulo: string; descricao: string; img: string; alt: string; href: string }

export const festas: Item[] = [
  { titulo: 'Festa infantil', descricao: 'Brinquedoteca, buffet para crianças e adultos e tempo para você curtir a festa.', img: '/img/festa-infantil.webp', alt: 'Mesa de festa infantil com doces e decoração no salão da Villa Aurora [foto de exemplo: trocar]', href: waFesta('Festa infantil') },
  { titulo: '15 anos', descricao: 'Salão pronto para a entrada, a valsa e a pista, com cardápio para todas as idades.', img: '/img/festa-15-anos.webp', alt: 'Casal dançando na pista iluminada de uma festa [foto de exemplo: trocar]', href: waFesta('15 anos') },
  { titulo: 'Casamento', descricao: 'Cerimônia e recepção no mesmo espaço, com buffet e equipe do começo ao fim.', img: '/img/casamento.webp', alt: 'Noivos dançando sob um varal de luzes na recepção [foto de exemplo: trocar]', href: waFesta('Casamento') },
  { titulo: 'Aniversário adulto', descricao: 'Mesa farta, bebida gelada e salão climatizado para reunir a turma.', img: '/img/aniversario-adulto.webp', alt: 'Mesa de aniversário com bolo e doces no salão da Villa Aurora [foto de exemplo: trocar]', href: waFesta('Aniversário adulto') },
  { titulo: 'Corporativo', descricao: 'Confraternização de fim de ano ou evento de empresa, com cardápio por pessoa.', img: '/img/corporativo.webp', alt: 'Convidados se servindo no buffet de um evento [foto de exemplo: trocar]', href: waFesta('Corporativo') },
  { titulo: 'Chá de bebê / revelação', descricao: 'Ambiente aconchegante para a família e os amigos, com mesa de bolo e doces.', img: '/img/cha-de-bebe.webp', alt: 'Decoração de chá de bebê com balões e mesa de bolo na Villa Aurora [foto de exemplo: trocar]', href: waFesta('Chá de bebê/revelação') },
]

export const cardapios: Item[] = [
  { titulo: 'Buffet Clássico', descricao: 'Pratos quentes, saladas e sobremesas no estilo almoço de família. [ajustar ao cardápio real]', img: '/img/buffet-classico.webp', alt: 'Estação de buffet sob um lustre de flores no salão [foto de exemplo: trocar]', href: waCardapio('Buffet Clássico') },
  { titulo: 'Buffet Premium', descricao: 'Mais opções de pratos, estações e sobremesas para uma festa mais sofisticada. [ajustar]', img: '/img/buffet-premium.webp', alt: 'Tábua de canapés, frios e uvas servida no buffet [foto de exemplo: trocar]', href: waCardapio('Buffet Premium') },
  { titulo: 'Coquetel / Finger food', descricao: 'Salgados e canapés servidos em bandeja, ideais para eventos mais curtos. [ajustar]', img: '/img/coquetel.webp', alt: 'Bandeja de finger food e canapés servida aos convidados [foto de exemplo: trocar]', href: waCardapio('Coquetel/Finger food') },
]

// Só depoimentos REAIS. Lista vazia = a seção de depoimentos não aparece.
export const depoimentos: { nome: string; festa: string; texto: string }[] = []

export const faq = [
  { id: 'preco', q: 'Quanto custa uma festa na Villa Aurora?', a: 'O valor é por convidado e muda conforme o cardápio, o dia da semana e a data. Os pacotes começam a partir de [R$ por convidado]. Para saber o valor da sua festa, mande a data, o número de convidados e o tipo de festa pelo WhatsApp.' },
  { id: 'capacidade', q: 'Para quantos convidados o salão comporta?', a: 'O salão comporta até [X] convidados sentados. Para festas menores, [informar se há outro ambiente ou número mínimo de convidados].' },
  { id: 'buffet', q: 'O buffet já está incluso no aluguel do espaço?', a: '[Confirmar com o cliente: buffet incluso no pacote ou contratado à parte.] O cardápio é preparado na cozinha própria, e o orçamento detalha o que está incluso: [bebidas, bolo, garçons, decoração, taxa de serviço].' },
  { id: 'antecedencia', q: 'Com quanto tempo de antecedência devo reservar a data?', a: 'Para casamentos e 15 anos, o ideal é reservar com [X meses]. Festas infantis e aniversários costumam fechar com [X meses]. Datas de sábado e de fim de ano acabam primeiro. Consulte a disponibilidade pelo WhatsApp.' },
  { id: 'visita', q: 'Posso conhecer o espaço antes de fechar?', a: `Sim. As visitas são com agendamento, em ${HORARIO}. Peça pelo botão "Agendar uma visita".` },
  { id: 'pagamento', q: 'Como funciona o pagamento e a reserva da data?', a: '[Informar: sinal de X% para reservar, parcelamento, formas de pagamento aceitas. Confirmar com o cliente.]' },
  { id: 'restricao', q: 'Tem opção para criança, alergia ou restrição alimentar?', a: '[Confirmar com o cliente.] Conte as restrições dos convidados ao pedir o orçamento. A equipe avalia as adaptações possíveis no cardápio.' },
]
