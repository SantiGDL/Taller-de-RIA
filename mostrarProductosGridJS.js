let grillaProductos = null;

function mostrarProductosConGrid(productos) {
    const configuracion = {
        columns: [
            {
                name: "Image",
                width: "20%"
            },
            {
                name: "Title",
                width: "25%"
            },
            {
                name: "Price",
                width: "15%"
            },
            {
                name: "Description",
                width: "40%"
            }
        ],
        data: productos.map((producto) => [
            gridjs.html(`
                <img 
                    src="${producto.image}" 
                    alt="${producto.title}" 
                    style="width: 8rem; height: 8rem; object-fit: contain;"
                >
            `),
            producto.title,
            producto.price,
            producto.description
        ]),
        search: true,
        sort: true,
        pagination: {
            limit: 5
        }
    };

    if (grillaProductos === null) {
        // La primera vez limpio el contenedor para que GridJS pueda renderizar
        divProductos.innerHTML = "";

        grillaProductos = new gridjs.Grid(configuracion);
        grillaProductos.render(divProductos);
    } else {
        // Las siguientes veces ya no hago render de cero,
        // solamente actualizo la grilla existente
        grillaProductos.updateConfig(configuracion).forceRender();
    }
}