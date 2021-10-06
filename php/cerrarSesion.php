<?php

// PROGRAMA DE FINALIZACION DE SESION
                   
    session_start();
    unset($_SESSION["autenticado"]); 
    unset($_SESSION["usuario"]);
    unset($_SESSION["rol"]);
    session_destroy();

    if (isset($_SESSION["autenticado"])){
        echo json_encode("fallo al cerrar sesion");
    }
    else{
        echo json_encode("sesion cerrada");
    }    

?>


