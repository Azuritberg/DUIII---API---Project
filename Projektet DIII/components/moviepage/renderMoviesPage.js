"use strict";

function renderMoviesPage(parentID, instanceData) {
    let similarMoviesArray = similarMovies(instanceData)

    // Spara sidinformation i localStorage
    localStorage.setItem('loadedPage', "renderMoviesPage");
    localStorage.setItem("loadedPage-argumet", JSON.stringify([parentID, instanceData]));

    let wrapper = document.getElementById(parentID);
    let moviesContainer = document.getElementById("mainPage");
    wrapper.append(moviesContainer);

    moviesContainer.innerHTML = `
    <div id="mainMovieBox">
        <div id="mainLeft">
            <div id="bigPoster"></div>
        </div>
        <div id="topRight">
            <div id="firstBox">
                <h1 id="title">${instanceData.title}</h1>
                <img class="heart" id="${instanceData.id}" src="./icons/white-heart.png"alt="">
            </div>
            <div id="secondbox">
                <h2 id="year">(${instanceData.year}) ${instanceData.director}</h2>
            </div>
            <div id="thirdbox">
                <p id="aboutMovie">${instanceData.info}</p>
            </div>
        </div> 
        <div id="bottomRight">
            <p id="similarmoviesinfo">SIMILAR MOVIES</p>
            <p id="info">Reviews</p>
            <div id="simularMovies">
                <div class="smallPosters" id="smallPoster0"></div>
                <div class="smallPosters" id="smallPoster1"></div>
                <div class="smallPosters" id="smallPoster2"></div>
                <div class="smallPosters" id="smallPoster3"></div>
            </div>
            <div id="addReview"></div>
            <input type="text" placeholder="Add Review and Press Enter" id="userTextInput">
        </div>
    </div>`;


    // get review data from movie data
    let reviewsCopy = State.GET("reviews");
    const allMatchingReviews = reviewsCopy.filter(review => review.movie_id === instanceData.id);
    allMatchingReviews.forEach(renderReviews);


    // SIMILAR MOVIES  
    let bigPoster = document.getElementById("bigPoster");

    bigPoster.style.backgroundImage = `url(${instanceData.poster})`;



    for (let i = 0; i < 4; i++) {

        let p = document.createElement("p")

        p.textContent = similarMoviesArray[i].title

        let poster = document.getElementById("smallPoster" + i)

        p.id = similarMoviesArray[i].id

        poster.appendChild(p)

        poster.style.backgroundImage = `url('${similarMoviesArray[i].poster}')`

        p.addEventListener("click", (event) => clearHtml(event, similarMoviesArray));
    }


    // REVIEW INPUT AND SUBMIT 
    let reviewInput = document.getElementById("userTextInput")
    reviewInput.style.display = isLoggedIn() ? 'block' : 'none';
    console.log(STATE)

    reviewInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {

            let username = localStorage.username
            let users_copy = State.GET("user")
            let content = reviewInput.value
            for (let i = 0; i < users_copy.length; i++) {
                if (users_copy[i].username === username) {

                    let data = {
                        entity: "reviews",
                        row: {
                            movie_id: instanceData.id,
                            user_id: users_copy[i].user_id,
                            review: content
                        }
                    }
                    State.POST(data);
                    reviewInput.value = ""
                }
            }
        }
    })


    let heart = document.querySelector(".heart");
    if (heart) {
        heart.style.display = isLoggedIn() ? 'block' : 'none';
        heart.addEventListener("click", function () {
            if (heart.getAttribute("src") !== "./icons/white-heart.png") {
                heart.setAttribute("src", "./icons/white-heart.png");
            } else {
                heart.setAttribute("src", "./icons/white-heart-fill.png");
            }
        });
    }

    let addReview = document.getElementById("addReview");
    if (!isLoggedIn()) {
        addReview.style.height = '300px';
    }

    // HEART FILL
    // let heart = document.querySelector(".heart");
    heart.addEventListener("click", function () {

        let users_copy = State.GET("user");
        let username = localStorage.username;
        for (let i = 0; i < users_copy.length; i++) {
            if (users_copy[i].username === username) {

                let data = {
                    entity: "likes",
                    row: {
                        user_id: users_copy[i].user_id,
                        id: instanceData.id,
                    }
                }
                State.PATCH(data);
                break;
            }
        }
        // if (heart.getAttribute("src") != "./icons/white-heart.png") {
        //     heart.setAttribute("src", "./icons/white-heart.png")
        // } else {
        //     heart.setAttribute("src", "./icons/white-heart-fill.png")
        // }
    });

    //check if a movie is liked.
    checkLikedMovies("skickad från 2");
}

function checkLikedMovies(string) {

    let moviesCopy = State.GET("movies");
    let usersCopy = State.GET("user");
    let username = localStorage.username;

    let heart = document.querySelector(".heart");
    let heartId = parseInt(heart.id);

    let isLiked = false

    let userId = parseInt(localStorage.user);
    //hittar rätt användare
    for (let i = 0; i < usersCopy.length; i++) {
        if (usersCopy[i].user_id === userId) {
            let likedMovies = usersCopy[i].liked_movies;
            console.log(string, likedMovies);
            console.log(usersCopy[i].liked_movies);
            //loopar genom användarens gillade filmer och kollar om de har samma id som hjärtat
            for (let j = 0; j < likedMovies.length; j++) {
                if (heartId === likedMovies[j]) {
                    //har de samma id uppdateras isLiked
                    isLiked = true;
                }
            }
        }
    }

    //hittar hjärtat från filmen man klickat på
    let target_movie = document.getElementById(heartId);
    //är isLiked true (finns med i liked_movies arrayen) läggs klassen liked till finns den inte med tas klassen bort
    if (isLiked) {
        target_movie.classList.add("liked");
        console.log(target_movie);
    } else {
        target_movie.classList.remove("liked");
        console.log(target_movie);
    }

    //hjärtat uppdateras baserat på klassen liked
    if (target_movie.classList.contains("liked")) {
        target_movie.setAttribute("src", "./icons/white-heart-fill.png");
    } else {
        target_movie.setAttribute("src", "./icons/white-heart.png");
    }
}





// renderMoviesPage("wrapper");

