# Z18 · La oferta de papas al enviar el pedido

Se apoya en la entrega 18, que ya está subida (revisé tu repositorio: último cambio 12/11, 18:47, y los 7 archivos son idénticos a los que probé).

Es **1 solo archivo**, completo, que **reemplaza** al que ya está en la raíz del repo de la web: **`app.js`**. No cambian `index.html`, `tailwind.css`, las fotos, el panel de cocina, Firebase, las reglas de Firestore ni `vercel.json`. `LEEME.md` no se sube.

## Lo de tu captura

En tu carrito había tres hamburguesas (Z18 Original, Smash y Crispy BBQ). Las hamburguesas ya traen papas (la carta lo dice: «Todas incluyen papas fritas»), así que ahí lo que corresponde es la mejora: «¿Deseas agregar Cheddar y Bacon a tus papas por $50?». Así lo definiste desde el principio y **eso no cambia**.

Pero revisando el código encontré fallas reales en esa lógica y armé el orden que describís (sin papas → primero papas fritas; con papas → la mejora con cheddar y bacon).

## Qué cambia

La oferta «¡Coronemos el pedido!» (la que sale al tocar «Enviar pedido por WhatsApp») queda así:

- **Hay papas comunes en el carrito** (hamburguesas, combos, milanesas al plato, menú de reclutas o «Papas fritas»): ofrece la mejora, **Cheddar y Bacon por $50**. Igual que antes.
- **No hay papas** (por ejemplo, solo una bebida): primero ofrece **una porción de Papas fritas ($180)**. Si las agrega, enseguida pregunta por la mejora de Cheddar y Bacon ($50) sobre esas papas, en el mismo cartel. Antes ofrecía de entrada las «Papas con Cheddar y Bacon» a $230.
- **Todas las papas ya traen cheddar y bacon** (Papas con cheddar y bacon, Salchipapa Z18 y el combo Salchipapa, también si se canjearon con Puntos Z): no ofrece nada y WhatsApp se abre directo. Antes les preguntaba «¿agregar Cheddar y Bacon a tus papas?», que no tiene sentido.

También se corrigió que el **Menú de reclutas** (Z-Junior Burger y Z-Junior Nuggets, que «incluye papas fritas») no contaba como papas: a quien pedía solo eso le ofrecía una porción nueva de $230 en vez de la mejora de $50.

Lo demás sigue igual: la mejora de $50 se suma **una vez por pedido** (no por porción; quien quiera más usa el «+» en el carrito), cada oferta se muestra como máximo **2 veces** si dicen «No, gracias» (las dos cuentan por separado), y si la mejora ya está en el carrito no se vuelve a ofrecer.

Un detalle: cuando agregan las papas y aparece la pregunta de la mejora, el cartel tarda menos de medio segundo en aceptar toques, para que un doble toque en «Agregar» no conteste también la segunda pregunta sin querer.

## Subir y probar

Subí `app.js`, esperá a que Vercel publique (uno o dos minutos), recargá la web y probá en el celular:
1. Con **solo una Coca-Cola**, tocá «Enviar pedido»: tiene que preguntar por **Papas fritas $180**. Tocá «Agregar»: tiene que preguntar por **Cheddar y Bacon $50**. Tocá «Agregar»: abre WhatsApp con las tres líneas y **Total: $320**.
2. Con **una hamburguesa**: pregunta directo por la mejora de $50.
3. Con una **Salchipapa Z18** sola: no pregunta nada y abre WhatsApp.

## Cómo se probó

Navegador real, celular y escritorio, sobre este mismo archivo:
- Lo que ya existía sigue igual: **136** verificaciones del carrito y el pedido (una más que antes: la del flujo nuevo), **150** de la Navidad, **534** del panel de cocina y **16** punta a punta. Las reglas de Firestore no cambian (**779** casos).
- Comparación pantalla por pantalla (**38** pantallas, celular y escritorio, claro y oscuro): **0 diferencias** contra lo que tenés publicado hoy en GitHub y **0 diferencias** contra la web de antes de la web rápida (con lo nuevo escondido).
- Lo nuevo y la web rápida: **372** verificaciones. Las de esta entrega incluyen **24 carritos distintos** (hamburguesas, combos, milanesas, reclutas, papas, Salchipapa, bebidas, pizzas, extras y productos canjeados con Puntos Z) con lo que debe ofrecer cada uno, el paso de las papas a la mejora, el límite de 2 «No, gracias» por oferta, el doble toque, Escape y tocar afuera, y que a la cocina llegue el pedido completo (bebida + papas + mejora = $320; tres hamburguesas + mejora = $1.367, como en tu captura). También comprueba que el único archivo que cambia respecto de tu repositorio es `app.js`, y solo en el bloque de la oferta.
- **57** roturas a propósito en lo nuevo (por ejemplo, que el menú de reclutas deje de contar como papas, que la Salchipapa vuelva a recibir la mejora, que se ofrezca tres veces en vez de dos o que el doble toque conteste las dos preguntas): las pruebas detectaron las 57.
- Simulación de la subida (tu repositorio de hoy + este archivo): todo en verde, y `app.js` queda idéntico al que probé.

**Lo que no pude hacer:** verlo en un celular real ni en tu Vercel.

## Si querés otra cosa

- Si las hamburguesas sueltas en realidad **no** traen papas y querés que igual se ofrezcan papas fritas, decímelo: es cambiar la lista de categorías que cuentan como papas.
- Sigue pendiente la línea del carrito «Envío — A coordinar por WhatsApp» (y «envío a coordinar» en el mensaje): como el delivery es gratis, se puede cambiar por «Envío gratis».
