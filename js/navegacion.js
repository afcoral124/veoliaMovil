const botonAbrir = document.getElementById("botonAbrir");
botonAbrir.addEventListener("click", abrirMenu);

const botonCerrar = document.getElementById("botonCerrar");
botonCerrar.addEventListener("click", cerrarMenu);

const menuLateral = document.getElementById("menu_lateral");

function abrirMenu() {
    menuLateral.classList.add("active");
}

function cerrarMenu(){
    menuLateral.classList.remove("active");
}

