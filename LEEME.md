# Z18 · Navidad + pedidos en vivo en la cocina + códigos de Puntos Z

Esta entrega reemplaza a la `13_cocina` (los archivos de aquella ya no sirven: usá estos). Los archivos vienen **completos**, listos para reemplazar en GitHub. No subí nada: ni GitHub, ni Vercel, ni Firebase.

## Qué cambia

1. **Sale Halloween y entra la Navidad decorada** en la web: tu logo navideño en la cabecera, el pie y «Mi cuenta»; guirnalda de luces, nieve, sello «Especial Navidad», adornos en el carrito y los avisos, y una paleta roja, verde y dorada en modo oscuro y en modo claro. Cada cliente puede apagarla en **Mi cuenta → Tema de Navidad**.
2. **El carrito pide los datos del pedido** (nombre, teléfono, retiro en el local o delivery con dirección) y, al tocar **Enviar pedido por WhatsApp**, el pedido llega **en vivo** a la pantalla de cocina con alerta sonora. El WhatsApp sale igual que siempre, ahora con «Pedido N° XXXX» al final. Si la cocina falla, el WhatsApp sale igual.
3. **La pantalla de cocina (`admin.html`) tiene el botón «Códigos»**: crear códigos de Puntos Z (compra, Rescate de Miércoles, Combo Completo), buscar un código y anular los que nadie usó. Además, cada pedido listo o entregado trae **«Puntos Z +N»**: crea el código de ese pedido (cada $25 = 1 punto) con el mensaje listo para mandar por WhatsApp.
4. **Reglas nuevas de Firestore** (un bloque para pegar): pedidos, personal y códigos.

## Qué subir y dónde

| Archivo | Va a | Qué hacer |
|---|---|---|
| `index.html`, `app.js`, `styles.css` | repo de la web `Z18burgersUY/Z18-Web`, raíz | **Reemplazar** |
| `cocina.js` | repo de la web, raíz | **Subir** (nuevo) |
| `event-manager.js` | repo de la web, raíz | **Subir de nuevo** (lo habías borrado; sin él no hay Navidad) |
| `logo-navidad.webp` | repo de la web, raíz | **Subir** (nuevo) |
| `logo-halloween.webp` | repo de la web | **Borrar** |
| `admin.html`, `admin.css`, `admin.js`, `cocina.js` | repo del panel `xd12346767-ai/z18_admin`, raíz | **Reemplazar** (`cocina.js` es el mismo archivo que el de la web) |
| `prueba-cocina.html`, `snippet_checkout.js` (de la entrega 13) | repo del panel | `prueba-cocina.html` sirve para probar y después se **borra**; `snippet_checkout.js` ya no hace falta (todo quedó integrado en `app.js`) |
| `reglas-cocina-bloque.txt` | **no va a GitHub**: se pega en Firebase → Firestore → Reglas | Ver paso 1 |

`vercel.json` y `assets/logo.webp` del panel no cambian.

## Paso a paso (lo que solo podés hacer vos, con tus cuentas)

**1. Reglas de Firestore.** Firebase → *Firestore Database* → pestaña *Reglas*. Abrí `reglas-cocina-bloque.txt`, copiá **todo** y pegalo **dentro** de tus reglas, dentro de `match /databases/{database}/documents { … }`, al final (antes de las dos últimas llaves). **No reemplaces** tus reglas por este bloque: se suma. Si ya habías pegado el bloque de la entrega 13, **reemplazalo entero** por este (empieza en el cartel «Z18 · COCINA (KDS)» y termina en `kdsTransicionOk`); no lo dejes duplicado. Tocá **Publicar**.
No cambia tus reglas de siempre (usuarios, canje de códigos): le suma al personal permiso para crear, ver y anular códigos sin usar; los clientes siguen sin poder crear ni borrar códigos.

**2. Ingreso anónimo.** *Authentication* → *Sign-in method*: habilitá **Anónimo** y confirmá que **Correo electrónico/contraseña** también esté habilitado.

**3. Cuenta del personal.** *Authentication* → *Users* → **Agregar usuario**: el correo y la contraseña con los que va a entrar la cocina (los elegís vos; no hace falta que me los pases). Copiá el **UID** de esa fila (una cadena larga de letras y números, no el correo).

**4. Permiso de cocina.** *Firestore Database* → *Datos* → **Iniciar colección** (o «Agregar documento» si `staff` ya existe): colección `staff`, ID del documento = **el UID** del paso 3, un campo cualquiera: `rol` (string) = `cocina`. Para sumar más personal repetí 3 y 4; para sacar a alguien, borrá su documento en `staff`.

**5. Subir los archivos** de la tabla (primero el panel, después la web). Vercel publica solo.

**6. Probar el panel.** Abrí `https://z18admin.vercel.app/`, entrá con la cuenta del paso 3 y tocá **Activar sonido**. Si dice «Sin permiso», falta el paso 4 (la pantalla muestra el UID para copiarlo).

**7. Probar un pedido real.** En la web, con el celular: sumá un producto, abrí el carrito, completá los datos y tocá **Enviar pedido por WhatsApp**. En la cocina tiene que sonar y aparecer una tarjeta con **el mismo código** que dice el mensaje de WhatsApp («Pedido N° …»). Pasalo a *Empezar a preparar* → *Listo* → *Entregado*. Con *Puntos Z +N* se crea el código del pedido; probalo en «Mi cuenta» de un cliente.

**8. Probar la Navidad.** Recargá la web (si ves la anterior, recargá forzado): luces arriba, nieve, logo navideño y «Mi cuenta → Tema de Navidad» para apagarla.

**Chequeo extra de las reglas (2 minutos, recomendado):** en *Reglas* → **Simulador**: `get` en `/databases/(default)/documents/pedidos/ABCDEFGHJKLMNPQRSTUV`, *sin autenticar* → **Denegado**; autenticado con un UID cualquiera → **Denegado**; autenticado con el UID de tu documento `staff` → **Permitido**; `delete` de ese pedido como personal → **Denegado**.

## Cómo se usan los códigos (panel → «Códigos»)

- **Crear códigos:** elegí *¿Para qué es?* (**Compra**: ponés el monto del pedido y calcula los puntos, cada $25 = 1; **Rescate de Miércoles**: el código empieza con `Z18-M`; **Combo Completo**: empieza con `Z18-X`), los **Puntos Z** (1 a 500) y la **cantidad** (hasta 20 por tanda). Quedan guardados en Firebase y aparecen en «Creados ahora» con *Copiar código*, *Copiar mensaje* y *Enviar por WhatsApp*. Esa lista se borra de la pantalla al salir (los códigos siguen en Firebase: se encuentran con *Buscar*).
- **Buscar un código:** escribís el código y te dice si existe, cuántos puntos da y si ya se usó.
- **Códigos sin usar:** lista hasta 100 y cada uno se puede **Anular** (dos toques). Un código ya canjeado no se puede anular ni tocar.
- **Puntos Z +N en un pedido:** crea el código de **ese** pedido (siempre el mismo código para ese pedido: tocar dos veces no entrega puntos dobles) y deja el mensaje listo para el cliente. Tope de 500 puntos por pedido.

## La Navidad: cómo se maneja

- **Apagarla para todos** (por ejemplo en enero): en `event-manager.js` cambiá la línea `const activeEvent = 'navidad';` por `const activeEvent = null;`. También alcanza con borrar `event-manager.js`: la web funciona igual sin él (está probado).
- **Próximo evento** (Verano, Pascua, Día de la Madre…): al final de `styles.css` quedó la «PLANTILLA · EVENTO NUEVO» con los dos pasos escritos; la lógica no se toca.
- El logo se pide a `assets/logo-navidad.webp` y, como tu repositorio es plano, cae solo a `logo-navidad.webp` en la raíz. En la consola del navegador aparece un aviso de ese cambio de ruta: es normal.
- Respeta «reducir movimiento» del celular (sin nieve cayendo ni luces que titilan) y los adornos no tapan ningún botón.

## Lo que conviene saber

- **El formulario del carrito es obligatorio** (nombre, teléfono, retiro/delivery y dirección si es delivery). Esa fue una decisión mía para que la cocina siempre tenga con quién hablar; si preferís que sea opcional, decímelo.
- **Cuentas anónimas:** para poder guardar el pedido, Firebase crea una cuenta anónima cuando alguien abre el carrito con algo adentro. Las vas a ver en *Authentication* como usuarios sin correo; es normal. Quien solo mira el menú no genera ninguna.
- **El código «Puntos Z» de un pedido** se calcula con el identificador del pedido: el método es visible en el código de la pantalla, pero solo vale si la cocina lo crea (el documento lo crea el personal desde el panel).
- **Spam:** cualquier visitante puede mandar un pedido, y las reglas limitan la forma de cada pedido pero no la cantidad. La defensa recomendada es **Firebase App Check** (con reCAPTCHA); se puede sumar más adelante sin cambiar esto.
- **Datos guardados de cada pedido:** nombre, teléfono, tipo de entrega, dirección, productos, aclaraciones, total y estado; solo los lee el personal y los pedidos no se borran desde ninguna pantalla. Conviene mencionarlo en la política de privacidad.
- **Costos:** el panel hace una sola escucha de las últimas 16 horas y 150 pedidos; un día de 100 pedidos consume unas 600 lecturas de las 50.000 gratuitas.
- **Visto y no tocado:** en modo claro, el texto verde de «Consultar por WhatsApp» tiene poco contraste con el fondo blanco (unos 2 a 1). Ya estaba así antes de la Navidad.

## Cómo se probó

Navegador real (sin pantalla), en celular y escritorio, modo oscuro y claro: **133** verificaciones del carrito y el pedido, **150** del tema de Navidad (interruptor y recuerdo de la elección, logos, restos de Halloween, tamaños, contraste de todos los textos, «reducir movimiento»), **534** del panel de cocina y códigos, **16** punta a punta web → cocina, y comparación con la web actual: lo que no es del pedido ni de la Navidad queda idéntico. Reglas: **120 + 476 + 183** casos, más pruebas con errores puestos a propósito para comprobar que las pruebas los detectan (las pocas que no los detectan son cláusulas repetidas a propósito). Las reglas se probaron con un intérprete propio y **no con el emulador oficial de Firebase** (no se pudo usar desde donde trabajo): por eso conviene el chequeo del Simulador de arriba. Tampoco pude abrir tu consola de Firebase ni Vercel: probé todo contra copias locales.
