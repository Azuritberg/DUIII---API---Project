<?php

ini_set("display_errors", 0);

$requestMethod = $_SERVER["REQUEST_METHOD"];

require_once ("./functions.php");

if ($requestMethod == "GET") {
    $database = get_database();
    $movies = $database["movies"];

    if (empty($movies)) {
        send_json("Not found", 404);
    }
    send_json($movies);
} else {
    send_json("Method not allowed", 405);
}