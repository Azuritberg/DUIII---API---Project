function similarMovies(MOVIES, movie) {
    let new_arr = []

    for (let i = 0; i < MOVIES.length; i++) {

        if (Math.abs(MOVIES[i].run_time - movie.run_time) <= 5) {
            new_arr.push(MOVIES[i])

        }
    }
    console.log(MOVIES)
}

// fetch("/databas/movies.json")
//     .then(r => r.json())

//     .then(r => similarMovies(r.MOVIES))
