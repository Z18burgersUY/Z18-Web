# Z18 · Solo delivery, combos del flyer y fotos livianas que faltaban

Se apoya en las entregas 15, 16 y 17. Revisé tu repositorio (último cambio: 11/11, 20:10) y esas tres ya están subidas, **salvo 4 archivos de fotos** (más abajo).

Son **7 archivos**, completos, que **reemplazan** a los que ya están en la raíz del repo de la web. Se suben juntos, en una sola subida: `index.html`, `app.js`, `tailwind.css`, `napo1.js`, `salchipapa.js`, `smash.js` y `z18.js`. `LEEME.md` no se sube. No cambian el panel de cocina, Firebase, las reglas de Firestore ni `vercel.json`.

**`index.html` y `app.js` van sí o sí juntos, en la misma subida.** Lo probé: con uno solo de los dos (el otro viejo), el formulario del pedido queda a medias y **no se puede mandar ningún pedido** hasta subir el que falta (con el `app.js` nuevo y el `index.html` viejo la dirección no aparece; con el `index.html` nuevo y el `app.js` viejo el formulario da error).

## Qué cambia

**1. Sin «Retiro en el local».** En «Tus datos para el pedido» (el carrito) ya no está la elección retiro / delivery. Quedan **nombre, teléfono y dirección de entrega**, y la dirección se pide siempre (mínimo 5 caracteres). El mensaje de WhatsApp termina con «Delivery a: <dirección>». Todos los pedidos que llegan al panel de cocina salen como **Delivery**.

Los celulares que ya habían guardado sus datos con «retiro» siguen viendo su nombre y su teléfono. Si tenían una dirección vieja guardada, aparece escrita en el formulario (la pueden corregir); si no, la escriben. Nunca sale un pedido de retiro. El panel de cocina no cambia: los pedidos de retiro que ya estén cargados se siguen viendo.

**2. Combos (según tu flyer).**
- **Salchipapa Z18 combo:** de $465 a **$466**.
- **Combo Crispy BBQ:** nuevo, **$605**, con la foto de la Crispy BBQ. Queda entre The Bunker y Salchipapa, como en el flyer, y con la misma descripción que los otros (hamburguesa + papas + bebidas). Se pide igual que los demás: entra al carrito, al mensaje de WhatsApp (con la oferta de Cheddar y Bacon de siempre) y al panel de cocina como «1 x Combo Crispy BBQ».
- Los otros cuatro ya coincidían con el flyer: Z18 Original $445, Clásica 18 $455, Smash $495 y The Bunker $575. También comprobé que los «por separado» del flyer ($459, $469, $509, $589, $619 y $480) salen de la carta (hamburguesa o salchipapa + Coca-Cola 600 ml) y que cada combo ahorra $14.
- Quien repita un pedido o use «Lo de siempre» con el combo Salchipapa lo paga al precio nuevo.

**3. Fotos livianas que faltaban (de la entrega 15).** `napo1.js`, `salchipapa.js`, `smash.js` y `z18.js` seguían siendo los pesados de antes (cada uno unos 200 KB). Con los livianos la web baja unos **350 KB menos** y se ve igual. En los celulares que ya habían entrado, la foto liviana se nota desde la segunda visita (la web muestra primero lo que tenía guardado y se actualiza sola).

**4. `tailwind.css`.** Se van 3 reglas de diseño que usaba el grupo de opciones que se sacó. Es limpieza: si no lo subís, no pasa nada.

## Subir y probar

Subí los 7 archivos, esperá a que Vercel publique (uno o dos minutos) y probá en el celular:
1. En **Combos** tienen que verse 6 tarjetas, con **Combo Crispy BBQ $605** y **Combo Salchipapa Z18 $466**.
2. Agregá un combo, abrí el carrito y mirá «Tus datos para el pedido»: *Tu nombre*, *Tu teléfono* y *Dirección de entrega*, sin «Retiro en el local».
3. Probá enviar **sin dirección** (tiene que avisar y no abrir WhatsApp) y **con dirección** (abre WhatsApp con «Delivery a: …» y el pedido aparece en el panel de cocina como Delivery).

## Cómo se probó

Navegador real, celular y escritorio, sobre estos mismos archivos:
- Lo que ya existía sigue igual: **135** verificaciones del carrito y el pedido (suman las del formulario sin retiro), **150** de la Navidad, **534** del panel de cocina y **16** punta a punta. Las reglas de Firestore no cambian (**779** casos).
- Comparación pantalla por pantalla (**38** pantallas, celular y escritorio, claro y oscuro): **0 diferencias** contra lo que tenés publicado hoy en GitHub y **0 diferencias** contra la web de antes de la web rápida (con lo nuevo escondido). En las dos se deja aparte solo lo que cambió a propósito: el grupo retiro/delivery, la dirección siempre a la vista y la tarjeta del combo nuevo.
- Lo nuevo (web rápida, Calificanos/Compartir, cabeceras, esta entrega): **348** verificaciones. Incluyen que el único cambio frente a lo publicado sea el del retiro y los combos, que los seis combos tengan el precio del flyer y la foto de su hamburguesa, y que el Combo Crispy BBQ llegue a la cocina.
- **39** roturas a propósito en lo nuevo (por ejemplo, que vuelva el retiro, que el combo Salchipapa vuelva a $465 o que el Combo Crispy BBQ salga con otra foto): las pruebas detectaron las 39.
- Simulación de la subida (tu repositorio de hoy + estos 7 archivos): todo en verde, y cada archivo de la web queda idéntico al que probé.

**Lo que no pude hacer:** verlo en un celular real ni en tu Vercel.
