// espero a que el dom este listo para que no me tire error al buscar los id del html
document.addEventListener('DOMContentLoaded', () => {
    console.log("script.js cargado correctamente"); // esto es solo para ver en la consola que partio bien

    // busco el boton de explorar para darle una accion al hacerle click
    const btnExplorar = document.getElementById('btn-explorar');
    if (btnExplorar) {
        btnExplorar.addEventListener('click', () => {
            const heroSection = document.querySelector('#inicio .container');
            
            // creo un parrafo nuevo para darle las gracias al usuario
            const infoExtra = document.createElement('p');
            infoExtra.className = 'mt-3 text-success fw-bold';
            infoExtra.innerText = "¡Gracias por tu interés! Cholchol está creciendo para ti.";
            
            // checkeo que el mensaje no exista ya, para no llenar la pantalla de textos iguales si clickean mucho
            if (!document.querySelector('.text-success.fw-bold')) {
                heroSection.appendChild(infoExtra);
            }

            // esto hace que la pantalla baje solita de forma suave hasta la parte de los tramites
            document.getElementById('tramites').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // aca guardo mas tramites en una lista para meterlos despues dinamicamente
    const masTramites = [
        { titulo: 'Registro Social', desc: 'Actualiza tus datos en el RSH.', link: '#' },
        { titulo: 'Aseo y Ornato', desc: 'Solicita retiro de escombros.', link: '#' }
    ];

    const contenedor = document.getElementById('contenedor-tramites');
    if (contenedor) {
        // espero 2 segundos antes de meter los tramites extra para simular que vienen de internet
        setTimeout(() => {
            masTramites.forEach(tramite => {
                const col = document.createElement('div');
                col.className = 'col-md-4';
                // armo la estructura de la card usando template strings, mucho mas comodo
                col.innerHTML = `
                    <article class="card h-100 shadow-sm border-0 bg-light">
                        <div class="card-body">
                            <h3 class="h5">${tramite.titulo}</h3>
                            <p class="card-text text-muted">${tramite.desc}</p>
                            <a href="${tramite.link}" class="btn btn-outline-primary btn-sm">Ir al trámite</a>
                        </div>
                    </article>
                `;
                contenedor.appendChild(col);
            });
        }, 2000);

        // estos eventos son para que las tarjetas se agranden un poquito cuando les pasas el mouse por encima
        contenedor.addEventListener('mouseover', (e) => {
            const tarjeta = e.target.closest('.card');
            if (tarjeta) tarjeta.style.transform = 'scale(1.02)';
        });

        // y aca vuelven a su tamaño normal cuando sacas el puntero
        contenedor.addEventListener('mouseout', (e) => {
            const tarjeta = e.target.closest('.card');
            if (tarjeta) tarjeta.style.transform = 'scale(1)';
        });
    }
});