const formulario = document.getElementById("login");

formulario.addEventListener('submit',function(e){
    e.preventDefault();
    console.log("me diste");

    var datos = new FormData(formulario);
    console.log(datos.get("user"));
    console.log(datos.get('password'))
    
    fetch('../php/login.php',{
        method: 'POST',
        body: datos
    })

    .then( res => res.json())
    .then(data => {
        console.log(data)
    })

})