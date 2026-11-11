# Z18 · Sin «Cómo llegar»

Se apoya en las entregas 15 y 16. Son **2 archivos**, completos: `index.html` y `tailwind.css`. **Reemplazan** a los de la entrega 15/16 y se suben juntos a la raíz del repo de la web, en una sola subida. Si todavía no subiste las entregas 15 y 16, subí sus archivos y estos dos en la misma subida (estos pisan a `index.html` y `tailwind.css`). `LEEME.md` no se sube. No cambian `app.js`, `vercel.json`, el panel de cocina ni Firebase.

## Qué cambia

- **Se saca el botón «Cómo llegar»** y, con él, el único enlace a Google Maps que tenía la web. Ahora la página no muestra mapa ni dirección exacta: en *Ubicación* dice solo «Paso de la Arena, Montevideo».
- **Los botones que quedan** son **Llamar** y **Calificanos** en una fila, y **Compartir** ocupando toda la fila de abajo, para que no quede suelto. Por eso cambia `tailwind.css`: suma una regla de diseño (`col-span-2`). Si subís solo `index.html`, todo funciona igual, pero «Compartir» queda a medio ancho.
- Se actualizó el comentario de los datos para Google: ya no habla de «cómo llegar» (esos datos nunca llevaron la dirección).

Tu ficha de Google no cambia: sigue mostrando su dirección y el botón «Cómo llegar» de Google. Si querés que la dirección salga de ahí también, se maneja desde el Perfil de Empresa de Google, no desde la web.

## Subir y probar

Subí los 2 archivos, esperá a que Vercel publique (uno o dos minutos) y mirá *Ubicación* en el celular: tienen que verse **Llamar**, **Calificanos** y, abajo, **Compartir**, sin «Cómo llegar».

## Cómo se probó

Navegador real, celular y escritorio, sobre estos mismos archivos:
- Lo que ya existía sigue igual: **133** del carrito y el pedido, **150** de la Navidad, **534** del panel de cocina, **16** punta a punta; las reglas de Firestore no cambian.
- Comparación con la web publicada: **38** pantallas, **0 diferencias** (con lo nuevo escondido).
- Lo nuevo de la web rápida, de Calificanos/Compartir y de `vercel.json`: **317** verificaciones. Incluyen que la página ya no tenga «Cómo llegar» ni ningún enlace a Google Maps, y que «Compartir» ocupe la fila de abajo en 320, 390 y 1280 px.
- **30** roturas a propósito en lo nuevo (entre ellas, que vuelva el enlace a Google Maps o que «Compartir» quede suelto): las pruebas detectaron las 30.
- Simulación de la subida (tu repositorio de hoy + las entregas 15, 16 y 17): todo en verde.

**Lo que no pude hacer:** verlo en un celular real ni en tu Vercel.
