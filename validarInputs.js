const inputs = document.querySelectorAll("form input");

function validarInput(input) {
    if (input.value.trim() === "") {
        input.classList.add("is-invalid");
    } else {
        input.classList.remove("is-invalid");
    }
}

function verificarContenidoInputs(inputs) {
    inputs.forEach((input) => {
        input.addEventListener("keyup", () => {
            validarInput(input);
        });
    });
}

verificarContenidoInputs(inputs);