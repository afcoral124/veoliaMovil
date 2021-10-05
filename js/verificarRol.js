
let datos=0;
fetch('../php/verificarRol.php',{
    method: 'POST',
    body: datos
})
.then( res => res.json())
.then(data => {
        console.log("El usuario logueado tiene rol:");
        console.log(data); //data es la respuesta del servidor

        if (data=="ADMINISTRADOR"){
            console.log("Tiene acceso libre");
        }
        else if(data=="OPERARIO"){
            console.log("Tiene acceso restringido");
        }
        else{
            window.location.href="../index.html";
        };
})