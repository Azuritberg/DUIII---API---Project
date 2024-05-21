"use strict";

let savedMovies = [];

async function renderMain(parentID, sameMovies = []) {

    console.log(parentID);
    localStorage.setItem('loadedPage', "renderMain");
    localStorage.setItem("loadedPage-argumet", JSON.stringify([parentID, sameMovies]));

    let movies = State.GET("movies");
    let mainContainer = document.createElement("div");
    mainContainer.id = "mainContainer";
    document.getElementById("mainPage").append(mainContainer);

    let pDom = document.createElement("p");
    pDom.id = "infoText";
    pDom.innerHTML = `Not sure what to watch tonight? <br> Don’t worry, we’ll help you out.`;
    mainContainer.append(pDom);

    let mainBox = document.createElement("div");
    mainBox.id = "mainBox";
    mainContainer.append(mainBox);

    for (let i = 1; i <= 10; i++) {
        let photoDiv = document.createElement("div");
        photoDiv.id = "photo" + i
        photoDiv.classList.add("posterDiv")
        mainBox.append(photoDiv);
    }

    let randomIndexes = getRandomPoster(movies);

    for (let i = 0; i < randomIndexes.length; i++) {

        let posterDivs = document.querySelectorAll(".posterDiv");

        let p = document.createElement("p")

        p.classList.add("movieTitleText")

        mainBox.children[i].addEventListener("mouseover", function (event) {

            let hoverId = event.target.id;
            let hoverMoviePoster = document.querySelectorAll(".poster");
            for (let i = 0; i < movies.length; i++) {
                if (hoverId == movies[i].id) {
                    let text = movies[i].title;
                    p.textContent = text;
                }
            }
        })

        posterDivs[i].appendChild(p)
    }

    let posterDivs = document.querySelectorAll(".posterDiv");
    let pet = document.querySelectorAll(".movieTitleText")
    if (sameMovies.length === 0) {
        generatePosters(randomIndexes, movies);
    } else {
        for (let i = 0; i < sameMovies.length; i++) {
            let p = pet[i];
            let posterContainer = posterDivs[i]
            p.setAttribute("id", sameMovies[i].id);
            posterContainer.style.backgroundImage = `url(${sameMovies[i].poster})`;
        }
    }

    let button = document.createElement("button");
    button.id = "mainButton";
    button.textContent = "Regenerate";
    mainContainer.append(button);

    let posterContainer = document.querySelectorAll(".posterDiv");

    let p = document.querySelectorAll(".movieTitleText")

    button.addEventListener("click", (event) => regeneratePosters(event, movies));

    for (let i = 0; i < posterContainer.length; i++) {

        p[i].addEventListener("click", (event) => clearHtml(event, movies));
    }

}

function clearHtml(event, instanceData) {

    let clickedMovie = event.target.id;
    for (let i = 0; i < instanceData.length; i++) {
        if (clickedMovie == instanceData[i].id) {
            let mainPage = document.getElementById("mainPage");
            mainPage.innerHTML = "";
            renderMoviesPage("wrapper", instanceData[i]);
        }
    }
}

function generateMovierray() {
    let movie_copy = State.GET("movies")
    let new_arr = [];
    let rndm = getRandomPoster(movie_copy)

    for (let i = 0; i < rndm.length; i++) {
        new_arr.push(movie_copy[rndm[i]])

    }
    return (new_arr)
}

function generatePosters(randomIndexArray, instanceData) {

    let posterDivs = document.querySelectorAll(".posterDiv")
    let ps = document.querySelectorAll(".movieTitleText")

    for (let i = 0; i < randomIndexArray.length; i++) {

        let posterId = i + 1;
        let posterContainer = posterDivs[i]
        let p = ps[i]


        p.setAttribute("id", randomIndexArray[i] + 1);
        posterContainer.style.backgroundImage = `url(${instanceData[randomIndexArray[i]].poster})`;


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
    let randomIndexes = getRandomPoster(newMovies);

    savedMovies = [];
    generatePosters(randomIndexes, newMovies);
}





function saveCurrentPage(pageIdentifier, data) {
    localStorage.setItem("currentPage", pageIdentifier);
    localStorage.setItem("currentPageData", JSON.stringify(data));
}

// Funktion för att hämta och rendera aktuell sida från localStorage vid laddning/uppdatering av sidan
function loadCurrentPage() {
    let pageIdentifier = localStorage.getItem("currentPage");
    let data = JSON.parse(localStorage.getItem("currentPageData"));

    if (pageIdentifier && data) {
        switch (pageIdentifier) {
            case "renderMain":
                renderMain(document.getElementById('mainPage'), data);
                break;
            case "renderMoviesPage":
                renderMoviesPage('wrapper', data);
                break;
            default:
                renderMain(document.getElementById('mainPage'));  // Default till huvudsidan om inget annat är sparat
        }
    }
}