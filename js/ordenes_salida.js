const campoDatos = document.getElementById("campoDatosSalida");
const listaEmpresas = document.getElementById("listaEmpresas");
const formulario = document.getElementById("formulario");


//==========================EVENTO PÁGINA CARGADA======================
document.addEventListener('DOMContentLoaded', function () {
    let datos = 0;
    //Comunicación con el servidor----------------------------------------------------------------
    fetch('../php/consolidadoInicialSalida.php',{
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
            let respuesta1 = data;//data es la respuesta del servidor
            imprimirDatos(respuesta1);
    })
    
    //Comunicación con el servidor----------------------------------------------------------------

    
    //Comunicación con el servidor----------------------------------------------------------------
    fetch('../php/empresasFiltradoSalida.php',{
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
            let respuesta2 = data; //data es la respuesta del servidor
            listarEmpresas(respuesta2);
    })
    //Comunicación con el servidor----------------------------------------------------------------
});

//==========================EVENTO SUBMIT DEL FORMULARIO======================
formulario.addEventListener('submit',function(e){
    e.preventDefault();
    console.log("me diste");

    var datos = new FormData(formulario);
    //Comunicación con el servidor----------------------------------------------------------------
    fetch('../php/filtroConsolidadoSalida.php',{
        method: 'POST',
        body: datos
    })

    .then( res => res.json())
    .then(data => {
        let respuesta3 = data;
        if(respuesta3=="Error al conseguir los datos"){
            imprimirVacio();
        }
        else{
            imprimirDatos(respuesta3);
        }
    })
    //Finaliza comunicación con el servidor---------------------------------------------------------


})


function imprimirVacio(){
    campoDatos.innerHTML=" ";
    campoDatos.innerHTML+=
    `
    <tr>
        <td colspan="5">No hay datos con esos filtros</td>
    </tr>
    `;
}


function imprimirDatos(respuesta){
    campoDatos.innerHTML=" ";
    console.log(respuesta.length);
    let numeroFilas = respuesta.length/5;
    let contador=0;
    
    for (var i=0; i<numeroFilas; i++){
        campoDatos.innerHTML+=
        `
        <tr>
            <td>${respuesta[contador]}</td>
            <td>${respuesta[contador+1]}</td>
            <td>${respuesta[contador+2]}</td>
            <td>${respuesta[contador+3]}</td>
            <td>${respuesta[contador+4]}</td>
        </tr>
        `;
        contador+=5;
    }
}

function listarEmpresas(respuesta2){
    listaEmpresas.innerHTML=" ";
    listaEmpresas.innerHTML=
    `
        <option value="----">----</option>
    `;
    for (var i=0; i<respuesta2.length; i++){
        listaEmpresas.innerHTML+=
        `
            <option value="${respuesta2[i]}">${respuesta2[i]}</option>
        `;
    }
}