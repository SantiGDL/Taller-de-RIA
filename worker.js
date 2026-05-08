self.addEventListener("message", async (evento) => {
    //almaceno los datos que me llegan 
    const datos = evento.data;

    //Si el evento que le lleva es un "GET_PRODUCTOS" hago el get
    if (datos.accion === "GET_PRODUCTOS") {
        try {
            //Pido los producto a la API
            const respuesta = await fetch("https://fakestoreapi.com/products", {
                method: "GET"
            });

            if (!respuesta.ok) {
                throw new Error("Error al traer los productos");
            }

            //Parceo la respuesta a JSON
            const productosJson = await respuesta.json();

            //Envio la respuesta ya parceada 
            self.postMessage({
                ok: true,
                accion: "GET_PRODUCTOS",
                productosAPI: productosJson
            });

        } catch (error) {
            self.postMessage({
                ok: false,
                accion: "GET_PRODUCTOS",
                mensaje: error.message
            });
        }
    };


    if (datos.accion === "POST_PRODUCTO") {
        try {
            // Recibo el producto que me mandó peticionApi.js
            const productoNuevo = datos.producto;

            // Hago el POST a FakeStoreAPI
            const respuesta = await fetch("https://fakestoreapi.com/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productoNuevo)
            });

            if (!respuesta.ok) {
                throw new Error("Error al crear producto nuevo");
            }

            // Convierto la respuesta a JSON
            const respuestaJson = await respuesta.json();

            // Le respondo a peticionApi.js
            self.postMessage({
                ok: true,
                accion: "POST_PRODUCTO",
                productoNuevo:productoNuevo,
                respuestaApi: respuestaJson,
            });

        } catch (error) {
            self.postMessage({
                ok: false,
                accion: "POST_PRODUCTO",
                mensaje: error.message
            });
        }
    };
});
