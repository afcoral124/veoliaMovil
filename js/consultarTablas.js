const contenedor = document.getElementById('contenedorOpciones');
let arregloTablas= [];
document.addEventListener('DOMContentLoaded', function () {
    let datos = 0;
    //Comunicación con el servidor----------------------------------------------------------------
    fetch('../php/listarTablas.php',{
        method: 'POST',
        body: datos
    })
    .then( res => res.json())
    .then(data => {
            console.log(data); //data es la respuesta del servidor
            arregloTablas = data; 
            imprimirListaTablas();
    })

    
});

function imprimirListaTablas() {
    contenedor.innerHTML = " ";
    
    for (var i = 0; i < arregloTablas.length; i++){
        if ( arregloTablas[i]!="usuarios" && arregloTablas[i]!="empresas" ){
            console.log("Entramos al forEach");
            contenedor.innerHTML+=
            `
                <a class="opciones" id="${i}"  href="${arregloTablas[i]}.html">
                    <h3>${arregloTablas[i]}</h3>              
                </a>
            `;
        }
    }
    
    
   
    



   




    

};

