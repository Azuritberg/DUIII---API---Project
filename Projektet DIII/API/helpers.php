<?php

function send($status = 200, $data = []) {
    header("Content-Type: application/json");
    http_response_code($status);
    echo json_encode($data);
    exit();
}


function abort($status = 400, $message = "") {
    send($status, ["error" => $message]);
}


function getRequestData() {
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        return $_GET;
    }

    if ($_SERVER["CONTENT_TYPE"] != "application/json") {
        abort(400, "Bad Request (invalid content type)");
    }

    $json = file_get_contents("php://input");
    return json_decode($json, true);
}


function getDatabase() {
    // Incase the database does not exist, or is empty, we'll default to this
    $emptyDatabaseTemplate = json_encode([
        "movies" => [],
        "reviews" => [],
        "users" => []
    ], JSON_PRETTY_PRINT);

    if (file_exists("database.json") == false) {
        file_put_contents("database.json", $emptyDatabaseTemplate);
    }

    $databaseContents = file_get_contents("database.json");

    if ($databaseContents == "") {
        file_put_contents("database.json", $emptyDatabaseTemplate);
    }
    
    $databaseContents = file_get_contents("database.json");
    $databaseData = json_decode($databaseContents, true);
    
    if (is_array($databaseData) == false) {
        abort(500, "Internal Server Error (invalid database)");
    }

    return $databaseData;
}


function getDatabaseByType($type) {
    $database = getDatabase();

    if (isset($database[$type]) == false) {
        abort(500, "Internal Server Error (database type '$type' does not exist)");
    }

    return $database[$type];
}


function requestContainsAllKeys($data, $keys) {
    foreach ($keys as $key) {
        if (isset($data[$key]) == false) {
            return false;
        }
    }

    return true;
}


function requestContainsSomeKey($data, $keys) {
    foreach ($keys as $key) {
        if (isset($data[$key])) {
            return true;
        }
    }
    return false;
}


function findItemByKey($type, $key, $value) {
    $database = getDatabase();
    
    if (isset($database[$type]) == false) {
        abort(500, "Internal Server Error (database type '$type' does not exist)");
    }

    $databaseByType = $database[$type];

    foreach ($databaseByType as $item) {
        if (isset($item[$key]) && $item[$key] == $value) {
            return $item;
        }
    }

    return false;
}


function insertItemByType($type, $keys, $data) {

    $database = getDatabase();
    
    if (isset($database[$type]) == false) {
        abort(500, "Internal Server Error (database type '$type' does not exist)");
    }

    $databaseByType = $database[$type];

    $newItem = [];

    foreach ($keys as $key) {
        if ($key == "token") {    // token?
            continue;
        }
        $newItem[$key] = $data[$key];
    }

    $id = 0;

    foreach ($databaseByType as $item) {
        if (isset($item["id"]) && $item["id"] > $id) {
            $id = $item["id"];
        }
    }

    $newItem["id"] = $id + 1;
    $databaseByType[] = $newItem;
    $database[$type] = $databaseByType;
    $json = json_encode($database, JSON_PRETTY_PRINT);
    file_put_contents("database.json", $json);
    return $newItem;
}


function updateItemByType($type, $updatedItem) {
    $database = getDatabase();
    
    if (isset($database[$type]) == false) {
        abort(500, "Internal Server Error (database type '$type' does not exist)");
    }

    $databaseByType = $database[$type];

    foreach ($databaseByType as $index => $item) {
        if (isset($item["id"]) && $item["id"] == $updatedItem["id"]) {
            $databaseByType[$index] = $updatedItem;
        }
    }

    $database[$type] = $databaseByType;
    $json = json_encode($database, JSON_PRETTY_PRINT);
    file_put_contents("database.json", $json);
    return $updatedItem;
}


function deleteItemByType($type, $itemToDelete) {

    $database = getDatabase();
    
    if (isset($database[$type]) == false) {
        abort(500, "Internal Server Error (database type '$type' does not exist)");
    }

    $databaseByType = $database[$type];

    foreach ($databaseByType as $index => $item) {
        if (isset($item["id"]) && $item["id"] == $itemToDelete["id"]) {
            array_splice($databaseByType, $index, 1);
        }
    }

    $database[$type] = $databaseByType;
    $json = json_encode($database, JSON_PRETTY_PRINT);
    file_put_contents("database.json", $json);
    return $itemToDelete;
}


function removeUserAndLikes($userId, $usersFilename, $moviesFilename) {
    // Load the users and movies databases
    $users = getDatabase($usersFilename);
    $movies = getDatabase($moviesFilename);

    // Find and remove the user
    foreach ($users['users'] as $userIndex => $user) {  //USERS = users
        if ($user['user_id'] == $userId) {
            // Remove user's likes from movies if necessary (decrementing likes counts or removing from liked lists)
            foreach ($user['liked_movies'] as $likedMovieId) {
                // Remove the user's like from the movie's 'likes' array or decrement a 'like_count'
                foreach ($movies['movies'] as $movieIndex => $movie) {  // MOVIES = movies
                    if ($movie['id'] == $likedMovieId) {
                        // This assumes each movie has a 'like_count' or similar structure you can adjust
                        // If using a like array, you would remove the userId from that array
                        $movies['movies'][$movieIndex]['like_count'] = isset($movie['like_count']) ? max(0, $movie['like_count'] - 1) : 0;
                    }
                }
            }

            // Finally, remove the user from the users array
            array_splice($users['USERS'], $userIndex, 1);
            break;
        }
    }

    // Save the updated data back to the files
    updateDatabase($usersFilename, $users);
    updateDatabase($moviesFilename, $movies);
}

// Helper function to fetch data from a JSON file
// function getDatabase($filename) {

//     if (file_exists($filename)) {
//         return json_decode(file_get_contents($filename), true);
//     }
//     //return false;  // Return false or handle error as needed
// }

function updateDatabase($filename, $data) {
    file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT));
}












// function getUserFromToken($requestToken)
// {
//     $database = getDatabase();
//     $type = "users";
    
//     if (isset($database[$type]) == false) {
//         abort(500, "Internal Server Error (database type '$type' does not exist)");
//     }

//     $users = $database[$type];

//     foreach ($users as $user) {
//         if (isset($user["name"], $user["password"])) {
//             $name = $user["name"];
//             $password = $user["password"];

//             $userToken = sha1("$name$password");

//             if ($requestToken == $userToken) {
//                 return $user;
//             }
//         }
//     }

//     return false;
// }


// function removeUserAndReviews($userId, $usersFilename, $reviewsFilename)
// {
//     // Load the user database
//     $users = getDatabase($usersFilename);
//     $reviews = getDatabase($reviewsFilename);
    
//     // Remove user from the user database
//     foreach ($users['USERS'] as $index => $user) {
//         if ($user['user_id'] == $userId) {
//             array_splice($users['USERS'], $index, 1);
//             break;
//         }
//     }
    
//     // Remove all reviews written by the user
//     foreach ($reviews['REVIEWS'] as $index => $review) {
//         if ($review['user_id'] == $userId) {
//             array_splice($reviews['REVIEWS'], $index, 1);
//             $index--;  // Adjust the index after removal
//         }
//     }
    
//     // Save the updated data back to the files
//     updateDatabase($usersFilename, $users);
//     updateDatabase($reviewsFilename, $reviews);
// }

// // Helper functions to handle file operations and JSON parsing:
// function getDatabase($filename)
// {
//     if (file_exists($filename)) {
//         return json_decode(file_get_contents($filename), true);
//     }
//     return false;  // Return false or handle errors as needed
// }

// function updateDatabase($filename, $data)
// {
//     file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT));
// }


// en del av SEBBES kod //

// function removeUserAndLikes($user)
// {
//     $database = getDatabase();

//     if (isset($database["games"]) == false) {
//         abort(500, "Internal Server Error (database type 'games' does not exist)");
//     }

//     if (isset($database["characters"]) == false) {
//         abort(500, "Internal Server Error (database type 'characters' does not exist)");
//     }

//     $games = $database["games"];
//     $characters = $database["characters"];
//     $userId = $user["id"];

//     foreach ($games as $gameIndex => $game) {
//         // If the user created the game, remove it completely
//         if ($game["user_id"] == $userId) {
//             array_slice($games, $gameIndex, 1);
//         } else {
//             // Otherwise we'll see if they liked it and only remove their like
//             foreach ($game["likes"] as $likeIndex => $like) { 
//                 // Remember that each like is represented as a user_id
//                 if ($userId == $like) {
//                     array_slice($game["likes"], $likeIndex, 1);
//                     $game[$gameIndex] = $game;
//                 }
//             }
//         }
//     }

//     foreach ($characters as $characterIndex => $character) {
//         // If the user created the character, remove it completely
//         if ($character["user_id"] == $userId) {
//             array_slice($characters, $characterIndex, 1);
//         } else {
//             // Otherwise we'll see if they liked it and only remove their like
//             foreach ($character["likes"] as $likeIndex => $like) {
//                 // Remember that each like is represented as a user_id
//                 if ($userId == $like) {
//                     array_slice($character["likes"], $likeIndex, 1);
//                     $character[$characterIndex] = $game;
//                 }
//             }
//         }
        
//     }
// }

?>

