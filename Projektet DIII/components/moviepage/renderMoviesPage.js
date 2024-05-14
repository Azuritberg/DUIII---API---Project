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
                <img id="heart" src="./icons/white-heart.png"alt="">
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
            </div>
            <input type="text" placeholder="Add Review and Press Enter" id="userTextInput">
        </div>
    </div>`;
    renderReviews(instanceData)
    function renderReviews(instanceData) {
        let reviews_copy = State.GET("reviews");
        let users_copy = State.GET("user");
        let parent = document.querySelector("#addReview");


        for (let i = 0; i < reviews_copy.length; i++) {
            if (reviews_copy[i].movie_id === instanceData.id) {
                let username = "Unknown User";

                for (let j = 0; j < users_copy.length; j++) {
                    if (reviews_copy[i].user_id === users_copy[j].user_id) {
                        username = users_copy[j].username;
                        break;
                    }
                }

                let div = document.createElement("div");
                div.classList.add("review");

                let h3 = document.createElement("h3");
                h3.textContent = "Review by: " + username;
                div.append(h3);

                let p = document.createElement("p");
                p.textContent = reviews_copy[i].review;
                div.append(p);

                parent.append(div);
            }
        }
    }


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
    reviewInput.style.display = isLoggedIn() ? 'block' : 'none';
    console.log(STATE)

    reviewInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            document.getElementById("addReview").textContent = ""

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
                    renderReviews(instanceData)


                }

            }
        }
    })
    

let heart = document.getElementById("heart");
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
}






// renderMoviesPage("wrapper");

