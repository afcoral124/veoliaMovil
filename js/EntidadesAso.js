const contenedor = document.getElementById('contenedorOpciones');
document.addEventListener('DOMContentLoaded', function () {
    let datos = 0;
    //Comunicación con el servidor----------------------------------------------------------------
    fetch('../php/listarEmpresas.php',{
        method: 'POST',
        body: datos
    })
    .then( res => res.json())
    .then(data => {
            console.log(data); //data es la respuesta del servidor
            let respuesta = data; 
            imprimirListaEntidades(respuesta);
    })

    
});

function imprimirListaEntidades(respuesta) {
    contenedor.innerHTML = " ";
    
    for (var i = 0; i < respuesta.length; i++){
            contenedor.innerHTML+=
            `
                <a class="opciones" href="infoEntidad.php?nombreEmpresa=${respuesta[i]}">
                    <h3>${respuesta[i]}</h3>              
                </a>
            `;
    }
}





    
    
   
    



   




    



