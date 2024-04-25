
function renderMoviesPage(parentID) {

    let wrapper = document.getElementById(parentID);
    let moviesContainer = document.createElement("main");
    moviesContainer.id = "moviesContainer";
    wrapper.append(moviesContainer);

    moviesContainer.innerHTML = `
    <div id="mainMovieBox">
        <div id="mainLeft">
            <div id="bigPoster"></div>
        </div>
        <div id="topRight">
            <div id="firstBox">
                <h1 id="title">Blade Runner: 2049, 2017, Denis Villeneuve</h1>
                <img id="heart" src=""alt="">
            </div>
            <p id="aboutMovie">Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what’s left of society into chaos. K’s discovery leads him on a quest to find Rick Deckard, a former LAPD blade runner who has been missing for 30 years.</p>
        </div> 
        <div id="bottomRight">
            <p id="info">Similar Movies</p>
            <p id="info">Reviews</p>
            <div id="simularMovies">
                <div id="smallPoster"></div>
                <div id="smallPoster"></div>
                <div id="smallPoster"></div>
                <div id="smallPoster"></div>
            </div>
            <div id="addReview">
                <div id="review"> <!-- Notera ändringen från id till class här -->
                    <h3>Review by: SpaceFan01</h3>
                    <p>Yeah the film bros are right…you need to see this...</p>
                </div>
                <div id="review"> <!-- Notera ändringen från id till class här -->
                <h3>Review by: SpaceFan01</h3>
                <p>Yeah the film bros are right…you need to see this...</p>
                </div>
                <div id="review"> <!-- Notera ändringen från id till class här -->
                <h3>Review by: SpaceFan01</h3>
                <p>Yeah the film bros are right…you need to see this...</p>
                </div>
                <div id="review"> <!-- Notera ändringen från id till class här -->
                <h3>Review by: SpaceFan01</h3>
                <p>Yeah the film bros are right…you need to see this...</p>
                </div>
            </div>
            <input type="text" placeholder="Add Review" id="userTextInput">
        </div>
    </div>`;

}

renderMoviesPage("wrapper");


