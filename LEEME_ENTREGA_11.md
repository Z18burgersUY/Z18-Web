# Entrega 11 · Fotos con carga diferida + checklist final de integración y deploy (23/10/2026)

## Qué cambió

- **Las 14 fotos ya no viajan juntas.** El `fotos.js` de 2 MB se partió en un archivo por foto: `fotos/<nombre>.js`. Cada una se pide **sola**, recién cuando hace falta.
- **Al entrar** se piden solo las fotos de **Milanesas al plato** y **Súper Promos** (con prioridad baja, para no competir con lo que ya se está viendo) y lo que quede a la vista: en un celular, la primera hamburguesa.
- **El resto** (más hamburguesas, combos, pizzas, reclutas, minutas, bebidas, extras) se pide **a medida que se baja**: cuando una foto está a 400 px de entrar en pantalla y se queda ahí 250 ms (así un salto largo con los chips del menú no baja lo que pasa de largo).
- **Con «Ahorro de datos» prendido en el celular**, no se pide nada de más: todo a demanda.
- **No se tocó**: carrito, Puntos Z, misiones, reglas de Firestore, reloj de Montevideo, horarios ni el indicador «Abierto / Cerrado». `index.html`, `styles.css`, `event-manager.js` y `firestore.rules` son **idénticos a la entrega 10**; lo único que cambió en el código es `app.js`.
- Las 14 fotos son **exactamente las mismas** (idénticas byte a byte a las del `fotos.js` viejo): solo cambió cómo viajan.

## Cómo dejar el repositorio

```
index.html            (sin cambios)
styles.css            (sin cambios)
app.js                ← REEMPLAZAR por el de esta carpeta
event-manager.js      (sin cambios)
firestore.rules       (sin cambios · NO hace falta volver a publicarlo en Firebase)
assets/logo.webp
assets/logo-halloween.webp
fotos/                ← CARPETA NUEVA, junto a index.html y app.js, con 14 archivos:
    bunker.js  clasica.js  crispy.js  milanesa-cheddar.js  napo1.js  napo2.js  nuggets.js
    papas-cheddar.js  papas-comunes.js  pizzeta-muzza.js  pizzeta-salsa.js  salchipapa.js  smash.js  z18.js
fotos.js              ← BORRAR (el viejo, ya no se usa)
```

### Paso a paso (GitHub → Vercel)

1. En GitHub: **Add file → Upload files**. Arrastrá **juntos** `app.js` y la **carpeta `fotos` entera** (no los 14 archivos sueltos: sueltos no se crea la carpeta). **Commit changes** (un solo commit).
2. Esperá a que Vercel termine (en Vercel → *Deployments* → «Ready», suele ser 30–60 segundos).
3. Recién ahí, borrá `fotos.js` del repositorio (abrilo → menú de los tres puntos → *Delete file* → commit). Si lo dejás no rompe nada, pero ya no se usa.
4. `index.html`, `styles.css` y `event-manager.js` **no hace falta resubirlos**; están en la carpeta por si preferís tener el juego completo.

Si por algún motivo `app.js` llegara antes que `fotos/`, la web funciona igual, solo que sin fotos (la consola avisa); al subir `fotos/` aparecen solas.

## Verificación de 2 minutos después de publicar

1. Abrí https://z18-web.vercel.app con recarga forzada (`Ctrl + Shift + R`, o una pestaña privada). Con la configuración por defecto de Vercel un `F5` común también alcanza.
2. `F12` → **Console**: no debe haber nada en rojo. El aviso *amarillo* «cdn.tailwindcss.com should not be used in production» es **normal** (es de Tailwind por CDN, no de la carga de fotos).
3. `F12` → **Network** → escribí `fotos` en el filtro → recargá con la vista de celular (`Ctrl + Shift + M`): al entrar tienen que aparecer unos 4 archivos (`napo1`, `napo2`, `milanesa-cheddar`, `z18`), **ninguno llamado `fotos.js`**. Bajá por la carta: van apareciendo los demás de a poco (estado 200, tipo *script*).
4. Cabecera: el indicador **«Abierto / Cerrado»** tiene que coincidir con «Nuestros horarios» del pie (hora de Montevideo, sin importar la hora del celular).
5. Agregá dos productos → carrito → *Terminar pedido* → se abre WhatsApp con el detalle y el total.
6. Con Halloween activo: logo de Halloween en la cabecera, el pie y «Mi cuenta».

**Si no se ven fotos**: en *Network* mirá si `fotos/z18.js` (u otra) da **404** → la carpeta `fotos` no quedó junto a `app.js` (a la altura de `index.html`). La consola lo dice con el nombre del archivo que falló.

## Un ajuste que podés querer (una línea de `app.js`)

```js
const FOTOS_AL_ENTRAR = ['milas', 'promos'];   // secciones cuyas fotos se piden apenas se dibuja el menú
```

- Otras secciones válidas: `'burgers'`, `'combos'`, `'pizzas'`, `'kids'`, `'minutas'`, `'drinks'`.
- `[]` = nada de más al entrar (queda solo lo que se ve): la entrada más liviana posible, unos 365 KB menos (las 3 fotos de Milanesas).
- Si escribís mal el nombre de una sección, la consola avisa **una vez** y la web sigue.

## Opcional (no está incluido): guardar las fotos en el celular del cliente

Un `vercel.json` en la raíz del repositorio con esto hace que quien ya visitó la web no vuelva a bajar las fotos durante un día:

```json
{
  "headers": [
    { "source": "/fotos/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=86400, stale-while-revalidate=604800" }] }
  ]
}
```

Contra: si algún día cambiás una foto, quien ya la tenía guardada puede seguir viendo la vieja hasta 24 h. Si ya tenés un `vercel.json`, sumá solo el bloque `headers`.

## Medición (celular emulado de 390 px, CPU 4× más lenta, servido con gzip como Vercel; mediana de 7 cargas)

| | Antes (`fotos.js`) | Después |
|---|---|---|
| Se baja al entrar | 1.709 KB | **727 KB** (−57 %) |
| Milanesas con foto · 4G | 2,8 s | **1,9 s** |
| Milanesas con foto · 3G lenta | 9,6 s | **4,5 s** |
| Primera hamburguesa con foto · 4G / 3G lenta | 2,8 s / 9,6 s | **2,4 s / 4,7 s** |
| Carga completa · 4G / 3G lenta | 3,0 s / 9,9 s | **2,2 s / 4,8 s** |
| Foto de «Minutas» al saltar con el chip · 4G / 3G lenta | ya estaba (tras esperar todo) | 0,8 s / 2,3 s |
| Menú dibujado · FCP · LCP (lo marca el logo) | 0,4–1,6 s · 0,2–1,3 s · 1,5–2,5 s | prácticamente igual (±0,2 s, dentro del ruido) |
| Saltos de diseño (CLS) | 0 | 0 |

**Lectura honesta**: lo que se ahorra es lo que la persona no llega a ver; si baja por toda la carta, termina bajando las mismas 14 fotos que antes. Y una foto de más abajo llega cuando la persona se acerca (en 3G lenta, un par de segundos), en vez de estar ya cargada. Si querés fotos más livianas todavía, el siguiente paso sería recomprimirlas (hoy pesan entre 45 y 227 KB cada una): decímelo y te lo preparo.
