"use strict";


// PRIVATE

const STATE = {
    movies: [],
    user: [],
    reviews: []
}

async function getData() {
    const movie_request = new Request("./API/movies.php");
    const movie_response = await fetch(movie_request);
    const movie_resource = await movie_response.json();
    STATE.movies = movie_resource

    const user_request = new Request("./API/users.php");
    const user_response = await fetch(user_request);
    const user_resource = await user_response.json();
    STATE.user = user_resource;
    console.log(STATE.user);

    const reviews_request = new Request("./API/reviews.php");
    const reviews_response = await fetch(reviews_request);
    const reviews_resource = await reviews_response.json();
    STATE.reviews = reviews_resource;


    let movies = State.GET("movies");
    let users = State.GET("user");
    let reviews = State.GET("reviews");
    renderStructure();

}
// renderApp();



//  PUBLIC CLONE
const State = {

    GET(entity) {
        const dataClone = JSON.parse(JSON.stringify(STATE[entity]));
        return dataClone;
    },
    POST: async function (data) {
        switch (data.entity) {
            case "login":
                const loginRequest = new Request("./API/login.php", {
                    method: "POST",
                    body: JSON.stringify(data.row),
                    headers: { "Content-Type": "application/json" }
                });
                let loginResource = await fetcher(loginRequest);
                if (loginResource !== undefined) {
                    console.log(loginResource);
                    STATE.user.push(loginResource);
                    return loginResource;
                }
                break;
            case "register":
                console.log(data);
                const registerRequest = new Request("./API/users.php", {
                    method: "POST",
                    body: JSON.stringify(data.row),
                    headers: { "Content-Type": "application/json" }
                })
                let registerResource = await fetcher(registerRequest);
                if (registerRequest !== undefined) {
                    return registerRequest
                }
                break;
            case "reviews":
                const reviewRequest = new Request("./API/reviews.php", {
                    method: "POST",
                    body: JSON.stringify(data.row),
                    headers: { "Content-Type": "application/json" }
                })
                let reviewResource = await fetcher(reviewRequest);
                if (reviewResource != undefined) {
                    STATE.reviews.push(reviewResource);
                    renderReviews(reviewResource);
                }
                break;
            default:
                break;
        }
    },
    PATCH: async function (data) {
        switch (data.entity) {
            case "likes":
                const likedMovieRequest = new Request("./API/like_movie.php", {
                    method: "PATCH",
                    body: JSON.stringify(data.row),
                    headers: { "Content-Type": "application/json" },
                })
                let likedMovieResource = await fetcher(likedMovieRequest);
                if (likedMovieResource !== undefined) {
                    let userId = parseInt(localStorage.user);
                    for (let i = 0; i < STATE.user.length; i++) {
                        if (userId === STATE.user[i].user_id) {
                            STATE.user[i].liked_movies = likedMovieResource.liked_movies;
                            checkLikedMovies("skickad från 1");
                            break;
                        }
                    }
                }
                break;
            default:
                break;
        }
    },
    DELETE: async function (data) {
        switch (data.entity) {
            case "reviews":
                const removeLikedReviewRequest = new Request("./API/reviews.php", {
                    method: "DELETE",
                    body: JSON.stringify(data.row),
                    headers: { "Content-Type": "application/json" },
                })
                let removeLikedReviewResource = await fetcher(removeLikedReviewRequest);
                if (removeLikedReviewResource !== undefined) {
                    // Remove review from STATE
                    for (let i = 0; i < STATE.reviews.length; i++) {
                        if (removeLikedReviewResource.review_id === STATE.reviews[i].review_id) {
                            STATE.reviews.splice(i, 1);
                        }
                    }
                }
                break;
            default:
                break;
        }
    },
}


async function fetcher(request) {

    try {
        let response = await fetch(request);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        let resource = await response.json();
        return resource;
    } catch (error) {
        console.warn(error);
    }
}

