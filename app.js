/* ================= 1) DATOS: editá acá precios, textos y fotos ================= */
const WA = '59892061753'; // +598 92 061 753
const CONTACT = 'z18.burgers.uy@gmail.com'; // correo oficial de contacto y soporte

// Fotos de stock (Unsplash). Para usar tus renders: poné una ruta o URL completa, p. ej. IMG.bacon = 'img/original.jpg'
// Las fotos reales de Z18 valen 'foto:nombre': cada una está en su propio archivo, fotos/<nombre>.js (Base64), y se pide sola cuando hace falta (ver «FOTOS DE Z18», más abajo).
const IMG = {
  // Fotos reales de Z18: papas y pizzas del menú y de las Recompensas Z. La clave es el nombre del archivo sin extensión.
  'papas-cheddar': 'foto:papas-cheddar',
  'papas-comunes': 'foto:papas-comunes',
  'pizzeta-muzza': 'foto:pizzeta-muzza',
  'pizzeta-salsa': 'foto:pizzeta-salsa',
  // Foto de los 9 nuggets de pollo (Z-Junior Nuggets).
  nuggets: 'foto:nuggets',
  // Fotos de stock (Unsplash), sólo para lo que todavía no tiene foto propia
  potato: '1716042998725-0e0b957b9d99', pizzaSalsa: '1594007654729-407eedc4be65', pizzaMuzza: '1597715469889-dd75fe4a1765',
  cola: '1624552184280-9e9631bbeee9', beer: '1636391945755-4e260dd880cb',
  // Fotos reales de Z18
  clasica: 'foto:clasica',
  z18: 'foto:z18',
  crispy: 'foto:crispy',
  napo2: 'foto:napo2',
  bunker: 'foto:bunker',
  napo1: 'foto:napo1',
  salchipapa: 'foto:salchipapa',
  smash: 'foto:smash',
  // Milanesa XL con cheddar y panceta (recorte de la foto del menú impreso de Milanesas al plato)
  'milanesa-cheddar': 'foto:milanesa-cheddar'
};
const NAV = [['burgers', 'Burgers'], ['combos', 'Combos'], ['milanesas', 'Milanesas'], ['pizzetas', 'Pizzetas'],
             ['reclutas', 'Reclutas'], ['minutas', 'Minutas'], ['bebidas', 'Bebidas y Extras'], ['info', 'Info']];
const MENU = {
  burgers: [
    { n: 'Z18 Original', p: 369, im: 'z18', d: 'Res (100 g), bacon crocante, queso cheddar fundido, cebolla caramelizada y Salsa Z.' },
    { n: 'Clásica 18', p: 379, im: 'clasica', d: 'Res (100 g), lechuga fresca, tomate, queso cheddar fundido, cebolla caramelizada, huevo frito y Salsa Z.' },
    { n: 'Smash', p: 419, im: 'smash', d: 'Doble medallón de res (2 x 100 g) estilo smash, queso cheddar fundido, bacon crocante, cebolla smash y Salsa Z.' },
    { n: 'The Bunker', p: 499, im: 'bunker', d: 'Doble medallón de res (2 x 100 g), queso cheddar, jamón, mozzarella, bacon crocante, cebolla caramelizada, huevo frito y Salsa Z.' },
    { n: 'Crispy BBQ', p: 529, im: 'crispy', tag: '¡NUEVO!', hot: 1, d: 'Doble medallón de res (2 x 100 g), queso cheddar fundido, panceta crocante, cebolla crispy, cebolla caramelizada, salsa BBQ y Salsa Z.' }
  ],
  combos: [
    { n: 'Combo Z18 Original', p: 445, im: 'z18', d: 'Hamburguesa + papas + bebidas' },
    { n: 'Combo Clásica 18', p: 455, im: 'clasica', d: 'Hamburguesa + papas + bebidas' },
    { n: 'Combo Smash', p: 495, im: 'smash', d: 'Hamburguesa + papas + bebidas' },
    { n: 'Combo The Bunker', p: 575, im: 'bunker', d: 'Hamburguesa + papas + bebidas' },
    { n: 'Combo Salchipapa Z18', p: 465, im: 'salchipapa', d: 'Con bebida' }
  ],
  milas: [   // Milanesas al plato (todas XL, todas con papas fritas)
    { n: 'Napolitana al plato con papas fritas', p: 520, im: 'napo1', d: 'Milanesa XL con salsa, jamón, mozzarella y papas fritas.' },
    { n: 'Napolitana al plato para 2 personas', p: 990, im: 'napo2', d: 'Milanesas XL para 2 personas con salsa, jamón, mozzarella y papas fritas.' },
    { n: 'Milanesa al plato con cheddar y panceta', p: 520, im: 'milanesa-cheddar', tag: '¡NUEVO!', d: 'Milanesa XL con cheddar, panceta crocante y papas fritas.' },
    { n: 'Milanesa para 2 con cheddar y panceta', p: 990, im: 'milanesa-cheddar', d: 'Milanesas XL para 2 personas con cheddar, panceta crocante y papas fritas.' }
  ],
  pizzas: [
    { n: 'Pizza al molde (sólo salsa)', p: 300, im: 'pizzeta-salsa', d: 'Pizza al molde media masa, salsa estilo casera, horneada casera.' },
    { n: 'Pizza al molde con muzzarella', p: 370, im: 'pizzeta-muzza', d: 'Pizza al molde media masa, salsa estilo casera, horneada casera.' }
  ],
  promos: [
    { n: 'Súper Promo Pizzeta', p: 730, im: 'pizzaMuzza', tag: 'SÚPER PROMO', hot: 1, d: '1 pizzeta con muzzarella + 3 gustos (de la lista de gustos) + 1 Coca-Cola 1,5 L.' },
    { n: 'Súper Promo Dupla', p: 790, im: 'pizzaSalsa', tag: 'SÚPER PROMO', hot: 1, d: '2 pizzetas al molde con muzzarella + Coca-Cola 1,5 L ó 2 Smith44 (473 ml).' }
  ],
  gustos: ['Extra muzzarella', 'Aceitunas verdes', 'Jamón cocido', 'Panceta ahumada', 'Huevo frito (4 unidades)', 'Cebolla caramelizada', 'Morrón asado', 'Papas fritas'],
  kids: [
    { n: 'Z-Junior Burger', p: 299, im: 'z18', d: 'Medallón 100 g, cheddar y Salsa Z.' },
    { n: 'Z-Junior Nuggets', p: 289, im: 'nuggets', d: '9 nuggets de pollo crujientes.' }
  ],
  minutas: [
    { n: 'Papas fritas', p: 180, im: 'papas-comunes' },
    { n: 'Papas con cheddar y bacon', p: 230, im: 'papas-cheddar' },
    { n: 'Salchipapa Z18', p: 390, im: 'salchipapa', hot: 1, d: 'Papas fritas con pancho picado, bacon crocante, queso cheddar fundido y huevo frito.' }
  ],
  drinks: [
    { n: 'Coca-Cola 600 ml', p: 90, im: 'cola' },
    { n: 'Coca-Cola 1.5 L', p: 180, im: 'cola' },
    { n: 'Smith44 (473 ml)', p: 90, im: 'beer' }
  ],
  extras: [['Medallón extra (100 g)', 60], ['Huevo frito', 30], ['Bacon crocante', 40], ['Queso cheddar', 40]]
};

// ✏️ Fotos que se piden APENAS se dibuja el menú, aunque todavía no se vean: son secciones de MENU (milas = Milanesas al plato, promos = Súper Promos).
// Las de todas las demás secciones se piden solas cuando se acercan a la pantalla. Con [] todo se pide al hacer scroll (la entrada más liviana posible). Ver «CARGA DE FOTOS».
const FOTOS_AL_ENTRAR = ['milas', 'promos'];

/* ================= 2) UTILIDADES ================= */
const $ = id => document.getElementById(id);
const money = n => '$' + n.toLocaleString('es-UY');
const escHtml = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));   // texto que viene de datos (no de nosotros) y va dentro de un innerHTML
// Íconos: SVG inline (el sprite <symbol id="i-…"> está al comienzo del <body> en index.html). Reemplaza a FontAwesome.
//   ico('fire', 'text-fire')  →  <svg class="ico text-fire" viewBox="…"><use href="#i-fire"/></svg>   (los de estilo "regular" terminan en -r: 'eye-r')
const ICO_VB = {};
const ico = (name, cls = '') => {
  const vb = ICO_VB[name] || (ICO_VB[name] = (document.getElementById('i-' + name) || { getAttribute: () => '0 0 512 512' }).getAttribute('viewBox'));
  return `<svg class="ico${cls ? ' ' + cls : ''}" viewBox="${vb}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
};
const waRaw = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;                       // enlace con mensaje codificado
const wa = t => waRaw('¡Hola Z18! ' + (t ? 'Quiero consultar por: ' + t : 'Quiero hacer un pedido.'));
const PRICE = {};                                                                              // nombre → precio (se completa al renderizar)
const HIST_INICIAL = 3, HIST_PASO = 3;                                                          // historial de pedidos: al principio se ven 3 y cada «Ver más» suma 3 más
const MAX_FAV_PEDIDOS = 5;                                                                      // pedidos favoritos (⭐ del historial): cuántos se pueden fijar a la vez
let favoriteBurger = '', paymentMethod = '', kitchenNotes = '', userOrders = [], histVisibles = HIST_INICIAL, prefsDirty = false, puntosZ = 0;   // perfil del cliente (se carga de Firestore al iniciar sesión)
let perfilListo = false;                                                                        // true cuando ya llegaron de Firestore los datos de la cuenta (los avisos personales de la campanita esperan a eso)
let lifetimeZ = 0, bono500Z = false, misionesZ = {};                                        // Puntos Z acumulados de toda la vida (no bajan al canjear), si ya cobró el bono de los 500 y el estado de sus misiones
let user = null;   // sesión: { name, email, phone, avatar, uid, esLeyenda } se guarda en este dispositivo (nunca la contraseña); { misiones, historial } viven solo en memoria (ver «PUNTOS Z»)
const PANELS = ['cart', 'overlay', 'avisos', 'avisosOverlay', 'auth', 'authOverlay', 'upsell', 'upsellOverlay', 'misionModal', 'misionOverlay', 'clearModal', 'clearOverlay'];
// Deja inerte (sin foco ni clics) el resto de la página mientras hay un panel abierto
const lock = open => [...document.body.children].forEach(el => { if (!PANELS.includes(el.id) && el.tagName !== 'SCRIPT') el.inert = open; });
const key = (n, p) => (PRICE[n] = p, encodeURIComponent(n));

/* ---------- FOTOS DE Z18 ----------
   Las 14 fotos reales pesan ~2 MB en Base64. Si fueran parte de app.js, el menú esperaría a que bajen TODAS antes de dibujarse (y cada cambio de precio obligaría a bajarlas de nuevo).
   Por eso cada una vive en su propio archivo, fotos/<nombre>.js, y se pide SOLA, recién cuando hace falta (ver «CARGA DE FOTOS», más abajo):
   · IMG['clasica'] vale 'foto:clasica' → hasta que llega fotos/clasica.js, imgUrl() devuelve un GIF transparente de 1×1 con el nombre de la foto después del «#»: la tarjeta muestra su fondo
     y ocupa el mismo lugar de siempre (sin saltos de diseño), y photo() no necesita saber nada.
   · fotos/clasica.js hace window.Z18_FOTOS['clasica'] = 'data:image/webp;base64,…'; al llegar, pintarFoto() cambia ese GIF por la foto real en cada <img> que lo esperaba
     (las que se dibujen después ya salen con su foto). El <img> queda igual que si la foto hubiera estado desde el principio.
   · ¿Dónde se busca? Primero en la carpeta fotos/ y, si ahí no está, SUELTA en la raíz del sitio (fotos/clasica.js o clasica.js): así también anda un repositorio sin carpetas (como el logo, que se
     busca en assets/ y, si no, en la raíz). Si no está en ninguno de los dos lugares, o no hay conexión: el menú funciona igual, sin esa foto, y la consola dice qué URLs probó. */
const FOTO_PENDIENTE = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';   // GIF transparente de 1×1: el src de una foto de fotos/ que todavía no llegó
const fotoDe = k => { const v = IMG[k]; return typeof v === 'string' && v.startsWith('foto:') ? v.slice(5) : ''; };   // 'clasica' → 'clasica'; '' si no es una foto de fotos/
const hayFoto = f => { const o = window.Z18_FOTOS; return o && typeof o[f] === 'string' ? o[f] : ''; };            // ya llegó → 'data:image/webp;base64,…' (si el archivo estaba puesto antes de app.js, desde el primer dibujo); si no, ''
const imgUrl = k => {
  const f = fotoDe(k);
  if (f) return hayFoto(f) || `${FOTO_PENDIENTE}#${f}`;                             // todavía no llegó su archivo: el GIF, con su nombre
  const v = IMG[k] || k || '';
  return /^(https?:)?\/|^\.|^data:/.test(v) ? v : `https://images.unsplash.com/photo-${v}?auto=format&fit=crop&w=800&q=75`;
};

/* ── RELOJ DE MONTEVIDEO ──────────────────────────────────────────────────────────────────────────────────────────────
   Todo lo que depende del día o de la hora cuenta con ESTE reloj: las semanas de las misiones, los avisos de la campanita y el indicador Abierto / Cerrado
   del local. Es la hora de Montevideo (UTC-3 todo el año: Uruguay no tiene horario de verano) y NO depende de la zona horaria del celular.
   Semanas de Z18: de lunes 00:00 a domingo 24:00. La semana 0 empieza el lunes 1/1/2024 y cada una dura 7 días. Las reglas de Firestore (semanaVigente en
   firestore.rules) hacen LA MISMA cuenta con el reloj del servidor: si cambiás estas constantes, cambialas también ahí. */
const SEMANA_0_MS = 1704078000000, SEMANA_MS = 604800000;              // lunes 1/1/2024 00:00 (Montevideo) y 7 días, en milisegundos
const semanaDe = ms => Math.floor((ms - SEMANA_0_MS) / SEMANA_MS);     // número de la semana en que cae el instante `ms`
const lunesDe = sem => SEMANA_0_MS + sem * SEMANA_MS;                  // instante del lunes 00:00 en que EMPIEZA la semana `sem`
const DIA_MS = 86400000, DIA = { lun: 0, mar: 1, mie: 2, jue: 3, vie: 4, sab: 5, dom: 6 };
const diaDeSemana = ms => Math.floor((ms - lunesDe(semanaDe(ms))) / DIA_MS);   // 0 = lunes … 6 = domingo, en hora de Montevideo (no depende de la zona del celular)
const medianoche = ms => SEMANA_0_MS + Math.floor((ms - SEMANA_0_MS) / DIA_MS) * DIA_MS;   // instante de las 00:00 (Montevideo) del día en que cae `ms`
const fechaCorta = ms => { const d = new Date(ms - 3 * 3600000); return `${d.getUTCDate()}/${d.getUTCMonth() + 1}`; };   // día/mes en hora de Montevideo (no depende de la zona del celular)
const hhmm = min => `${String(Math.floor(min / 60) % 24).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;       // minutos desde las 00:00 → «20:00» (1440 → «00:00»)
// Temporizador para «el día que viene»: corre `fn` 1 s después de que pasen `ms` milisegundos (setTimeout no admite más de ~24 días: si falta más, se acota y se vuelve a calcular)
const alCabo = (fn, ms) => setTimeout(fn, Math.min(Math.max(ms, 0) + 1000, 2147483647));

/* ── HORARIO DEL LOCAL · indicador «Abierto / Cerrado» de la cabecera ──────────────────────────────────────────────────
   ✏️ HORARIO es la ÚNICA tabla que hay que editar: el indicador lee de acá. Tiene que decir lo mismo que «Nuestros horarios» del pie (index.html, sección #info):
   si cambiás uno, cambiá el otro (test_horario.py lo comprueba). Los días que no figuran (lunes y martes) están cerrados.
      dias    → 'lun' 'mar' 'mie' 'jue' 'vie' 'sab' 'dom'      abre / cierra → 'HH:MM' en hora de Montevideo; '24:00' = medianoche; un turno puede pasar de
      la medianoche ('26:00' = 02:00 de la madrugada siguiente). Un mismo día puede tener varios turnos (dos filas con ese día).
   El indicador se actualiza solo: un único temporizador apunta al próximo cambio (abre, «cierra pronto», cierra, medianoche) y se recalcula al volver a la pestaña. */
const HORARIO = [
  { dias: ['dom', 'mie', 'jue'], abre: '20:00', cierra: '23:00' },
  { dias: ['vie', 'sab'],        abre: '20:00', cierra: '24:00' }
];
const PRONTO_MIN = 30;                                                 // en la última media hora el indicador pasa a «Cerramos pronto»
const TURNOS = Array.from({ length: 7 }, () => []);                    // por día de la semana (0 = lunes): [[abre, cierra], …] en minutos desde las 00:00
const horaAMin = h => { const m = /^(\d{1,2}):([0-5]\d)$/.exec(h); return m ? +m[1] * 60 + +m[2] : NaN; };   // 'HH:MM' → minutos desde las 00:00 (NaN si está mal escrita)
if (!Array.isArray(HORARIO)) console.error('[Z18] HORARIO tiene que ser una lista de filas { dias, abre, cierra }');
else HORARIO.forEach(fila => {                                         // una fila mal escrita no rompe la web: se ignora (o se ignora ese día) y la consola lo cuenta
  const { dias, abre, cierra } = fila || {}, a = horaAMin(abre), c = horaAMin(cierra);
  if (!Array.isArray(dias) || !dias.length || !(a < 1440 && a < c && c <= 2880)) return console.error('[Z18] HORARIO: fila ignorada (dias es una lista; abre y cierra son «HH:MM», abre antes de cierra, hasta «48:00»):', fila);
  dias.forEach(d => Number.isInteger(DIA[d]) ? TURNOS[DIA[d]].push([a, c]) : console.error(`[Z18] HORARIO: día desconocido «${String(d)}» (usá lun mar mie jue vie sab dom): se ignora ese día.`));
});
TURNOS.forEach(t => { t.sort((x, y) => x[0] - y[0]); const m = []; t.forEach(([a, c]) => { const u = m[m.length - 1]; if (u && a <= u[1]) u[1] = Math.max(u[1], c); else m.push([a, c]); }); t.length = 0; t.push(...m); });   // ordena y une los turnos que se pisan o se tocan (12–15 y 15–18 = un solo turno 12–18)
// ¿Abierto en el instante `ms`? → { abierto: true, cierra } o { abierto: false, abre } (abre = el próximo turno, o null si no hay ninguno)
const estadoLocal = ms => {
  const hoy = medianoche(ms), dia = diaDeSemana(ms);
  for (let d = -1; d <= 7; d++) {                                      // ayer (por si su turno pasa de medianoche), hoy y una semana adelante
    for (const [a, c] of TURNOS[(dia + d + 7) % 7]) {
      const abre = hoy + d * DIA_MS + a * 60000, cierra = hoy + d * DIA_MS + c * 60000;
      if (ms >= abre && ms < cierra) return { abierto: true, cierra };
      if (abre > ms) return { abierto: false, abre };                  // el primer turno que todavía no empezó es el próximo
    }
  }
  return { abierto: false, abre: null };
};
const DIAS_LARGOS = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const horaDe = ms => hhmm((ms - medianoche(ms)) / 60000);              // «20:00»
const cuandoEs = (ms, ahora) => {                                      // «hoy a las 20:00 hs» · «mañana a las 20:00 hs» · «el miércoles a las 20:00 hs»
  const dif = Math.round((medianoche(ms) - medianoche(ahora)) / DIA_MS);
  return `${dif === 0 ? 'hoy' : dif === 1 ? 'mañana' : 'el ' + DIAS_LARGOS[diaDeSemana(ms)]} a las ${horaDe(ms)} hs`;
};
// Lo que se escribe en la cabecera: el estado ('abierto' | 'pronto' | 'cerrado') y sus dos líneas
const textoEstado = (e, ahora) => {
  if (!e.abierto) return { estado: 'cerrado', titulo: 'Cerrado ahora', detalle: e.abre ? `Abrimos ${cuandoEs(e.abre, ahora)}` : 'Consultanos por WhatsApp' };
  const pronto = e.cierra - ahora <= PRONTO_MIN * 60000;
  return pronto ? { estado: 'pronto', titulo: 'Cerramos pronto', detalle: `Tomamos pedidos hasta las ${horaDe(e.cierra)} hs` }
    : { estado: 'abierto', titulo: 'Abierto · tomando pedidos', detalle: `Cerramos a las ${horaDe(e.cierra)} hs` };
};
let estadoTimer = null, estadoFirma = '';
const pintarEstadoLocal = () => {
  const el = $('estadoLocal');
  if (!el) return;                                                     // un index.html sin el indicador: no pasa nada
  clearTimeout(estadoTimer);
  try {
    const ahora = Date.now(), e = estadoLocal(ahora), t = textoEstado(e, ahora), firma = `${t.estado}|${t.titulo}|${t.detalle}`;
    if (firma !== estadoFirma) {                                       // solo se toca la pantalla si algo cambió (el lector de pantalla no repite lo mismo)
      estadoFirma = firma; el.dataset.estado = t.estado; $('estadoTitulo').textContent = t.titulo; $('estadoDetalle').textContent = t.detalle;
    }
    // próximo cambio: el cierre (o el aviso de «cierra pronto»); cerrado, la apertura y la medianoche (de «mañana» a «hoy»)
    const cambio = e.abierto ? (t.estado === 'pronto' ? e.cierra : e.cierra - PRONTO_MIN * 60000) : Math.min(e.abre || Infinity, medianoche(ahora) + DIA_MS);
    estadoTimer = alCabo(pintarEstadoLocal, cambio - ahora);
  } catch (err) { console.error('[Z18] No se pudo calcular el estado del local:', err); el.dataset.estado = ''; }   // el indicador es informativo: si falla, se oculta y la web sigue
};
document.addEventListener('visibilitychange', () => { if (!document.hidden) pintarEstadoLocal(); });   // al volver a la pestaña (o despertar el celular) puede haber cambiado
addEventListener('pageshow', e => { if (e.persisted) pintarEstadoLocal(); });                         // volver con «atrás» desde la caché del navegador
pintarEstadoLocal();

/* ================= 3) PLANTILLAS ================= */
// Foto superior de la tarjeta (con etiqueta opcional dentro de la imagen, nunca cortada)
const photo = (k, alt, tag = '', cls = 'aspect-[16/10]') => `
  <div class="photo ${cls}">
    ${ico('fire', 'absolute inset-0 m-auto text-4xl text-fire/30')}
    <img src="${imgUrl(k)}" alt="${alt}" loading="lazy" decoding="async" onerror="this.remove()">
    ${tag ? `<span class="tag">${tag}</span>` : ''}
  </div>`;

// Los dos botones de cada producto: Agregar al Carrito (principal) + Consultar por WhatsApp
const actions = (n, p) => `
  <button type="button" data-add="${key(n, p)}" class="btn-fire flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm">${ico('cart-plus', 'text-lg')} Agregar al Carrito</button>
  <a href="${wa(`${n} (${money(p)})`)}" target="_blank" rel="noopener" class="btn-ghost flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm">${ico('whatsapp', 'text-lg')} Consultar por WhatsApp</a>`;

// Estrella ⭐ de "mi hamburguesa favorita" (se pinta y se guarda desde paintFavorites / toggleFavorite, más abajo)
const favStar = n => `<button type="button" data-fav="${encodeURIComponent(n)}" aria-pressed="false" aria-label="Marcar ${n} como mi favorita" title="Marcar como mi favorita" class="fav-star"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5L2.5 9.5l6.6-.9L12 2.6z"/></svg></button>`;
const card = (i, o) => `
  <article class="menu-card ${o && o.fav ? 'has-fav ' : ''}flex flex-col overflow-hidden rounded-2xl ${i.hot ? '!border-fire/70' : ''}">
    ${o && o.fav ? favStar(i.n) : ''}
    ${photo(i.im, i.n, i.tag)}
    <div class="flex flex-1 flex-col p-5">
      <div class="mb-2 flex items-start justify-between gap-3">
        <h3 class="text-lg font-bold leading-snug text-ink">${i.n}</h3><span class="price-tag">${money(i.p)}</span>
      </div>
      ${i.d ? `<p class="text-sm leading-relaxed text-muted">${i.d}</p>` : ''}
      <div class="mt-auto grid gap-2 pt-4">${actions(i.n, i.p)}</div>
    </div>
  </article>`;

// Fila compacta (extras): nombre + precio, y los mismos dos botones en versión corta
const row = ([n, p]) => `
  <li class="border-b border-dashed border-hairline py-3 last:border-0">
    <div class="flex items-start justify-between gap-3">
      <span class="font-semibold leading-snug text-ink">${n}</span><b class="price-tag !text-2xl">${money(p)}</b>
    </div>
    <div class="mt-3 grid grid-cols-2 gap-2">
      <button type="button" data-add="${key(n, p)}" aria-label="Agregar ${n} al carrito" class="btn-fire flex min-h-11 items-center justify-center gap-2 rounded-xl text-xs">${ico('cart-plus')} Agregar</button>
      <a href="${wa(`${n} (${money(p)})`)}" target="_blank" rel="noopener" aria-label="Consultar ${n} por WhatsApp" class="btn-ghost flex min-h-11 items-center justify-center gap-2 rounded-xl text-xs">${ico('whatsapp', 'text-base')} Consultar</a>
    </div>
  </li>`;

/* ================= 4) RENDER DEL MENÚ ================= */
const fill = (id, arr, fn) => { $(id).innerHTML = arr.map(fn).join(''); };

// Encabezados de sección desde data-t (título), data-s (subtítulo) y data-i (ícono)
document.querySelectorAll('section[data-t]').forEach(s => s.insertAdjacentHTML('afterbegin', `
  <div class="mb-6 text-center">
    <h2 class="font-display text-4xl tracking-wider text-ink sm:text-5xl">${s.dataset.i ? ico(s.dataset.i, 'mr-2 text-fire') : ''}${s.dataset.t}</h2>
    ${s.dataset.s ? `<p class="mt-1 font-brush text-gold sm:text-lg">${s.dataset.s}</p>` : ''}
  </div>`));

fill('burgersGrid', MENU.burgers, i => card(i, { fav: true }));
fill('combosGrid', MENU.combos, card);
fill('milasGrid', MENU.milas, card);
fill('pizzasGrid', MENU.pizzas, card);
fill('promosGrid', MENU.promos, card);
fill('gustos', MENU.gustos, g => `<li class="chip">${ico('plus', 'text-fire')}${g}</li>`);
fill('kidsGrid', MENU.kids, card);
fill('minutasGrid', MENU.minutas, card);
fill('drinksGrid', MENU.drinks, card);
fill('extrasList', MENU.extras, row);

/* ---------- CARGA DE FOTOS ----------
   Con el menú ya dibujado (ver «FOTOS DE Z18»):
   1) se piden las fotos de FOTOS_AL_ENTRAR, con prioridad baja para no competir con lo que la persona está viendo (con el «ahorro de datos» del celular encendido, ninguna);
   2) cada <img> que espera su foto se vigila: cuando se acerca a la pantalla (a 400 px de entrar) y sigue ahí 250 ms, se pide su archivo. Así un salto largo con los chips del menú
      no baja lo que pasa de largo. Las <img> que se dibujen después (Recompensas Z, la favorita de «Mi cuenta») se anotan solas; las de un panel cerrado se piden recién al abrirlo
      (y las de «Mi cuenta», a medida que se baja por el panel);
   3) una foto que se repite (la del Z18 Original está en Hamburguesas, Combos, Reclutas y Recompensas) se pide UNA vez y aparece en todas sus tarjetas a la vez;
   4) cada foto se busca en fotos/ y, si no está, suelta en la raíz (FOTO_LUGARES); el lugar que funcionó se prueba primero en las siguientes. Si no está en ninguno se reintenta dos veces
      (4 y 8 segundos después) y avisa UNA vez por consola, con las dos URLs que probó; si la persona vuelve a pasar por esa foto 30 s más tarde, lo intenta de nuevo. */
const FOTO_ESPERA_MS = 250, FOTO_ANTICIPO = '400px 0px', FOTO_REINTENTO_MS = 30000;
const FOTO_LUGARES = ['fotos/', ''];                                                    // dónde se busca cada foto: la carpeta «fotos» y, si ahí no está, SUELTA en la raíz del sitio (repositorio sin carpetas)
let fotoLugar = 0, fotoAvisoRaiz = false;                                               // el lugar que funcionó la última vez (se prueba primero) · el aviso «están en la raíz» se da UNA sola vez
const urlFoto = (f, lugar) => new URL(`${FOTO_LUGARES[lugar]}${f}.js`, document.baseURI).href;   // la dirección completa, para que la consola no deje dudas de qué se pidió
const PENDIENTES = `img[src^="${FOTO_PENDIENTE}#"]`;                                    // las <img> que esperan su foto
const nombreDe = img => (img.getAttribute('src') || '').slice(FOTO_PENDIENTE.length + 1);   // el nombre que imgUrl() dejó después del «#»
const fotoEstado = {};                                                                  // nombre → 'pidiendo' · { fallo: instante } (la que ya llegó no figura: está en window.Z18_FOTOS)
const esperando = new Map();                                                            // <img> → temporizador: se pide su foto si sigue cerca de la pantalla pasado FOTO_ESPERA_MS
const alVer = es => es.forEach(e => {
  const i = e.target;
  clearTimeout(esperando.get(i)); esperando.delete(i);
  if (e.isIntersecting) esperando.set(i, setTimeout(() => { esperando.delete(i); if (i.isConnected && i.matches(PENDIENTES)) pedirFoto(nombreDe(i)); }, FOTO_ESPERA_MS));
});
const vigia = new IntersectionObserver(alVer, { rootMargin: FOTO_ANTICIPO });          // el mismo recurso que usa la barra de navegación (sección 6): la pantalla es el marco
const vigiaCuenta = new IntersectionObserver(alVer, { root: $('auth'), rootMargin: FOTO_ANTICIPO });   // «Mi cuenta» se desplaza por dentro: ahí los 400 px se miden contra el panel (y mientras está cerrado no se pide nada)
const vigiaDe = img => (img.closest('#auth') ? vigiaCuenta : vigia);
const pintarFoto = f => { const u = hayFoto(f); if (u) document.querySelectorAll(PENDIENTES).forEach(i => { if (nombreDe(i) === f) { i.src = u; vigia.unobserve(i); vigiaCuenta.unobserve(i); } }); };
const pedirFoto = (f, prioridad = '', intento = 1, probados = 0) => {                   // probados = en cuántos FOTO_LUGARES ya no estaba en este intento
  if (!/^[\w-]+$/.test(f)) return console.error(`[Z18] «${f}» no sirve como nombre de foto: usá solo letras, números y guiones en el nombre de la foto.`);
  if (hayFoto(f)) return pintarFoto(f);                                                 // ya estaba (llegó antes, o se puso a mano en el HTML)
  const e = fotoEstado[f];
  if (!probados && intento === 1 && e && (e === 'pidiendo' || performance.now() - e.fallo < FOTO_REINTENTO_MS)) return;   // ya viene en camino, o falló hace poco
  fotoEstado[f] = 'pidiendo';
  const lugar = (fotoLugar + probados) % FOTO_LUGARES.length;
  const s = document.createElement('script');
  s.src = `${FOTO_LUGARES[lugar]}${f}.js`; if (prioridad) s.fetchPriority = prioridad;
  s.onload = () => {
    s.remove();
    if (hayFoto(f)) {
      delete fotoEstado[f]; fotoLugar = lugar; pintarFoto(f);
      if (lugar && !fotoAvisoRaiz) { fotoAvisoRaiz = true; console.warn(`[Z18] Las fotos se cargan sueltas desde la raíz del sitio (${s.src}) porque no existe la carpeta «fotos». Funciona, pero lo ordenado es subirlas a una carpeta «fotos» del repositorio, junto a app.js.`); }
    } else { fotoEstado[f] = { fallo: performance.now() }; console.error(`[Z18] ${s.src} cargó pero no trae la foto «${f}»: no se va a ver. Volvé a subir el archivo ${f}.js que viene con esta versión de app.js.`); }
  };
  s.onerror = () => {
    s.remove();
    if (probados + 1 < FOTO_LUGARES.length) return pedirFoto(f, prioridad, intento, probados + 1);   // ahí no estaba: se prueba el otro lugar enseguida
    if (intento < 3) setTimeout(() => pedirFoto(f, prioridad, intento + 1), intento * 4000);
    else { fotoEstado[f] = { fallo: performance.now() }; console.error(`[Z18] No se pudo cargar la foto «${f}»: no está en ${urlFoto(f, 0)} ni en ${urlFoto(f, 1)}. El menú funciona, pero sin esa foto. ¿Está subida la carpeta «fotos» —o los archivos sueltos— junto a app.js? ¿Hay conexión?`); }
  };
  document.head.appendChild(s);
};
const mirar = nodo => { if (nodo.matches(PENDIENTES)) vigiaDe(nodo).observe(nodo); nodo.querySelectorAll(PENDIENTES).forEach(i => vigiaDe(i).observe(i)); };
mirar(document.body);                                                                   // las del menú, que ya está dibujado…
new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.nodeType === 1) mirar(n); }))).observe(document.body, { childList: true, subtree: true });   // …y las que se dibujen después
// Una imagen de stock (Unsplash) o con URL propia no viene de fotos/: la pide el navegador (con loading="lazy"). Si su sección está en FOTOS_AL_ENTRAR también se pide ya, y el <img> la reutiliza de la caché.
const precargas = new Map();
const precargarUrl = url => { if (precargas.has(url)) return; const i = new Image(); i.fetchPriority = 'low'; i.src = url; precargas.set(url, i); };
try {
  if (!(navigator.connection && navigator.connection.saveData)) (Array.isArray(FOTOS_AL_ENTRAR) ? FOTOS_AL_ENTRAR : []).forEach(sec => {
    if (!Array.isArray(MENU[sec])) return console.warn(`[Z18] FOTOS_AL_ENTRAR: «${sec}» no es una sección de MENU (las hay: ${Object.keys(MENU).filter(k => Array.isArray(MENU[k])).join(', ')}).`);
    MENU[sec].forEach(it => { const f = it && fotoDe(it.im); if (f) pedirFoto(f, 'low'); else if (it && it.im) precargarUrl(imgUrl(it.im)); });
  });
} catch (err) { console.error('[Z18] No se pudieron pedir las fotos de entrada:', err); }

// Mapa producto -> categoría de MENU (para saber si el carrito ya tiene "papas")
const CATEGORY_OF = {};
const mapCat = (cat, list) => (list || []).forEach(it => { CATEGORY_OF[Array.isArray(it) ? it[0] : it.n] = cat; });
['burgers', 'combos', 'milas', 'pizzas', 'promos', 'kids', 'minutas', 'drinks', 'extras']
  .forEach(c => mapCat(c, MENU[c]));

/* ── PUNTOS Z · catálogo de recompensas ───────────────────────────────────────────────
   Regla del programa: cada $25 de compra = 1 Punto Z (Z18 entrega un código con los puntos de cada pedido).
   ✏️ Para cambiar costos o productos editá SOLO esta lista:
      · name  → nombre que ve el cliente (en el carrito y en WhatsApp viaja como "<name> (canje N Puntos Z)")
      · cost  → Puntos Z que cuesta
      · value → el "Valor $X" que se muestra en la tarjeta
      · src   → foto: nombre del archivo (se busca en IMG sin la extensión) o la clave de una foto que ya usa el menú (z18, cola, beer…);
                si no está en IMG usa la foto "fallback"
      · menu  → (opcional) producto del menú al que equivale: es el que "Repetir pedido" vuelve a pedir a precio normal
      · papas → (opcional) cuenta como papas para la oferta del carrito
   ⚖️ Cómo se eligen los puntos: cada Punto Z = $25 de compra, así que un canje de N pts equivale a haber comprado $25 × N. La tasa de retorno
      general es ≈ 5 %: pts ≈ valor ÷ 1,25, redondeado a múltiplos de 5 (ej.: Papas Fritas $180 → 145 pts = $3.625 en compras; Z18 Original $369 → 300 pts = $7.500). */
const PESOS_POR_PUNTO_Z = 25;      // Cada $25 de compra = 1 Punto Z
const TOPE_Z = 1000;               // máximo ABSOLUTO de Puntos Z en la billetera de un cliente
const HITO_Z = 500;                // al acumular (históricos) 500 Puntos Z…
const BONO_HITO_Z = 30;            // …se regalan +30 PTS, una sola vez por cuenta
const RECOMPENSAS_Z = [   // de menor a mayor costo
  { id: 'coca-600',      name: 'Coca-Cola 600 ml',      cost: 70,  value: 90,  src: 'coca600.jpg', fallback: 'cola', menu: 'Coca-Cola 600 ml' },
  { id: 'smith44',       name: 'Smith44 (473 ml)',      cost: 70,  value: 90,  src: 'beer',        menu: 'Smith44 (473 ml)' },
  { id: 'papas-comunes', name: 'Papas Fritas',          cost: 145, value: 180, src: 'papas-comunes.png', menu: 'Papas fritas',              papas: true },
  { id: 'coca-15',       name: 'Coca-Cola 1,5 L',       cost: 145, value: 180, src: 'cola',        menu: 'Coca-Cola 1.5 L' },
  { id: 'papas-cheddar', name: 'Papas Cheddar & Bacon', cost: 185, value: 230, src: 'papas-cheddar.png', menu: 'Papas con cheddar y bacon', papas: true },
  { id: 'pizzeta-muzza', name: 'Pizzeta Muzzarella',    cost: 300, value: 370, src: 'pizzeta-muzza.png' },     // $370 = precio de la carta → $7.500 en compras (≈ 5 %)
  { id: 'z18-original',  name: 'Z18 Original',          cost: 300, value: 369, src: 'z18',         menu: 'Z18 Original' },
  { id: 'combo-z18',     name: 'Combo Z18 Original',    cost: 360, value: 445, src: 'z18',         menu: 'Combo Z18 Original' }
];
const rewardImg = r => { const k = r.src.replace(/\.[a-z0-9]+$/i, ''); return IMG[k] ? k : (r.fallback || k); };   // 'papas-comunes.png' → IMG['papas-comunes']
const nameHtml = r => r.name.replace(/&/g, '&amp;');                          // el "&" de "Cheddar & Bacon" en HTML
const REWARD_SUFFIX = / \(canje \d+ Puntos Z\)$/;                           // sufijo de los ítems canjeados dentro del carrito
const redeemName = r => `${r.name} (canje ${r.cost} Puntos Z)`;
RECOMPENSAS_Z.forEach(r => { PRICE[redeemName(r)] = 0; });                   // un canje cuesta $0 (también al recargar con el carrito guardado)
const REWARD_PAPAS = new Set(RECOMPENSAS_Z.filter(r => r.papas).map(r => r.name));   // nombres de las recompensas que ya son papas

// Canjes que ya NO se ofrecen (se quitaron del catálogo o cambiaron de costo en puntos). Si un cliente ya los había canjeado —puntos descontados— y los
// tiene en su carrito guardado, se siguen aceptando a $0 para que no pierda lo que pagó con sus puntos. No aparecen en el catálogo ni se pueden canjear de nuevo.
// Si volvés a cambiar un costo, sumá acá el [nombre, costo anterior].
const CANJES_RETIRADOS = [
  ['Pizzeta con Salsa', 80], ['Papas Fritas', 35], ['Papas Cheddar & Bacon', 65], ['Pizzeta Muzzarella', 110], ['Pizzeta Muzzarella', 215], ['Coca-Cola 600 ml', 35],
  ['Z18 Original', 140], ['Combo Z18 Original', 170], ['Coca-Cola 1.5 L', 70], ['Smith44 (473 ml)', 35]
].map(([name, cost]) => redeemName({ name, cost }));
CANJES_RETIRADOS.forEach(n => { PRICE[n] = 0; });

/* ================= 5) CARRITO ================= */
let cart = {};                                                     // { nombre: cantidad }
try { cart = JSON.parse(localStorage.getItem('z18-cart')) || {}; } catch (e) { cart = {}; }
Object.keys(cart).forEach(n => { if (PRICE[n] === undefined || !(cart[n] > 0)) delete cart[n]; });   // descarta productos que ya no existen

const count = () => Object.values(cart).reduce((a, b) => a + b, 0);
const total = () => Object.entries(cart).reduce((s, [n, q]) => s + PRICE[n] * q, 0);

// Mensaje automático con el resumen del pedido
const orderText = () => {
  const note = $('note').value.trim();
  const who = user ? `Soy ${user.name}${user.phone ? ' (' + user.phone + ')' : ''}. ` : '';
  const prefs = user && (paymentMethod || kitchenNotes)
    ? '\n\n' + [paymentMethod && `Método de pago preferido: ${paymentMethod}`, kitchenNotes && `Notas de cocina: ${kitchenNotes}`].filter(Boolean).join('\n')
    : '';
  return `¡Hola Z18! ${who}Quiero hacer este pedido:\n\n`
    + Object.entries(cart).map(([n, q]) => `• ${q} x ${n} — ${money(PRICE[n] * q)}`).join('\n')
    + `\n\nTotal: ${money(total())} (envío a coordinar)` + (note ? `\n\nAclaraciones: ${note}` : '') + prefs;
};
const updateSend = () => { $('send').href = count() ? waRaw(orderText()) : '#'; };

const line = ([n, q]) => `
  <div class="panel !p-3">
    <div class="flex items-start justify-between gap-3"><p class="font-semibold leading-snug text-ink">${n}</p><b class="shrink-0 text-fire">${money(PRICE[n] * q)}</b></div>
    <div class="mt-2 flex items-center justify-between">
      <span class="text-xs text-muted">${money(PRICE[n])} c/u</span>
      <div class="flex items-center gap-2">
        <button type="button" data-dec="${encodeURIComponent(n)}" aria-label="Quitar uno: ${n}" class="qty">−</button>
        <b class="w-6 text-center">${q}</b>
        <button type="button" data-inc="${encodeURIComponent(n)}" aria-label="Sumar uno: ${n}" class="qty">+</button>
      </div>
    </div>
  </div>`;

const renderCart = () => {
  const c = count();
  $('cartItems').innerHTML = c ? Object.entries(cart).map(line).join('')
    : `<div class="grid place-items-center gap-2 py-16 text-center text-muted">${ico('burger', 'text-4xl text-fire')}<p class="font-semibold">Tu carrito está vacío</p><p class="text-sm">Sumá productos desde el menú.</p></div>`;
  $('badge').textContent = c;
  $('badge').classList.toggle('hidden', !c);
  $('badge').classList.toggle('grid', !!c);
  $('sub').textContent = $('total').textContent = money(total());
  $('clear').hidden = !c;
  $('send').classList.toggle('opacity-40', !c);
  $('send').classList.toggle('pointer-events-none', !c);
  $('send').setAttribute('aria-disabled', String(!c));
  updateSend();
  try { localStorage.setItem('z18-cart', JSON.stringify(cart)); } catch (e) {}
};

const change = (n, d) => { cart[n] = (cart[n] || 0) + d; if (cart[n] < 1) delete cart[n]; renderCart(); };

const toast = (t, ms = 1800) => {                       // ms: cuánto queda a la vista (los avisos largos piden más)
  const el = $('toast');
  el.textContent = t;
  el.classList.remove('opacity-0', 'translate-y-4');
  clearTimeout(toast.id);
  toast.id = setTimeout(() => el.classList.add('opacity-0', 'translate-y-4'), ms);
};

// Vibración táctil corta al tocar un botón de interacción (si el dispositivo la soporta)
const vibrate = (ms = 50) => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} };

// Un solo listener para todos los botones de agregar / sumar / quitar
document.addEventListener('click', e => {
  const b = e.target.closest('[data-add],[data-inc],[data-dec]');
  if (!b) return;
  try {
    vibrate();
    const raw = b.dataset.add ?? b.dataset.inc ?? b.dataset.dec;
    if (raw === undefined) return;
    const n = decodeURIComponent(raw);
    if (!(n in PRICE)) return;                       // producto desconocido: no rompe el carrito
    if (REWARD_SUFFIX.test(n)) {                     // un canje de Puntos Z es de a una unidad (otra unidad = otro canje)
      if (b.dataset.inc !== undefined) { toast('Cada canje es una unidad. Para otra, canjeala de nuevo en Mi cuenta.'); return; }
      if (b.dataset.dec !== undefined) toast('Quitaste el canje. Los Puntos Z usados no se devuelven.');
    }
    change(n, b.dataset.dec !== undefined ? -1 : 1);
    if (b.dataset.add !== undefined) {
      toast(`Agregado: ${n}`);
      const cb = $('cartBtn'); if (cb) { cb.classList.remove('bump'); void cb.offsetWidth; cb.classList.add('bump'); }
    }
  } catch (err) {
    console.error('Z18 · error al actualizar el carrito:', err);
    toast('Ups, no se pudo actualizar el carrito. Probá de nuevo.');
  }
});

// Abrir / cerrar el panel (el resto de la página queda inerte mientras está abierto)
const setCart = open => {
  $('cart').classList.toggle('translate-x-full', !open);
  $('cart').inert = !open;
  $('overlay').classList.toggle('hidden', !open);
  lock(open);
  document.body.style.overflow = open ? 'hidden' : '';
  (open ? $('cartClose') : $('cartBtn')).focus();
};
$('cartBtn').onclick = () => setCart(true);
$('cartClose').onclick = $('overlay').onclick = () => setCart(false);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('cart').inert && $('clearModal').classList.contains('hidden')) setCart(false); });
$('note').addEventListener('input', updateSend);

// ── «Vaciar carrito»: la lógica de siempre (los canjes de Puntos Z se mantienen), pero ahora pide confirmación ──
const vaciarCarrito = () => {
  const keep = {}; Object.keys(cart).forEach(n => { if (REWARD_SUFFIX.test(n)) keep[n] = cart[n]; });   // los canjes ya se pagaron con puntos: no se borran solos
  cart = keep; renderCart();
  if (Object.keys(keep).length) toast('Vaciamos tu carrito. Tus canjes de Puntos Z se mantienen.');
};
// Cartel de confirmación (evita que un toque sin querer, sobre todo en el celular, tire todo el pedido). Como los canjes no se borran,
// si el carrito solo tiene canjes no hay nada en riesgo y no se pregunta.
let vaciarFoco = null;
const abrirVaciar = () => {
  vaciarFoco = document.activeElement;
  $('clearNote').hidden = !Object.keys(cart).some(n => REWARD_SUFFIX.test(n));
  clearTimeout(toast.id); $('toast').classList.add('opacity-0', 'translate-y-4');    // un aviso viejo («Agregado: …») no tapa los botones del cartel
  $('clearModal').classList.remove('hidden'); $('clearOverlay').classList.remove('hidden'); $('clearModal').inert = false;
  $('cart').inert = true;                                                             // mientras el cartel está abierto, el carrito queda quieto detrás
  $('clearNo').focus();                                                               // el foco arranca en la opción segura: Cancelar
};
const cerrarVaciar = () => {
  $('clearModal').classList.add('hidden'); $('clearOverlay').classList.add('hidden'); $('clearModal').inert = true;
  $('cart').inert = $('cart').classList.contains('translate-x-full');                  // el carrito vuelve a estar activo (sigue abierto detrás)
  const f = vaciarFoco && document.contains(vaciarFoco) && !vaciarFoco.hidden ? vaciarFoco : $('cartClose');   // si «Vaciar carrito» ya no se ve, el foco va a la X
  vaciarFoco = null; f.focus({ preventScroll: true });
};
$('clear').onclick = () => { if (Object.keys(cart).some(n => !REWARD_SUFFIX.test(n))) abrirVaciar(); else vaciarCarrito(); };
$('clearNo').onclick = $('clearOverlay').onclick = () => { vibrate(); cerrarVaciar(); };
$('clearYes').onclick = () => { vibrate(); vaciarCarrito(); cerrarVaciar(); };
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('clearModal').classList.contains('hidden')) cerrarVaciar(); });
renderCart();

/* ================= 5b) CUENTA: iniciar sesión, registro y perfil ================= */
// Google, Facebook y correo/contraseña entran por Firebase Authentication (definido más abajo).
// Lo único que queda en este dispositivo (localStorage z18_users) es el teléfono de contacto,
// porque Firebase no lo pide para estos métodos de acceso.
// Favorita (⭐ del menú), preferencias e historial de pedidos viven en Firestore (users/{uid}) y se cargan al iniciar sesión.
const getUsers = () => { try { return JSON.parse(localStorage.getItem('z18_users')) || []; } catch (e) { return []; } };
const saveUsers = arr => { try { localStorage.setItem('z18_users', JSON.stringify(arr)); } catch (e) {} };
// ─── 🔥 ACCESO CON GOOGLE, FACEBOOK Y CORREO · Firebase Authentication ───
//  Para que funcione en la web publicada, en console.firebase.google.com → proyecto z18-web-64b28 → Authentication:
//   1) Settings → Authorized domains → agregá  z18-web.vercel.app
//   2) Sign-in method → habilitá «Google», «Facebook» Y «Correo electrónico/contraseña»
//      (Facebook además pide el App ID y el App secret de developers.facebook.com).
//   3) En tu app de Facebook → Facebook Login → Valid OAuth Redirect URIs → https://z18-web-64b28.firebaseapp.com/__/auth/handler
//   4) Firestore Database → Crear base de datos (modo Nativo) → elegí una región (ej. southamerica-east1).
//   5) Firestore → pestaña Rules → borrá lo que haya, pegá TODO el contenido del archivo firestore.rules y publicá.
//      ⚠️ Publicá las reglas ANTES de subir esta versión de la web: los topes, el bono y las misiones escriben campos nuevos.
//   6) Puntos Z: en Firestore creá la colección «codigos_puntos». Cada código es un documento cuyo ID es el código en MAYÚSCULAS
//      (ej. Z18-8F3K9Q) con dos campos: puntos (number, ej. 15) y usado (boolean, false). Usá códigos largos y al azar
//      (no Z18-0001, Z18-0002...) para que nadie pueda adivinarlos. Los códigos los crea Z18 a mano: la web no puede crearlos.
//   7) Misiones SEMANALES (Rescate de Miércoles y Combo Completo): cuando un cliente te escribe por WhatsApp para reclamarla, creás en la MISMA colección
//      «codigos_puntos» un código único y al azar que EMPIECE con el prefijo de la misión, con sus campos puntos (number) y usado (false):
//         Z18-M…  (ej. Z18-M84K)  → Rescate de Miércoles       ·          Z18-X…  (ej. Z18-X91W)  → Combo Completo
//      El cliente lo escribe en esa misión (Mi cuenta → Misiones Z18); la web valida el prefijo, suma los puntos y la deja «Completada esta semana».
//      Se renueva sola cada lunes 00:00 (hora de Montevideo). ⚠️ Los códigos comunes (paso 6) NO pueden empezar con Z18-M ni con Z18-X.
//      Podés subir la web y pegar las reglas (paso 5) en cualquier orden; lo ideal es pegar primero las reglas.
const FIREBASE_VERSION = '12.19.0';                  // firebase-app y firebase-auth SIEMPRE con la misma versión
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyADbG0ywKt-RAsaExZsGJ6dVXdI5iMsTkE",
  authDomain: "z18-web-64b28.firebaseapp.com",
  projectId: "z18-web-64b28",
  storageBucket: "z18-web-64b28.firebasestorage.app",
  messagingSenderId: "525311848484",
  appId: "1:525311848484:web:75a5e99938675aa32f68b1",
  measurementId: "G-F48SGPMW5Q"
};
const FB_CDN = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/`;
const IN_APP = /FBAN|FBAV|FB_IAB|Instagram|Line\/|Snapchat|MicroMessenger|TikTok|Bytedance/i.test(navigator.userAgent);   // navegador interno de una app (Instagram, Facebook…)

// El SDK se descarga recién al abrir el módulo de cuenta: la carta no carga peso extra.
let fb = null, fbLoading = null;
const loadFirebase = () => fbLoading || (fbLoading = (async () => {
  const [app, authLib, storeLib] = await Promise.all([
    import(FB_CDN + 'firebase-app.js'), import(FB_CDN + 'firebase-auth.js'), import(FB_CDN + 'firebase-firestore.js')
  ]);
  const ap = app.initializeApp(FIREBASE_CONFIG);
  const auth = authLib.getAuth(ap);
  auth.languageCode = 'es';
  const db = storeLib.getFirestore(ap);
  const google = new authLib.GoogleAuthProvider();
  google.setCustomParameters({ prompt: 'select_account' });            // deja elegir la cuenta (útil en celulares compartidos)
  const facebook = new authLib.FacebookAuthProvider();
  facebook.addScope('email');
  return (fb = { auth, db, providers: { Google: google, Facebook: facebook }, signInWithPopup: authLib.signInWithPopup, signOut: authLib.signOut,
                 signInWithEmailAndPassword: authLib.signInWithEmailAndPassword, createUserWithEmailAndPassword: authLib.createUserWithEmailAndPassword,
                 updateProfile: authLib.updateProfile,
                 // Favorita, preferencias, Puntos Z e historial: todo vive en Firestore (users/{uid}, users/{uid}/orders y codigos_puntos/{código})
                 doc: storeLib.doc, getDoc: storeLib.getDoc, setDoc: storeLib.setDoc, runTransaction: storeLib.runTransaction,
                 collection: storeLib.collection, query: storeLib.query, where: storeLib.where, orderBy: storeLib.orderBy, limit: storeLib.limit, getDocs: storeLib.getDocs,
                 updateDoc: storeLib.updateDoc,
                 serverTimestamp: storeLib.serverTimestamp });
})().catch(e => { fbLoading = null; throw e; }));

// Mensajes claros para el cliente (el detalle técnico queda en la consola del navegador)
const fbError = (e, provider) => {
  const code = (e && e.code) || '';
  console.error('[Z18] Firebase Auth (' + provider + '):', code || e);
  const hint = IN_APP ? ' Estás en el navegador de una app: abrí esta página en Chrome o Safari.' : '';
  switch (code) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request': return 'Cerraste la ventana antes de terminar. Probá de nuevo cuando quieras.' + hint;
    case 'auth/popup-blocked': return `Tu navegador bloqueó la ventana de ${provider}. Permití las ventanas emergentes de este sitio y volvé a tocar el botón.` + hint;
    case 'auth/network-request-failed': return 'No hay conexión. Revisá tu internet e intentá de nuevo.';
    case 'auth/account-exists-with-different-credential': return 'Ese correo ya está registrado con otro método (por ejemplo Google). Entrá con ese método.';
    case 'auth/user-disabled': return 'Esta cuenta está deshabilitada. Escribinos por WhatsApp y lo resolvemos.';
    case 'auth/unauthorized-domain':
    case 'auth/operation-not-allowed':
    case 'auth/operation-not-supported-in-this-environment': return `El acceso con ${provider} todavía no está habilitado en este sitio. Por ahora usá tu correo y contraseña.`;
    default: return `No pudimos conectar con ${provider}. Probá de nuevo o usá tu correo.` + hint;
  }
};

// Mismo criterio que fbError(), pero para signInWithEmailAndPassword / createUserWithEmailAndPassword
const emailError = e => {
  const code = (e && e.code) || '';
  console.error('[Z18] Firebase Auth (correo):', code || e);
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password': return 'Correo o contraseña incorrectos.';
    case 'auth/invalid-email': return 'Ingresá un correo válido.';
    case 'auth/user-disabled': return 'Esta cuenta está deshabilitada. Escribinos por WhatsApp y lo resolvemos.';
    case 'auth/email-already-in-use': return 'Ese correo ya tiene una cuenta. Si te registraste con Google o Facebook, entrá con ese botón; si no, iniciá sesión con tu contraseña.';
    case 'auth/weak-password': return 'Usá una contraseña más segura (al menos 6 caracteres).';
    case 'auth/too-many-requests': return 'Demasiados intentos. Esperá un momento y probá de nuevo.';
    case 'auth/network-request-failed': return 'No hay conexión. Revisá tu internet e intentá de nuevo.';
    case 'auth/operation-not-allowed': return 'El acceso con correo y contraseña todavía no está habilitado en este sitio.';
    default: return 'No pudimos completar la acción. Probá de nuevo.';
  }
};

// ¿Es la misma cuenta? Las de Google/Facebook se reconocen por uid (o por correo); las de correo, por correo.
const sameAccount = (a, b) => (!!b.uid && a.uid === b.uid) || (!!b.email && !!a.email && a.email.toLowerCase() === b.email.toLowerCase());

// Arma el objeto de sesión a partir de un usuario de Firebase (login por correo, Google o Facebook)
const fromFirebaseUser = fu => {
  const pd = (fu.providerData || []).find(p => p && p.email);
  const email = (fu.email || (pd && pd.email) || '').trim();                        // Facebook a veces no comparte el correo
  const name = (fu.displayName || (email && email.split('@')[0]) || 'Cliente Z18').trim();
  const pic = /^https:\/\/[^"'\s)]+$/.test(fu.photoURL || '') ? fu.photoURL : '';
  const extra = getUsers().find(x => sameAccount(x, { uid: fu.uid, email }));       // teléfono guardado, y foto propia si la eligió
  return { name, email, phone: (extra && extra.phone) || '', avatar: (extra && extra.avatar) || pic, uid: fu.uid };
};
const loadOrThrow = async () => {
  if (fb) return fb;
  try { return await loadFirebase(); }
  catch (e) { console.error('[Z18] No se pudo cargar Firebase:', e); throw new Error('No pudimos conectar con el servicio de acceso. Revisá tu conexión e intentá de nuevo (si sigue igual, recargá la página).'); }
};

const AUTH = {
  // Correo y contraseña: Firebase Authentication (signInWithEmailAndPassword). El teléfono no lo pide
  // Firebase para este método, así que queda guardado en este dispositivo (localStorage z18_users).
  async login({ email, password }) {
    const f = await loadOrThrow();
    let cred;
    try { cred = await f.signInWithEmailAndPassword(f.auth, email.trim(), password); }
    catch (e) { throw new Error(emailError(e)); }
    return fromFirebaseUser(cred.user);
  },
  async register({ first, last, email, phone, password }) {
    const f = await loadOrThrow();
    const name = `${first} ${last}`.trim();
    let cred;
    try {
      cred = await f.createUserWithEmailAndPassword(f.auth, email.trim(), password);
      await f.updateProfile(cred.user, { displayName: name }).catch(() => {});   // si falla, esta sesión ya tiene el nombre igual
    } catch (e) { throw new Error(emailError(e)); }
    saveUsers([...getUsers(), { uid: cred.user.uid, email: cred.user.email, phone: phone.trim() }]);
    return { name, email: cred.user.email, phone: phone.trim(), uid: cred.user.uid };
  },
  // Google y Facebook: ventana emergente de Firebase (signInWithPopup) → nombre, correo y foto de la cuenta.
  async social(provider) {
    if (provider !== 'Google' && provider !== 'Facebook') throw new Error(`El acceso con ${provider} todavía no está disponible. Usá Google, Facebook o tu correo.`);
    const f = await loadOrThrow();                      // si el SDK ya está cargado no hay «await» antes del popup: así el navegador no lo bloquea
    let cred;
    try { cred = await f.signInWithPopup(f.auth, f.providers[provider]); }
    catch (e) { throw new Error(fbError(e, provider)); }
    return fromFirebaseUser(cred.user);
  }
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RULES = {                                     // cada regla devuelve '' si está bien, o el mensaje de error
  first: v => v.trim() ? '' : 'Ingresá tu nombre.',
  last: v => v.trim() ? '' : 'Ingresá tu apellido.',
  email: v => !v.trim() ? 'Ingresá tu correo electrónico.' : EMAIL.test(v.trim()) ? '' : 'Ingresá un correo válido, por ejemplo nombre@correo.com.',
  phone: v => v.replace(/\D/g, '').length >= 8 ? '' : 'Ingresá un teléfono válido (al menos 8 dígitos).',
  pass: v => v ? '' : 'Ingresá tu contraseña.',
  newpass: v => v.length >= 8 ? '' : 'Usá al menos 8 caracteres.',
  confirm: v => !v ? 'Confirmá tu contraseña.' : v === $('regPassword').value ? '' : 'Las contraseñas no coinciden.'
};

const GOOGLE = '<svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';

// Campo con etiqueta arriba (asterisco = obligatorio), mensaje de error accesible y ojo para ver la contraseña
const field = (id, name, label, { type = 'text', auto, rule, hint = '' }) => `
  <div>
    <label for="${id}" class="mb-1.5 block text-sm font-semibold text-ink">${label}<span class="text-fire" aria-hidden="true"> *</span></label>
    <div class="relative">
      <input id="${id}" name="${name}" type="${type}" required aria-required="true" autocomplete="${auto}" data-rule="${rule}"
        aria-describedby="${hint ? id + 'Hint ' : ''}${id}Err" class="inp ${type === 'password' ? 'inp-pw' : ''}"
        ${type === 'email' ? 'inputmode="email" autocapitalize="none" spellcheck="false"' : ''} ${type === 'text' ? 'autocapitalize="words"' : ''}>
      ${type === 'password' ? `<button type="button" data-eye="${id}" aria-label="Mostrar contraseña" class="absolute inset-y-0 right-0 grid w-12 place-items-center text-muted">${ico('eye-r')}</button>` : ''}
    </div>
    ${hint ? `<p id="${id}Hint" class="mt-1 text-xs text-muted">${hint}</p>` : ''}
    <p id="${id}Err" role="alert" class="err"></p>
  </div>`;

const submitBtn = txt => `<button type="submit" class="btn-fire flex min-h-12 w-full items-center justify-center rounded-xl px-4 text-sm">${txt}</button>`;
const social = title => `
  <p class="mb-3 mt-2 font-display text-2xl tracking-wide">${title}</p>
  <div class="grid grid-cols-2 gap-2">
    <button type="button" data-social="Google" class="soc soc-g">${GOOGLE}Google</button>
    <button type="button" data-social="Facebook" class="soc soc-f">${ico('facebook-f', 'text-lg')}Facebook</button>
  </div>`;

// Interruptor deslizante (el de «Modo claro» y el del tema del evento comparten esta plantilla): attrs = atributos extra del <input>, aro = clases extra de la pista
const interruptor = (id, attrs = '', aro = '') => `<label class="relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center">
        <input type="checkbox" id="${id}"${attrs} class="peer sr-only">
        <span class="absolute inset-0 rounded-full bg-hairline transition-colors peer-checked:bg-fire${aro}"></span>
        <span class="absolute left-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform peer-checked:translate-x-5"></span>
      </label>`;
$('panes').innerHTML = `
  <form id="loginForm" data-pane="login" data-auth="login" novalidate class="space-y-5">
    <h2 id="loginTitle" class="font-display text-4xl tracking-wide">Iniciar sesión</h2>
    ${field('loginEmail', 'email', 'Correo electrónico', { type: 'email', auto: 'username', rule: 'email' })}
    ${field('loginPassword', 'password', 'Contraseña', { type: 'password', auto: 'current-password', rule: 'pass' })}
    <a href="mailto:${CONTACT}?subject=${encodeURIComponent('Recuperar mi contraseña')}" class="lnk inline-block text-sm">¿Olvidaste tu contraseña?</a>
    ${submitBtn('Iniciar sesión')}
    <p class="err ferr" role="alert"></p>
    ${social('O iniciá sesión con')}
    <p class="text-sm text-muted">¿Aún no estás registrado? <button type="button" data-go="register" class="lnk">Creá una cuenta</button></p>
  </form>

  <form id="regForm" data-pane="register" data-auth="register" novalidate hidden class="space-y-5">
    <h2 id="registerTitle" class="font-display text-4xl tracking-wide">Crear cuenta</h2>
    <div class="grid gap-5 sm:grid-cols-2">
      ${field('regFirst', 'first', 'Nombre', { auto: 'given-name', rule: 'first' })}
      ${field('regLast', 'last', 'Apellido', { auto: 'family-name', rule: 'last' })}
    </div>
    ${field('regEmail', 'email', 'Correo electrónico', { type: 'email', auto: 'email', rule: 'email' })}
    ${field('regPhone', 'phone', 'Teléfono / WhatsApp', { type: 'tel', auto: 'tel', rule: 'phone', hint: 'Para coordinar tu pedido por WhatsApp.' })}
    ${field('regPassword', 'password', 'Contraseña', { type: 'password', auto: 'new-password', rule: 'newpass', hint: 'Mínimo 8 caracteres.' })}
    ${field('regConfirm', 'confirm', 'Confirmar contraseña', { type: 'password', auto: 'new-password', rule: 'confirm' })}
    ${submitBtn('Crear cuenta')}
    <p class="err ferr" role="alert"></p>
    ${social('O registrate con')}
    <p class="text-sm text-muted">¿Ya tenés una cuenta? <button type="button" data-go="login" class="lnk">Iniciá sesión</button></p>
  </form>

  <div data-pane="account" hidden class="space-y-5">
    <h2 id="accountTitle" class="font-display text-4xl tracking-wide">Mi cuenta</h2>
    <div id="avatarFrame" class="relative mx-auto h-24 w-24">
      <div id="avatarView" class="grid h-24 w-24 place-items-center overflow-hidden rounded-full border-2 border-fire bg-cardbg bg-cover bg-center font-display text-3xl text-fire"></div>
      <input type="file" id="avatarInput" accept="image/*" class="hidden">
      <button id="avatarEdit" type="button" aria-label="Cambiar foto de perfil" title="Cambiar foto de perfil"
        class="absolute bottom-0 right-0 z-10 grid h-8 w-8 place-items-center rounded-full border-2 border-darkbg bg-fire text-white shadow-lg transition hover:scale-110">
        ${ico('pencil', 'text-xs')}
      </button>
    </div>
    <p id="leyendaBadge" class="badge-leyenda mx-auto" hidden>${ico('crown')} Leyenda Z18</p>
    <div class="panel !p-4"><p class="text-xs text-muted">Sesión iniciada como</p><p id="accName" class="text-lg font-bold text-ink"></p><p id="accMail" class="break-all text-sm text-muted"></p><p id="accPhone" class="text-sm text-muted"></p></div>

    <div class="panel !p-4" id="puntosZ">
      <div class="text-center">
        <p id="zLabel" class="text-xs font-semibold uppercase tracking-wide text-muted">${ico('coins', 'text-gold')} Tus Puntos Z</p>
        <p id="zBalance" class="font-display text-6xl leading-none text-gold" aria-live="polite">0</p>
        <div id="zMeter" class="z-meter" role="progressbar" aria-label="Tus Puntos Z" aria-valuemin="0" aria-valuemax="${TOPE_Z}" aria-valuenow="0"><div id="zMeterFill" class="z-meter-fill"></div></div>
        <p id="zMeterTxt" class="mt-1 text-[11px] font-semibold text-muted"></p>
        <p id="zMaxMsg" class="z-max-msg" role="status" hidden>🔥 ¡Gastá tus puntos! No se pueden acumular más.</p>
        <p class="mt-1 text-xs text-muted">Cada $${PESOS_POR_PUNTO_Z} de compra = 1 Punto Z</p>
        <p id="zHito" class="mt-1 text-[11px] text-muted2"></p>
      </div>
      <form id="zCodeForm" class="mt-4" autocomplete="off" novalidate>
        <label for="zCode" class="mb-1 block text-xs font-semibold text-muted">¿Tenés un código de tu pedido?</label>
        <div class="flex gap-2">
          <input id="zCode" type="text" maxlength="40" inputmode="text" autocapitalize="characters" autocorrect="off" spellcheck="false" enterkeyhint="done" placeholder="Z18-XXXXXX" class="inp min-w-0 flex-1 uppercase tracking-wider">
          <button id="zCodeBtn" type="submit" class="btn-fire min-h-12 shrink-0 rounded-xl px-4 text-xs">Canjear Código</button>
        </div>
        <p id="zCodeMsg" role="status" aria-live="polite" class="mt-2 min-h-[1.25rem] text-xs"></p>
      </form>
    </div>

    <div id="misionesZ">
      <h3 class="mb-1 font-display text-2xl tracking-wide">Misiones Z18</h3>
      <p class="mb-3 text-xs text-muted">Completá misiones y ganá Puntos Z extra. Las semanales se canjean con un código que te entrega Z18 y se renuevan cada lunes.</p>
      <ul id="misionesList" class="space-y-3"></ul>
    </div>

    <div id="zRewardsBox">
      <h3 class="mb-1 font-display text-2xl tracking-wide">Recompensas Z</h3>
      <p class="mb-3 text-xs text-muted">Tocá Canjear dos veces para confirmar. El producto se suma a tu carrito a $0.</p>
      <div id="zRewards" class="grid grid-cols-2 gap-3"></div>
    </div>

    <div class="panel !p-4">
      <p class="mb-2 text-sm font-semibold text-ink">${ico('star', 'text-gold')} Mi hamburguesa favorita</p>
      <div id="favBox"></div>
    </div>

    <div class="panel !p-4">
      <p class="mb-3 text-sm font-semibold text-ink">${ico('sliders', 'text-fire')} Mis preferencias</p>
      <label for="payMethod" class="mb-1 block text-xs text-muted">Método de pago preferido</label>
      <select id="payMethod" class="inp">
        <option value="">Elegí uno...</option>
        <option value="Efectivo">Efectivo</option>
        <option value="Transferencia">Transferencia</option>
        <option value="Débito">Débito</option>
      </select>
      <label for="kitchenNotes" class="mb-1 mt-3 block text-xs text-muted">Notas habituales de cocina</label>
      <textarea id="kitchenNotes" rows="2" maxlength="200" placeholder="Ej: sin cebolla, extra salsa" class="inp"></textarea>
      <button id="prefsSave" type="button" class="btn-fire mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl text-xs">${ico('floppy-disk')} Guardar Cambios</button>
      <p id="prefsMsg" role="status" aria-live="polite" class="mt-2 text-center text-xs"></p>
    </div>

    <div>
      <h3 class="mb-3 font-display text-2xl tracking-wide">Historial de pedidos</h3>
      <div id="orderHistory" class="space-y-3"></div>
      <div id="histMoreBox" class="mt-3" hidden>
        <button id="histMore" type="button" aria-controls="orderHistory" class="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-hairline text-sm font-bold text-ink transition hover:border-fire active:scale-95">Ver más ${ico('chevron-down', 'text-xs')}</button>
        <p id="histCount" role="status" aria-live="polite" class="mt-2 text-center text-xs text-muted2"></p>
      </div>
    </div>

    <div class="flex items-center justify-between rounded-xl border border-cardborder bg-cardbg px-4 py-3">
      <span class="flex items-center gap-2 text-sm font-semibold text-ink">${ico('sun', 'text-gold')} Modo claro</span>
      ${interruptor('themeToggle')}
    </div>
    <div id="eventoRow" hidden class="!mt-2">
      <div class="flex items-center justify-between rounded-xl border border-cardborder bg-cardbg px-4 py-3">
        <span class="flex items-center gap-2 text-sm font-semibold text-ink"><span id="eventoEmoji" aria-hidden="true"></span><span id="eventoNombre">Tema del evento</span></span>
        ${interruptor('eventoToggle', ' aria-labelledby="eventoNombre"', ' peer-focus-visible:ring-2 peer-focus-visible:ring-gold')}
      </div>
    </div>
    <button id="logout" type="button" class="btn-fire flex min-h-12 w-full items-center justify-center rounded-xl px-4 text-sm">Cerrar sesión</button>
  </div>`;

// Valida un campo: escribe el mensaje, marca aria-invalid y devuelve true si está bien
const check = i => {
  const msg = RULES[i.dataset.rule](i.value), out = $(i.id + 'Err');
  out.textContent = msg; out.classList.remove('ok');
  i.setAttribute('aria-invalid', String(!!msg));
  if (!msg && i.dataset.rule === 'confirm') { out.textContent = '✓ Las contraseñas coinciden'; out.classList.add('ok'); }
  return !msg;
};

// Sesión: solo nombre y correo en este dispositivo (nunca se guarda la contraseña)
try { user = JSON.parse(localStorage.getItem('z18_session')); } catch (e) { user = null; }
if (!user || typeof user.name !== 'string') user = null;
if (user) user.esLeyenda = user.esLeyenda === true;                      // las sesiones guardadas antes de este sistema no traen el campo
// Guarda la sesión en este dispositivo: identidad + estatus Leyenda. El historial y las misiones viven solo en memoria.
const saveSession = () => { try { const { misiones, historial, ...s } = user; localStorage.setItem('z18_session', JSON.stringify(s)); } catch (e) {} };

const initials = n => ((n || 'Z18').trim().match(/\S+/g) || ['Z', '1', '8']).slice(0, 2).map(w => w[0]).join('').toUpperCase();
const paintAvatar = () => {
  const el = $('avatarView');
  if (user && user.avatar) { el.style.backgroundImage = `url("${user.avatar}")`; el.textContent = ''; }
  else { el.style.backgroundImage = ''; el.textContent = user ? initials(user.name) : ''; }
};
const paintUser = () => {
  const b = $('accBtn');
  if (user && user.avatar) { b.replaceChildren(); b.style.backgroundImage = `url("${user.avatar}")`; b.classList.add('bg-cover', 'bg-center'); }
  else {
    b.style.backgroundImage = '';
    if (user) { const s = document.createElement('span'); s.className = 'font-display text-2xl leading-none'; s.textContent = (user.name || '?')[0].toUpperCase(); b.replaceChildren(s); }
    else b.innerHTML = ico('circle-user', 'text-2xl');
  }
  b.classList.toggle('!bg-fire', !!user); b.classList.toggle('!border-fire', !!user); b.classList.toggle('!text-white', !!user);
  b.setAttribute('aria-label', user ? 'Mi cuenta' : 'Iniciar sesión');
  $('accNameTop').textContent = user ? user.name : '';
  $('accName').textContent = user ? user.name : ''; $('accMail').textContent = user ? user.email : '';
  $('accPhone').textContent = user && user.phone ? user.phone : '';
  paintAvatar(); paintLeyenda();
  renderCart();                                       // el pedido de WhatsApp incluye tu nombre y teléfono
  programarAvisos();                                  // entró / salió alguien: la campanita cambia de avisos
};

const show = view => {
  document.querySelectorAll('[data-pane]').forEach(p => { p.hidden = p.dataset.pane !== view; });
  document.querySelectorAll('#auth .err').forEach(e => { e.textContent = ''; e.classList.remove('ok'); });
  document.querySelectorAll('#auth [aria-invalid]').forEach(i => i.removeAttribute('aria-invalid'));
  $('auth').dataset.view = view;
  $('auth').setAttribute('aria-labelledby', view + 'Title');
  (document.querySelector(`[data-pane="${view}"] input`) || $('logout')).focus();
};
const openAuth = (view = user ? 'account' : 'login') => {
  $('auth').classList.remove('hidden'); $('authOverlay').classList.remove('hidden'); $('auth').inert = false;
  lock(true); document.body.style.overflow = 'hidden'; show(view);
  loadFirebase().catch(() => {});                       // precarga el acceso con Google/Facebook para que la ventana abra al instante
  if (view === 'account') { syncEvento(); histVisibles = HIST_INICIAL; renderHistory(); loadProfile(); }   // el historial arranca con los últimos 3; trae puntos, historial, favorita y preferencias desde Firestore
};
const closeAuth = () => {
  $('auth').classList.add('hidden'); $('authOverlay').classList.add('hidden'); $('auth').inert = true;
  lock(false); document.body.style.overflow = ''; $('accBtn').focus();
};

// ---- Upsell al finalizar el pedido: modal con 2 condiciones + límite de rechazos -----
const UPSELL_A_NAME = 'Mejora de papas: cheddar y bacon';          // línea nueva, no es un producto real del menú
const UPSELL_A_PRICE = 50;
PRICE[UPSELL_A_NAME] = UPSELL_A_PRICE;
const UPSELL_B_NAME = 'Papas con cheddar y bacon';                 // ya existe en MENU.minutas a $230
const PAPAS_ALWAYS_CATS = ['burgers', 'combos', 'milas']; // categorías que siempre incluyen papas (hamburguesas —Crispy BBQ incluida—, combos y milanesas al plato)
const PAPAS_MINUTAS = ['Papas fritas', 'Papas con cheddar y bacon', 'Salchipapa Z18']; // minutas que ya son papas

// ¿El carrito actual ya trae papas de algún tipo? (Condición A si true, Condición B si false)
const cartHasPapas = () => Object.keys(cart).some(n => {
  const base = n.replace(REWARD_SUFFIX, '');                        // un ítem canjeado cuenta como el producto real que es
  if (REWARD_SUFFIX.test(n) && REWARD_PAPAS.has(base)) return true;   // papas canjeadas con Puntos Z (Papas Fritas / Cheddar & Bacon), con el costo que tuvieran
  const cat = CATEGORY_OF[base];
  if (PAPAS_ALWAYS_CATS.includes(cat)) return true;
  if (cat === 'minutas' && PAPAS_MINUTAS.includes(base)) return true;
  return false;
});

let rejectCountA = 0;       // veces que rechazó la oferta de $50 (cheddar y bacon sobre papas ya pedidas)
let rejectCountB = 0;       // veces que rechazó la oferta de $230 (porción de papas con cheddar y bacon)
let activeUpsell = null;    // 'A' | 'B' | null: qué oferta está mostrando el modal ahora mismo

const goToWhatsApp = () => {
  updateSend();
  const snap = { items: Object.entries(cart).map(([n, q]) => ({ n, q, p: PRICE[n] })), total: total(), note: $('note').value.trim() };
  window.open($('send').href, '_blank', 'noopener');
  if (user && user.uid && snap.items.length) recordOrder(snap).catch(e => console.error('[Z18] No se pudo guardar el pedido en el historial:', e));
};
// Guarda el pedido en el historial del cliente (Firestore: users/{uid}/orders) y lo vuelve a leer para mostrarlo
const recordOrder = async snap => {
  const uid = user.uid, f = await loadOrThrow();
  await f.setDoc(f.doc(f.collection(f.db, 'users', uid, 'orders')), { ...snap, createdAt: f.serverTimestamp() });
  loadProfile();
};

// Devuelve true si abrió el modal; false si no corresponde mostrar ninguna oferta (bloqueada o ya la tiene)
const openUpsell = () => {
  if (cartHasPapas()) {
    if (rejectCountA >= 2 || cart[UPSELL_A_NAME]) return false;
    activeUpsell = 'A';
    $('upsellText').innerHTML = `¿Deseas agregar <b class="text-ink">Cheddar y Bacon</b> a tus papas por <b class="text-gold">${money(UPSELL_A_PRICE)}</b>?`;
  } else {
    if (rejectCountB >= 2 || cart[UPSELL_B_NAME]) return false;
    activeUpsell = 'B';
    $('upsellText').innerHTML = `¿Deseas agregar una porción de <b class="text-ink">Papas con Cheddar y Bacon</b> por <b class="text-gold">${money(PRICE[UPSELL_B_NAME])}</b>?`;
  }
  $('upsell').classList.remove('hidden'); $('upsellOverlay').classList.remove('hidden'); $('upsell').inert = false;
  lock(true); document.body.style.overflow = 'hidden'; $('upsellNo').focus();
  return true;
};
const closeUpsell = () => {
  $('upsell').classList.add('hidden'); $('upsellOverlay').classList.add('hidden'); $('upsell').inert = true;
  lock(false); document.body.style.overflow = '';
};
const rejectUpsell = () => {
  if (activeUpsell === 'A') rejectCountA++; else if (activeUpsell === 'B') rejectCountB++;
  activeUpsell = null;
  closeUpsell(); goToWhatsApp();
};
const acceptUpsell = () => {
  if (activeUpsell === 'A') change(UPSELL_A_NAME, 1); else if (activeUpsell === 'B') change(UPSELL_B_NAME, 1);
  activeUpsell = null;
  closeUpsell(); goToWhatsApp();
};
$('send').addEventListener('click', e => {
  if (!count()) return;                      // carrito vacío: el botón ya está deshabilitado
  e.preventDefault();
  if (!openUpsell()) goToWhatsApp();          // ofertas bloqueadas o ya agregadas: directo a WhatsApp
});
$('upsellNo').onclick = () => { vibrate(); rejectUpsell(); };
$('upsellYes').onclick = () => { vibrate(); acceptUpsell(); };
$('upsellOverlay').onclick = () => { rejectUpsell(); };
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('upsell').classList.contains('hidden')) rejectUpsell(); });
/* ── Perfil: favorita (⭐ del menú), Puntos Z, preferencias e historial — todo en Firestore ── */
const PAY_METHODS = ['Efectivo', 'Transferencia', 'Débito'];
const FAV_ITEMS = [...MENU.burgers];                                   // las hamburguesas que llevan estrella (Crispy BBQ incluida)

/* ══════════════════════════════ PUNTOS Z ═══════════════════════════════════════════
   Cómo funciona, de punta a punta:
     1. El cliente hace un pedido y Z18 le entrega un CÓDIGO de un solo uso (ej. Z18-8F3K9Q) con los puntos que le tocan
        ($25 = 1 punto). Cada código es un documento de Firestore:   codigos_puntos/{CÓDIGO}  →  { puntos: 15, usado: false }
     2. El cliente lo escribe en "Mi cuenta" y validarCodigoZ() lo valida EN LA NUBE, lo "quema" (usado = true) y le suma los
        puntos a su cuenta (users/{uid}.points) en UNA SOLA operación atómica (transacción): si dos personas ingresan el mismo
        código a la vez, solo una lo consigue, y un código nunca queda quemado sin haber dado sus puntos.
     3. El saldo vive en Firestore, atado a la cuenta del cliente (NO en el celular): editar localStorage no sirve de nada.
        Las reglas de Firestore (paso 5 de las instrucciones, arriba) impiden subir los puntos "a mano".
     4. Topes y estatus: la billetera no pasa de 1000 Puntos Z; al acumular 500 (históricos) se regalan +30; al tocar 1000 por primera
        vez se enciende el estatus «Leyenda Z18» (marco dorado + insignia) y ya NO se apaga. Las Misiones Z18 suman puntos extra. */
let canjeArmado = null, canjeTimer = null, canjeando = false;         // recompensa que espera la 2ª pulsación / canje en curso
class ErrorZ extends Error { constructor(msg, tope = false) { super(msg); this.tope = tope; } }   // errores "para mostrar" al cliente (código inexistente, ya usado, tope de puntos...)
const ptsTxt = n => `${n} ${n === 1 ? 'Punto Z' : 'Puntos Z'}`;
const CODIGO_Z_RE = /^[A-Z0-9][A-Z0-9_-]{2,39}$/;                      // letras, números, guion y guion bajo (un "/" rompería la ruta del documento)

// Mensaje debajo del campo del código (error en rojo, éxito en dorado)
const msgCodigoZ = (texto, ok) => { const m = $('zCodeMsg'); m.textContent = texto; m.className = 'mt-2 min-h-[1.25rem] text-xs ' + (ok ? 'font-semibold text-gold' : 'err'); };

/* ── Billetera de Puntos Z: tope de 1000, bono de los 500 y estatus Leyenda ──────────────────────────────────────────────
   ESTRUCTURA DE LA CUENTA · documento de Firestore  users/{uid}
     points          Puntos Z disponibles (0 … TOPE_Z). Suben con un código o una misión; bajan al canjear una recompensa.
     lifetimePoints  Puntos Z acumulados de toda la vida (solo suben, no bajan al canjear). Al llegar a 500 se cobra el bono de +30.
     bono500         true cuando ya se cobró el bono de los 500 (una sola vez por cuenta).
     esLeyenda       true al llegar a 1000 PTS por primera vez. NUNCA se apaga: si después canjea y baja de 1000, el estatus se queda.
     lastCode        último código canjeado (las reglas de Firestore lo usan para validar el aumento de puntos).
     mis_primerImpacto · mis_embajador   true = misión de «1 vez por cuenta» ya reclamada.
     semMartes · semCombo   NÚMERO DE SEMANA (ver semanaDe) en que se canjeó el código de Rescate de Miércoles / de Combo Completo (0 = nunca).
                            («semMartes» es un nombre histórico, de cuando la misión era del martes: se conserva a propósito para no tocar las cuentas
                            que ya existen ni las reglas de Firestore. Es el campo de «Rescate de Miércoles».)
                            La misión está «Completada» mientras ese número sea el de la semana en curso; cada lunes 00:00 (hora de Montevideo)
                            la semana cambia y la misión vuelve a estar disponible, sin escribir nada. Solo pueden subir (lo exigen las reglas).
     (Si una cuenta vieja trae marcas de misiones de versiones anteriores, la web las ignora.)
   OBJETO DE SESIÓN · variable global `user`
     { name, email, phone, avatar, uid,
       esLeyenda: false,                       ← Estatus VIP permanente (se guarda en este dispositivo y en Firestore)
       misiones:  { primerImpacto: { completada: false }, embajador: { completada: false },
                    rescateMiercoles: { semana: 0 }, comboCompleto: { semana: 0 } },                                 ← solo en memoria
       historial: [ { id, fecha, total, items: [{ n, q }] } ] }                                                      ← solo en memoria */
const MSG_TOPE = `⚠️ Puntos no canjeados. Puntos máximos registrados. Inténtalo de nuevo cuando tengas menos de ${TOPE_Z} pts.`;

// Lee el saldo de un documento users/{uid} (las cuentas viejas no traen los campos nuevos). El saldo nunca pasa del tope.
const leerBilletera = (d = {}) => {
  const bruto = Number.isInteger(d.points) && d.points > 0 ? d.points : 0;
  const lifetime = Number.isInteger(d.lifetimePoints) && d.lifetimePoints >= 0 ? d.lifetimePoints : bruto;   // cuenta vieja: lo acumulado = su saldo
  return { points: Math.min(TOPE_Z, bruto), lifetime, bono500: d.bono500 === true, esLeyenda: d.esLeyenda === true };
};

// Suma `puntos` a la billetera. Pura (no toca Firestore): devuelve el estado nuevo.
//   · nunca pasa de TOPE_Z (lo que sobra no entra)   · el bono de +30 entra una sola vez, cuando lo acumulado llega a 500
//   · esLeyenda se enciende al tocar el tope y NO se apaga nunca
const sumarPuntos = (w, puntos) => {
  let points = w.points, lifetime = w.lifetime, bono500 = w.bono500, bono = 0;
  const acreditados = Math.max(0, Math.min(puntos, TOPE_Z - points));
  points += acreditados; lifetime += acreditados;
  if (!bono500 && lifetime >= HITO_Z && points < TOPE_Z) {                      // si la billetera está llena el bono espera al próximo canje de puntos
    bono = Math.min(BONO_HITO_Z, TOPE_Z - points);
    points += bono; lifetime += bono; bono500 = true;
  }
  return { points, lifetime, bono500, esLeyenda: w.esLeyenda || points >= TOPE_Z, acreditados, bono, perdidos: puntos - acreditados };
};

// Qué se escribe en users/{uid} cuando entran puntos (misma forma para códigos y misiones)
const camposBilletera = r => ({ points: r.points, lifetimePoints: r.lifetime, bono500: r.bono500, ...(r.esLeyenda ? { esLeyenda: true } : {}) });

// Frase del resultado: lo sumado, el bono de los 500 y lo que el tope dejó afuera
const textoCredito = (r, puntos) => {
  let t = `¡Sumaste ${ptsTxt(r.acreditados)}!`;
  if (r.bono) t = `¡Sumaste ${ptsTxt(r.acreditados)} + ${r.bono} de bono por llegar a ${HITO_Z} acumulados!`;
  if (r.perdidos > 0) t += ` El máximo es ${TOPE_Z}: ${ptsTxt(r.perdidos)} no entraron.`;
  return `${t} Ahora tenés ${ptsTxt(r.points)}.`;
};

/* ── Estatus Leyenda Z18 ───────────────────────────────────────────────────────────────────────────── */
// Marco dorado/fuego en el avatar (menú y «Mi cuenta») + insignia «Leyenda Z18». Solo mira user.esLeyenda.
const paintLeyenda = () => {
  const on = !!(user && user.esLeyenda === true);
  $('accBtn').classList.toggle('acc-leyenda', on);
  $('avatarFrame').classList.toggle('avatar-leyenda', on);
  $('leyendaBadge').hidden = !on;
};
// Se llama una sola vez, cuando la billetera toca el tope por primera vez: inyecta esLeyenda: true en el objeto del usuario.
const marcarLeyenda = () => {
  if (!user || user.esLeyenda === true) return false;
  user.esLeyenda = true; saveSession(); paintLeyenda();
  toast(`👑 ¡Llegaste a ${TOPE_Z} Puntos Z! Ya sos Leyenda Z18, para siempre.`, 6000);
  return true;
};

/* ── Misiones Z18 ─────────────────────────────────────────────────────────────────────────────────────
   Hay dos tipos de misión:
   · AUTOMÁTICAS (1 vez por cuenta): «Primer Impacto» y «Embajador Z18». Se validan con el historial de pedidos de la cuenta (obtenerHistorial) o
     con la validación de redes. Cuando se cumplen aparece «Completada»; el cliente toca CANJEAR → modal de confirmación → CONFIRMAR: se aplica el
     código de la misión, se suman los puntos (UNA transacción de Firestore), se muestra el código y la misión queda bloqueada para siempre.
   · SEMANALES: «Rescate de Miércoles» y «Combo Completo». Las controla Z18 (la web no puede saber si hubo una compra de verdad), así que funcionan con un
     CÓDIGO que entrega Z18, con el mismo circuito de Puntos Z:
       1. El cliente hace su pedido (Rescate de Miércoles: un miércoles o jueves · Combo Completo: un pedido con un extra) y escribe por WhatsApp para reclamar.
          El DÍA lo controla Z18 al entregar el código: ni la web ni las reglas lo comprueban (lunes y martes el local está cerrado). Lo único que se hace
          cumplir por código es «1 vez por semana».
       2. Z18 crea en Firestore (colección «codigos_puntos») un código único y al azar con el PREFIJO de la misión:
            Z18-M…  (ej. Z18-M84K)  → Rescate de Miércoles       ·          Z18-X…  (ej. Z18-X91W)  → Combo Completo
          con sus campos puntos (los que corresponden a esa compra) y usado: false, y se lo pasa al cliente.
       3. El cliente lo escribe en la misión que corresponde («Mi cuenta» → Misiones Z18). La web valida el PREFIJO (un Z18-X… no sirve en el Miércoles,
          ni al revés, ni un código común), quema el código y suma los puntos en UNA transacción (validarCodigoZ con `mision`), y deja la misión
          «Completada esta semana» (campo semMartes / semCombo = número de la semana en curso).
       4. RESETEO SEMANAL: la semana va de lunes 00:00 a domingo 24:00 (hora de Montevideo). Cada lunes el número de semana cambia solo y las dos
          misiones vuelven a estar disponibles (no hay nada que borrar ni ningún proceso programado). El cliente repite el proceso la semana siguiente.
     Las reglas de Firestore (firestore.rules) hacen cumplir lo mismo en el servidor: un código con prefijo solo suma si, en la misma operación, queda
     marcada la semana en curso de SU misión (y antes no lo estaba): una vez por semana por misión, aunque alguien salte esta pantalla.
     ⚠️ Los códigos comunes de Puntos Z NO pueden empezar con Z18-M ni Z18-X (esos prefijos son de las misiones semanales).
   ⚠️ Las dos automáticas siguen apoyándose en datos que la web misma registra, por eso valen poco (+20 y +15), se cobran una sola vez por cuenta
      y las reglas de Firestore (firestore.rules) ponen ese tope. Los pedidos de solo canjes ($0) no cuentan como compra. */
const MISION_PREGUNTA = '¿Querés reclamar la recompensa de esta misión? Solo se puede realizar 1 vez por cuenta.';
const MISION_SEMANAL_TXT = 'Solicitá esta recompensa por WhatsApp al enviar tu pedido';

/* Semanas de Z18 (semanaDe, lunesDe, fechaCorta…): están más arriba, en «RELOJ DE MONTEVIDEO» (lunes 00:00 a domingo 24:00, hora de Montevideo). */

const MISIONES = [
  { id: 'primerImpacto', nombre: 'Primer Impacto',    icono: 'bolt',         codigo: 'Z18-PRIMERIMPACTO', puntos: 20, campo: 'mis_primerImpacto',
    req: 'Hacé tu 1.er pedido registrado.' },
  // Semanales: se canjean con un código de Z18 que empieza con `prefijo`; `campo` guarda el número de semana del último canje.
  // `etiqueta` = la recompensa que se muestra a la derecha (los puntos reales son los del código que entrega Z18).
  { id: 'rescateMiercoles', nombre: 'Rescate de Miércoles', icono: 'calendar-day', semanal: true, prefijo: 'Z18-M', campo: 'semMartes', etiqueta: '+10 PTS',   // campo y prefijo: ver «semMartes» más arriba
    req: 'Hacé un pedido un miércoles o jueves y ganá +10 Puntos Z.' },
  { id: 'comboCompleto', nombre: 'Combo Completo',    icono: 'utensils',     semanal: true, prefijo: 'Z18-X', campo: 'semCombo',  etiqueta: '+10 PTS',
    req: 'Pedí con un extra: aderezo, postre o adicional (huevo, bacon, cheddar, medallón).' },
  { id: 'embajador',     nombre: 'Embajador Z18',     icono: 'share-nodes',  codigo: 'Z18-EMBAJADOR',     puntos: 15, campo: 'mis_embajador',
    req: 'Seguinos en TikTok e Instagram y validá tus redes.' }
];
const MISIONES_AUTO = MISIONES.filter(m => !m.semanal);                                  // las que se reclaman con el botón CANJEAR y el modal de confirmación
const MISIONES_SEM = MISIONES.filter(m => m.semanal);                                    // las que se canjean con el código de Z18 (prefijo Z18-M… / Z18-X…)
// Estado de las semanales en pantalla (solo en memoria): lo que el cliente escribió, el último mensaje, si se está verificando un código, y la semana que se dibujó
let semBorrador = {}, semMsg = {}, semEnCurso = {}, semVista = null, lunesTimer = null;
const REDES = [['tiktok', 'TikTok', 'https://www.tiktok.com/@z18oficial'], ['instagram', 'Instagram', 'https://www.instagram.com/z18_oficial']];

// ── Historial de compras ──
const msDe = ts => { try { return ts && typeof ts.toDate === 'function' ? ts.toDate().getTime() : (typeof ts === 'number' ? ts : null); } catch (e) { return null; } };
const normalizarPedido = o => ({
  id: o.id, fecha: msDe(o.createdAt), total: Number(o.total) || 0,
  items: (o.items || []).map(it => ({ n: String(it.n).replace(REWARD_SUFFIX, ''), q: Number(it.q) || 0 }))
});
const obtenerHistorial = () => userOrders.map(normalizarPedido);

// ── «Validación de redes» (Embajador): Z18 no puede comprobar si seguiste las cuentas, así que se valida al abrir las dos ──
const redesKey = () => 'z18_redes_' + (user && user.uid || '');
const leerRedes = () => { try { return JSON.parse(localStorage.getItem(redesKey())) || {}; } catch (e) { return {}; } };
const marcarRed = red => { const r = leerRedes(); r[red] = true; try { localStorage.setItem(redesKey(), JSON.stringify(r)); } catch (e) {} setTimeout(paintMisiones, 80); };

// ── Validación (solo las misiones automáticas): ¿se cumple? → { cumple, progreso, meta, puntos } ──
const evaluarMision = (m, historial) => {
  switch (m.id) {
    case 'primerImpacto': { const compras = historial.filter(o => o.total > 0).length;   // un pedido solo de canjes ($0) no es una compra
      return { cumple: compras >= 1, progreso: Math.min(compras, 1), meta: 1, puntos: m.puntos }; }
    case 'embajador': { const r = leerRedes(), n = REDES.filter(([k]) => r[k]).length; return { cumple: n >= REDES.length, progreso: n, meta: REDES.length, puntos: m.puntos }; }
  }
  throw new Error('Misión sin validación automática: ' + (m && m.id));                  // las semanales nunca llegan acá (se canjean con un código)
};

// ¿Ya la reclamó? (el campo de la cuenta es true) · Solo mira las automáticas: las semanales guardan un número de semana, no un true.
const misionReclamada = (m, d) => !!m.campo && !m.semanal && d[m.campo] === true;
const semanaGuardada = v => (Number.isInteger(v) && v > 0 ? v : 0);                    // número de semana del último canje (0 = nunca; un valor raro cuenta como 0)
// Estado de las misiones que trae la cuenta: las automáticas { completada } y las semanales { semana }
const leerMisiones = (d = {}) => Object.fromEntries(MISIONES.map(m => [m.id, m.semanal ? { semana: semanaGuardada(d[m.campo]) } : { completada: misionReclamada(m, d) }]));
const estadoMision = m => {
  const ev = evaluarMision(m, obtenerHistorial()), hecha = !!(misionesZ[m.id] && misionesZ[m.id].completada);
  return { ...ev, estado: hecha ? 'hecha' : ev.cumple ? 'lista' : 'pend' };
};
// Semanales: ¿ya la canjeó en la semana en curso? (el lunes 00:00 la semana cambia y vuelve a estar disponible)
const semanalHecha = m => semanaGuardada(misionesZ[m.id] && misionesZ[m.id].semana) >= semanaDe(Date.now());

// Tarjeta de una misión SEMANAL (Rescate de Miércoles, Combo Completo): se pide por WhatsApp, Z18 entrega un código con prefijo (Z18-M… / Z18-X…)
// y se canjea acá, en SU misión. Queda «Completada esta semana» hasta el lunes. El texto escrito y los mensajes se pintan aparte (pintarSemanales),
// por DOM: nada de lo que escribe el cliente se mete en el HTML.
const CLS_SEM_MSG = 'mt-2 min-h-[1.25rem] text-xs';
// Cabecera de toda tarjeta de misión (la automática y la semanal): ícono + nombre, el requisito y lo que da (pts = «+20 PTS», «+10 PTS»…)
const misionCabecera = (m, pts) => `
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <p class="flex items-center gap-2 text-sm font-bold text-ink">${ico(m.icono, 'text-gold')} ${m.nombre}</p>
        <p class="mt-0.5 text-xs leading-snug text-muted">${m.req}</p>
      </div>
      <span class="mision-pts">${pts}</span>
    </div>`;
const misionSemanalCard = m => {
  const hecha = semanalHecha(m), enCurso = !!semEnCurso[m.id];
  const cabecera = misionCabecera(m, m.etiqueta);
  if (hecha) return `
  <li class="mision mision-hecha mision-semanal" data-mision-id="${m.id}">${cabecera}
    <div class="mt-2 flex items-center justify-between gap-2"><span class="mision-estado">${ico('lock')} Completada esta semana</span></div>
    <p data-sem-msg="${m.id}" role="status" aria-live="polite" class="${CLS_SEM_MSG}"></p>
    <p class="mt-1 text-[11px] text-muted2">Se renueva el lunes ${fechaCorta(lunesDe(semanaDe(Date.now()) + 1))}</p>
  </li>`;
  return `
  <li class="mision mision-semanal" data-mision-id="${m.id}">${cabecera}
    <p class="mision-wa mt-2">${ico('whatsapp')}<span>${MISION_SEMANAL_TXT}</span></p>
    <form data-sem-form="${m.id}" class="mt-2" autocomplete="off" novalidate>
      <label for="semCode-${m.id}" class="mb-1 block text-xs font-semibold text-muted">Tu código (empieza con ${m.prefijo})</label>
      <div class="flex gap-2">
        <input id="semCode-${m.id}" data-sem-input="${m.id}" type="text" maxlength="40" inputmode="text" autocapitalize="characters" autocorrect="off" spellcheck="false" enterkeyhint="done" placeholder="${m.prefijo}…" class="inp min-w-0 flex-1 uppercase tracking-wider"${enCurso ? ' readonly' : ''}>
        <button type="submit" data-sem-btn="${m.id}" class="btn-fire min-h-12 shrink-0 rounded-xl px-4 text-xs"${enCurso ? ' disabled' : ''}>Canjear</button>
      </div>
      <p data-sem-msg="${m.id}" role="status" aria-live="polite" class="${CLS_SEM_MSG}"></p>
    </form>
    <p class="mt-1 text-[11px] text-muted2">1 vez por semana · se renueva cada lunes</p>
  </li>`;
};
// Mensaje debajo del campo de una misión semanal (error en rojo, éxito en dorado). Queda guardado en semMsg para sobrevivir a un repintado.
const pintarMsgSem = m => {
  const el = document.querySelector(`[data-sem-msg="${m.id}"]`), s = semMsg[m.id];
  if (!el) return;
  el.textContent = s ? s.t : '';
  el.className = CLS_SEM_MSG + (s ? (s.ok ? ' font-semibold text-gold' : ' err') : '');
};
const msgSemanal = (m, texto, ok) => { if (texto) semMsg[m.id] = { t: texto, ok: !!ok }; else delete semMsg[m.id]; pintarMsgSem(m); };

// Tarjeta de una misión automática: estado (En progreso / Completada / Reclamada), recompensa y botón CANJEAR
const misionCard = m => {
  if (m.semanal) return misionSemanalCard(m);
  const e = estadoMision(m), pts = `+${m.puntos} PTS`;
  const estado = e.estado === 'hecha' ? `${ico('lock')} Reclamada`
    : e.estado === 'lista' ? `${ico('check')} Completada` : `En progreso · ${e.progreso}/${e.meta}`;
  const redes = m.id === 'embajador' && e.estado === 'pend'
    ? `<div class="mt-2 flex flex-wrap gap-2">${REDES.map(([k, nombre, url]) =>
        `<a href="${url}" target="_blank" rel="noopener" data-red="${k}" class="mision-red${leerRedes()[k] ? ' ok' : ''}">${ico(k)} ${nombre}${leerRedes()[k] ? ' ' + ico('check') : ''}</a>`).join('')}</div>` : '';
  const accion = e.estado === 'lista' ? `<button type="button" data-mision="${m.id}" class="btn-fire min-h-10 shrink-0 rounded-lg px-4 text-xs">CANJEAR</button>`
    : e.estado === 'hecha' ? `<span class="mision-code" title="Código aplicado">${m.codigo}</span>` : '';
  return `
  <li class="mision mision-${e.estado}" data-mision-id="${m.id}">${misionCabecera(m, pts)}
    ${redes}
    <div class="mt-2 flex items-center justify-between gap-2">
      <span class="mision-estado">${estado}</span>${accion}
    </div>
    <p class="mt-1 text-[11px] text-muted2">1 vez por cuenta</p>
  </li>`;
};
// Reseteo semanal: se repinta solo el lunes 00:00:01 (hora de Montevideo) por si la pantalla quedó abierta de un domingo a un lunes
const programarLunes = () => {
  clearTimeout(lunesTimer);
  lunesTimer = alCabo(paintMisiones, lunesDe(semanaDe(Date.now()) + 1) - Date.now());
};
const paintMisiones = () => {
  programarAvisos();                                                                  // el estado de las misiones cambió: la campanita se entera
  if (!user) return;
  user.misiones = misionesZ; user.historial = obtenerHistorial();                     // estructura del objeto de usuario (ver arriba)
  const sem = semanaDe(Date.now());
  if (semVista !== null && semVista !== sem) semMsg = {};                             // empezó otra semana: los mensajes de la anterior ya no valen
  semVista = sem;
  const act = document.activeElement;                                                 // un repintado no le borra al cliente lo que está escribiendo ni le saca el foco
  const foco = act && act.dataset && act.dataset.semInput ? { id: act.dataset.semInput, a: act.selectionStart, b: act.selectionEnd } : null;
  $('misionesList').innerHTML = MISIONES.map(misionCard).join('');
  MISIONES_SEM.forEach(m => { const i = document.querySelector(`[data-sem-input="${m.id}"]`); if (i) i.value = semBorrador[m.id] || ''; pintarMsgSem(m); });
  if (foco) { const i = document.querySelector(`[data-sem-input="${foco.id}"]`); if (i && !i.readOnly) { i.focus({ preventScroll: true }); try { i.setSelectionRange(foco.a, foco.b); } catch (e) {} } }
  programarLunes();
};

// ── Reclamar (solo misiones automáticas): UNA transacción — revisa que no esté reclamada, aplica el tope/bono, suma los puntos y marca la misión ──
const reclamarMision = async m => {
  if (!m || m.semanal || !m.campo) throw new ErrorZ(MISION_SEMANAL_TXT + '.');         // las semanales no se reclaman con este botón: se canjean con un código
  const e = estadoMision(m);
  if (e.estado === 'hecha') throw new ErrorZ('Esta misión ya fue reclamada.');
  if (e.estado !== 'lista') throw new ErrorZ('Todavía no cumplís los requisitos de esta misión.');
  if (puntosZ >= TOPE_Z) throw new ErrorZ(MSG_TOPE, true);
  const f = await loadOrThrow(), uid = user.uid, ref = f.doc(f.db, 'users', uid), nombre = user.name, email = user.email;
  const r = await f.runTransaction(f.db, async tx => {
    const s = await tx.get(ref), d = s.exists() ? s.data() : {};
    if (misionReclamada(m, d)) throw new ErrorZ('Esta misión ya fue reclamada.');
    const w = leerBilletera(d);
    if (w.points >= TOPE_Z) throw new ErrorZ(MSG_TOPE, true);
    const res = sumarPuntos(w, e.puntos);
    tx.set(ref, { ...camposBilletera(res), [m.campo]: true, nombre, email }, { merge: true });
    return res;
  });
  return { r, puntos: e.puntos };
};

// ── Modal de confirmación ──
let misionActiva = null, reclamando = false, misionFoco = null;
const misionView = (titulo, html) => { $('misionTitle').textContent = titulo; $('misionBody').innerHTML = html; };
const mostrarMision = () => {
  $('misionModal').classList.remove('hidden'); $('misionOverlay').classList.remove('hidden'); $('misionModal').inert = false;
  $('auth').inert = true;                                                             // mientras el modal está abierto, «Mi cuenta» queda quieta detrás
};
const cerrarMision = () => {
  $('misionModal').classList.add('hidden'); $('misionOverlay').classList.add('hidden'); $('misionModal').inert = true;
  $('auth').inert = $('auth').classList.contains('hidden');
  misionActiva = null;
  const f = misionFoco && document.contains(misionFoco) ? misionFoco : $('misionesList').querySelector('button, a');
  misionFoco = null; if (f && f.focus) f.focus({ preventScroll: true });
};
const abrirMision = id => {
  const m = MISIONES_AUTO.find(x => x.id === id);                                     // las semanales no tienen botón CANJEAR ni modal: llevan su propio campo de código
  if (!m || reclamando) return;
  const e = estadoMision(m);
  if (e.estado !== 'lista') return;
  misionActiva = m; misionFoco = document.activeElement;
  misionView(m.nombre, `
    <p id="misionText" class="mb-2 text-sm leading-relaxed text-muted">${MISION_PREGUNTA}</p>
    <p class="mb-5 text-sm text-ink">Recompensa: <b class="text-gold">+${e.puntos} PTS</b></p>
    <div class="grid grid-cols-2 gap-3">
      <button id="misionNo" type="button" class="flex min-h-12 items-center justify-center rounded-xl border border-cardborder px-4 text-sm font-semibold text-muted transition hover:border-hairline">CANCELAR</button>
      <button id="misionYes" type="button" class="btn-fire flex min-h-12 items-center justify-center rounded-xl px-4 text-sm">CONFIRMAR</button>
    </div>`);
  mostrarMision(); $('misionNo').focus();
};
const confirmarMision = async () => {
  const m = misionActiva;
  if (!m || reclamando) return;
  reclamando = true; $('misionYes').disabled = true; $('misionNo').disabled = true; $('misionYes').textContent = 'APLICANDO…';
  try {
    const { r, puntos } = await reclamarMision(m);
    puntosZ = r.points; lifetimeZ = r.lifetime; bono500Z = r.bono500;
    misionesZ[m.id] = { completada: true };
    if (r.esLeyenda) marcarLeyenda();
    paintProfile(); paintPuntosZ(true);
    misionView('¡Misión cumplida!', `
      <p class="text-sm text-muted">Aplicamos el código de <b class="text-ink">${m.nombre}</b> automáticamente:</p>
      <p id="misionCodigo" class="mision-codigo">${m.codigo}</p>
      <p class="mb-5 text-sm text-ink"><b class="text-gold">+${r.acreditados} PTS</b> · ${textoCredito(r, puntos)}</p>
      <button id="misionOk" type="button" class="btn-fire flex min-h-12 w-full items-center justify-center rounded-xl px-4 text-sm">LISTO</button>`);
    $('misionOk').focus();
  } catch (err) {
    const msg = err instanceof ErrorZ ? err.message
      : (err && err.code) === 'unavailable' ? 'No hay conexión. Revisá tu internet e intentá de nuevo.' : 'No pudimos reclamar la misión ahora. Probá de nuevo en un momento.';
    if (!(err instanceof ErrorZ)) console.error('[Z18] No se pudo reclamar la misión:', err);
    misionView(m.nombre, `
      <p id="misionError" class="err mb-5 text-sm !mt-0" role="alert">${msg}</p>
      <button id="misionOk" type="button" class="btn-fire flex min-h-12 w-full items-center justify-center rounded-xl px-4 text-sm">ENTENDIDO</button>`);
    $('misionOk').focus();
    if (err instanceof ErrorZ && !err.tope) loadProfile();                            // p. ej. ya estaba reclamada desde otro dispositivo: se actualiza la lista
  } finally { reclamando = false; }
};

// Tarjeta de una recompensa: foto (o ícono) + costo + barra de progreso + botón Canjear (se habilita si alcanza el saldo)
const rewardCard = r => {
  const ok = puntosZ >= r.cost, pct = Math.min(100, Math.round(puntosZ / r.cost * 100)), armado = canjeArmado === r.name;
  const visual = photo(rewardImg(r), nameHtml(r), '', 'aspect-[4/3]');
  return `
  <article class="menu-card flex flex-col overflow-hidden rounded-2xl">
    ${visual}
    <div class="flex flex-1 flex-col p-3">
      <h4 class="text-sm font-bold leading-snug text-ink">${nameHtml(r)}</h4>
      <p class="text-xs text-muted">Valor ${money(r.value)}</p>
      <p class="mt-1 font-display text-2xl leading-none text-gold">${r.cost} <span class="text-sm">Pts</span></p>
      <div class="mt-2 h-2 overflow-hidden rounded-full bg-hairline/40" role="progressbar" aria-label="Progreso para ${nameHtml(r)}" aria-valuenow="${Math.min(puntosZ, r.cost)}" aria-valuemin="0" aria-valuemax="${r.cost}"><div class="bar-fill h-full rounded-full bg-gold transition-[width]" data-w="${pct}"></div></div>
      <p class="mt-1 text-[11px] font-semibold ${ok ? 'text-gold' : 'text-muted'}">${ok ? '¡Ya podés canjearla!' : `Te faltan ${r.cost - puntosZ} Pts`}</p>
      <button type="button" data-redeem="${encodeURIComponent(r.name)}" ${ok ? '' : 'disabled aria-disabled="true"'} class="btn-fire mt-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl text-xs disabled:cursor-not-allowed disabled:opacity-40">
        ${ico(armado ? 'circle-check' : 'gift')} ${armado ? '¿Confirmar?' : 'Canjear'}
      </button>
    </div>
  </article>`;
};
// El ancho de las barras viaja en data-w y se aplica acá por CSSOM (el HTML ya no lleva estilos en línea)
const setBarras = root => root.querySelectorAll('[data-w]').forEach(el => { el.style.width = el.dataset.w + '%'; });
const renderRecompensas = () => {
  $('zRewards').innerHTML = RECOMPENSAS_Z.map(rewardCard).join(''); setBarras($('zRewards'));
  if (canjeArmado) { const b = $('zRewards').querySelector(`[data-redeem="${encodeURIComponent(canjeArmado)}"]`); if (b) b.focus({ preventScroll: true }); }
};

// Widget del saldo (con un "pop" cuando sube) + barra de puntos + catálogo.
// En el tope (1000) la barra cambia a «👑 TUS PUNTOS Z: 1000 / 1000 (MÁXIMO ALCANZADO)» y aparece el aviso de gastar los puntos.
const paintPuntosZ = animar => {
  programarAvisos();                                                                  // el saldo cambió: la campanita se entera
  const b = $('zBalance'), max = puntosZ >= TOPE_Z;
  b.textContent = String(puntosZ);
  if (animar) { b.classList.remove('z-pop'); void b.offsetWidth; b.classList.add('z-pop'); }
  if (max) $('zLabel').textContent = `👑 TUS PUNTOS Z: ${puntosZ} / ${TOPE_Z} (MÁXIMO ALCANZADO)`;
  else $('zLabel').innerHTML = `${ico('coins', 'text-gold')} Tus Puntos Z`;
  $('puntosZ').classList.toggle('z-max', max);
  $('zMaxMsg').hidden = !max;
  $('zMeterTxt').hidden = max; $('zMeterTxt').textContent = `${puntosZ} / ${TOPE_Z}`;
  $('zMeter').setAttribute('aria-valuenow', String(puntosZ));
  $('zMeter').setAttribute('aria-label', max ? $('zLabel').textContent : 'Tus Puntos Z');
  $('zMeterFill').dataset.w = String(Math.min(100, puntosZ / TOPE_Z * 100)); setBarras($('zMeter'));
  $('zHito').textContent = bono500Z ? `✓ Bono de +${BONO_HITO_Z} PTS cobrado por llegar a ${HITO_Z} Puntos Z acumulados.`
    : `Al acumular ${HITO_Z} Puntos Z ganás +${BONO_HITO_Z} PTS de bono (llevás ${Math.min(lifetimeZ, HITO_Z)}).`;
  renderRecompensas();
};

// ► Canje de códigos. Cada PASO corresponde a un paso del flujo descripto arriba.
async function validarCodigoZ(codigoIngresado, mision = null) {
  // `mision` = una misión SEMANAL (Rescate de Miércoles / Combo Completo) cuando el código se escribió en SU tarjeta; sin `mision` es el cuadro general
  // «¿Tenés un código de tu pedido?». Es el mismo circuito (una transacción que quema el código y suma los puntos); la misión semanal además
  // exige el prefijo correcto (Z18-M… / Z18-X…), deja marcada la semana en curso y no se puede repetir hasta el lunes.
  const say = mision ? (t, ok) => msgSemanal(mision, t, ok) : msgCodigoZ;           // dónde se muestran los mensajes
  const btn = mision ? null : $('zCodeBtn');
  // PASO 0 · Los puntos se guardan en la CUENTA del cliente (no en el celular): hace falta tener la sesión iniciada
  if (!user || !user.uid) return say('Volvé a iniciar sesión para canjear tu código.', false);
  if (mision && semEnCurso[mision.id]) return;                                          // ya se está verificando un código en esta misión

  // PASO 1 · Sanitización
  const codigoLimpio = String(codigoIngresado || '').trim().toUpperCase();
  if (!codigoLimpio) return say('Ingresá tu código.', false);
  // PASO 1b · Billetera llena: con 1000 Puntos Z no se canjea nada (el código queda sin usar para cuando haya lugar)
  if (puntosZ >= TOPE_Z) { say(MSG_TOPE, false); toast(MSG_TOPE, 6000); return; }
  if (MISIONES.some(m => m.codigo === codigoLimpio)) return say('Ese código se aplica solo, desde «Misiones Z18», cuando completás la misión.', false);
  // PASO 1c · Misiones SEMANALES: el PREFIJO del código dice a qué misión pertenece (Z18-M… = Rescate de Miércoles · Z18-X… = Combo Completo).
  //           Cada código solo se canjea en SU misión; el cuadro general no canjea códigos de misión. (Todo esto es local: no toca Firebase.)
  const duena = MISIONES_SEM.find(m => codigoLimpio.startsWith(m.prefijo));
  if (!mision && duena) return say(`Ese código es de «${duena.nombre}». Ingresalo en esa misión, en «Misiones Z18».`, false);
  if (mision && duena !== mision) return say(duena ? `Ese código es de «${duena.nombre}». Ingresalo en esa misión.`
    : `Este código no es de «${mision.nombre}»: los de esta misión empiezan con ${mision.prefijo}. Si es el código de tu pedido, ingresalo en «¿Tenés un código de tu pedido?».`, false);
  if (mision && semanalHecha(mision)) return say(`Ya canjeaste «${mision.nombre}» esta semana. Se renueva el lunes ${fechaCorta(lunesDe(semanaDe(Date.now()) + 1))}.`, false);
  if (!CODIGO_Z_RE.test(codigoLimpio)) return say('El código no existe', false);      // con ese formato no puede existir

  const uid = user.uid, nombre = user.name, email = user.email;
  if (mision) { semEnCurso[mision.id] = true; bloquearSem(mision, true); } else btn.disabled = true;
  say('Verificando tu código…', true);
  try {
    const f = await loadOrThrow();
    // PASO 2 · Consulta a Firestore: el documento del código y el del cliente
    const refCodigo = f.doc(f.db, 'codigos_puntos', codigoLimpio);
    const refCliente = f.doc(f.db, 'users', uid);

    // Los pasos 3 a 5 ocurren dentro de UNA transacción: se lee, se valida, se quema el código y se suman los puntos
    // en la misma operación atómica (así un código no se puede canjear dos veces ni quedar quemado sin dar los puntos).
    const { puntos, r, sem } = await Promise.race([
      f.runTransaction(f.db, async tx => {
        // Primero la billetera: si ya está en el tope se corta ACÁ y el código no se toca (queda sin usar)
        const cliente = await tx.get(refCliente);
        const dc = cliente.exists() ? cliente.data() : {};
        const w = leerBilletera(dc);
        if (w.points >= TOPE_Z) throw new ErrorZ(MSG_TOPE, true);
        // Misión semanal: si la cuenta ya la canjeó en la semana en curso (p. ej. desde otro celular), se corta ACÁ y el código no se toca
        const sem = semanaDe(Date.now());
        if (mision && semanaGuardada(dc[mision.campo]) >= sem)
          throw Object.assign(new ErrorZ(`Ya canjeaste «${mision.nombre}» esta semana. Se renueva el lunes ${fechaCorta(lunesDe(sem + 1))}.`), { yaHecha: true });
        const snapshot = await tx.get(refCodigo);
        // PASO 3 · Validación de existencia
        if (!snapshot.exists()) throw new ErrorZ('El código no existe');
        const datos = snapshot.data();
        // PASO 4 · Validación de uso
        if (datos.usado !== false) throw new ErrorZ('Este código ya fue utilizado');
        const puntos = datos.puntos;
        if (!Number.isInteger(puntos) || puntos <= 0) throw new ErrorZ('Este código no tiene puntos válidos. Escribinos por WhatsApp.');
        // PASO 5 · Quemado del código + acreditación de los puntos (misma operación). También queda quién lo canjeó y cuándo.
        //          sumarPuntos() aplica el tope de 1000, el bono de +30 al llegar a 500 acumulados y el estatus Leyenda.
        //          Misión semanal: en la misma escritura queda marcada la semana en curso (semMartes / semCombo): las reglas de Firestore lo exigen.
        const res = sumarPuntos(w, puntos);
        tx.update(refCodigo, { usado: true, fecha_canje: new Date().toISOString(), canjeado_por: uid });
        tx.set(refCliente, { ...camposBilletera(res), lastCode: codigoLimpio, nombre, email, ...(mision ? { [mision.campo]: sem } : {}) }, { merge: true });
        return { puntos, r: res, sem };
      }),
      new Promise((_, rej) => setTimeout(() => rej(new ErrorZ('Está tardando más de lo normal. Esperá unos segundos y revisá tu saldo antes de volver a intentar.')), 20000))
    ]);

    // PASO 6 · Acreditación e interfaz: actualizar el contador, avisar y limpiar el campo
    if (mision && (!user || user.uid !== uid)) return;                    // mientras se verificaba cerró sesión (o entró otra cuenta): los puntos ya quedaron en SU cuenta; acá no se pinta nada
    puntosZ = r.points; lifetimeZ = r.lifetime; bono500Z = r.bono500;
    if (r.esLeyenda) marcarLeyenda();                                     // 1.ª vez en 1000: esLeyenda = true (queda para siempre)
    if (mision) { misionesZ[mision.id] = { semana: sem }; semBorrador[mision.id] = ''; msgSemanal(mision, textoCredito(r, puntos), true); }   // la tarjeta pasa a «Completada esta semana»
    paintPuntosZ(true); paintMisiones();
    if (!mision) { $('zCode').value = ''; msgCodigoZ(textoCredito(r, puntos), true); }
    toast(r.bono ? `⭐ ¡Sumaste ${ptsTxt(r.acreditados)} + ${r.bono} de bono!` : `⭐ ¡Sumaste ${ptsTxt(r.acreditados)}!`);
  } catch (e) {
    if (mision && (!user || user.uid !== uid)) return;                    // otra sesión: el aviso no es para quien está mirando
    if (e instanceof ErrorZ) {
      say(e.message, false); if (e.tope) toast(e.message, 6000);
      if (/tardando/.test(e.message)) setTimeout(loadProfile, 5000);
      else if (e.yaHecha) loadProfile();                                  // ya estaba canjeada desde otro dispositivo: se actualiza la tarjeta
    } else {
      console.error('[Z18] No se pudo canjear el código:', e);
      const code = e && e.code;
      say(code === 'unavailable' ? 'No hay conexión. Revisá tu internet e intentá de nuevo.'
        : mision && code === 'permission-denied' ? 'No pudimos validar tu código. Revisá que la fecha y la hora de tu celular estén bien y probá de nuevo.'
        : 'No pudimos validar tu código ahora. Probá de nuevo en un momento.', false);
    }
  } finally { if (mision) { if (user && user.uid === uid) { delete semEnCurso[mision.id]; bloquearSem(mision, false); } } else btn.disabled = false; }
}
// Mientras se verifica un código de una misión semanal: el campo queda de solo lectura (conserva el foco) y el botón apagado
const bloquearSem = (m, on) => {
  const i = document.querySelector(`[data-sem-input="${m.id}"]`), b = document.querySelector(`[data-sem-btn="${m.id}"]`);
  if (i) i.readOnly = on; if (b) b.disabled = on;
};
// Misiones semanales: el código se escribe en la tarjeta de SU misión. La lista se repinta, por eso los eventos van delegados en document.
document.addEventListener('submit', e => {
  const f = e.target && e.target.closest && e.target.closest('[data-sem-form]');
  if (!f) return;
  e.preventDefault();
  const m = MISIONES_SEM.find(x => x.id === f.dataset.semForm), i = f.querySelector('[data-sem-input]');
  if (m && i) validarCodigoZ(i.value, m);
});
document.addEventListener('input', e => { const i = e.target && e.target.closest && e.target.closest('[data-sem-input]'); if (i) semBorrador[i.dataset.semInput] = i.value; });

// ► Canjear una recompensa: resta los puntos (transacción en Firestore) y suma el producto al carrito a $0
const canjearRecompensa = async name => {
  const r = RECOMPENSAS_Z.find(x => x.name === name);
  if (!r || !user || !user.uid || canjeando) return;
  canjeando = true;
  const uid = user.uid;
  try {
    const f = await loadOrThrow();
    const ref = f.doc(f.db, 'users', uid);
    const saldo = await f.runTransaction(f.db, async tx => {
      const s = await tx.get(ref);
      const w = leerBilletera(s.exists() ? s.data() : {});
      if (w.points < r.cost) throw new ErrorZ(`Te faltan ${r.cost - w.points} Puntos Z para esta recompensa.`);
      // Solo se restan puntos: lifetimePoints, bono500 y esLeyenda NO se tocan (el estatus Leyenda se conserva para siempre).
      // (Cuenta que ya estaba en 1000 antes de este sistema y todavía no figura como Leyenda: queda registrada ahora.)
      tx.update(ref, { points: w.points - r.cost, ...(w.points >= TOPE_Z && !w.esLeyenda ? { esLeyenda: true } : {}) });
      return w.points - r.cost;
    });
    puntosZ = saldo;
    const rn = redeemName(r);
    cart[rn] = (cart[rn] || 0) + 1; renderCart();
    toast(`🎁 ¡Canjeaste ${r.name}! Ya está en tu carrito`);
  } catch (e) {
    if (e instanceof ErrorZ) { toast(e.message); loadProfile(); }
    else { console.error('[Z18] No se pudo canjear la recompensa:', e); toast('No se pudo canjear. Probá de nuevo.'); }
  } finally { canjeando = false; paintPuntosZ(); }
};

// Pinta las estrellas del menú, resalta la tarjeta de la favorita y actualiza la tarjeta del perfil
const paintFavorites = () => {
  document.querySelectorAll('[data-fav]').forEach(b => {
    const n = decodeURIComponent(b.dataset.fav), on = !!favoriteBurger && n === favoriteBurger;
    b.classList.toggle('is-fav', on);
    b.setAttribute('aria-pressed', String(on));
    b.title = on ? 'Es tu favorita (tocá para quitarla)' : 'Marcar como mi favorita';
    const c = b.closest('.menu-card'); if (c) c.classList.toggle('is-fav-card', on);
  });
  const it = FAV_ITEMS.find(x => x.n === favoriteBurger);
  $('favBox').innerHTML = it
    ? `<div class="flex items-center gap-3"><div class="w-24 shrink-0 overflow-hidden rounded-xl">${photo(it.im, it.n, '', 'aspect-[4/3]')}</div>
         <div class="min-w-0"><p class="text-lg font-bold leading-snug text-ink">${it.n}</p><p class="text-sm text-muted">${money(it.p)}</p></div></div>`
    : `<p class="text-sm text-muted">Todavía no elegiste una favorita. Tocá la ⭐ de cualquier hamburguesa del menú y aparece acá.</p>`;
};

// Un pedido del historial: fecha, resumen de productos y botón para volver a pedir lo mismo
const formatDate = ts => { try { return ts.toDate().toLocaleString('es-UY', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }); } catch (e) { return ''; } };
const STAR_PATH = 'M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5L2.5 9.5l6.6-.9L12 2.6z';   // la misma estrella ⭐ del menú
const historyItem = o => {
  const fav = o.fav === true, fecha = formatDate(o.createdAt), oid = escHtml(o.id);          // nombres e ids vienen de la base: se escapan antes de entrar al HTML
  return `
  <div class="panel !p-3${fav ? ' pedido-fav' : ''}">
    <div class="flex items-start justify-between gap-2">
      <p class="text-xs text-muted">${fecha}</p>
      <div class="flex shrink-0 items-center gap-1"><b class="text-fire">${money(Number(o.total) || 0)}</b>
        <button type="button" data-fav-pedido="${oid}" aria-pressed="${fav}" aria-label="Pedido favorito${fecha ? ' del ' + fecha : ''}" title="${fav ? 'Es tu favorito (tocá para quitarlo)' : 'Marcar como favorito'}" class="fav-pedido"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${STAR_PATH}"/></svg></button></div>
    </div>
    <p class="mt-1 text-sm leading-snug text-ink">${(o.items || []).map(it => `${escHtml(it.q)}× ${escHtml(it.n)}`).join(', ')}</p>
    <button type="button" data-repeat="${oid}" class="btn-ghost mt-2 flex min-h-10 w-full items-center justify-center gap-2 rounded-lg text-xs">${ico('rotate-right')} Repetir pedido</button>
  </div>`;
};
// Orden: los pedidos favoritos (⭐) van fijados arriba y después el resto; dentro de cada grupo, del más nuevo al más viejo.
const ordenHistorial = () => {
  const ms = o => msDe(o.createdAt) || 0, porFecha = (a, b) => ms(b) - ms(a);
  return [...userOrders.filter(o => o.fav === true).sort(porFecha), ...userOrders.filter(o => o.fav !== true).sort(porFecha)];
};
// Se muestran los primeros `histVisibles` pedidos de ese orden (los favoritos y después los más nuevos); si quedan más, aparece «Ver más» con un contador.
// Las misiones siguen leyendo TODOS los pedidos que trae la cuenta (userOrders), no solo los que se ven acá.
const renderHistory = () => {
  programarAvisos();                                                                  // pedidos / favoritos cambiaron: la campanita se entera
  const lista = ordenHistorial(), total = lista.length, n = Math.min(histVisibles, total);
  $('orderHistory').innerHTML = total ? lista.slice(0, n).map(historyItem).join('')
    : `<p class="py-4 text-center text-sm text-muted">Todavía no hiciste ningún pedido.</p>`;
  const quedan = total - n, texto = quedan > 0 ? `Mostrando ${n} de ${total} pedidos` : '';
  $('histMoreBox').hidden = quedan <= 0;
  if ($('histCount').textContent !== texto) $('histCount').textContent = texto;     // el lector de pantalla anuncia solo cuando cambia
};
// «Ver más»: suma HIST_PASO pedidos. El botón vive fuera de la lista, así que conserva el foco entre toques; cuando ya no quedan más desaparece y el foco pasa
// al primer pedido nuevo (para no perder el lugar con teclado o lector de pantalla).
const verMasPedidos = () => {
  const antes = Math.min(histVisibles, userOrders.length);
  histVisibles += HIST_PASO;
  renderHistory();
  if ($('histMoreBox').hidden) { const nuevo = $('orderHistory').children[antes]; if (nuevo) { nuevo.tabIndex = -1; nuevo.focus({ preventScroll: true }); } }
};

// ⭐ de un pedido del historial: lo marca (o lo desmarca) como favorito. Se guarda en el propio pedido (campo fav, en users/{uid}/orders/{id}), así que viaja con
// la cuenta a cualquier celular. Los favoritos quedan resaltados y fijados arriba del historial (ordenHistorial) y se cargan siempre, aunque ya no estén entre los
// últimos 10 pedidos (loadProfile). Se pueden fijar hasta MAX_FAV_PEDIDOS. Como la ⭐ del menú: se marca al instante y, si no se pudo guardar, vuelve atrás.
const favEnVuelo = new Map();                       // id del pedido → valor que se está guardando (mientras tanto, datos viejos que lleguen del servidor no lo pisan)
let favToqueMs = -1e9;                              // instante (performance.now) del último toque en una ⭐: al marcar, la tarjeta cambia de lugar y un 2.º toque casi instantáneo caería en OTRA tarjeta
const FAV_PAUSA_MS = 350;
const aplicarFavPedido = (id, val) => userOrders.forEach(o => { if (o.id === id) o.fav = val; });
const enfocarFavPedido = id => {                    // el repintado recrea los botones: el foco vuelve a la ⭐ del mismo pedido, y se la deja a la vista si el pedido cambió de lugar
  const b = [...document.querySelectorAll('[data-fav-pedido]')].find(x => x.dataset.favPedido === id);
  if (b) { b.focus({ preventScroll: true }); b.scrollIntoView({ block: 'nearest' }); }
};
const toggleFavPedido = async id => {
  if (!user || !user.uid) return;
  const o = userOrders.find(x => x.id === id); if (!o) return;
  const uid = user.uid, prev = o.fav === true, next = !prev;
  if (next && userOrders.filter(x => x.fav === true).length >= MAX_FAV_PEDIDOS) { toast(`Podés fijar hasta ${MAX_FAV_PEDIDOS} pedidos favoritos. Quitá uno para sumar otro.`, 2600); return; }
  if (performance.now() - favToqueMs < FAV_PAUSA_MS) return;                // doble toque sin querer: se ignora (la tarjeta ya se movió de lugar)
  favToqueMs = performance.now();
  aplicarFavPedido(id, next); favEnVuelo.set(id, next); renderHistory(); enfocarFavPedido(id);
  try {
    const f = await loadOrThrow();
    await f.updateDoc(f.doc(f.db, 'users', uid, 'orders', id), { fav: next });
    if (user && user.uid === uid) toast(next ? '⭐ Pedido favorito: quedó fijado arriba' : 'Quitamos el pedido de tus favoritos');
  } catch (e) {
    console.error('[Z18] No se pudo guardar el pedido favorito:', e);
    if (user && user.uid === uid) {
      if (favEnVuelo.get(id) === next) { aplicarFavPedido(id, prev); renderHistory(); enfocarFavPedido(id); }
      toast('No se pudo guardar tu favorito. Probá de nuevo.');
    }
  } finally { if (favEnVuelo.get(id) === next) favEnVuelo.delete(id); }
};

const setPrefsMsg = (t, ok) => { const m = $('prefsMsg'); m.textContent = t; m.className = ok ? 'mt-2 text-center text-xs font-semibold text-gold' : 'err mt-2 text-center'; };
const paintProfile = () => {
  paintPuntosZ(); paintFavorites(); renderHistory(); paintMisiones(); paintLeyenda();
  if (!prefsDirty) { $('payMethod').value = paymentMethod; $('kitchenNotes').value = kitchenNotes; }   // no pisa lo que el cliente está escribiendo
};

// Pedidos favoritos (⭐): los marcados con fav: true, vengan de cuando vengan (los últimos 10 pedidos ya no los incluirían si son viejos)
const cargarPedidosFav = async (f, uid) => (await f.getDocs(f.query(f.collection(f.db, 'users', uid, 'orders'), f.where('fav', '==', true), f.limit(20)))).docs.map(x => ({ id: x.id, ...x.data() }));
// Junta los últimos 10 pedidos con los favoritos (sin repetir), del más nuevo al más viejo. Un favorito que todavía se está guardando manda sobre lo que traiga el servidor.
const mezclarPedidos = (recientes, favs) => {
  const porId = new Map(); [...recientes, ...favs].forEach(o => { if (!porId.has(o.id)) porId.set(o.id, o); });
  return [...porId.values()].map(o => (favEnVuelo.has(o.id) ? { ...o, fav: favEnVuelo.get(o.id) } : o)).sort((a, b) => (msDe(b.createdAt) || 0) - (msDe(a.createdAt) || 0));
};
// Trae de Firestore el saldo de Puntos Z, la favorita, las preferencias, los últimos 10 pedidos del cliente y sus pedidos favoritos
const loadProfile = async () => {
  if (!user || !user.uid) return;
  const uid = user.uid;
  let f; try { f = await loadOrThrow(); } catch (e) { return; }         // sin conexión: el resto de la web sigue andando
  const pFavs = cargarPedidosFav(f, uid).catch(e => { console.error('[Z18] No se pudieron cargar tus pedidos favoritos:', e); return []; });   // en paralelo con lo demás
  let d = null, orders = null;
  try { const s = await f.getDoc(f.doc(f.db, 'users', uid)); d = s.exists() ? s.data() : {}; }
  catch (e) { console.error('[Z18] No se pudo cargar tu perfil:', e); }
  try {
    const q = f.query(f.collection(f.db, 'users', uid, 'orders'), f.orderBy('createdAt', 'desc'), f.limit(10));
    orders = (await f.getDocs(q)).docs.map(x => ({ id: x.id, ...x.data() }));
  } catch (e) { console.error('[Z18] No se pudo cargar tu historial:', e); }
  const favs = await pFavs;
  if (!user || user.uid !== uid) return;                                // mientras cargaba cerró sesión o entró otra cuenta
  if (d) {
    const w = leerBilletera(d);
    puntosZ = w.points; lifetimeZ = w.lifetime; bono500Z = w.bono500;
    misionesZ = leerMisiones(d);
    if ((w.esLeyenda || w.points >= TOPE_Z) && user && user.esLeyenda !== true) { user.esLeyenda = true; saveSession(); }   // el estatus viene del servidor y nunca se apaga
    if (w.points >= TOPE_Z && !w.esLeyenda) f.setDoc(f.doc(f.db, 'users', uid), { esLeyenda: true }, { merge: true }).catch(() => {});   // cuenta que ya estaba en el tope antes de este sistema
    favoriteBurger = FAV_ITEMS.some(x => x.n === d.favoriteBurger) ? d.favoriteBurger : '';
    paymentMethod = PAY_METHODS.includes(d.paymentMethod) ? d.paymentMethod : '';
    kitchenNotes = typeof d.kitchenNotes === 'string' ? d.kitchenNotes : '';
    perfilListo = true;                                                 // ya hay saldo y misiones de verdad: los avisos personales se pueden armar
  }
  if (orders) userOrders = mezclarPedidos(orders, favs);
  paintProfile();
};

// Estrella de una hamburguesa: la marca como favorita (o la quita si ya lo era) y lo guarda en Firestore
const toggleFavorite = async name => {
  if (!user || !user.uid) { toast('Iniciá sesión para guardar tu favorita ⭐'); openAuth('login'); return; }
  const uid = user.uid, prev = favoriteBurger, next = prev === name ? '' : name;
  favoriteBurger = next; paintFavorites();                              // se marca al instante; si no se pudo guardar, vuelve atrás
  try {
    const f = await loadOrThrow();
    await f.setDoc(f.doc(f.db, 'users', uid), { favoriteBurger: next }, { merge: true });
    toast(next ? `⭐ ${next} es tu favorita` : 'Quitamos tu hamburguesa favorita');
  } catch (e) {
    console.error('[Z18] No se pudo guardar la favorita:', e);
    if (favoriteBurger === next) { favoriteBurger = prev; paintFavorites(); }
    toast('No se pudo guardar tu favorita. Probá de nuevo.');
  }
};

// Repetir pedido: vuelve a meter esos mismos productos en el carrito y lo abre.
// Un ítem canjeado se repite al precio normal del producto equivalente del menú; las pizzetas canjeadas no tienen equivalente y se omiten.
const repeatOrder = id => {
  const o = userOrders.find(x => x.id === id);
  if (!o) return;
  let n = 0, skipped = 0;
  (o.items || []).forEach(it => {
    const raw = String(it.n), canje = REWARD_SUFFIX.test(raw), nombre = raw.replace(REWARD_SUFFIX, '');
    const rew = canje ? RECOMPENSAS_Z.find(r => r.name === nombre) : null;   // por nombre: vale aunque el costo en puntos haya cambiado desde ese pedido
    const base = rew ? (rew.menu || '') : nombre;
    const q = Math.min(Math.floor(it.q) || 0, 99);
    if (!base || PRICE[base] === undefined || q < 1) { if (canje) skipped++; return; }   // un producto que ya no está en el menú se omite
    cart[base] = (cart[base] || 0) + q; n++;
  });
  if (!n) { toast(skipped ? 'Ese pedido solo tenía canjes de Puntos Z. Canjeá de nuevo en Mi cuenta.' : 'Esos productos ya no están en el menú'); return; }
  renderCart(); closeAuth(); setCart(true);
  toast(skipped ? 'Sumamos ese pedido (sin los canjes de Puntos Z)' : 'Sumamos ese pedido a tu carrito');
};

/* ══════════════════════════════ AVISOS · LA CAMPANITA 🔔 ════════════════════════════════════════════════
   La campanita de la barra superior cuenta los avisos SIN LEER y abre un panel lateral (como el del carrito) con la lista.
   Los avisos no vienen de ningún servidor: se ARMAN solos, cada vez, mirando el estado de la cuenta (Puntos Z, misiones, pedido favorito) y el día
   (hora de Montevideo). Cada regla de AVISOS_REGLAS recibe ese estado (`c`) y devuelve nada, un aviso o varios:
        { id, orden, icono, etiqueta, titulo, texto, accion? }
     · id        identifica ESA aparición del aviso. Lo leído y lo borrado se recuerda por id: `miercoles:${semana}:${día}` es uno nuevo por día y
                 `fav:${pedido}:${semana}` uno nuevo por semana (el de la semana pasada ya no suma al contador; el de esta sí aparece).
     · orden     prioridad en la lista (menor = más arriba)
     · icono     nombre del ícono del sprite (icons.json) · etiqueta: rótulo chico sobre el título
     · accion    { tipo, texto, dato? } → botón del aviso; `tipo` es una clave de AVISO_ACCIONES
   ➕ Para sumar un aviso nuevo (una promo, un evento…): UNA entrada más en AVISOS_REGLAS. El contador, el panel y lo de leído / borrado ya andan solos.
   💾 Lo leído y lo borrado se guarda en ESTE dispositivo (localStorage `z18_avisos_<uid>`; sin sesión, `z18_avisos_anon`): una clave por cuenta, para no mezclarlas.
   🎨 Los colores de la campanita son variables CSS (--campana-*, en styles.css): un evento (Halloween…) las redefine en html[data-evento="…"]. */
const AVISOS_MAX_MARCAS = 300;                                         // cuántas marcas (leídas / borradas) se recuerdan por cuenta; si hay más, se olvidan las más viejas
const unirLista = (a, y = 'y') => (a.length < 2 ? a.join('') : `${a.slice(0, -1).join(', ')} ${y} ${a[a.length - 1]}`);   // ['A', 'B', 'C'] → «A, B y C»
const ptsLargo = etiqueta => String(etiqueta).replace(/PTS/i, 'Puntos Z');                 // '+10 PTS' → '+10 Puntos Z'
const mision = id => MISIONES.find(m => m.id === id);
const resumenPedido = (o, max = 3) => {                                // «2× Z18 Original, 1× Papas fritas y 1 más»
  const it = normalizarPedido(o).items.filter(x => x.q > 0), txt = it.slice(0, max).map(x => `${x.q}× ${x.n}`).join(', ');
  return it.length > max ? `${txt} y ${it.length - max} más` : txt;
};

// Estado que miran las reglas. Los avisos personales esperan a que lleguen los datos de la cuenta (`listo`): con los de fábrica (0 puntos, sin misiones)
// saldrían avisos falsos que después desaparecerían.
const armarContextoAvisos = ahora => {
  const cuenta = !!(user && user.uid);
  const c = { ahora, sem: semanaDe(ahora), dia: diaDeSemana(ahora), cuenta, listo: !cuenta || perfilListo, puntos: puntosZ, auto: [], favorito: null };
  if (cuenta && c.listo) {
    c.auto = MISIONES_AUTO.map(m => ({ m, e: estadoMision(m) }));
    const f = ordenHistorial()[0]; c.favorito = f && f.fav === true ? f : null;          // el favorito más nuevo (ordenHistorial deja los ⭐ arriba)
  }
  return c;
};

const AVISOS_REGLAS = [
  // 1 · Una misión de «1 vez por cuenta» ya se cumplió y falta reclamarla
  c => c.auto.filter(x => x.e.estado === 'lista').map(({ m }) => ({
    id: `lista:${m.id}`, orden: 10, icono: 'trophy', etiqueta: 'Misión cumplida', titulo: `¡Completaste ${m.nombre}!`,
    texto: `Reclamá tus +${m.puntos} Puntos Z en Mi cuenta.`, accion: { tipo: 'misiones', texto: 'Reclamar' } })),

  // 2 · Rescate de Miércoles: miércoles y jueves (con sesión, mientras no la haya cobrado esta semana). Lunes y martes el local está cerrado.
  c => {
    if (c.dia !== DIA.mie && c.dia !== DIA.jue) return null;
    const m = mision('rescateMiercoles'); if (!m) return null;
    if (c.cuenta && (!c.listo || semanalHecha(m))) return null;
    const miercoles = c.dia === DIA.mie, pts = ptsLargo(m.etiqueta);
    return {
      id: `miercoles:${c.sem}:${c.dia}`, orden: 20, icono: m.icono, etiqueta: 'Misión del día',
      titulo: miercoles ? `¡Hoy es Miércoles de ${m.etiqueta}!` : 'Último día de Rescate de Miércoles',
      texto: c.cuenta
        ? (miercoles ? `Hacé tu pedido hoy o mañana y ganá ${pts}. Pedí tu código por WhatsApp.` : `Hoy es la última chance de la semana: hacé tu pedido y ganá ${pts}. Pedí tu código por WhatsApp.`)
        : (miercoles ? `Iniciá sesión y hacé tu pedido hoy o mañana para ganar ${pts}.` : `Iniciá sesión y hacé tu pedido hoy para ganar ${pts}.`),
      accion: c.cuenta ? { tipo: 'misiones', texto: 'Ver misión' } : { tipo: 'login', texto: 'Iniciar sesión' } };
  },

  // 3 · Puntos Z: máximo, recompensas que ya alcanzan, cuánto falta para la primera, cómo empezar (o, sin cuenta, crear una)
  c => {
    if (!c.cuenta) return { id: 'puntos:anon', orden: 70, icono: 'coins', etiqueta: 'Puntos Z', titulo: 'Creá tu cuenta y sumá Puntos Z',
      texto: `Cada $${PESOS_POR_PUNTO_Z} de compra = 1 Punto Z. Después los canjeás por bebidas, papas, pizzetas y hamburguesas.`, accion: { tipo: 'registro', texto: 'Crear cuenta' } };
    if (!c.listo) return null;
    const p = c.puntos, alcanzan = RECOMPENSAS_Z.filter(r => r.cost <= p).length, min = Math.min(...RECOMPENSAS_Z.map(r => r.cost));
    if (p >= TOPE_Z) return { id: 'puntos:tope', orden: 30, icono: 'crown', etiqueta: 'Puntos Z', titulo: '¡Llegaste al máximo de Puntos Z!',
      texto: `Tenés ${ptsTxt(p)} y no se pueden acumular más. Canjeá una recompensa en Mi cuenta.`, accion: { tipo: 'recompensas', texto: 'Ver recompensas' } };
    if (alcanzan) return { id: `puntos:canje:${alcanzan}`, orden: 30, icono: 'gift', etiqueta: 'Puntos Z',
      titulo: alcanzan === 1 ? '¡Ya podés canjear una recompensa!' : `¡Ya podés canjear ${alcanzan} recompensas!`,
      texto: `Tenés ${ptsTxt(p)}. Elegí la tuya en Mi cuenta.`, accion: { tipo: 'recompensas', texto: 'Ver recompensas' } };
    if (p > 0) return { id: 'puntos:faltan', orden: 70, icono: 'coins', etiqueta: 'Puntos Z', titulo: `Te faltan ${ptsTxt(min - p)} para tu primera recompensa`,
      texto: `Tenés ${ptsTxt(p)}. Con ${min} ya podés canjear ${unirLista(RECOMPENSAS_Z.filter(r => r.cost === min).map(r => r.name), 'o')}.`, accion: { tipo: 'puntos', texto: 'Ver mis puntos' } };
    return { id: 'puntos:cero', orden: 70, icono: 'coins', etiqueta: 'Puntos Z', titulo: 'Empezá a sumar Puntos Z',
      texto: `Cada $${PESOS_POR_PUNTO_Z} de compra = 1 Punto Z. Al hacer tu pedido, pedí tu código por WhatsApp y canjealo en Mi cuenta.`, accion: { tipo: 'puntos', texto: 'Ver mis puntos' } };
  },

  // 4 · Pedido favorito (⭐ del historial): recordatorio semanal para repetirlo con un toque
  c => {
    if (!c.favorito) return null;
    const r = resumenPedido(c.favorito);
    return { id: `fav:${c.favorito.id}:${c.sem}`, orden: 40, icono: 'star', etiqueta: 'Tu favorito', titulo: 'Tu pedido favorito te espera',
      texto: r ? `${r}. Repetilo con un toque.` : 'Repetilo con un toque.', accion: { tipo: 'repetir', texto: 'Repetir pedido', dato: c.favorito.id } };
  },

  // 5 · Lunes: las misiones semanales se renovaron
  c => {
    if (!c.cuenta || !c.listo || c.dia !== DIA.lun) return null;
    const pend = MISIONES_SEM.filter(m => !semanalHecha(m)); if (!pend.length) return null;
    return { id: `semana:${c.sem}`, orden: 50, icono: 'bolt', etiqueta: 'Nueva semana', titulo: '¡Nueva semana, nuevas misiones!',
      texto: `Se renovaron ${unirLista(pend.map(m => `${m.nombre} (${m.etiqueta})`))}. Pedí por WhatsApp y reclamá tu código.`, accion: { tipo: 'misiones', texto: 'Ver misiones' } };
  },

  // 6 · Combo Completo: de viernes a domingo, si todavía no la cobró esta semana
  c => {
    if (!c.cuenta || !c.listo || c.dia < DIA.vie) return null;
    const m = mision('comboCompleto'); if (!m || semanalHecha(m)) return null;
    return { id: `combo:${c.sem}`, orden: 55, icono: m.icono, etiqueta: 'Misión semanal', titulo: `Esta semana: ${m.nombre}`,
      texto: `${m.req} Ganás ${ptsLargo(m.etiqueta)}.`, accion: { tipo: 'misiones', texto: 'Ver misión' } };
  },

  // 7 · Misiones de «1 vez por cuenta» que todavía no se cumplen
  c => c.auto.filter(x => x.e.estado === 'pend').map(({ m }) => ({
    id: `mision:${m.id}`, orden: 60, icono: m.icono, etiqueta: 'Misión', titulo: m.nombre, texto: `${m.req} Ganás +${m.puntos} Puntos Z.`, accion: { tipo: 'misiones', texto: 'Ver misión' } }))
];

// Lo leído y lo borrado: { leidas: { id: instante }, borradas: { id: instante } } por cuenta. Objetos sin prototipo: un id raro nunca pisa nada del lenguaje.
let avisosMem = {};                                                    // copia en memoria (si el navegador no deja usar localStorage, p. ej. en modo privado, igual se recuerda mientras la página siga abierta)
const sinProto = o => Object.assign(Object.create(null), o);
const avisosClave = () => 'z18_avisos_' + (user && user.uid ? user.uid : 'anon');
const marcasValidas = o => sinProto(Object.fromEntries(Object.entries(o && typeof o === 'object' && !Array.isArray(o) ? o : {}).filter(([k, v]) => k.length <= 160 && Number.isFinite(v))));
const avisosMarcas = () => {
  const k = avisosClave();
  if (!avisosMem[k]) {
    let raw = null; try { raw = JSON.parse(localStorage.getItem(k)); } catch (e) {}
    avisosMem[k] = { leidas: marcasValidas(raw && raw.leidas), borradas: marcasValidas(raw && raw.borradas) };
  }
  return avisosMem[k];
};
const guardarMarcas = () => {
  const m = avisosMarcas();
  ['leidas', 'borradas'].forEach(t => {                                // demasiadas: se olvidan las más viejas
    const e = Object.entries(m[t]); if (e.length > AVISOS_MAX_MARCAS) m[t] = sinProto(Object.fromEntries(e.sort((a, b) => b[1] - a[1]).slice(0, AVISOS_MAX_MARCAS)));
  });
  try { localStorage.setItem(avisosClave(), JSON.stringify({ v: 1, leidas: m.leidas, borradas: m.borradas })); } catch (e) {}
};

// Corre todas las reglas (una que falle no apaga la campanita), descarta lo borrado y marca lo leído
const calcularAvisos = ahora => {
  const c = armarContextoAvisos(ahora), m = avisosMarcas(), vistos = new Set(), out = [];
  AVISOS_REGLAS.forEach(regla => {
    let r = null; try { r = regla(c); } catch (e) { console.error('[Z18] Una regla de avisos falló:', e); }
    [].concat(r || []).forEach(a => {
      if (!a || !a.id || vistos.has(a.id) || m.borradas[a.id]) return;
      vistos.add(a.id); out.push({ ...a, leido: !!m.leidas[a.id] });
    });
  });
  return out.sort((a, b) => (a.orden || 99) - (b.orden || 99));
};

let avisos = [], avisosPend = false, avisosSinLeer = null, avisosTimer = null;
const sinLeer = () => avisos.filter(a => !a.leido).length;
const avisosAbiertos = () => !$('avisos').inert;

// Botón de la barra: contador (9+ si son más), borde de color mientras haya algo nuevo y un «campanazo» cuando llega un aviso nuevo
const pintarCampanita = () => {
  const n = sinLeer(), btn = $('bellBtn'), badge = $('bellBadge');
  badge.textContent = n > 9 ? '9+' : String(n); badge.hidden = n === 0;
  btn.classList.toggle('tiene-avisos', n > 0);
  btn.setAttribute('aria-label', n ? `Avisos, ${n} sin leer` : 'Avisos');
  if (avisosSinLeer !== null && n > avisosSinLeer && !avisosAbiertos()) { btn.classList.remove('campana-ring'); void btn.offsetWidth; btn.classList.add('campana-ring'); }
  avisosSinLeer = n;
};

// Un aviso del panel. Todo lo que no es nuestro se escapa. Sin leer: el cuerpo es un botón (tocarlo lo marca leído); leído: texto quieto.
const avisoItem = a => {
  const sin = !a.leido, ac = a.accion, id = escHtml(a.id);
  const cuerpo = `<span class="aviso-tag">${escHtml(a.etiqueta || '')}</span><span class="aviso-titulo">${escHtml(a.titulo)}</span><span class="aviso-texto">${escHtml(a.texto)}</span>`;
  return `
  <li class="aviso${sin ? ' aviso-nuevo' : ''}" data-aviso="${id}">
    <span class="aviso-ico" aria-hidden="true">${ico(a.icono || 'bell')}</span>
    <div class="min-w-0 flex-1">
      ${sin ? `<button type="button" class="aviso-cuerpo" data-aviso-leer="${id}"><span class="sr-only">Sin leer. </span>${cuerpo}</button>` : `<div class="aviso-cuerpo">${cuerpo}</div>`}
      ${ac ? `<button type="button" class="btn-fire aviso-accion" data-aviso-accion="${escHtml(ac.tipo)}" data-aviso-id="${id}"${ac.dato ? ` data-aviso-dato="${escHtml(ac.dato)}"` : ''}>${escHtml(ac.texto)}</button>` : ''}
    </div>
  </li>`;
};
const renderAvisos = () => {
  const n = sinLeer(), hay = avisos.length > 0, cargando = !!(user && user.uid) && !perfilListo;
  $('avisosResumen').textContent = cargando ? 'Cargando tu cuenta…' : n ? `${n} sin leer` : hay ? 'Estás al día' : 'Sin avisos por ahora';
  $('avisosLeerTodo').disabled = n === 0; $('avisosLimpiar').disabled = !hay;
  $('avisosLista').innerHTML = hay ? avisos.map(avisoItem).join('') : `
    <li class="aviso-vacio">${ico('check-double', 'text-3xl text-gold')}
      <p class="mt-3 font-display text-2xl tracking-wide">${cargando ? 'Cargando tus avisos…' : 'Estás al día'}</p>
      <p class="mt-1 text-xs leading-relaxed text-muted">${cargando ? 'Un segundo, estamos trayendo los datos de tu cuenta.' : 'No hay avisos por ahora. Cuando haya misiones, Puntos Z o novedades de tu pedido favorito, aparecen acá.'}</p>
    </li>`;
  if (avisosAbiertos() && document.activeElement === document.body) $('avisosClose').focus();   // el repintado se llevó el botón que tenía el foco
};

// Recalcula todo (y, si el panel está abierto, lo repinta). `programarAvisos` junta varios pedidos seguidos en uno solo: se llama desde los pintores de
// Puntos Z, misiones, historial y cuenta, así que la campanita nunca queda desactualizada, venga el cambio de donde venga.
const refrescarAvisos = () => {
  const ahora = Date.now();
  try { avisos = calcularAvisos(ahora); } catch (e) { console.error('[Z18] No se pudieron armar los avisos:', e); avisos = []; }
  pintarCampanita();
  if (avisosAbiertos()) renderAvisos();
  clearTimeout(avisosTimer);                                           // a la medianoche de Montevideo cambia el día (el aviso del miércoles pasa al del jueves, etc.)
  avisosTimer = alCabo(programarAvisos, medianoche(ahora) + DIA_MS - ahora);
};
const programarAvisos = () => { if (avisosPend) return; avisosPend = true; queueMicrotask(() => { avisosPend = false; refrescarAvisos(); }); };
document.addEventListener('visibilitychange', () => { if (!document.hidden) programarAvisos(); });   // al volver a la pestaña (o despertar el celular) puede haber cambiado el día

// Marcar: `leidas` (baja el contador) o `borradas` (sale de la lista). Es por id: la próxima aparición (otro día, otra semana) vuelve a ser nueva.
const marcarAvisos = (tipo, ids) => { const m = avisosMarcas(), t = Date.now(); ids.forEach(id => { m[tipo][id] = t; }); guardarMarcas(); refrescarAvisos(); };

// Abrir / cerrar el panel: igual que el carrito (el resto de la página queda inerte mientras está abierto)
const abrirAvisos = () => {
  if (avisosAbiertos()) return;
  refrescarAvisos();
  $('avisos').classList.remove('translate-x-full'); $('avisos').inert = false; $('avisosOverlay').classList.remove('hidden');
  $('bellBtn').setAttribute('aria-expanded', 'true');
  lock(true); document.body.style.overflow = 'hidden';
  renderAvisos(); $('avisosClose').focus();
};
const cerrarAvisos = () => {
  if (!avisosAbiertos()) return;
  $('avisos').classList.add('translate-x-full'); $('avisos').inert = true; $('avisosOverlay').classList.add('hidden');
  $('bellBtn').setAttribute('aria-expanded', 'false');
  lock(false); document.body.style.overflow = '';
  $('bellBtn').focus();
};

// Botón de un aviso: lleva a la parte de la web que corresponde. `dato` viaja en data-aviso-dato (ej. el id del pedido a repetir).
const irACuenta = seccion => {                                         // abre «Mi cuenta» y baja hasta esa parte
  openAuth('account');
  requestAnimationFrame(() => { const el = $(seccion); if (el) el.scrollIntoView({ block: 'start' }); });
};
const AVISO_ACCIONES = {
  login:       () => openAuth('login'),
  registro:    () => openAuth('register'),
  misiones:    () => irACuenta('misionesZ'),
  puntos:      () => irACuenta('puntosZ'),
  recompensas: () => irACuenta('zRewardsBox'),
  repetir:     id => repeatOrder(id)                                   // suma el pedido al carrito y lo abre (cierra «Mi cuenta» si estaba abierta)
};
const ejecutarAviso = btn => {
  const { avisoAccion: tipo, avisoId: id, avisoDato: dato } = btn.dataset;
  marcarAvisos('leidas', [id]);                                        // tocar el botón de un aviso también lo da por leído
  cerrarAvisos();
  if (Object.prototype.hasOwnProperty.call(AVISO_ACCIONES, tipo)) AVISO_ACCIONES[tipo](dato);
};
const leerAviso = id => {
  marcarAvisos('leidas', [id]);
  const li = [...document.querySelectorAll('#avisosLista [data-aviso]')].find(x => x.dataset.aviso === id);
  const f = (li && li.querySelector('[data-aviso-accion]')) || document.querySelector('#avisosLista [data-aviso-leer]') || $('avisosClose');   // el botón que se tocó ya no existe: el foco sigue en el mismo aviso o pasa al próximo sin leer
  f.focus({ preventScroll: true });
};

$('bellBtn').onclick = abrirAvisos;
$('avisosClose').onclick = $('avisosOverlay').onclick = cerrarAvisos;
$('avisosLeerTodo').onclick = () => {
  vibrate(); marcarAvisos('leidas', avisos.map(a => a.id));
  ($('avisosLimpiar').disabled ? $('avisosClose') : $('avisosLimpiar')).focus();                  // el botón que se apagó no puede quedarse con el foco
};
$('avisosLimpiar').onclick = () => { vibrate(); marcarAvisos('borradas', avisos.map(a => a.id)); $('avisosClose').focus(); };
$('avisosLista').addEventListener('click', e => {
  const ac = e.target.closest('[data-aviso-accion]');
  if (ac) { vibrate(); ejecutarAviso(ac); return; }
  const le = e.target.closest('[data-aviso-leer]');
  if (le) { vibrate(); leerAviso(le.dataset.avisoLeer); }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && avisosAbiertos()) cerrarAvisos(); });

document.addEventListener('click', e => {
  const mb = e.target.closest('[data-mision]');                           // CANJEAR en una misión → modal de confirmación
  if (mb) { vibrate(); abrirMision(mb.dataset.mision); return; }
  const rd = e.target.closest('[data-red]');                              // Embajador: al abrir cada red queda marcada (el enlace sigue su camino)
  if (rd) { marcarRed(rd.dataset.red); return; }
  if (e.target.closest('#misionYes')) { vibrate(); confirmarMision(); return; }
  if (e.target.closest('#misionNo, #misionOk') || e.target === $('misionOverlay')) { if (!reclamando) cerrarMision(); return; }
  const sb = e.target.closest('[data-fav]');
  if (sb) { vibrate(); toggleFavorite(decodeURIComponent(sb.dataset.fav)); return; }
  const rb = e.target.closest('[data-redeem]');
  if (rb) {
    if (rb.disabled || canjeando) return;
    vibrate();
    const name = decodeURIComponent(rb.dataset.redeem);
    clearTimeout(canjeTimer);
    if (canjeArmado !== name) {                                         // 1ª pulsación: pide confirmación (se cancela sola a los 4 s)
      canjeArmado = name; renderRecompensas();
      canjeTimer = setTimeout(() => { canjeArmado = null; renderRecompensas(); }, 4000);
    } else { canjeArmado = null; canjearRecompensa(name); }             // 2ª pulsación: canjea
    return;
  }
  if (e.target.closest('#histMore')) { vibrate(); verMasPedidos(); return; }
  const fp = e.target.closest('[data-fav-pedido]');
  if (fp) { vibrate(); toggleFavPedido(fp.dataset.favPedido); return; }
  const hb = e.target.closest('[data-repeat]');
  if (hb) repeatOrder(hb.dataset.repeat);
});
$('zCodeForm').addEventListener('submit', e => { e.preventDefault(); validarCodigoZ($('zCode').value); });

// Guardar Cambios: método de pago preferido + notas habituales de cocina
['input', 'change'].forEach(ev => ['payMethod', 'kitchenNotes'].forEach(id => $(id).addEventListener(ev, () => { prefsDirty = true; setPrefsMsg(''); })));
$('prefsSave').onclick = async () => {
  if (!user || !user.uid) return;
  const uid = user.uid, btn = $('prefsSave');
  const pay = PAY_METHODS.includes($('payMethod').value) ? $('payMethod').value : '', notes = $('kitchenNotes').value.trim().slice(0, 200);
  btn.disabled = true; setPrefsMsg('Guardando…', true);
  try {
    const f = await loadOrThrow();
    const save = f.setDoc(f.doc(f.db, 'users', uid), { paymentMethod: pay, kitchenNotes: notes }, { merge: true });
    await Promise.race([save, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 10000))]);
    paymentMethod = pay; kitchenNotes = notes; prefsDirty = false; $('kitchenNotes').value = notes;
    setPrefsMsg('✓ Preferencias guardadas', true); toast('Guardamos tus preferencias ✓');
  } catch (e) {
    console.error('[Z18] No se pudo guardar las preferencias:', e);
    setPrefsMsg('No pudimos guardar tus preferencias. Revisá tu conexión e intentá de nuevo.', false);
  } finally { btn.disabled = false; }
};

if (user && user.uid) loadProfile();                                    // visitante que vuelve con la sesión abierta: pinta su saldo y su favorita

const signIn = u => {
  user = { name: String(u.name || u.email || 'Cliente Z18').slice(0, 60), email: u.email || '', phone: u.phone || '', avatar: u.avatar || '', uid: u.uid || '', esLeyenda: false };
  perfilListo = false;                                  // la cuenta recién entró: sus datos todavía no llegaron
  saveSession();
  paintUser(); closeAuth(); toast(`¡Hola, ${user.name}!`);
  loadProfile();                                        // trae favorita, preferencias e historial (y pinta las estrellas del menú)
};

$('accBtn').onclick = () => openAuth();
$('authOverlay').onclick = closeAuth;
$('authBack').onclick = () => $('auth').dataset.view === 'register' ? show('login') : closeAuth();   // «Atrás»
$('logout').onclick = () => {
  user = null; try { localStorage.removeItem('z18_session'); } catch (e) {}
  loadFirebase().then(f => f.signOut(f.auth)).catch(() => {});   // correo, Google o Facebook: las 3 cierran sesión en Firebase
  puntosZ = lifetimeZ = 0; bono500Z = false; misionesZ = {}; semBorrador = {}; semMsg = {}; semEnCurso = {}; semVista = null; clearTimeout(lunesTimer); canjeArmado = null; msgCodigoZ(''); $('zCode').value = ''; favoriteBurger = paymentMethod = kitchenNotes = ''; userOrders = []; favEnVuelo.clear(); histVisibles = HIST_INICIAL; prefsDirty = false; perfilListo = false; setPrefsMsg('');   // que la próxima cuenta no vea estos datos
  paintProfile();
  paintUser(); closeAuth(); toast('Sesión cerrada');
};

// Avatar: se lee como Base64 y se guarda tanto en z18_users (permanente) como en la sesión activa
$('avatarEdit').onclick = () => $('avatarInput').click();
$('avatarInput').onchange = e => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file || !user) return;
  if (!file.type.startsWith('image/')) return toast('Elegí un archivo de imagen.');
  if (file.size > 2 * 1024 * 1024) return toast('La imagen pesa mucho, probá con una de hasta 2 MB.');
  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = reader.result;
    user = { ...user, avatar: dataUrl };
    saveUsers(getUsers().map(u => sameAccount(u, user) ? { ...u, avatar: dataUrl } : u));
    saveSession();
    paintUser(); toast('Foto de perfil actualizada');
  };
  reader.onerror = () => toast('No pudimos leer esa imagen, probá de nuevo.');
  reader.readAsDataURL(file);
};

// Modo claro/oscuro: variables CSS en :root / [data-theme="light"], preferencia guardada en localStorage
const THEME_KEY = 'z18_theme';
const applyTheme = t => {
  document.documentElement.setAttribute('data-theme', t === 'light' ? 'light' : 'dark');
  $('themeToggle').checked = t === 'light';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', t === 'light' ? '#f7f4ef' : '#0a0b0d');
};
let savedTheme = 'dark'; try { savedTheme = localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark'; } catch (e) {}
applyTheme(savedTheme);
$('themeToggle').onchange = e => {
  const t = e.target.checked ? 'light' : 'dark';
  applyTheme(t);
  try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
};

// Tema del evento (Halloween…): si event-manager.js tiene un evento en curso (window.Z18Events), «Mi cuenta» muestra su interruptor.
// El gestor es el dueño de la elección (la aplica al instante y la guarda en localStorage, clave z18_evento_off); acá solo se refleja en pantalla.
const syncEvento = () => {
  const ev = window.Z18Events;
  $('eventoRow').hidden = !ev;                          // sin evento (o si el mod falló y se retiró): no hay interruptor
  if (!ev) return;
  $('eventoEmoji').textContent = ev.emoji || '';
  $('eventoNombre').textContent = `Tema de ${ev.nombre}`;
  $('eventoToggle').checked = !!ev.encendido;
};
$('eventoToggle').onchange = e => { const ev = window.Z18Events; if (ev) ev.elegir(e.target.checked); syncEvento(); };
syncEvento();
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!$('misionModal').classList.contains('hidden')) { if (!reclamando) cerrarMision(); return; }   // primero se cierra el modal de la misión…
  if (!$('auth').classList.contains('hidden')) closeAuth();                                         // …y recién después «Mi cuenta»
});

document.addEventListener('click', e => {
  const t = e.target.closest('[data-go],[data-open],[data-social],[data-eye]');
  if (!t) return;
  if (t.dataset.go) show(t.dataset.go);
  else if (t.dataset.open) openAuth(t.dataset.open);
  else if (t.dataset.eye) {                            // mostrar / ocultar contraseña
    const i = $(t.dataset.eye), hidden = i.type === 'password';
    i.type = hidden ? 'text' : 'password';
    t.setAttribute('aria-label', hidden ? 'Ocultar contraseña' : 'Mostrar contraseña');
    t.innerHTML = ico(hidden ? 'eye-slash-r' : 'eye-r');
  } else {                                             // botones sociales: Google / Facebook
    const provider = t.dataset.social, ferr = t.closest('form').querySelector('.ferr'), all = document.querySelectorAll('[data-social]');
    ferr.textContent = ''; all.forEach(b => { b.disabled = true; }); t.setAttribute('aria-busy', 'true');
    AUTH.social(provider).then(signIn)
      .catch(err => { ferr.textContent = err.message || `No pudimos conectar con ${provider}. Probá de nuevo.`; })
      .finally(() => { all.forEach(b => { b.disabled = false; }); t.removeAttribute('aria-busy'); });
  }
});

// Validación en vivo: al salir del campo, y mientras se corrige un error (la confirmación se compara al escribir)
document.addEventListener('focusout', e => { const i = e.target; if (i.dataset?.rule && (i.value || i.getAttribute('aria-invalid') === 'true')) check(i); });
document.addEventListener('input', e => {
  const i = e.target; if (!i.dataset?.rule) return;
  if (i.getAttribute('aria-invalid') === 'true' || i.dataset.rule === 'confirm') check(i);
  if (i.dataset.rule === 'newpass' && $('regConfirm').value) check($('regConfirm'));
});

// Envío: no avanza hasta que TODOS los campos sean válidos (incluida la coincidencia de contraseñas)
document.addEventListener('submit', async e => {
  const f = e.target.closest?.('form[data-auth]');
  if (!f) return;
  e.preventDefault();
  const inputs = [...f.querySelectorAll('[data-rule]')], ferr = f.querySelector('.ferr');
  const bad = inputs.filter(i => !check(i));
  if (bad.length) return bad[0].focus();
  const data = Object.fromEntries(inputs.map(i => [i.name, i.type === 'password' || i.dataset.rule === 'confirm' ? i.value : i.value.trim()]));
  delete data.confirm;
  const btn = f.querySelector('[type=submit]'), label = btn.textContent;
  btn.disabled = true; btn.textContent = 'Enviando…'; ferr.textContent = '';
  try { signIn(await AUTH[f.dataset.auth](data)); f.reset(); }
  catch (err) { ferr.textContent = err.message || 'No pudimos completar la acción. Probá de nuevo.'; }
  finally { btn.disabled = false; btn.textContent = label; }
});
paintUser();

/* ================= 6) NAVEGACIÓN Y DETALLES ================= */
// Chips de navegación + resaltado de la sección visible (el chip activo se centra en la barra)
const bar = $('navLinks');
bar.innerHTML = NAV.map(([id, t], k) => `<a href="#${id}" data-id="${id}" class="nl ${k ? '' : 'nl-hot'}">${k ? '' : ico('fire')}${t}</a>`).join('');
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  bar.querySelectorAll('.nl').forEach(l => l.classList.toggle('on', l.dataset.id === e.target.id));
  const on = bar.querySelector('.on');
  if (on) bar.scrollTo({ left: on.offsetLeft - (bar.clientWidth - on.clientWidth) / 2, behavior: 'smooth' });
}), { rootMargin: '-40% 0px -55% 0px' });
NAV.forEach(([id]) => io.observe($(id)));

// Botones estáticos de WhatsApp con mensaje precargado
document.querySelectorAll('[data-wa]').forEach(a => { a.href = wa(''); });

// El logo (assets/logo.webp) ya está referenciado en el HTML: hero, footer, cabecera del modal y favicon
$('yr').textContent = new Date().getFullYear();

// Brasas flotando en el header (se omiten con "reducir movimiento")
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  for (let k = 0; k < 18; k++) {
    const e = document.createElement('span');
    e.className = 'ember';
    e.style.cssText = `left:${Math.random() * 100}%;--d:${5 + Math.random() * 6}s;--s:${2 + Math.random() * 4}px;animation-delay:-${Math.random() * 10}s`;
    $('embers').appendChild(e);
  }
}
