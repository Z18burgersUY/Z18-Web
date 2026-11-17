# Z18 · Carta para Google, política de privacidad y nombre opcional

Se apoya en la entrega 19, que ya está subida (revisé tu repositorio: último cambio 14/11, 21:23, y `app.js` es idéntico al que probé).

Son **4 archivos**, completos. **Reemplazan** a los que ya están en la raíz del repo de la web: **`index.html`**, **`app.js`** y **`sitemap.xml`**. Y **`privacidad.html`** es **nuevo**: se agrega al lado de los demás. No cambian `tailwind.css`, `styles.css`, `sw.js`, `vercel.json`, las fotos, el panel de cocina, Firebase ni las reglas de Firestore. `LEEME.md` no se sube.

## Qué cambia

### 1. La carta para Google (lo del «5»)

`index.html` ahora le cuenta a Google, en un bloque de datos estructurados que los clientes no ven, que Z18 es un restaurante, **dónde está su carta** (`https://z18-web.vercel.app/#burgers`) y **qué hay en ella**: 8 partes y **31 platos con su precio en pesos uruguayos**.

Se mantiene sola: al cargar, `app.js` vuelve a armar esa carta a partir del menú de siempre. Si algún día cambiás un precio o agregás un plato en `app.js`, los datos para Google quedan al día sin tocar nada más. Si por algún motivo eso fallara, la web sigue funcionando igual y queda la copia fija que está en `index.html`.

**Lo que tenés que saber, sin humo:** de todo esto, lo único que Google documenta para restaurantes es el **enlace a la carta**. Los platos y precios están escritos en el formato correcto (schema.org), pero hoy Google **no los muestra** como resultado enriquecido en el buscador. O sea: sirve para que Google entienda bien el negocio y encuentre la carta, **no** para que aparezcan tus hamburguesas con foto y precio en los resultados. No te prometo posicionamiento.

### 2. El enlace «Pedir» en tu ficha de Google (esto lo hacés vos, es 3 minutos)

Hace falta ser administrador de la ficha de Z18. Los nombres de los botones pueden variar un poco en español; seguí lo que dice Google en su ayuda ([menú](https://support.google.com/business/answer/9455840) · [enlaces de pedido](https://support.google.com/business/answer/6218037)).

**Enlace de la carta**
1. Entrá a [business.google.com](https://business.google.com) y abrí la ficha de Z18.
2. **Editar perfil → Información de la empresa → Contacto → Enlace del menú** («Menu link»). Si lo hacés desde la búsqueda de Google: Editar perfil → Contacto → Enlace del menú.
3. Pegá `https://z18-web.vercel.app/#burgers` y tocá **Guardar**.

**Botón de pedir** («Food ordering»)
1. En la ficha, desde Google Búsqueda tocá **Food ordering** (pedidos de comida) o **Pickup and delivery** (retiro y entrega); desde Google Maps, **Editar perfil** y después el mismo tipo de pedido.
2. **Agregar enlace** → pegá `https://z18-web.vercel.app/` → **Guardar**.

Si más adelante agregás otros enlaces (por ejemplo PedidosYa), con **Establecer enlace preferido** elegís cuál aparece primero.
Google decide si y cómo muestra el botón, y puede tardar unos días en aparecer.

### 3. La política de privacidad (lo del «4»)

- Página nueva: **`https://z18-web.vercel.app/privacidad.html`**. En el pie de la web hay un enlace «Política de privacidad», y la página tiene un «Volver a la carta» arriba y otro al final. También está en el `sitemap.xml`.
- Está escrita en español rioplatense y sin vueltas: un «En resumen» y nueve partes (quién es el responsable, qué datos se piden y para qué, con quién se comparten, dónde se guardan, cuánto tiempo, tus derechos según la Ley 18.331, seguridad, cambios y contacto). Se ve bien en celular y escritorio, en modo claro y oscuro, y abre sin conexión si ya la visitaron.
- La armé mirando lo que **la web hace de verdad** (qué guarda en la cocina, en la cuenta, en el celular, con qué servicios se conecta) y las pruebas comprueban que lo que dice coincide con eso: por ejemplo, que no usa cookies ni analítica, y que los datos que se guardan son los que la política nombra.

**Importante: no soy abogado.** Es un texto razonable para una hamburguesería chica, pero te recomiendo que lo lea un profesional (contador o abogado) antes de darlo por cerrado. Lo que escribí en nombre del local y **tenés que confirmar vos**:
- **«No vendemos tus datos ni los usamos para publicidad de terceros»** y **«si quisiéramos usarlos para otra cosa, te lo pedimos antes»**. Si algún día mandás promociones por WhatsApp con los teléfonos de los pedidos, la política dice que antes se lo pedís al cliente: tenés que cumplirlo (o cambiar esa frase).
- **Borrar datos a pedido.** Hoy es manual: lo hacés vos desde la consola de Firebase (el pedido y, si tiene, la cuenta). La política dice que respondés **en 5 días hábiles**, que es el plazo que fija la Ley 18.331 (artículos 14 y 15): tenés que poder cumplirlo cuando alguien lo pida, así que no conviene alargarlo.
- **Quién es el responsable.** Figura «Z18 Hamburguesería Artesanal & Grill, Paso de la Arena» con el correo (`z18.burgers.uy@gmail.com`) y el WhatsApp (092 061 753) que ya usa la web. Si el negocio tiene razón social, RUT o dirección completa, conviene agregarlos.
- **Plazos de conservación.** Dice «mientras hagan falta y para el registro de ventas», sin plazos en números. Si tu contador te indica algún plazo, se agrega.
- **Registro ante la URCDP.** Según cómo esté constituido el negocio, la Ley 18.331 puede exigir inscribir la base de datos en la Unidad Reguladora y de Control de Datos Personales. Eso lo tenés que consultar con un profesional.

### 4. Nombre opcional al pedir

El formulario del carrito ya pedía el nombre (a todos, tengan cuenta o no), y era obligatorio. Ahora el **nombre es opcional**: teléfono y dirección siguen siendo obligatorios (sin eso no se puede entregar), pero quien no quiera poner su nombre puede dejarlo vacío.

- **Si lo escribe**, se **guarda en su celular** (igual que el teléfono y la dirección) y le aparece ya escrito en el próximo pedido. Si tiene cuenta, el nombre de su cuenta aparece ya escrito, como antes.
- **Si no lo escribe**, en la cocina el pedido figura a nombre de **«Cliente»**, y el mensaje de WhatsApp sale sin «Soy …» (si puso teléfono, dice «Mi teléfono es …»).
- Si escribe **una sola letra**, la web le avisa («Escribí al menos 2 letras, o dejá el nombre vacío»).
- La cocina y las reglas de Firebase **no se tocaron**: siguen exigiendo un nombre de al menos 2 letras. Por eso el «Cliente» se pone justo al avisar a la cocina.

## Subir y probar

Subí los 4 archivos (3 reemplazan, 1 es nuevo), esperá a que Vercel publique (uno o dos minutos) y recargá la web. Probá en el celular:
1. **Bajá hasta el final** y tocá **«Política de privacidad»**: se abre la página; **«Volver a la carta»** te devuelve a la web.
2. **Sin iniciar sesión**, agregá un producto, abrí el carrito y completá **solo teléfono y dirección** (sin nombre): tiene que dejarte enviar y, en el panel de cocina, el pedido tiene que figurar como **«Cliente»**. (Es un pedido de prueba: después lo cancelás.)
3. Hacé otro pedido de prueba escribiendo un nombre (por ejemplo «Ana»): llega a la cocina con ese nombre, y al volver a abrir el carrito «Ana», el teléfono y la dirección ya están escritos.
4. Opcional, para ver lo de Google: pegá `https://z18-web.vercel.app/` en [validator.schema.org](https://validator.schema.org/): debería mostrar un **Restaurant** con su **Menu** (8 partes y 31 platos) y sin errores. Si marca algo, mandame la captura (yo no lo pude probar desde acá).

## Cómo se probó

Navegador real, celular y escritorio, sobre estos mismos archivos:
- Lo que ya existía sigue igual: **138** verificaciones del carrito y el pedido (las del nombre se adaptaron), **150** de la Navidad, **534** del panel de cocina y **16** punta a punta. Las reglas de Firestore no cambian (**779** casos).
- Comparación pantalla por pantalla (**38** pantallas, celular y escritorio, claro y oscuro): **0 diferencias** contra lo que tenés publicado hoy en GitHub (salvo lo nuevo a propósito: el enlace del pie y el «(opcional)» del nombre) y **0 diferencias** contra la web de antes de la web rápida (con lo nuevo escondido). Incluye la pantalla del carrito con errores: el aviso del nombre se ve igual que antes cuando escriben una sola letra.
- Lo nuevo y la web rápida: **541** verificaciones. Las de esta entrega comprueban, entre otras cosas, que los datos para Google tienen los **31 platos** del menú con sus precios (y que cambian solos si cambia un precio), que la copia fija de `index.html` coincide con el menú, que la política se ve bien a 320, 390 y 1280 px en los dos temas (sin desbordes y con el contraste de lectura recomendado), que todo lo que dice coincide con lo que la web guarda de verdad, que funciona sin conexión, y todo el recorrido del nombre opcional (en blanco, una letra, guardado, con y sin teléfono, y que a la cocina llega el pedido igual).
- **89** roturas a propósito (57 de entregas anteriores + 32 nuevas: por ejemplo, que se caiga una parte de la carta, que los precios salgan en dólares, que el enlace del pie apunte a otra página, que el resumen deje de decir que no se venden los datos, que el nombre vuelva a ser obligatorio): las pruebas detectaron las 89.
- Simulación de la subida (tu repositorio de hoy + estos 4 archivos): todo en verde (**525** verificaciones de lo nuevo, **138** del pedido y **150** de la Navidad), y los 4 archivos quedan idénticos a los que probé.

**Lo que no pude hacer:** verlo en un celular real, en tu Vercel ni en Google (no puedo ver cómo termina mostrando Google la carta ni el botón de la ficha), ni pasarlo por el validador de schema.org desde acá.

## Si querés otra cosa

- **Un aviso corto junto a los formularios** («Usamos tu teléfono y dirección solo para entregar tu pedido. Política de privacidad»): hoy el enlace está en el pie. Para que la política cumpla mejor su función conviene que también esté donde se piden los datos (carrito y registro). Es un cambio chico; decime y lo hago.
- Sigue pendiente la línea del carrito «Envío — A coordinar por WhatsApp» (y «envío a coordinar» en el mensaje): como el delivery es gratis, se puede cambiar por «Envío gratis».
- Si cambiás precios en `app.js`, los datos para Google (la parte que ejecuta Google) se actualizan solos; la copia fija de `index.html` solo la leen buscadores que no ejecutan JavaScript. Si querés mantenerla al día, pedímelo y la regenero (la herramienta que la arma no se sube al repo).

## Fuentes

- Google, [menú del perfil de empresa](https://support.google.com/business/answer/9455840) y [enlaces de pedido y reserva](https://support.google.com/business/answer/6218037).
- schema.org, [`hasMenu`](https://schema.org/hasMenu) (el formato de la carta; reemplaza a la propiedad `menu`, que se deja también porque es la que Google documenta).
- Ley 18.331 de Protección de Datos Personales: [artículo 14](https://www.impo.com.uy/bases/leyes/18331-2008/14) (acceso, 5 días hábiles) y [artículo 15](https://www.impo.com.uy/bases/leyes/18331-2008/15) (rectificación, actualización, inclusión o supresión, 5 días hábiles).
- [Unidad Reguladora y de Control de Datos Personales (URCDP)](https://www.gub.uy/unidad-reguladora-control-datos-personales).
