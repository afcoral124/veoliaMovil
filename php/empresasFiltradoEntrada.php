<?php

//Conexión
include ("conexion.php");
$mysqli = new mysqli($host, $user, $pw, $db);

//Sentencia
$sql = "SELECT DISTINCTROW CLIENTE_PROVEEDOR FROM ordenes_entrada ORDER BY CLIENTE_PROVEEDOR ASC";

//Comunicación con la BD
$result = $mysqli->query($sql);
$numero_filas = $result->num_rows;

if ($numero_filas>0){ 

    $respuesta= [];
    $k=0;
    while($filaActual = $result->fetch_array(MYSQLI_NUM))
    {  
        $respuesta[$k] = $filaActual[0]; //NOMBRE   (nombre de la empresa)
        $k++;    
    }

    echo json_encode($respuesta);
}else{
    echo json_encode("Error al conseguir los datos");

}
?>