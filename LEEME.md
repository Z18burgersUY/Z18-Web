# Z18 · Web más rápida, instalable como app y lista para Google

Esta entrega se apoya en lo que ya tenés publicado (Navidad y pedidos en vivo a la cocina). Los archivos vienen **completos**, listos para reemplazar en GitHub. No subí nada: ni GitHub, ni Vercel, ni Firebase. El panel de cocina (`z18_admin`) y las reglas de Firestore **no cambian**.

Lo único que se ve distinto en la web: la tarjeta **«Lo de siempre»** (solo a quien ya pidió antes), el botón **«Instalar la app de Z18»** en el pie y los botones **«Cómo llegar»** y **«Llamar»** en *Ubicación*. Todo lo demás se ve igual: lo comparé pantalla por pantalla con la web publicada.

## Qué cambia

**1 · Más velocidad**

- **Se fue el script de Tailwind de internet** (`cdn.tailwindcss.com`). Ese script arma los estilos *en el celular de cada cliente, en cada visita*, y Tailwind avisa que no es para producción. Ahora los estilos ya vienen armados en `tailwind.css` (24 KB).
- **Fotos del menú más livianas:** de las 14 fotos, recomprimí 9 (recortando solo lo que ninguna tarjeta llega a mostrar y achicándolas a 840 px de ancho, más del doble de lo que mide la tarjeta en un celular). Las otras 5 no ganaban ni un 15 % y quedaron tal cual. Entre las 14 pasan de 1975 KB a 1300 KB (**−34 %**), con una diferencia que a tamaño de celular casi no se nota (comparé cada una con la publicada; igual conviene que mires el menú). Tus fotos originales en alta resolución no se tocan.
- **El logo carga directo.** Antes la web lo pedía a `assets/logo.webp` (en tu repositorio no existe), recibía un error 404 y recién después lo buscaba en la raíz; ahora va derecho a `logo.webp`.

**2 · Se comporta como una app**

- **Instalable:** botón «Instalar la app de Z18» en el pie de la página. En Android (Chrome, Edge) instala con un toque; en iPhone explica el camino (*Compartir → Agregar a pantalla de inicio*). Queda un ícono de Z18 en la pantalla de inicio y abre sin la barra del navegador. El botón no aparece si ya está instalada ni dentro del navegador de Instagram, Facebook o TikTok (ahí no se puede instalar).
- **Sin conexión:** si el cliente ya entró alguna vez, la web abre igual y muestra el menú. Avisa «Sin conexión: podés ver el menú, pero para pedir necesitás internet» (pedir sigue necesitando internet) y «Volvió la conexión». Con internet, la página, el menú y los precios se piden **primero a internet**, así que el cliente ve siempre la última versión; solo si internet no responde en 3,5 segundos se muestra la copia guardada.
- **«Lo de siempre»:** una tarjeta arriba del menú, «Pedir de nuevo · $total», que arma el carrito igual que la última vez. Con cuenta usa el pedido favorito (⭐) o, si no hay, el más reciente; sin cuenta, el último pedido enviado desde ese celular. Usa los precios de hoy y se saltea lo que ya no está en el menú. Un pedido hecho solo con una recompensa de Puntos Z que no está en el menú (por ejemplo, la Pizzeta Muzzarella) no se ofrece de nuevo: hay que canjearla otra vez. En el celular se guarda solo lo necesario (nombres de productos, cantidades, total y fecha; **nada de nombre, teléfono ni dirección**) y se borra al cerrar sesión.

**3 · Google y compartir**

- **Vista previa al compartir el enlace** (WhatsApp, Instagram, Facebook, Telegram): foto, título y descripción (`compartir.jpg`, 1200×630).
- **Datos para Google:** nombre, horarios, teléfono, mail, zona de entrega, menú y redes, tal como los dice la página (los horarios son los mismos del cartel Abierto/Cerrado y de «Nuestros horarios»). Más `robots.txt`, `sitemap.xml` y la dirección canónica.
- **En *Ubicación*:** **Cómo llegar** (abre Google Maps buscando el local) y **Llamar** (marca 092 061 753, el teléfono de pedidos).

## Qué subir y dónde

Todo va al repo de la web `Z18burgersUY/Z18-Web`, en la raíz (como siempre). **Subí los 22 archivos juntos, en una sola subida** (arrastrándolos todos a *Add file → Upload files*): `index.html` ya no trae el script de Tailwind, así que sin `tailwind.css` la web se vería sin estilos. Si por algún motivo los subís por tandas, que **`tailwind.css` sea lo primero**.

| Archivo | Qué hacer |
|---|---|
| `index.html`, `app.js`, `styles.css` | **Reemplazar** |
| `bunker.js`, `clasica.js`, `crispy.js`, `milanesa-cheddar.js`, `napo1.js`, `napo2.js`, `salchipapa.js`, `smash.js`, `z18.js` | **Reemplazar** (son las fotos recomprimidas, con el mismo nombre) |
| `tailwind.css`, `sw.js`, `manifest.webmanifest` | **Subir** (nuevos) |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` | **Subir** (nuevos: íconos de la app) |
| `compartir.jpg`, `robots.txt`, `sitemap.xml` | **Subir** (nuevos) |

No cambian: `cocina.js`, `event-manager.js`, `logo.webp`, `logo-navidad.webp` ni las otras 5 fotos del menú (`nuggets.js`, `papas-cheddar.js`, `papas-comunes.js`, `pizzeta-muzza.js`, `pizzeta-salsa.js`). Este `LEEME.md` es solo para vos: no se sube. Vercel publica solo, en uno o dos minutos.

## Paso a paso (lo que solo podés hacer vos)

**1. Subir los 22 archivos** (tabla de arriba) y esperar a que Vercel termine.

**2. Mirar que todo siga igual.** Abrí la web en el celular (si ves la versión anterior, cerrá la pestaña y volvé a abrirla). Tienen que verse el menú, el carrito y la Navidad como hasta ahora. Si la ves **sin estilos**, falta `tailwind.css` en el repositorio.

**3. Probar la instalación.** En Android con Chrome, en el pie de la página aparece **«Instalar la app de Z18»**: tocalo y confirmá (si no aparece, recargá una vez). En iPhone con Safari el mismo botón te dice que toques *Compartir* y elijas *Agregar a pantalla de inicio*. Después abrí Z18 desde el ícono: tiene que abrir sin la barra del navegador.

**4. Probar sin señal.** Con la web ya abierta una vez, poné el celular en modo avión y abrila de nuevo: tiene que abrir con el menú y el aviso de «Sin conexión». (Mandar un pedido sin internet no funciona; es lo esperado.)

**5. Probar la vista previa.** Pegá el enlace de la web en un chat de WhatsApp (por ejemplo, en uno con vos mismo): tiene que aparecer la foto con el título. WhatsApp guarda las vistas previas: si no la ves, probá agregando `?v=2` al final del enlace.

**6. Google (opcional, recomendado).**
- **Perfil de Empresa de Google** (el de Google Maps), si todavía no lo tienen: es lo que más mueve «cómo llegar», horarios y reseñas en Google, y se crea con tu cuenta. Cuando exista, pasame el enlace y dejo «Cómo llegar» apuntando directo a esa ficha.
- **Search Console:** agregá la dirección de la web y enviá `sitemap.xml`. Para comprobar que sos el dueño te va a pedir un archivo o una etiqueta: pasámela y la sumo.
- Google tarda días o semanas en mostrar los cambios y estos datos ayudan, pero no garantizan una posición.

## Lo que conviene saber

- **Si cambian clases de Tailwind** (por ejemplo, un diseño nuevo en `index.html`, `app.js`, `event-manager.js` o `cocina.js`), hay que volver a generar `tailwind.css` y subirlo junto: una clase nueva que no esté ahí no hace nada. Cuando yo toque la web te lo mando ya generado; en el encabezado del propio `tailwind.css` está escrito cómo se regenera.
- **Si cambia `sw.js`**, hay que subir el número de `CACHE` (`z18-v2`, `z18-v3`…) para que los celulares tiren lo guardado con la lógica vieja.
- **Fotos nuevas:** se muestran al instante desde lo guardado y se actualizan en segundo plano, así que un cliente que ya tenía la foto vieja ve la nueva en su **siguiente** visita. El resto (menú, precios, `index.html`, estilos) se actualiza enseguida si hay internet.
- **Apagar la app:** si alguna vez hace falta sacar el service worker, se reemplaza todo el contenido de `sw.js` por las dos líneas que están escritas en su encabezado; los celulares lo desinstalan solos.
- **Los horarios están en tres lugares:** la tabla `HORARIO` de `app.js` (el cartel Abierto/Cerrado), «Nuestros horarios» en `index.html` y el bloque de datos para Google (`openingHoursSpecification`, al principio de `index.html`). Si cambian, hay que cambiarlos en los tres (las pruebas controlan que digan lo mismo). Lunes y martes cerrado: para Google, esos días simplemente no figuran.
- **La dirección de la web** (`https://z18-web.vercel.app/`) está escrita en `index.html` (canonical, vista previa y datos de Google), `robots.txt` y `sitemap.xml`. Si compran un dominio propio, hay que cambiarla en esos tres archivos.
- **«Cómo llegar»** abre una *búsqueda* en Google Maps con el nombre y la zona: no tengo la dirección exacta ni la ficha del local. **«Llamar»** marca 092 061 753, el único teléfono que figura en la web (el de los pedidos por WhatsApp).
- **Lo de afuera sigue yendo directo:** Firebase, Google Fonts y las fotos de Unsplash no pasan por el service worker.
- **Primera visita de cada cliente:** carga como siempre (más liviana); lo guardado para abrir sin señal se arma en ese primer rato.

## Cómo se probó

Navegador real (sin pantalla), en celular y escritorio, modo oscuro y claro, sobre estos mismos archivos:

- **Lo que ya existía sigue igual:** **133** verificaciones del carrito y el pedido, **150** de la Navidad, **534** del panel de cocina y códigos y **16** punta a punta web → cocina. Las reglas de Firestore no cambian y sus **779** casos (120 + 476 + 183) siguen pasando.
- **Comparación con la web publicada:** todas las propiedades de estilo de unos 1100 elementos en cada una de **38** pantallas (celular y escritorio, oscuro y claro, con datos, con carrito, con y sin evento), con lo nuevo escondido: **0 diferencias**. El menú sale con el mismo código que antes.
- **Lo nuevo:** **293** verificaciones: sin la CDN y con todas las reglas de Tailwind (incluidas las clases que arma el JavaScript al andar), fotos, el service worker en un navegador real con un servidor propio (sin conexión, internet lenta, actualización en segundo plano, nunca guarda un 404), instalación (Chrome la da por instalable, sin errores), «Lo de siempre» (con y sin cuenta, datos dañados, cerrar sesión), los datos de Google contra lo que dice la página, y los botones «Cómo llegar» y «Llamar».
- **Simulación de la subida:** armé tu repositorio de GitHub tal como está hoy (46 archivos) con los 22 de esta carpeta encima y corrí las pruebas sobre ese resultado: sigue todo en verde, así que no falta ningún archivo.
- **Pruebas de las pruebas:** rompí a propósito **22** cosas de lo nuevo, una por vez (por ejemplo, que el service worker guarde un 404, que «Llamar» marque otro número o que cerrar sesión no borre «lo de siempre»): las pruebas detectaron las **22**.

**Lo que no pude hacer:** probar en un iPhone o un Android de verdad (la instalación la verifiqué con el propio Chrome; en iPhone depende de Safari y solo comprobé que el botón explique el camino); abrir tu Vercel, tu Firebase o tu cuenta de Google; ni medir cuánto tarda la web en tu conexión (medí cuánto pesa, no cuánto tarda). Antes de avisarle a los clientes, conviene mirarla en tu celular.

## Limpieza opcional del repositorio

En el repo de la web hay archivos que **ninguna página usa** (lo comprobé). Pesan unos **39 MB** en total y Vercel los publica igual como archivos sueltos. No hace falta borrarlos; si querés dejar el repositorio más liviano y prolijo, esta es la lista:

| Archivos | Peso | Qué son |
|---|---|---|
| `file_0000…png` (13 imágenes) | 34,8 MB | **Tus fotos originales** del menú en alta resolución (de ahí salieron las fotos de la web) |
| `1790210984206.png` | 1,5 MB | **El logo original** |
| `1791073116440.jpg` | 0,3 MB | La foto original de los nuggets |
| `fotos.js` | 2,0 MB | Versión vieja de las fotos, todas juntas en un solo archivo; hoy cada foto tiene el suyo |
| `logo-halloween.webp` | 65 KB | Ya no se usa (Navidad) |
| `admin.html`, `admin.css`, `admin.js` | 95 KB | Copia del panel de cocina; el que usás vive en `z18_admin`. Borrala solo si no entrás por `z18-web.vercel.app/admin.html` |
| `LEEME.md`, `LEEME_ACTUALIZACION_11.md`, `REGRESION_FINAL.txt`, `README.md`, `reglas-cocina-bloque.txt` | 32 KB | Notas de entregas anteriores (`reglas-cocina-bloque.txt`: borralo solo si ya pegaste ese bloque en Firebase) |

**Las tres primeras filas (36,6 MB) son tus originales:** si no tenés otra copia, descargalas a tu computadora o a un Drive **antes** de sacarlas del repositorio (en GitHub quedan en el historial, pero recuperarlas de ahí es engorroso). La web funciona igual sin ellas; son lo que más pesa del repo.

**No borres** `cocina.js`, `event-manager.js`, `logo.webp`, `logo-navidad.webp` ni los archivos de fotos del menú (`bunker.js`, `z18.js`, etc.).
