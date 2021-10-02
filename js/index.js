const formulario = document.getElementById("login");
const alerta = document.getElementById("alerta");
const user = document.getElementById("user");
const password = document.getElementById("password");

user.addEventListener("click", quitarAlerta);
password.addEventListener("click", quitarAlerta);

formulario.addEventListener('submit',function(e){
    e.preventDefault();
    console.log("me diste");

    var datos = new FormData(formulario);
    console.log(datos.get("user"));
    console.log(datos.get('password'))
    
    //Comunicación con el servidor----------------------------------------------------------------
    fetch('php/login.php',{
        method: 'POST',
        body: datos
    })

    .then( res => res.json())
    .then(data => {
        
        if (data==='login correcto'){
            console.log("HOLA, SE ENTRÓ AL IF CORRECTO")
            window.location.href="paginas/home.html";
        }
        else{
            console.log("CHAO, SE ENTRÓ AL ELSE");
            alerta.classList.add("active");
        }
    })
    //Finaliza comunicación con el servidor---------------------------------------------------------
})

function quitarAlerta(){
    console.log("SE ESTÁ QUITANDO LA ALERTA...");
    alerta.classList.remove("active");
}

