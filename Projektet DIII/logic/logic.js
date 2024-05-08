function similarMovies(movie) {
    let movie_copy = State.GET("movies")
    let new_arr = [];

    // Filtering movies with similar release date
    for (let i = 0; i < movie_copy.length; i++) {
        if (Math.abs(movie_copy[i].year - movie.year) <= 10) {
            new_arr.push(movie_copy[i]);
        }
    }

    for (let i = 0; i < new_arr.length; i++) {
        if (new_arr[i].id === movie.id) {
            new_arr.splice(i, 1);
        }
    }

    // Selecting 4 random values from new_arr
    let selectedMovies = [];
    const length = new_arr.length;
    const numSelections = Math.min(length, 4); // Ensure not to select more than available movies

    // Generate unique random indices
    const randomIndices = [];
    while (randomIndices.length < numSelections) {
        const randomIndex = Math.floor(Math.random() * length);
        if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
        }
    }

    // Retrieve selected movies
    for (let i = 0; i < numSelections; i++) {
        selectedMovies.push(new_arr[randomIndices[i]]);
    }

    return selectedMovies
}



// Rederaction of pages

function renderRedirectUserPage(parentID, instanceData) {

    //console.log("Redirecting to user page for", instanceData.userName);

    document.querySelector("#userName").innerHTML = instanceData.username;
    renderUserPage(parentID, instanceData);

    document.getElementById(parentID).innerHTML = "";
    renderUserPage("mainPage", instanceData);


}







// function clearContent(parentID, instanceData) {
//     document.getElementById(parentID).innerHTML = "";
//     renderUserPage("mainPage", instanceData);
// }