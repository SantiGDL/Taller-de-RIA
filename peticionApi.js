// Obtengo el botón que está dentro de la sección Product List del acordeón en index.html.
// No tengo que indicar una ruta hacia index.html porque este script se carga desde ese mismo HTML
// al final del body con:
// <script src="peticionApi.js"></script>
//
// Entonces, cuando uso document.getElementById("botonLoadProductos"),
// "document" representa el HTML que está abierto actualmente en el navegador.
// En este caso, ese documento es index.html.
const botonLoadProductos = document.getElementById("botonLoadProductos");
const divProductos = document.getElementById("divProductos");

async function traerProductos() {
    try {
        //Pedir productos
        const respuesta = await fetch("https://fakestoreapi.com/products",{ 
                                    method: "GET"                           //traigo los productors del fakestore con fetch, no hace falta especificar GET pero me queda más claro así
        });
        //Parcearlos a json
        const productosJson = await respuesta.json();                       //convierto esa respuesta a json 
        //Guardarlos en localStorage
        localStorage.setItem("productos", JSON.stringify(productosJson));   //guardo los productos en local storage en formato JSON.stringify porque solo acepta texto plano localSotrage
        const productosGuardados = JSON.parse(localStorage.getItem("productos"));       //Pido los productos que guarde en localSotrage y los meto en una variable

        //Mostrarlos en pantalla
        divProductos.innerHTML = "";                                                    //Meto los productos guardados en localStorage

        productosGuardados.forEach((producto) => {
            divProductos.innerHTML += `
                <div class="col-md-4">
                    <div class="card h-100">
                        <img src="${producto.image}" 
                             class="card-img-top p-3" 
                             style="height: 200px; object-fit: contain;" 
                             alt="${producto.title}">

                        <div class="card-body">
                            <h5 class="card-title">${producto.title}</h5>
                            <p class="card-text">${producto.description}</p>
                            <p class="fw-bold">Price: $${producto.price}</p>
                            <p class="text-muted">Category: ${producto.category}</p>
                        </div>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        divProductos.innerHTML = `
            <div class="alert alert-danger">
                Error al cargar los productos.
            </div>
        `;

        console.log("Error:", error);
    }
}

botonLoadProductos.addEventListener("click", traerProductos);