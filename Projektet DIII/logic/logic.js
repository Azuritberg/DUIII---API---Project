function similarMovies(MOVIES, movie) {
    let new_arr = [];

    // Filtering movies with similar release date
    for (let i = 0; i < MOVIES.length; i++) {
        if (Math.abs(MOVIES[i].year - movie.year) <= 10) {
            new_arr.push(MOVIES[i]);


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


