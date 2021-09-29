let respuesta= [];
document.addEventListener('DOMContentLoaded', function () {
    let datos = 0;
    //Comunicación con el servidor----------------------------------------------------------------
    fetch('../php/ordenes_entrada.php',{
        method: 'POST',
        body: datos
    })
    .then( res => res.json())
    .then(data => {
            console.log("Hola, respuesta del servidor: ");
            console.log(data); //data es la respuesta del servidor
    })
    //Comunicación con el servidor----------------------------------------------------------------
});