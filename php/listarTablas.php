<?php


include ("conexion.php");
function obtenerTablasDeUnaBaseDeDatos($host, $user, $pw, $db)
{
    try {
        $base_de_datos = new PDO("mysql:host=$host;dbname=$db", $user, $pw);
    } catch (Exception $e) {
        echo "Ocurrió algo con la base de datos: " . $e->getMessage();
    }
    return $base_de_datos
        ->query("SELECT table_name AS nombre FROM information_schema.tables WHERE table_schema = '$db';")
        ->fetchAll(PDO::FETCH_COLUMN);

}

$resultado = obtenerTablasDeUnaBaseDeDatos($host, $user, $pw, $db);

echo json_encode($resultado); //respuesta del servidor

?>