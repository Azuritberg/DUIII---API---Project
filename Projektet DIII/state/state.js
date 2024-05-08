"use strict";


// PRIVATE

const STATE = {
    movies: [],
    user: [],
    reviews: []
}

async function renderApp() {
    const movie_request = new Request("/real_api/real_movies.php");
    const movie_response = await fetch(movie_request);
    const movie_resource = await movie_response.json();
    STATE.movies = movie_resource;


    let movies = State.GET("movies");
    renderStructure();
}
renderApp();

//  PUBLIC CLONE
const State = {

    GET(entity) {
        const dataClone = JSON.parse(JSON.stringify(STATE[entity]));
        return dataClone;
    },
    POST: async function (data) {
        switch (data.entity) {
            case "login":
                // console.log(data);
                // console.log(JSON.stringify(data.row));
                // console.log(JSON.parse(data.row));
                const loginRequest = new Request("../real_api/reallogin.php", {
                    method: "POST",
                    body: JSON.stringify(data.row),
                    headers: { "Content-Type": "application/json" }
                });
                let loginResource = await fetcher(loginRequest);
                console.log(loginResource);
                break;
            case "sign_up":
                console.log(data);
                const signUpRequest = new Request("", {
                    method: "POST",
                    body: JSON.stringify(data.row),
                    headers: { "Content-Type": "application/json" }
                })
                let signUpResource = await fetcher(signUpRequest);
                break;
            case "reviews":
                const reviewRequest = new Request("", {
                    method: "POST",
                    body: data.row,
                    headers: { "Content-Type": "application/json" }
                })
                let reviewResource = await fetcher(reviewRequest);
                break;
            default:
                break;
        }
    },
    PATCH: async function (data) {
        switch (data.entity) {
            case "users":
                const likedMovieRequest = new Request("", {
                    method: "PATCH",
                    body: data.row,
                    headers: { "Content-Type": "application/json" },
                })
                let likedMovieResource = fetcher(likedMovieRequest);
                break;
            default:
                break;
        }
    },
    DELETE: async function (data) {
        switch (data.entity) {
            case "users":
                const removeLikedMovieRequest = new Request("", {
                    method: "DELETE",
                    body: data.row,
                    headers: { "Content-Type": "application/json" },
                })
                let removeLikedMovieResource = fetcher(removeLikedMovieRequest);
                break;
            default:
                break;
        }
    },
}

// const State = {

//     GET(entity) {  // Get state denna gör enbart en kopia av STATE inte en request förfrågan.
//         const stateClone = JSON.parse(JSON.stringify(STATE[entity]));
//         return stateClone;
//     },

//     POST: async function (data) {
//         const { entity, row } = data;
//         const response = await fetcher(new Request(`api/${data.entity}.php`, {
//             headers: { "Content-Type": "application/json" },
//             method: 'POST',
//             body: JSON.stringify(data.row),
//         }));

//         if (response.ok) {
//             STATE[entity].push(response.data);

//             postInstanceListnings(entity, response.data);
//         }
//     },


//     PATCH: async function (data) {
//         const { entity, id, fields, values } = data;
//         const response = await fetcher(new Request(`api/${data.entity}.php`, {
//             headers: { "Content-Type": "application/json" },
//             method: 'PATCH',
//             body: JSON.stringify({ id: id, favorite: values }),
//         }));
//         if (response.ok) {
//             console.log(response);
//             const index = STATE[entity].findIndex(d => d.id === data.id);
//             if (index !== -1) {
//                 STATE[entity][index][fields] = values;
//             }
//         }
//     },


//     DELETE: async function (data) {
//         const { entity, id } = data;
//         const response = await fetcher(new Request(`api/${entity}.php`, {
//             headers: { "Content-Type": "application/json" },
//             method: 'DELETE',
//             body: JSON.stringify({ id: id }),
//         }));
//         if (response.ok) {
//             const index = STATE[entity].findIndex(d => d.id === data.id);
//             if (index !== -1) {
//                 STATE[entity].splice(index, 1);
//             }
//             deleteInstanceListnings(entity, id);
//         }
//     }
// };


async function fetcher(request) {

    try {
        let response = await fetch(request);
        let resource = await response.json();
        return resource;
    } catch (error) {
        console.warn(error);
    }
}
