<?php

require_once("helpers.php");

// Enable CORS

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Origin: *");
    exit();
}

$requestMethod = $_SERVER["REQUEST_METHOD"];
$requestData = getRequestData();

switch ($requestMethod) {
    case "GET":
        if (isset($requestData["id"])) {
            $movie = findItemByKey("movies", "id", $requestData["id"]);
            if ($movie == false) {
                abort(404, "Movie not found");
            }
            send(200, $movie);
        } else {
            $movies = getDatabaseByType("movies");
            send(200, $movies);
        }
        break;

    case "POST":
        $movieKeys = ["title", "year", "poster", "run_time", "director", "info"];
        if (!requestContainsAllKeys($requestData, $movieKeys)) {
            abort(400, "Bad Request (missing keys)");
        }

        $existingMovie = findItemByKey("movies", "title", $requestData["title"]);
        if ($existingMovie) {
            abort(400, "Bad Request (movie already exists)");
        }

        $newMovie = insertItemByType("movies", $movieKeys, $requestData);
        send(201, $newMovie);
        break;

    case "PATCH":
        $patchKeys = ["id"];
        if (!requestContainsAllKeys($requestData, $patchKeys)) {
            abort(400, "Bad Request (missing keys)");
        }
        $movie = findItemByKey("movies", "id", $requestData["id"]);
        if (!$movie) {
            abort(404, "Movie not found");
        }
        if (isset($requestData["info"])) {
            $movie["info"] = $requestData["info"];
        }
        $updatedMovie = updateItemByType("movies", $movie);
        send(200, $updatedMovie);
        break;

    case "DELETE":
        if (!isset($requestData["id"])) {
            abort(400, "Bad Request (missing movie ID)");
        }

        $movie = findItemByKey("movies", "id", $requestData["id"]);
        if (!$movie) {
            abort(404, "Movie not found");
        }
        
        $deletedMovie = deleteItemByType("movies", $movie);
        send(200, $deletedMovie);
        break;
    default:
        abort(405, "Method Not Allowed");
}
?>
