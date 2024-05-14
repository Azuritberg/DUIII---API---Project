"use strict";

function renderMoviesPage(parentID, instanceData) {
    let similarMoviesArray = similarMovies(instanceData)

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
            <div id="addReview">
                <div class="review"> 
                    <h3>Review by: SpaceFan01</h3>
                    <p>Yeah the film bros are right…you need to see this...</p>
                </div>
                <div class="review"> 
                    <h3>Review by: SpaceFan01</h3>
                    <p>Yeah the film bros are right…you need to see this...</p>
                </div>
                <div class="review"> 
                    <h3>Review by: SpaceFan01</h3>
                    <p>Yeah the film bros are right…you need to see this...</p>
                </div>
                <div class="review"> 
                    <h3>Review by: SpaceFan01</h3>
                    <p>Yeah the film bros are right…you need to see this...</p>
                </div>
            </div>
            <input type="text" placeholder="Add Review and Press Enter" id="userTextInput">
        </div>
    </div>`;


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

    let reviewInput = document.getElementById("userTextInput")

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
                }

            }
        }
    })




    // HEART FILL
    const heart = document.querySelector(".heart");
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
                // console.log(instanceData);
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
    checkLikedMovies();
}

async function updateLikedMovies(likedMoviesUser) {


    // let moviesCopy = State.GET("movies");
    // let likedMovies = likedMoviesUser.liked_movies;
    // console.log(likedMovies)

    // let heart = document.querySelector(".heart");
    // let heart_id = parseInt(heart.id);

    // let isLiked = false;
    // for (let i = 0; i < liked_movies.length; i++) {
    //     console.log(liked_movies[i]);
    //     if (heart_id === liked_movies[i]) {
    //         isLiked = true;
    //         break;
    //     }
    //     if (isLiked) {
    //         break;
    //     }
    // }

    // if (isLiked) {
    //     heart.classList.add("liked");
    // } else {
    //     heart.classList.remove("liked");
    // }

    // if (heart.classList.contains("liked")) {
    //     heart.setAttribute("src", "./icons/white-heart-fill.png");
    // } else {
    //     heart.setAttribute("src", "./icons/white-heart.png");
    // }
}

function checkLikedMovies() {

    let moviesCopy = State.GET("movies");
    let usersCopy = State.GET("user");
    let username = localStorage.username;

    let heart = document.querySelector(".heart");
    let heartId = parseInt(heart.id);

    let isLiked = false

    for (let i = 0; i < usersCopy.length; i++) {
        if (usersCopy[i].username === username) {
            let likedMovies = usersCopy[i].liked_movies;

            for (let j = 0; j < likedMovies.length; j++) {
                if (heartId === likedMovies[j]) {
                    console.log(heartId);
                    isLiked = true;
                    console.log(isLiked);
                }
            }
        }
    }
}





// renderMoviesPage("wrapper");

