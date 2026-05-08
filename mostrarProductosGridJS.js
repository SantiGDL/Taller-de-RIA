function mostrarProductosConGrid(productos) {
    divProductos.innerHTML = "";

    new gridjs.Grid({
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
    }).render(divProductos);
}