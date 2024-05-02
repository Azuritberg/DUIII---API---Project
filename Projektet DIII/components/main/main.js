async function renderMain(parentID, instanceData) {

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
        photoDiv.id = "photo" + i
        photoDiv.classList.add("posterDiv")
        // let poster = document.createElement("img");
        // poster.classList.add("poster");
        // photoDiv.append(poster);
        mainBox.append(photoDiv);
    }

    let randomIndexes = getRandomPoster(instanceData);

    for (let i = 0; i < randomIndexes.length; i++) {




        let posterDivs = document.querySelectorAll(".posterDiv")



        let p = document.createElement("p")



        p.textContent += "tjena";



        posterDivs[i].appendChild(p)










    }
    generatePosters(randomIndexes, instanceData);

    let button = document.createElement("button");
    button.id = "mainButton";
    button.textContent = "Regenerate";
    mainContainer.append(button);

    let posterContainer = document.querySelectorAll(".posterDiv");

    button.addEventListener("click", (event) => generateNewMovies(event, instanceData));

    for (let i = 0; i < posterContainer.length; i++) {
        // let id = moviePosters[i].id
        posterContainer[i].addEventListener("click", (event) => clearHtml(event, instanceData));
        console.log(posterContainer)
    }
}

function clearHtml(event, instanceData) {

    console.log("hej");
    let clickedMovie = event.target.id;
    console.log(clickedMovie)
    for (let i = 0; i < instanceData.length; i++) {
        if (clickedMovie == instanceData[i].id) {
            let mainPage = document.getElementById("mainPage");
            mainPage.innerHTML = "";
            renderMoviesPage("wrapper", instanceData[i]);
        }
    }
}

function generatePosters(randomIndexArray, instanceData) {

    let posterDivs = document.querySelectorAll(".posterDiv")

    for (let i = 0; i < randomIndexArray.length; i++) {

        let posterId = i + 1;
        let posterContainer = posterDivs[i]

        // let moviePoster = posterContainer.querySelector(".poster");
        posterContainer.setAttribute("id", randomIndexArray[i] + 1);
        posterContainer.style.backgroundImage = `url(${instanceData[randomIndexArray[i]].poster})`;
        console.log(instanceData[randomIndexArray[i]].poster)
        // "url('path/to/your/image.jpg')"
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

function generateNewMovies(event, instanceData) {

    let randomIndexes = getRandomPoster(instanceData);
    generatePosters(randomIndexes, instanceData);
}

