<?php

//Conexión
include ("conexion.php");
$mysqli = new mysqli($host, $user, $pw, $db);

//Sentencia
$sql = "CALL FILTRAR_CONSOLIDADO_SOLO_FECHA_ENTRADA(1901/01/01 , 2300/31/12)";

//Comunicación con la BD
//$result1 = $mysqli->query($sql);

$fechaini = "1901/01/01";
$fechafin = "2300/31/12";
$stmt = $db ->prepare("CALL CALL FILTRAR_CONSOLIDADO_SOLO_FECHA_ENTRADA(?, ?);");
$stmt->bind_param("ss", $fechaini, $fechafin);
$stmt->execute();



$numero_filas = $result1->num_rows;
if ($numero_filas>0){
    //La línea siguiente suele hacerse con un while si se sabe que se va a arrojar varios resultados (es decir varias filas de la tabla)
    $respuesta= [];
    $k=0;
    while($filaActual = $result1->fetch_array(MYSQLI_NUM))
    {  
        //La idea es concatenar de algún modo todas las filas para enviarlas de forma total al cliente
        //Cada 5 posiciones guardamos los 5 datos de la fila actual
        $respuesta[$k] = $filaActual[0]; //MATERIALES_DESCRIPCION
        $respuesta[$k+1] = $filaActual[1]; //CATEGORIA
        $respuesta[$k+2] = $filaActual[2]; //PyG
        $respuesta[$k+3] = $filaActual[3]; //CANTIDAD_ENTRADA_TOTAL
        $respuesta[$k+4] = $filaActual[4]; //UNIDAD
        
        //Se suma de 5 en 5 para que en cada iteración se guarden 5 datos
        $k=$k+5; // 0+5  | 5+5  | 10+5
    }

    //Respuesta al cliente
    echo json_encode($respuesta);
}
else{
    echo json_encode("Error al conseguir los datos");
}

$stmt->close();
$db->close();

?>