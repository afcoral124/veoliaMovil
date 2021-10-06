<?php
session_start();

$respuesta=[];
if(isset($_SESSION["autenticado"])){

    $respuesta[0] = strval($_SESSION["rol"]);
    $respuesta[1] = strval($_SESSION["usuario"]);

    echo json_encode($respuesta);
  
}
else {
    $respuesta[0]="No logueado";
    $respuesta[1]="No logueado";
    echo json_encode($respuesta);
}


?>