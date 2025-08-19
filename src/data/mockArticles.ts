import { Article } from '../types';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'OpenAI lanza GPT-5 con capacidades de razonamiento avanzado',
    canonical_url: 'https://example.com/openai-gpt5-launch',
    published_at: '2025-01-24T10:30:00Z',
    summary_bullets: [
      'OpenAI presenta GPT-5 con mejoras significativas en razonamiento lógico y matemático',
      'El nuevo modelo supera a GPT-4 en un 40% en tareas de resolución de problemas complejos',
      'Incorpora capacidades multimodales mejoradas para procesar texto, imagen y audio simultáneamente',
      'Estará disponible para suscriptores de ChatGPT Plus a partir del 1 de febrero'
    ],
    summary_paragraph: 'OpenAI ha anunciado el lanzamiento de GPT-5, su modelo de lenguaje más avanzado que promete revolucionar la inteligencia artificial con capacidades de razonamiento superiores y procesamiento multimodal mejorado.',
    topics: ['tecnologia', 'ia'],
    country: 'mundo',
    source: {
      name: 'TechCrunch',
      url: 'https://techcrunch.com'
    },
    lang: 'es',
    reading_time: 3
  },
  {
    id: '2',
    title: 'El Real Madrid ficha a Mbappé por 180 millones de euros',
    canonical_url: 'https://example.com/real-madrid-mbappe-fichaje',
    published_at: '2025-01-24T09:15:00Z',
    summary_bullets: [
      'El Real Madrid confirma el fichaje de Kylian Mbappé por 180 millones de euros',
      'El delantero francés firma contrato por 5 años con el club merengue',
      'Mbappé vestirá el dorsal número 7 y se presentará el próximo martes',
      'PSG acepta la oferta tras meses de negociaciones intensas'
    ],
    summary_paragraph: 'El Real Madrid ha oficializado el fichaje más esperado del año al confirmar la llegada de Kylian Mbappé desde el PSG por una cifra récord de 180 millones de euros.',
    topics: ['deportes', 'futbol'],
    country: 'espana',
    source: {
      name: 'Marca',
      url: 'https://marca.com'
    },
    lang: 'es',
    reading_time: 2
  },
  {
    id: '3',
    title: 'España alcanza el 45% de energía renovable en 2024',
    canonical_url: 'https://example.com/espana-energia-renovable-2024',
    published_at: '2025-01-24T08:45:00Z',
    summary_bullets: [
      'España supera objetivos europeos al alcanzar 45% de generación eléctrica renovable',
      'La energía solar fotovoltaica lidera el crecimiento con un incremento del 28%',
      'Se evitaron 50 millones de toneladas de CO2 respecto al año anterior',
      'El gobierno anuncia nuevas inversiones por 8.000 millones en parques eólicos marinos'
    ],
    summary_paragraph: 'España consolida su liderazgo en transición energética al superar significativamente los objetivos de la UE en energía renovable, posicionándose como referente europeo en sostenibilidad.',
    topics: ['energia', 'sostenibilidad'],
    country: 'espana',
    source: {
      name: 'El País',
      url: 'https://elpais.com'
    },
    lang: 'es',
    reading_time: 4
  },
  {
    id: '4',
    title: 'Descubren nuevo tratamiento contra el Alzheimer con 90% de efectividad',
    canonical_url: 'https://example.com/alzheimer-nuevo-tratamiento',
    published_at: '2025-01-24T07:20:00Z',
    summary_bullets: [
      'Investigadores de Harvard desarrollan terapia génica con 90% de efectividad contra Alzheimer',
      'El tratamiento revierte síntomas en fase inicial durante ensayos clínicos',
      'La terapia utiliza técnicas CRISPR para eliminar proteínas tóxicas del cerebro',
      'Los primeros tratamientos comerciales podrían estar disponibles en 2026'
    ],
    summary_paragraph: 'Un equipo de investigadores de Harvard ha logrado un avance revolucionario en el tratamiento del Alzheimer con una terapia génica que muestra resultados prometedores en la reversión de síntomas.',
    topics: ['ciencia', 'medicina'],
    country: 'mundo',
    source: {
      name: 'Nature Medicine',
      url: 'https://nature.com'
    },
    lang: 'es',
    reading_time: 5
  },
  {
    id: '5',
    title: 'Bitcoin supera los $150,000 tras aprobación de ETFs europeos',
    canonical_url: 'https://example.com/bitcoin-150k-etf-europa',
    published_at: '2025-01-24T06:30:00Z',
    summary_bullets: [
      'Bitcoin alcanza máximo histórico de $152,400 tras aprobación de ETFs en Europa',
      'La Comisión Europea autoriza los primeros fondos cotizados de criptomonedas',
      'El volumen de transacciones aumenta 340% en las últimas 24 horas',
      'Analistas predicen que podría alcanzar $200,000 antes de fin de año'
    ],
    summary_paragraph: 'Bitcoin experimenta una subida histórica superando los $150,000 después de que la Comisión Europea aprobara oficialmente los primeros ETFs de criptomonedas en el continente.',
    topics: ['economia', 'criptomonedas'],
    country: 'mundo',
    source: {
      name: 'CoinDesk',
      url: 'https://coindesk.com'
    },
    lang: 'es',
    reading_time: 3
  },
  {
    id: '6',
    title: 'Apple presenta iPhone 16 con pantalla holográfica',
    canonical_url: 'https://example.com/iphone-16-pantalla-holografica',
    published_at: '2025-01-24T05:45:00Z',
    summary_bullets: [
      'Apple revela iPhone 16 con tecnología de pantalla holográfica 3D sin gafas',
      'El dispositivo incluye chip A18 Bionic con capacidades de IA on-device',
      'Batería de 5000mAh promete 48 horas de uso continuo',
      'Precio inicial de $1,299, disponible a partir del 15 de marzo'
    ],
    summary_paragraph: 'Apple revoluciona la industria móvil con el iPhone 16, el primer smartphone con pantalla holográfica que no requiere gafas especiales y promete redefinir la experiencia de usuario.',
    topics: ['tecnologia', 'movil'],
    country: 'mundo',
    source: {
      name: 'The Verge',
      url: 'https://theverge.com'
    },
    lang: 'es',
    reading_time: 4
  }
];