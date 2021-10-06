const menuNombre = document.getElementById("tituloUsuario");
const ocultar = document.getElementById("ocultar");

let datos=0;
fetch('../php/verificarRol.php',{
    method: 'POST',
    body: datos
})
.then( res => res.json())
.then(data => {
        console.log("El usuario logueado tiene rol:");
        console.log(data); //data es la respuesta del servidor

        if (data[0]=="ADMINISTRADOR"){
            console.log("Tiene acceso libre");
            menuNombre.innerHTML="Usuario: "+data[1];
            ocultar.classList.remove("ocultar");
        }
        else if(data[0]=="OPERARIO"){
            menuNombre.innerHTML="Usuario: "+data[1];
            console.log("Tiene acceso restringido");
            ocultar.classList.add("ocultar");
            ocultarEntidades();
           
        }
        else{
            window.location.href="../index.html";
        };
})

function ocultarEntidades(){
    if ( document.getElementById( "ocultartambien" )) {
        document.getElementById("ocultartambien").classList.add("ocultar");
    }
}