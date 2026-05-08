como fuciona Controller;
1. peticionApi.js crea un worker.
2. Ese worker queda vivo esperando mensajes.
3. Cuando apreto Load products, traerProductos() le manda un mensaje al worker.
4. El worker recibe "GET_PRODUCTOS".
5. El worker hace el fetch.
6. El worker responde con postMessage().
7. peticionApi.js tiene un listener esperando respuestas del worker.
8. Si la respuesta viene ok, guarda en localStorage y muestra con GridJS.

Como otengo los botones en peticionAPI
// Obtengo el botón que está dentro de la sección Product List del acordeón en index.html.
// No tengo que indicar una ruta hacia index.html porque este script se carga desde ese mismo HTML
// al final del body con:
// <script src="Controller.js"></script>
//
// Entonces, cuando uso document.getElementById("botonLoadProductos"),
// "document" representa el HTML que está abierto actualmente en el navegador.
// En este caso, ese documento es index.html.