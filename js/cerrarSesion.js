const botonCerrarSesion = document.getElementById("cerrar");

botonCerrarSesion.addEventListener("click", function() {
    let datos=0;
    fetch('../php/cerrarSesion.php',{
        method: 'POST',
        body: datos
    })
    .then( res => res.json())
    .then(data => {
        console.log(data); //data es la respuesta del servidor
        if(data=="sesion cerrada"){
            setTimeout(redirigirIndex,1000);
        }
        else{
            console.log("Error al cerrar");
        }
    })

});

function redirigirIndex(){
    window.location.href="../index.html";
}