# Z18 · Calificanos, Compartir y seguridad

Se apoya en la entrega 15 (web rápida). Son **3 archivos**: `index.html` y `app.js` (completos, **reemplazan** a los de la entrega 15) y `vercel.json` (**nuevo**). Se suben a la raíz del repo de la web, juntos, en una sola subida. Si todavía no subiste la entrega 15, subí sus 22 archivos y estos 3 en la misma subida (estos pisan a `index.html` y `app.js` de la 15). `LEEME.md` no se sube. No cambian el panel de cocina, Firebase ni las reglas.

## Qué cambia en la web

En **Ubicación** ahora hay cuatro botones:
- **Cómo llegar:** abre la ficha de Z18 en Google Maps (antes era una búsqueda). Usé el identificador real de tu ficha, que encontré en Google.
- **Llamar:** igual que antes (092 061 753).
- **Calificanos:** abre directo el formulario para dejar una reseña de tu ficha de Google (hoy 5,0 con 1 reseña).
- **Compartir:** en el celular abre el menú de compartir (WhatsApp, Instagram, Telegram…) con el nombre, un texto corto y el enlace de la web. En la computadora copia el enlace y avisa «Enlace copiado». Si el navegador tampoco deja copiar, abre WhatsApp con el mensaje armado.

Y un ajuste en los datos para Google: sumé las formas de pago (efectivo, transferencia y débito), porque tu página ya las muestra en «Métodos de pago». (Antes te dije que no estaban; sí estaban.)

## Seguridad

**1. Cabeceras de seguridad (`vercel.json`).** Vercel las agrega a cada respuesta de la web:

| Cabecera | Para qué sirve |
|---|---|
| `X-Frame-Options: DENY` y `frame-ancestors 'none'` | Nadie puede meter tu web dentro de otra página para engañar a tus clientes |
| `X-Content-Type-Options: nosniff` | El navegador no adivina tipos de archivo |
| `Referrer-Policy` | No se filtra la dirección completa de tu web a sitios de afuera |
| `Permissions-Policy` | La web no puede pedir cámara, micrófono ni ubicación |
| `Strict-Transport-Security` | Obliga a usar HTTPS durante un año |
| `base-uri` y `object-src` | Cierran dos formas conocidas de inyectar contenido |

**Lo que dejé afuera a propósito:** una CSP que limite de dónde cargan scripts, estilos e imágenes, y `Cross-Origin-Opener-Policy`. Con tu web (Firebase, fuentes de Google, ingreso con ventana emergente de Google y Facebook) pueden cortar cosas si no se ajustan con pruebas en producción. Más adelante se puede endurecer.

**2. Revisión de las reglas de Firestore (no las cambié).** Están bien armadas: los Puntos Z no se pueden subir a mano, los códigos no se pueden listar ni inventar, los pedidos solo los lee y mueve el personal (con formato, tamaños y estados controlados) y nadie se da permisos de personal solo. Dos límites honestos:
- Cualquier visitante puede mandar pedidos (es lo que querés, incluso sin cuenta). Las reglas controlan el formato, pero no cuántos: alguien podría llenarte el panel de pedidos falsos. La defensa es **App Check** (paso 4).
- Un cliente puede editar campos de su propio perfil que no dan puntos (por ejemplo, ponerse la insignia Leyenda). Los Puntos Z sí están protegidos.

## Pasos que solo podés hacer vos

1. **Verificación en dos pasos** en las cuentas que mandan en todo: la de Google que administra Firebase, la de GitHub (las dos, la tuya y la de `xd12346767-ai`) y la de Vercel. Es lo que más protege: si alguien roba una contraseña, igual no entra.
2. **Restringir la clave de Firebase a tus dominios.** En console.cloud.google.com, proyecto `z18-web-64b28` → *APIs y servicios* → *Credenciales* → la clave de navegador («Browser key») → *Restricciones de aplicaciones* → *Sitios web* → agregá `https://z18-web.vercel.app/*`, `https://z18admin.vercel.app/*` y `https://z18-web-64b28.firebaseapp.com/*`. Después probá ingresar y mandar un pedido de prueba; si algo falla, falta un dominio.
3. **Revisar quién tiene acceso:** los documentos de la colección `staff` en Firestore (solo el personal de cocina), los colaboradores de los dos repos de GitHub y los miembros de Vercel. Que quede solo quien tiene que estar.
4. **App Check (lo hacemos juntos):** protege la base de datos para que solo tu web y tu panel puedan usarla. Necesita una clave de reCAPTCHA que se crea en Firebase y que yo conecto en el código de la web **y del panel de cocina**. **No actives «Aplicar» (enforce) antes de que te pase el código**: si lo hacés antes, se cortan los pedidos y el panel. Cuando quieras avanzar, decime y te guío.
5. **Probar las cabeceras:** pegá `https://z18-web.vercel.app` en securityheaders.com. Debería mejorar la nota; no esperes la máxima, porque dejé la CSP completa para más adelante.

## Subir y probar

Después de subir, esperá a que Vercel publique (1 o 2 minutos). En el celular: en *Ubicación*, tocá **Calificanos** (tiene que abrir el formulario de reseña de Z18), **Cómo llegar** (la ficha) y **Compartir** (el menú de compartir). Probá también ingresar con Google y mandar un pedido, para confirmar que las cabeceras no cortaron nada.

## Cómo se probó

Navegador real, celular y escritorio, sobre estos mismos archivos:
- Lo que ya existía sigue igual: **133** del carrito y el pedido, **150** de la Navidad, **534** del panel de cocina, **16** punta a punta; las reglas de Firestore no cambian (**779** casos).
- Comparación con la web publicada: **38** pantallas, **0 diferencias** (con lo nuevo escondido).
- Lo nuevo y lo de la web rápida: **315** verificaciones, incluidos los cuatro botones (en 320, 390 y 1280 px), los enlaces con el identificador de la ficha, compartir con y sin menú del celular, sin portapapeles y cerrando el menú, y el contenido de `vercel.json`.
- Simulación de la subida (tu repositorio de hoy + las entregas 15 y 16): todo en verde.
- **29** roturas a propósito en lo nuevo (por ejemplo, que «Calificanos» abra otra ficha o que una cabecera rompa el ingreso con Google): las pruebas detectaron las 29.

**Lo que no pude hacer:** probar el menú de compartir en un celular real (lo simulé), abrir el formulario de reseña con una cuenta de Google, ni ver las cabeceras funcionando en tu Vercel (solo comprobé que el archivo es válido y que no restringe nada que la web use).
