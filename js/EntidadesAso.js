const contenedor = document.getElementById('contenedorOpciones');
const buscar = document.getElementById("buscar");
let respuesta1 = [];

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
            respuesta1 = data; 
            imprimirListaEntidades(respuesta1);
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

//Buscar


// buscar.addEventListener("input", function () {

//     let trlist = document.querySelectorAll("tr"); //fila
//     Array.from(trlist).forEach(function (item) { //Recorre c/u de los tr de la tabla. La primera vez que entra recorre la prima fila que corresponde al nombre
//                                                 // de cada columna, por eso es que más adelante, en la primera iteracion aparece undefined, porque no hay tds en esa fila   
//         let val = buscar.value;
//         let re = new RegExp(val, 'gi'); //global insensitive*/
//         var selected = item.getElementsByTagName("td");

//         if (typeof selected[0] != "undefined") { //Entra todas las veces, menos en la primera porque SÍ es indefinido ya que en la primera fila NO hay td
//             if (selected[0].innerText.match(re)) {
//                 item.style.display = "";
//             } else {
//                 item.style.display = "none";
//             }
//         }
//     });
// });


buscar.addEventListener("input", function () {

    let arregloFiltrado = [];

    respuesta1.forEach(function (item) { 
        let val = buscar.value;
        let re = new RegExp(val, 'gi'); //global insensitive*/
        
        if (item.match(re)) {
            arregloFiltrado.push(item);
        } 
    });
    imprimirListaEntidades(arregloFiltrado);
});
    










    
    
   
    



   




    



