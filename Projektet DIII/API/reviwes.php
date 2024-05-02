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
        // Fetch all reviews or a specific review by ID
        if (isset($requestData["id"])) {
            $review = findItemByKey("reviews", "id", $requestData["id"]);
            if ($review == false) {
                abort(404, "Review not found");
            }
            send(200, $review);
        } else {
            $reviews = getDatabaseByType("reviews");
            send(200, $reviews);
        }
        break;

    case "POST":
        // Create a new review
        $reviewKeys = ["movie_id", "user_id", "review"];
        if (!requestContainsAllKeys($requestData, $reviewKeys)) {
            abort(400, "Bad Request (missing keys)");
        }

        $newReview = insertItemByType("reviews", $reviewKeys, $requestData);
        send(201, $newReview);
        break;

    case "PATCH":
        // Update an existing review
        if (!isset($requestData["id"])) {
            abort(400, "Bad Request (missing review ID)");
        }

        $review = findItemByKey("reviews", "id", $requestData["id"]);
        if (!$review) {
            abort(404, "Review not found");
        }

        if (isset($requestData["review"])) {
            $review["review"] = $requestData["review"];
        }

        $updatedReview = updateItemByType("reviews", $review);
        send(200, $updatedReview);
        break;

    case "DELETE":
        // Delete a review
        if (!isset($requestData["id"])) {
            abort(400, "Bad Request (missing review ID)");
        }

        $review = findItemByKey("reviews", "id", $requestData["id"]);
        if (!$review) {
            abort(404, "Review not found");
        }
        
        $deletedReview = deleteItemByType("reviews", $review);
        send(200, $deletedReview);
        break;
    default:
        abort(405, "Method Not Allowed");
}
?>
