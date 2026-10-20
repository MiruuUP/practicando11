document.querySelectorAll(".reservation-form, .contact-form")
    .forEach(formulario => {
        // Permite que JavaScript controle la validación.
        formulario.noValidate = true;

        const campos = formulario.querySelectorAll(
            "input, select, textarea"
        );

        function validarCampo(campo) {
            campo.setCustomValidity("");

            // Evita aceptar campos obligatorios con solo espacios.
            if (campo.required && !campo.value.trim()) {
                campo.setCustomValidity("Completa este campo.");
            }
        }

        campos.forEach(campo => {
            campo.addEventListener("input", () => {
                validarCampo(campo);
            });

            campo.addEventListener("change", () => {
                validarCampo(campo);
            });
        });

        formulario.addEventListener("submit", evento => {
            campos.forEach(validarCampo);

            if (!formulario.checkValidity()) {
                evento.preventDefault();
                formulario.reportValidity();
                return;
            }

            // El formulario de contacto todavía es una demostración.
            if (formulario.classList.contains("contact-form")) {
                evento.preventDefault();

                let aviso = formulario.querySelector(".form-status");

                if (!aviso) {
                    aviso = document.createElement("p");
                    aviso.className = "form-status";
                    aviso.setAttribute("role", "status");
                    formulario.appendChild(aviso);
                }

                aviso.textContent =
                    "Datos válidos. Esta demostración no envía mensajes.";
            }
        });
    });