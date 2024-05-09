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
                <img id="heart" src="../icons/white-heart.png"alt="">
            </div>
            <div id="secondbox">
                <h2 id="year">(${instanceData.year}) ${instanceData.director}</h2>
            </div>
            <div id="thirdbox">
                <p id="aboutMovie">${instanceData.info}</p>
            </div>
        </div> 
        <div id="bottomRight">
            <p id="similarmoviesinfo">Movies with similar runtime</p>
            <p id="info">Reviews</p>
            <div id="simularMovies">
                <div class="smallPosters" id="smallPoster0"></div>
                <div class="smallPosters" id="smallPoster1"></div>
                <div class="smallPosters" id="smallPoster2"></div>
                <div class="smallPosters" id="smallPoster3"></div>
            </div>
            <div id="addReview">
                <div id="review"> 
                    <h3>Review by: SpaceFan01</h3>
                    <p>Yeah the film bros are right…you need to see this...</p>
                </div>
                <div id="review"> 
                <h3>Review by: SpaceFan01</h3>
                <p>Yeah the film bros are right…you need to see this...</p>
                </div>
                <div id="review"> 
                <h3>Review by: SpaceFan01</h3>
                <p>Yeah the film bros are right…you need to see this...</p>
                </div>
                <div id="review"> 
                <h3>Review by: SpaceFan01</h3>
                <p>Yeah the film bros are right…you need to see this...</p>
                </div>
            </div>
            <input type="text" placeholder="Add Review" id="userTextInput">
        </div>
    </div>`;


    let bigPoster = document.getElementById("bigPoster");

    bigPoster.style.backgroundImage = `url(${instanceData.poster})`;



    for (let i = 0; i < 4; i++) {

        console.log(similarMoviesArray)

        let p = document.createElement("p")

        p.textContent = similarMoviesArray[i].title

        let poster = document.getElementById("smallPoster" + i)

        p.id = similarMoviesArray[i].id

        poster.appendChild(p)

        poster.style.backgroundImage = `url('${similarMoviesArray[i].poster}')`

        p.addEventListener("click", (event) => clearHtml(event, similarMoviesArray));



    }




    // HEART FILL
    const heart = document.getElementById("heart");
    heart.addEventListener("click", function () {
        if (heart.getAttribute("src") != "../icons/white-heart.png") {
            heart.setAttribute("src", "../icons/white-heart.png")
        } else {
            heart.setAttribute("src", "../icons/white-heart-fill.png")
        }
    });

}






// renderMoviesPage("wrapper");
