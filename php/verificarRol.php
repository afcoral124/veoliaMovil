<?php
session_start();

if(isset($_SESSION["autenticado"])){

    if($_SESSION["autenticado"]=="SIx3"){
        echo json_encode($_SESSION["rol"]);
    }
    else{
        echo json_encode("No logueado");
    }

}
else {
    echo json_encode("No logueado");
}


?>