const campoDatos = document.getElementById("campoDatos");
const listaEmpresas = document.getElementById("listaEmpresas");
const formulario = document.getElementById("formulario");


//==========================EVENTO PÁGINA CARGADA======================
document.addEventListener('DOMContentLoaded', function () {
    let datos = 0;
    //Comunicación con el servidor----------------------------------------------------------------
    fetch('../php/consolidadoInicial.php',{
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
            let respuesta1 = data;//data es la respuesta del servidor
            console.log("Respuesta1:");
            console.log(respuesta1);
            
            imprimirDatosIniciales(respuesta1);
    })
    
    //Comunicación con el servidor----------------------------------------------------------------

    
    //Comunicación con el servidor----------------------------------------------------------------
    fetch('../php/listarEmpresas.php',{
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
            let respuesta2 = data; //data es la respuesta del servidor
            console.log("Respuesta2:");
            console.log(respuesta2);
            listarEmpresas(respuesta2);
    })
    //Comunicación con el servidor----------------------------------------------------------------
});

//==========================EVENTO SUBMIT DEL FORMULARIO======================
formulario.addEventListener('submit',function(e){
    e.preventDefault();
    console.log("me diste");

    var datos = new FormData(formulario);
    console.log(datos.get("fechainicial"));
    console.log(datos.get("fechafinal"));
    console.log(datos.get("listaEmpresas"));
    
    //Comunicación con el servidor----------------------------------------------------------------
    fetch('../php/filtroConsolidado.php',{
        method: 'POST',
        body: datos
    })

    .then( res => res.json())
    .then(data => {
        console.log(data);
    })
    //Finaliza comunicación con el servidor---------------------------------------------------------


})



function imprimirDatosIniciales(respuesta1){
    campoDatos.innerHTML=" ";
    console.log(respuesta1.length);
    let numeroFilas = respuesta1.length/5;
    let contador=0;
    
    for (var i=0; i<numeroFilas; i++){
        campoDatos.innerHTML+=
        `
        <tr>
            <td>${respuesta1[contador]}</td>
            <td>${respuesta1[contador+1]}</td>
            <td>${respuesta1[contador+2]}</td>
            <td>${respuesta1[contador+3]}</td>
            <td>${respuesta1[contador+4]}</td>
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