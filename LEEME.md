# Z18 · Edición Neón: la web en temática GTA 6 toda la semana del estreno

Son **2 archivos**, completos. **Reemplazan** a los que ya están en la raíz del repo de la web: **`event-manager.js`** y **`styles.css`**. Nada más: no cambian `index.html`, `app.js`, `tailwind.css`, `sw.js`, `vercel.json`, las fotos, el panel de cocina, Firebase ni las reglas de Firestore, y no hay logos ni imágenes nuevas. `LEEME.md` no se sube.

## Qué hace

- **Se prende solo y se apaga solo, por fecha.** Rige **desde las 00:00 del jueves 19 de noviembre hasta las 24:00 del miércoles 25** (7 días, hora de Montevideo). El jueves 26 vuelve sola la Navidad. No hay que subir nada ningún día: si lo subís hoy o mañana, se ve igual desde que Vercel publique, porque manda la fecha.
- **Cómo lo interpreté:** «toda la semana» = una semana completa desde el estreno (jueves a miércoles). Si querías que termine el domingo 22, cambiá una fecha (más abajo).
- **Qué se ve:** una noche de neón de Miami en los 80, en modo oscuro y en modo claro: violeta noche con rosa y naranja, **un sol retro con franjas detrás del logo**, palmeras a los costados, un **piso de rejilla** que avanza, un tubo de neón en el borde de arriba, chispas rosa, cian y naranja, emojis en los títulos de la carta (🍔 🏎️ 🌴 🍕 🕶️ 🍟 🍹 🌅), el carrito y los avisos con borde de neón, y un sello inclinado: **«🌴 Estreno GTA 6»**.
- **Cada cliente puede apagarlo** desde «Mi cuenta» («🌴 Tema de Neón»). Apagarlo vale solo para este tema: no apaga la Navidad.
- A quien tiene activado «reducir movimiento» en el celular no se le mueve nada (ni el piso ni el tubo de neón).
- Nada cambia de lugar ni de tamaño: es solo color y decorado, y el decorado no se puede tocar (no tapa botones). Los precios, el carrito, los pedidos y la cocina funcionan exactamente igual.

## Sobre «GTA 6» (te lo digo sin vueltas)

El estilo es el de su ambientación, pero **todo está dibujado de cero** con CSS y SVG propios. **No usé el logo, los personajes ni las imágenes del juego**: son de sus dueños (Rockstar y Take-Two) y en una web comercial podrían traerte un reclamo. El nombre aparece **una sola vez, como texto del sello**, como referencia al estreno. No digas que es oficial ni que hay relación con ellos, y si preferís no nombrarlos, cambiá el texto (más abajo).

## Cambiar días o textos (todo está en `event-manager.js`)

- **Los días:** buscá `CALENDARIO` (línea 82):
  `{ evento: 'estreno', desde: '2026-11-19', hasta: '2026-11-25' }`
  Se editan las dos fechas (formato `AAAA-MM-DD`, las dos incluidas). Por ejemplo, hasta el domingo: `hasta: '2026-11-22'`. Para un solo día, la misma fecha en las dos. Una fecha mal escrita se ignora y la web sigue como siempre (no se rompe nada).
- **El texto del sello:** línea 160, `sello: '🌴 Estreno GTA 6',`. Por ejemplo `'🌴 Edición Neón'` si preferís sin el nombre.
- **Apagarlo del todo en cualquier momento:** poné en `hasta` una fecha que ya pasó, o apagá todos los eventos con `const activeEvent = null;` (línea 73; apaga también la Navidad).

## Subir y probar

Subí los 2 archivos, esperá a que Vercel publique (uno o dos minutos) y recargá la web (en el celular, cerrá la pestaña y abrila de nuevo). Mirá:
1. La **cabecera**: el sol con franjas detrás del logo, las palmeras, el piso de rejilla abajo y el sello arriba a la izquierda. Probalo también en modo claro.
2. Un **título de la carta** con su emoji, el **carrito** y los **avisos** con el borde de neón.
3. «Mi cuenta» → **«Tema de Neón»**: apagalo y la web vuelve a la de siempre; prendelo y vuelve el neón.

Si alguien tiene la web abierta justo a medianoche, ve el cambio la próxima vez que la recargue o la abra. Los clientes que ya la visitaron ven el tema desde su próxima visita (la web pide siempre primero lo último a internet).

## Cómo se probó

Navegador real, celular y escritorio, sobre estos mismos archivos:
- **Las pruebas nuevas del tema (232 verificaciones, todas bien):** que arranque a las **00:00 del 19** y no un segundo antes, que dure **hasta las 24:00 del 25** y el 26 vuelva la Navidad, y que dé lo mismo la zona horaria del celular (probado con Tokio, Los Ángeles y UTC); que con el interruptor general apagado, una fecha mal escrita, un evento inexistente o un calendario roto **la web no se rompa**; el decorado, la paleta y el sello; que no cambie el logo; el interruptor de «Mi cuenta» (y que apagar la Navidad no apague el Neón ni al revés); que apagado quede **idéntica a la web sin evento**; que nada se mueva a 320, 360, 390, 768 y 1280 px (sin desborde ni saltos de diseño); «reducir movimiento»; y que el decorado no tape ningún clic.
- **Contraste de lectura (WCAG AA):** se midió la paleta, el enlace «Burgers» y **todos los textos de la web** en oscuro y claro, con los paneles y «Mi cuenta». El título y el subtítulo de la cabecera, que quedan sobre el sol y el piso, se midieron **sobre los píxeles reales** (peor caso 6,9:1 el subtítulo y 9,5:1 el título; el mínimo exigido es 4,5:1 y 3:1).
- **Lo que ya existía sigue igual:** en la última corrida completa dieron bien las **138** verificaciones del carrito y el pedido, las **534** del panel de cocina, las **16** punta a punta, las **150** de la Navidad y las **779** de las reglas de Firestore. Y la comparación pantalla por pantalla de la web de siempre contra lo que está publicado dio **0 diferencias**: el tema no toca nada fuera de su semana.
- **Se comprobó que `tailwind.css` queda idéntico al publicado** (por eso no hay que subirlo) y que en los dos archivos **solo se agrega**: de lo que ya estaba en `event-manager.js` únicamente cambian la línea de apertura y la de cierre de la función (para que reciba el interruptor general), y en `styles.css` no se toca ni una línea de lo anterior.

**Lo que no pude hacer:** verlo en un celular real ni en tu Vercel. Lo vi en el navegador de pruebas, en celular y en escritorio, en oscuro y en claro.
