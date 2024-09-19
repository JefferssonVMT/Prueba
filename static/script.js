
// Agrego los eventos hasta que el DOM ya se cargó por completo
document.addEventListener("DOMContentLoaded", function () {

    // Selecciono el formulario
    let formulario = document.querySelector("#frm_pedido");

    // Cambio el comportamiento del evento submit del formulario
    formulario.addEventListener("submit", function (event) {

        // Elimino el comportamiento original del evento submit
        event.preventDefault();

        // Selecciono el input oculto donde voy a ingresar las coordenadas
        let coordenadas = document.querySelector("#coordenadas");

        // Verifico que tengo permiso para leer la ubicación y/o que funciona con el navegador
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function (position) {
                /* const latitud = position.coords.latitude;
                const longitud = position.coords.longitude; */

                /* Concateno (o no, segun se vaya a utilizar), la longitud y latitud contenida en el CurrentPosition y lo inserto en el
                input oculto */
                coordenadas.value = position.coords.latitude + "," + position.coords.longitude;
            });

        } else {
            console.log("Error obteniendo la geolocalizacion");
        }

        /* Pauso el flujo de ejecución por un momento para que le de chance de leer las coordenadas
        La cantidad de milesimas de segundo se pueden cambiar discretamente previendo una mala conexion o un equipo/navegador lento
        En mi pc con 60 es sufuciente, pero se puede subir bastante, siempre evitando dejarlo con demasiada espera */
        sleep(4000).then(function () {
            // Despues de la espera intencional, simplemente envio el formulario ya con el campo de ubicación lleno
            formulario.submit();
        });
    });
});

// Una funcion sleep generica que deja en espera el flujo de ejecucion de JS por el tiempo que se le de en milesimas de segundos
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}