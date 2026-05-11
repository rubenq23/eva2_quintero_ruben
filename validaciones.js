// esto asegura que el codigo corra recien cuando el html este cargado o si no va a tirar error de que no encuentra nada
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-contacto');
    
    // checkeo si el formulario existe en la pagina para que el script no rompa en otras secciones
    if (form) {
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const mensaje = document.getElementById('mensaje');

        // estas son las reglas: una para que el nombre solo tenga letras y otra para que el mail sea un mail real
        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // esta funcion es la que hace toda la pega de validar y cambiar los colores de los bordes
        const validarCampo = (input, regex) => {
            const valor = input.value.trim(); // borro los espacios locos al principio y al final
            let esValido = false;

            // si es el mensaje solo me importa que no este vacio, si es lo demas uso las reglas de arriba
            if (input === mensaje) {
                esValido = valor !== "";
            } else {
                esValido = valor !== "" && regex.test(valor);
            }

            // si pasa la prueba le pongo borde verde y clase de bootstrap, si no, lo pinto rojo
            if (esValido) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                input.style.borderColor = "#198754";
            } else {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
                input.style.borderColor = "#dc3545";
            }
            return esValido;
        };

        // esto es para que apenas el usuario escriba algo ya le vaya avisando si esta bien o mal
        nombre.addEventListener('input', () => validarCampo(nombre, regexNombre));
        email.addEventListener('input', () => validarCampo(email, regexEmail));
        mensaje.addEventListener('input', () => validarCampo(mensaje, null));

        // cuando el usuario apreta enviar, frenamos el envio para revisar todo primero
        form.onsubmit = function(event) {
            event.preventDefault(); 
            
            const nombreOk = validarCampo(nombre, regexNombre);
            const emailOk = validarCampo(email, regexEmail);
            const mensajeOk = validarCampo(mensaje, null);

            // si todo esta impecable, mostramos el mensaje de exito y limpiamos el formulario
            if (nombreOk && emailOk && mensajeOk) {
                document.getElementById('mensaje-exito').classList.remove('d-none');
                form.reset();
                
                // espero 3 segundos, limpio los colores de los inputs y escondo el aviso de exito de nuevo
                setTimeout(() => {
                    [nombre, email, mensaje].forEach(i => {
                        i.classList.remove('is-valid', 'is-invalid');
                        i.style.borderColor = "";
                    });
                    document.getElementById('mensaje-exito').classList.add('d-none');
                }, 3000);
            } else {
                // si algo falto, le mando el tipico alert para que despabile y arregle los datos
                alert("campos invalidos, por favor revise los datos.");
            }
            
            return false;
        };
    }
});