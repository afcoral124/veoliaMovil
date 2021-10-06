<?php
// PROGRAMA DE VALIDACION DE USUARIOS                                                               
$usuario = $_POST["user"];
$password = $_POST["password"];


session_start();
//Incluimos los datos de conexion
include ("conexion.php");
$mysqli = new mysqli($host, $user, $pw, $db);
$sql = "SELECT * from usuarios where USUARIO = '$usuario'";
$result1 = $mysqli->query($sql);
$numero_filas = $result1->num_rows;
//La línea siguiente suele hacerse con un while si se sabe que se va a arrojar varios resultados (es decur varias filas de la tabla)
$row1 = $result1->fetch_array(MYSQLI_NUM);

if ($numero_filas > 0 ){ //Significa que sí hay una fila, es decir, hubo resultado exitoso
    if ($password == $row1[2]){
        $_SESSION["autenticado"]="SIx3";
        $_SESSION["usuario"]=$row1[1];
        $_SESSION["rol"]=$row1[3];

        echo json_encode("login correcto");
    }
    else{
        echo json_encode("login incorrecto");
    }    
}
else{ //significa que el número de filas es 0, o sea, no encontró en la BD
    echo json_encode("login inorrecto");
}

?>