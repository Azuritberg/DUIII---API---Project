let savedMovies = [];

async function renderMain(parentID, sameMovies = []) {

    console.log(sameMovies);

    let movies = State.GET("movies");
    let mainContainer = document.createElement("div");
    mainContainer.id = "mainContainer";
    parentID.append(mainContainer);

    // let pDom = document.createElement("p");
    // pDom.id = "infoText";
    // pDom.innerHTML = `Not sure what to watch tonight? <br> Don’t worry, we’ll help you out.`;
    // mainContainer.append(pDom);

    let mainBox = document.createElement("div");
    mainBox.id = "mainBox";
    mainContainer.append(mainBox);

    for (let i = 1; i <= 10; i++) {
        let photoDiv = document.createElement("div");
        photoDiv.id = "photo" + i;
        photoDiv.classList.add("posterDiv")
        let poster = document.createElement("img");
        poster.classList.add("poster");
        photoDiv.append(poster);

        mainBox.append(photoDiv);
    }

    let randomIndexes = getRandomPoster(movies);

    for (let i = 0; i < randomIndexes.length; i++) {

        let posterId = i + 1;
        let posterContainer = document.getElementById("photo" + posterId);
        let poster = posterContainer.querySelector(".poster");

        if (sameMovies.length === 0) {
            poster.src = movies[randomIndexes[i]].poster;
        } else {
            poster.src = sameMovies[i].poster;
        }
        let p = document.createElement("p")
        let text = ""

        posterContainer.appendChild(p)

        poster.addEventListener("mouseover", function (event) {
            let hoverId = event.target.id;
            let hoverMoviePoster = document.querySelectorAll(".poster");
            for (let i = 0; i < movies.length; i++) {
                if (hoverId == movies[i].id) {
                    text = movies[i].title;
                    p.textContent = text;
                }
            }
        })

        poster.addEventListener("mouseout", function () {
            poster.style.filter = '';
            p.style.display = ""


        })

        poster.addEventListener("mousedown", function () {
            poster.style.filter = 'brightness(100%)';
            p.style.display = "none"


        })

        poster.addEventListener("mouseup", function () {
            poster.style.filter = 'brightness(50%)';
            p.style.display = "inline"


        })
    }

    if (sameMovies.length === 0) {
        generatePosters(randomIndexes, movies);
    }

    let button = document.createElement("button");
    button.id = "mainButton";
    button.textContent = "Regenerate";
    mainContainer.append(button);

    let moviePosters = document.querySelectorAll(".poster");
    console.log(moviePosters);
    button.addEventListener("click", () => regeneratePosters(movies));

    for (let i = 0; i < moviePosters.length; i++) {
        let id = moviePosters[i].id
        moviePosters[i].addEventListener("click", (event) => clearHtml(event, movies));
    }
}

function clearHtml(event, instanceData) {

    let clickedMovie = event.target.id;
    console.log(clickedMovie);
    for (let i = 0; i < instanceData.length; i++) {
        if (clickedMovie == instanceData[i].id) {
            let mainPage = document.getElementById("mainPage");
            mainPage.innerHTML = "";
            renderMoviesPage("wrapper", instanceData[i]);
        }
    }
}

function generatePosters(randomIndexArray, instanceData) {

    for (let i = 0; i < randomIndexArray.length; i++) {

        let posterId = i + 1;
        let posterContainer = document.getElementById("photo" + posterId);

        let moviePoster = posterContainer.querySelector(".poster");
        moviePoster.setAttribute("id", randomIndexArray[i] + 1);
        moviePoster.src = instanceData[randomIndexArray[i]].poster;
        savedMovies.push(instanceData[randomIndexArray[i]]);
    }
}

function getRandomPoster(movies) {
    let randomNumbers = new Set();

    while (randomNumbers.size < 10) {
        randomNumbers.add(getRandomNumber(movies.length));
    }

    return Array.from(randomNumbers);
}

function getRandomNumber(max, min = 0) {
    return min + Math.floor(max * Math.random());
}

function regeneratePosters() {

    let newMovies = State.GET("movies");
    console.log(newMovies);
    let randomIndexes = getRandomPoster(newMovies);

    savedMovies = [];
    generatePosters(randomIndexes, newMovies);
}

// function generateNewMovies(event, instanceData) {

//     let randomIndexes = getRandomPoster(instanceData);
//     generatePosters(randomIndexes, instanceData);
// }
