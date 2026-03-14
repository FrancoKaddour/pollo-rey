export interface Article {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number; // minutos
  content: string; // HTML simple con párrafos
}

export const ARTICLES: Article[] = [
  {
    slug: "apertura",
    tag: "APERTURA",
    title: "Pollo Rey: la pollería que llega a Saavedra con los mejores precios",
    excerpt:
      "Una pollería nueva en el barrio, pero detrás hay años de oficio. Conocé la historia de Pollo Rey y por qué nació en Saavedra.",
    date: "2025-03-01",
    readTime: 3,
    content: `
<p>Saavedra siempre fue un barrio que valora lo auténtico. Un barrio de casas bajas, veredas amplias y comercios de toda la vida donde los vecinos se conocen. Fue exactamente ese espíritu lo que nos llevó a abrir Pollo Rey acá.</p>

<p>No somos una cadena. No tenemos franquicias. Somos una pollería de barrio, con todo lo que eso significa: atención personalizada, conocimiento del cliente, y el compromiso de traer lo mejor a cada mostrador.</p>

<h2>Por qué Saavedra</h2>

<p>Cuando analizamos dónde abrir, Saavedra reunía todo lo que buscábamos: un barrio consolidado, familias que cocinan en casa, parrillas de los sábados, asados del domingo. La demanda de pollo fresco de calidad estaba —solo faltaba quien la atendiera bien.</p>

<p>Trabajamos durante meses antes de abrir las puertas para garantizar dos cosas: proveedores confiables con pollo fresco de verdad (sin congelado), y precios que tenga sentido para el bolsillo de las familias del barrio.</p>

<h2>Precios que hacen la diferencia</h2>

<p>En Buenos Aires, comer bien se volvió caro. Pero el pollo sigue siendo una de las mejores proteínas por precio, calidad y versatilidad. Nuestro compromiso es mantener los mejores precios de la zona para que vos puedas comer bien sin gastar de más.</p>

<p>Pollo entero, pechugas, muslos, achuras, hamburguesas de pollo y todo lo que necesitás para la parrilla o la semana. Todo fresco, todo a precio justo.</p>

<h2>La visión de largo plazo</h2>

<p>Saavedra es el comienzo. Queremos ser la pollería de referencia en Capital Federal, con el mismo estándar de frescura y precio en cada barrio donde estemos. Pero primero tenemos que ganarnos la confianza acá, en casa.</p>

<p>Eso es exactamente lo que estamos haciendo.</p>
    `.trim(),
  },
  {
    slug: "pollo-fresco",
    tag: "FRESCURA",
    title: "Sin congelados ni rodeos: así garantizamos pollo fresco todos los días",
    excerpt:
      "La diferencia entre pollo fresco y congelado no es solo de textura: es sabor, nutrición y confianza. Así trabajamos para garantizarlo.",
    date: "2025-03-08",
    readTime: 4,
    content: `
<p>Cuando decimos "pollo fresco", lo decimos en serio. Sin asteriscos, sin letra chica. El pollo que vendemos hoy nunca estuvo congelado.</p>

<p>Suena obvio, pero en la práctica muchas pollerías mezclan stock fresco con producto congelado descongelado, especialmente cuando la demanda baja o cuando los proveedores no cumplen. Nosotros no lo hacemos, y hay una razón concreta para eso.</p>

<h2>Por qué el frío cambia todo</h2>

<p>El proceso de congelación y descongelación rompe las fibras musculares del pollo. El resultado es una carne más aguada, con menos sabor y una textura diferente en la cocción. Si alguna vez notaste que el pollo "suelta mucha agua" en la sartén, muy probablemente estaba congelado.</p>

<p>El pollo fresco retiene su jugo natural, se cocina de forma más pareja y tiene un sabor notablemente más pronunciado. Para la parrilla, la diferencia es aún más evidente.</p>

<h2>Nuestra cadena de suministro</h2>

<p>Trabajamos con un proveedor local de confianza que nos entrega pollo faenado en el día. Eso nos obliga a gestionar bien el stock —no podemos comprar de más y guardar— pero garantiza que lo que llegue a tu casa sea fresco al 100%.</p>

<p>También por eso, algunos días podemos agotar ciertas piezas. Lo preferimos antes que ofrecerte algo que no cumpla el estándar.</p>

<h2>Cómo reconocer pollo fresco en cualquier comercio</h2>

<p>Hay señales claras: el color rosado uniforme sin manchas grises, la ausencia de líquido acumulado en el envase, y el olor neutro (el pollo fresco casi no huele). Si ves exceso de líquido o una textura blanda y esponjosa, desconfié.</p>

<p>En Pollo Rey podés ver y oler el producto antes de comprar. Así trabajamos: con transparencia y sin rodeos.</p>
    `.trim(),
  },
  {
    slug: "precios",
    tag: "PRECIOS",
    title: "Cómo comer bien sin gastar de más: la propuesta de Pollo Rey",
    excerpt:
      "Con la inflación en Argentina, planificar la compra de proteínas se volvió un desafío. Acá te contamos cómo estirar el presupuesto sin resignar calidad.",
    date: "2025-03-15",
    readTime: 4,
    content: `
<p>Comer bien en Argentina en 2025 requiere estrategia. Los precios de la proteína animal subieron, el presupuesto familiar se ajustó, y elegir bien dónde y qué comprar hace una diferencia concreta a fin de mes.</p>

<p>El pollo es, por lejos, la mejor ecuación precio-proteína disponible. Y en Pollo Rey estamos comprometidos a que esa ecuación siga siendo favorable para las familias del barrio.</p>

<h2>El pollo como base de la semana</h2>

<p>Un pollo entero puede resolver tres comidas distintas en una familia de cuatro: una pata-muslo asada, una pechuga en milanesa y una sopa de huesos para el frío. Con creatividad, el mismo producto se multiplica.</p>

<p>Por eso ofrecemos cortes separados —pechuga, muslo, pata, cuartos— para que puedas comprar exactamente lo que necesitás, sin desperdiciar nada y pagando solo por lo que usás.</p>

<h2>Nuestras promos semanales</h2>

<p>Diseñamos combos pensando en el consumo real de una familia argentina: el pack familiar, la promo semanal, la parrillada. Cada combo combina el pollo con productos complementarios como papas fritas, aceite o carbón, y te sale más barato que comprar cada cosa por separado.</p>

<p>Las promos rotan, siempre según la temporada y los precios de los proveedores. Lo que no rota es el principio: que siempre tenés que llevarte más valor del que pagás.</p>

<h2>Precios transparentes, sin sorpresas</h2>

<p>El precio que ves en el catálogo es el precio final. Sin cargos extra, sin "precio de lista" vs "precio de mostrador". Si algo cambia de precio, lo actualizamos en el sitio al mismo tiempo que en el local.</p>

<p>Sabemos que la confianza se construye siendo predecibles. Y ser predecibles en los precios es parte de ser una pollería de barrio.</p>
    `.trim(),
  },
  {
    slug: "saavedra",
    tag: "SAAVEDRA",
    title: "Tu pollería de confianza a pasos de casa, en el barrio de toda la vida",
    excerpt:
      "Saavedra no es solo una dirección. Es una comunidad, una forma de vivir el barrio. Y Pollo Rey nació de ese espíritu.",
    date: "2025-03-22",
    readTime: 3,
    content: `
<p>Saavedra es uno de los barrios más tranquilos de Buenos Aires. Lejos del ruido del centro, con una identidad propia construida por generaciones de familias que eligieron quedarse, crecer y vivir acá.</p>

<p>Esa identidad nos importa. No abrimos en Saavedra por accidente: lo elegimos porque entendemos que un negocio de barrio tiene que ser parte del barrio, no solo estar en él.</p>

<h2>Qué significa ser una pollería de barrio</h2>

<p>Significa que te conocemos. Que si venís seguido, sabemos que comprás pechuga sin hueso y que preferís los pollos medianos. Que si un día no tenemos lo que buscás, te avisamos y buscamos una solución.</p>

<p>Significa que no somos anónimos. Hay una persona detrás del mostrador que responde, que escucha y que se importa si te vas satisfecho o no.</p>

<h2>El barrio como motor</h2>

<p>El éxito de Pollo Rey depende directamente de la confianza de los vecinos de Saavedra y alrededores. Eso nos da un incentivo muy claro para hacer bien las cosas: no hay segunda oportunidad en un barrio chico.</p>

<p>Cada cliente que sale contento es la mejor publicidad posible. Cada recomendación boca a boca vale más que cualquier campaña.</p>

<h2>Con delivery a toda la zona</h2>

<p>Entendemos que no siempre se puede venir al local. Por eso hacemos delivery en Saavedra, Núñez, Coghlan, Colegiales, Palermo y Vicente López. Todo fresco, llegando a tu puerta el mismo día del pedido.</p>

<p>El barrio somos todos. Y Pollo Rey quiere ser parte de tu semana.</p>
    `.trim(),
  },
  {
    slug: "catalogo",
    tag: "PRODUCTOS",
    title: "Cortes de pollo, huevos, aceite y más: todo lo que necesitás en un lugar",
    excerpt:
      "Más que una pollería: una despensa completa para tu semana. Conocé todo lo que encontrás en Pollo Rey.",
    date: "2025-03-29",
    readTime: 3,
    content: `
<p>Cuando diseñamos el catálogo de Pollo Rey, nos preguntamos algo simple: ¿qué compra una familia argentina cada semana para comer bien? La respuesta nos dio la hoja de ruta.</p>

<p>No somos solo una pollería. Somos una solución completa para tu compra semanal de proteínas y acompañamientos.</p>

<h2>Pollo fresco: toda la variedad</h2>

<p>Pollo entero —el clásico para el asado del domingo—, cuartos, pata-muslo, pechuga entera, pechuga sin hueso, alas, mollejas y achuras. Todo fresco, faenado en el día, con cortes a medida si lo necesitás.</p>

<p>El pollo es nuestro fuerte y nos importa que elijas exactamente lo que necesitás, en la cantidad correcta.</p>

<h2>Congelados premium</h2>

<p>Papas fritas precocidas para freidora o horno, hamburguesas de pollo sin conservantes artificiales. Productos de calidad para cuando necesitás rapidez sin resignar sabor.</p>

<h2>Huevos</h2>

<p>Docenas y medias docenas de huevos frescos. Los huevos son básicos en cualquier cocina y nos esforzamos en mantener stock permanente con buena rotación.</p>

<h2>Despensa complementaria</h2>

<p>Aceite de girasol, rebozador, carbón para parrilla, sal entrefina y fina, condimentos básicos. Todo lo que necesitás para cocinar el pollo y la guarnición sin hacer otra parada.</p>

<p>El objetivo es simple: que con un solo pedido a Pollo Rey tengas todo lo que necesitás para la semana. Sin vueltas, sin complicaciones, a precio justo.</p>
    `.trim(),
  },
  {
    slug: "comunidad",
    tag: "COMUNIDAD",
    title: "Ser parte del barrio: por qué Pollo Rey nació pensando en vos",
    excerpt:
      "Una pollería no es solo un punto de venta. Es un encuentro, un lazo con el barrio. Así pensamos Pollo Rey desde el primer día.",
    date: "2025-04-05",
    readTime: 3,
    content: `
<p>En un mundo donde cada vez compramos más por pantalla y menos cara a cara, hay algo que los comercios de barrio ofrecen que ningún algoritmo puede reemplazar: la sensación de que te conocen.</p>

<p>Pollo Rey nació con esa convicción. No como una estrategia de marketing, sino como una forma de entender el negocio.</p>

<h2>El comercio como tejido social</h2>

<p>Los comercios de barrio son parte del tejido social de una ciudad. Son el lugar donde te enterás de lo que pasa en la cuadra, donde una conversación en el mostrador puede alegrar el día. Son puntos de encuentro, no solo de intercambio.</p>

<p>Cuando abrimos, no pensamos solo en vender pollo. Pensamos en qué tipo de presencia queremos tener en el barrio, qué espacio queremos ser.</p>

<h2>Precios justos como compromiso social</h2>

<p>Los precios justos no son solo una estrategia comercial: son una forma de respeto. Respetar el trabajo de quien compra, respetar el presupuesto familiar, respetar la confianza que depositaron en nosotros al elegirnos.</p>

<p>En tiempos de inflación, eso importa más que nunca.</p>

<h2>Pollo Rey y el futuro</h2>

<p>Nuestro sueño es crecer y estar en más barrios de Buenos Aires, siempre con la misma filosofía: frescura, precio justo y trato humano. Sin perder de vista que cada local es parte de un barrio específico, con su identidad y sus vecinos.</p>

<p>Gracias por elegirnos. Estamos acá para quedarnos.</p>
    `.trim(),
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
