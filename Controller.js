//Seccion de Post (primer seccion del acordeon)
const formProducto = document.getElementById("formularioProducto");
const alertaProducto = document.getElementById("alertaProducto");
const botonSend = document.getElementById("botonSend");

//Seccion de GET (segunda seccion del acordon)
const botonLoadProductos = document.getElementById("botonLoadProductos");
const divProductos = document.getElementById("divProductos");

//Creo un worker
const workerProductos = new Worker("worker.js");
//Cuando apreto el boton botonLoadProductos se invoca esta funcion, le pide al worker que haga el get
function traerProductos() {
    workerProductos.postMessage({
        accion: "GET_PRODUCTOS"
    });
}
function crearProducto(evento) {
    // Evito que el formulario recargue la página al apretar Send
    evento.preventDefault();

    // Leo los valores del formulario usando los name de los inputs
    const titulo = formProducto.elements["title"].value.trim();
    const precio = formProducto.elements["price"].value.trim();
    const descripcion = formProducto.elements["desc"].value.trim();
    const categoria = formProducto.elements["cat"].value.trim();

    // Armo el objeto que voy a mandar al worker
    const productoNuevo = {
        image:"ImagenDefault.png",
        title: titulo,
        price: Number(precio),
        description: descripcion,
        category: categoria,
    };

    // Le mando al worker la orden POST_PRODUCTO y también los datos del producto
    workerProductos.postMessage({
        accion: "POST_PRODUCTO",    //el nombre es arbitrario de la accion, a mi gusto
        producto: productoNuevo
    });
}



//Creo un listener que va a estar esprando la respuesta del get para mostrarla guardarla en local storage y mostrarla en pantalla
//eso va a pasar cuando el worker haga self.postMessage()
workerProductos.addEventListener("message", (evento) => {
    const respuestaWorker = evento.data;

    if (respuestaWorker.accion === "GET_PRODUCTOS") {
        if (respuestaWorker.ok) {
            localStorage.setItem("productos", JSON.stringify(respuestaWorker.productosAPI)); //guardo comno string porque el localSotrage solo acepta texto plano

            const productosAPI = JSON.parse(localStorage.getItem("productos") || []);
            // Leo los productos creados localmente
            const productosLocales = JSON.parse(localStorage.getItem("productosLocales")) || [];
            // Uno ambas listas
            const productosParaMostrar = [...productosAPI, ...productosLocales];

            // Muestro todo junto
            mostrarProductosConGrid(productosParaMostrar, divProductos); //muestro los productos usando la fucion que defní en otro js, no hace falta incluirla porque en el index la incluyo antes que peticionApi.js
        } else {
            divProductos.innerHTML = `
                <div class="alert alert-danger">
                    ${respuestaWorker.mensaje}
                </div>
            `;
        }
    }
});



workerProductos.addEventListener("message", (evento) => {
    const respuestaWorker = evento.data;

    if (respuestaWorker.accion === "POST_PRODUCTO") {
        if (respuestaWorker.ok) {
            alertaProducto.innerHTML = `
                <div class="alert alert-success">
                    Producto creado correctamente. ${respuestaWorker.respuestaApi.id}
                </div>
            `;

            console.log(respuestaWorker.respuestaApi);
            //Obtengo el localStorage parseado e json, si está vacio lo cargo vacio en productosGuardados
            const productosLocales = JSON.parse(localStorage.getItem("productosLocales")) || [];

            //Le hago un push al array, por eso si esta vacio quiero que sea de tipo array
            productosLocales.push(respuestaWorker.productoNuevo); //aca estoy cargando el producto que cree en la funcion crearProducto()
            //Vulevo a guardar los datos en localStorage
            localStorage.setItem("productosLocales", JSON.stringify(productosLocales));

            const productosAPI = JSON.parse(localStorage.getItem("productos")) || [];
            const productosParaMostrar = [...productosAPI, ...productosLocales];
            mostrarProductosConGrid(productosParaMostrar);

            formProducto.reset();
        } else {
            alertaProducto.innerHTML = `
                <div class="alert alert-danger">
                    ${respuestaWorker.mensaje}
                </div>
            `;
        }
    }
});




botonLoadProductos.addEventListener("click", traerProductos);
formProducto.addEventListener("submit", crearProducto);
