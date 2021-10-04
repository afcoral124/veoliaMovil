<?php 

//Conexión
include ("conexion.php");
$mysqli = new mysqli($host, $user, $pw, $db);

//Datos recibidos desde el cliente
$fechaInicial = str_replace("-", "/",$_POST["fechainicial"]);
$fechaFinal = str_replace("-", "/",$_POST["fechafinal"]);
$empresa = $_POST["listaEmpresas"];
//datos por default para los casos en los que el cliente no seleccione fechas
$fechaFinalDefault="3000/01/01";
$fechaInicialDefault="1950/01/01";
//procedimientos sql 
// 1 --  $sql = "SELECT MATERIALES_DESCRIPCION, CATEGORIA, PyG, SUM(CANT_ENTRADA)as CANT_ENTRADA_TOTAL, UNIDAD FROM ordenes_entrada WHERE FECHA_PESAJE>= '$fechainicial' AND FECHA_PESAJE<= '$fechaFinalDefault' GROUP BY materiales_descripcion";
// 2 --  $sql= "SELECT ORIGEN, CLIENTE_PROVEEDOR, MATERIALES_DESCRIPCION, CATEGORIA, PyG, SUM(CANT_ENTRADA)as CANT_ENTRADA_TOTAL, UNIDAD FROM ordenes_entrada WHERE CLIENTE_PROVEEDOR= NOMBRE_EMPRESA AND FECHA_PESAJE>= FECHA_INI AND FECHA_PESAJE<= FECHA_FIN GROUP BY materiales_descripcion";
// 3 -- 


//========================================CASOS===============================================
$sql="Inicializando";
//Cliente seleccionó: solo Fecha inicial
if (($fechaInicial!="")&&($fechaFinal=="")&&($empresa=="----")){

    $sql = "SELECT MATERIALES_DESCRIPCION, CATEGORIA, PyG, SUM(CANT_ENTRADA)as CANT_ENTRADA_TOTAL, UNIDAD FROM ordenes_entrada WHERE FECHA_PESAJE>= '$fechaInicial' AND FECHA_PESAJE<= '$fechaFinalDefault' GROUP BY materiales_descripcion";
}
//Cliente seleccionó: solo fecha final
if (($fechaInicial=="")&&($fechaFinal!="")&&($empresa=="----")){
    
    $sql = "SELECT MATERIALES_DESCRIPCION, CATEGORIA, PyG, SUM(CANT_ENTRADA)as CANT_ENTRADA_TOTAL, UNIDAD FROM ordenes_entrada WHERE FECHA_PESAJE>= '$fechaInicialDefault' AND FECHA_PESAJE<= '$fechaFinal' GROUP BY materiales_descripcion";
   
}
//Cliente seleccionó: Solo empresa 
if (($fechaInicial=="")&&($fechaFinal=="")&&($empresa!="----")){
    
    $sql= "SELECT MATERIALES_DESCRIPCION, CATEGORIA, PyG, SUM(CANT_ENTRADA)as CANT_ENTRADA_TOTAL, UNIDAD FROM ordenes_entrada WHERE CLIENTE_PROVEEDOR= '$empresa' AND FECHA_PESAJE>= '$fechaInicialDefault' AND FECHA_PESAJE<= '$fechaFinalDefault' GROUP BY materiales_descripcion";
   
}
//Cliente seleccionó: Todas las 3 opciones
if (($fechaInicial!="")&&($fechaFinal!="")&&($empresa!="----")){
    $sql= "SELECT MATERIALES_DESCRIPCION, CATEGORIA, PyG, SUM(CANT_ENTRADA)as CANT_ENTRADA_TOTAL, UNIDAD FROM ordenes_entrada WHERE CLIENTE_PROVEEDOR= '$empresa' AND FECHA_PESAJE>= '$fechaInicial' AND FECHA_PESAJE<= '$fechaFinal' GROUP BY materiales_descripcion";
    
}
//Cliente seleccionó: fecha inicial y fecha final 
if (($fechaInicial!="")&&($fechaFinal!="")&&($empresa=="----")){
    $sql = "SELECT MATERIALES_DESCRIPCION, CATEGORIA, PyG, SUM(CANT_ENTRADA)as CANT_ENTRADA_TOTAL, UNIDAD FROM ordenes_entrada WHERE FECHA_PESAJE>= '$fechaInicial' AND FECHA_PESAJE<= '$fechaFinal' GROUP BY materiales_descripcion";
}
//Cliente seleccionó:fecha inicial y empresa 
if (($fechaInicial!="")&&($fechaFinal=="")&&($empresa!="----")){
    $sql= "SELECT  MATERIALES_DESCRIPCION, CATEGORIA, PyG, SUM(CANT_ENTRADA)as CANT_ENTRADA_TOTAL, UNIDAD FROM ordenes_entrada WHERE CLIENTE_PROVEEDOR= '$empresa' AND FECHA_PESAJE>= '$fechaIniciIPCal' AND FECHA_PESAJE<= '$fechaFinalDefault' GROUP BY materiales_descripcion";
}
//Cliente seleccionó: Fecha final y Empresa
if (($fechaInicial=="")&&($fechaFinal!="")&&($empresa!="----")){
    $sql= "SELECT  MATERIALES_DESCRIPCION, CATEGORIA, PyG, SUM(CANT_ENTRADA)as CANT_ENTRADA_TOTAL, UNIDAD FROM ordenes_entrada WHERE CLIENTE_PROVEEDOR= '$empresa' AND FECHA_PESAJE>= '$fechaInicialDefault' AND FECHA_PESAJE<= '$fechaFinal' GROUP BY materiales_descripcion";
}
//Cliente seleccionó: Ninguno de los 3
if (($fechaInicial=="")&&($fechaFinal=="")&&($empresa=="----")){
    $sql = "SELECT MATERIALES_DESCRIPCION, CATEGORIA, PyG, SUM(CANT_ENTRADA)as CANT_ENTRADA_TOTAL, UNIDAD FROM ordenes_entrada WHERE FECHA_PESAJE>= '$fechaInicialDefault' AND FECHA_PESAJE<= '$fechaFinalDefault' GROUP BY materiales_descripcion";
}

//================================================================================================

//Comunicación con la BD
$result1 = $mysqli->query($sql);
$numero_filas = $result1->num_rows;

if ($numero_filas>0){ //Que si hubo resultado con varios datos
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
        $k=$k+5; 
    }

    //Respuesta al cliente
    echo json_encode($respuesta);
}
else{
    echo json_encode("Error al conseguir los datos");
}



?>