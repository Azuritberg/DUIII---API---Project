"use strict";


function renderUserPage(parentID, instanceData) {
    // Spara sidinformation i localStorage
    localStorage.setItem('currentPage', JSON.stringify(instanceData));

    let wrapper = document.getElementById(parentID);
    const userContainer = document.createElement("main");
    userContainer.id = "userContainer";
    wrapper.append(userContainer);



    userContainer.innerHTML = `
        <h1 id="userNamePage">${instanceData.username}</h1>
        <div id="topText">
            <div id="likes">
                <h2 class="likeTitle">Likes</h2>
            </div>
            <div id="reviews">
                <h2 class="reviewTitle">Reviews</h2>
            </div>
        </div>
        <div id="mainLikeReviweBox">
            <div id="likeContainer">
                <div id="likeMovieBox">
                </div>
            </div>
            
            <div id="reviewContainer">
                <div id="reviewBottom">
                    
                    
                    </div>
                </div>
        </div>`;

    checkUserLikes();
    renderUserReviews(instanceData);
}


// Render user reviews
function renderUserReviews(instanceData) {

    let reviews_copy = State.GET("reviews");
    let movies_copy = State.GET("movies");

    console.log(reviews_copy);
    let user_reviews = [];
    let reviewed_movies = [];

    // Filter user reviews
    for (let i = 0; i < reviews_copy.length; i++) {
        if (reviews_copy[i].user_id === instanceData.user_id) {
            user_reviews.push(reviews_copy[i]);
        }
    }

    // Find reviewed movies
    for (let i = 0; i < user_reviews.length; i++) {
        for (let j = 0; j < movies_copy.length; j++) {
            if (user_reviews[i].movie_id === movies_copy[j].id) {
                reviewed_movies.push(movies_copy[j]);
            }
        }
    }

    // Render user reviews
    let parent = document.getElementById("reviewBottom");

    for (let m = 0; m < reviewed_movies.length; m++) {
        let review = "";
        for (let a = 0; a < user_reviews.length; a++) {
            if (reviewed_movies[m].id === user_reviews[a].movie_id) {
                review = user_reviews[a];
                break; // Once found, break the inner loop
            }
        }

        let header = document.createElement("div");
        header.classList.add("reviewHeader");
        parent.append(header);

        let text = document.createElement("div");
        text.classList.add("reviewText");
        header.append(text);

        let h3 = document.createElement("h3");
        h3.textContent = instanceData.username;
        text.append(h3);

        let span = document.createElement("span");
        span.classList.add("userSpan");
        span.textContent = " / " + reviewed_movies[m].title + " /";
        h3.append(span);

        let img = document.createElement("img");
        img.id = "deleteButton" + user_reviews[m].review_id;
        img.classList.add("deleteButton")
        img.src = "./icons/delete.png";
        text.append(img);

        let p = document.createElement("p");
        p.classList.add("reviewInfo")
        p.textContent = review.review;
        parent.append(p);

        // Add event listener to delete button
        img.addEventListener("click", (event) => {
        deleteReview(review.review_id);
        console.log("Hej DeleteButton")
        });
    }
}

async function deleteReview(instanceData) {
    console.log(instanceData);
    await State.DELETE({ entity: "reviews", row: {review_id: instanceData} });

    let reviewHeaderElement = document.getElementById("reviewHeader" + instanceData);
    let reviewInfoElement = document.getElementById("reviewInfo" + instanceData);
    if (reviewHeaderElement) reviewHeaderElement.remove();
    if (reviewInfoElement) reviewInfoElement.remove();

    // Remove review from STATE
    //let instanceData = JSON.parse(localStorage.getItem('')); // Get instance data from localStorage
    renderUserReviews(instanceData);
}

function checkUserLikes() {

    let movies = State.GET("movies");
    let users = State.GET("user");
    console.log(users);
    console.log(movies);

    let username = localStorage.username;

    let currentUser = null;
    for (let i = 0; i < users.length; i++) {

        if (users[i].username === username) {
            currentUser = users[i];
        }
    }
    let likedMovies = currentUser.liked_movies;

    let likeMovieBox = document.getElementById("likeMovieBox");
    console.log(likeMovieBox);
    for (let i = 0; i < movies.length; i++) {
        for (let j = 0; j < likedMovies.length; j++) {
            if (likedMovies[j] === movies[i].id) {
                let likedMovieDiv = document.createElement("div");
                likedMovieDiv.setAttribute("id", "likedMovie");

                likedMovieDiv.style.backgroundImage = `url(${movies[i].poster})`;
                likeMovieBox.appendChild(likedMovieDiv);
            }
        }
    }

    // let currentUser = null;
    // for (let i = 0; i < usersCopy.length; i++) {

    //     if (usersCopy[i].username === username) {
    //         currentUser = usersCopy[i];
    //     }
    // }

    // let likedMovies = currentUser.liked_movies;
    // console.log(likedMovies);
}









// <div id="reviewContainer">
// <div id="reviewBottom">
//     <div id="reviewHeader">
//         <div class="reviewText">
//             <h3>Review by <span class="userSpan">SpaceFan01</span></h3>
//             <h3 class="reviewMovie">/ DUNE Part II /</h3>
//             <img id="deleteButton" src="./icons/delete.png"alt="">
//             </div>
//             <p>Yeah the film bros are right…you need to see this...Yeah the film bros are right…you need to see this...Yeah the film bros are right…you need to see this...</p>
//         </div>
//         <div id="reviewHeader">
//             <div class="reviewText">
//                 <h3>Review by <span class="userSpan">SpaceFan01</span></h3>
//                 <h3 class="reviewMovie">/ DUNE Part II /</h3>
//                 <img id="deleteButton" src="./icons/delete.png"alt="">
//             </div>
//             <p>Yeah the film bros are right…you need to see this...</p>
//         </div>

//         <div id="reviewHeader">
//             <div class="reviewText">
//                 <h3>Review by <span class="userSpan">SpaceFan01</span></h3>
//                 <h3 class="reviewMovie">/ DUNE Part II /</h3>
//                 <img id="deleteButton" src="./icons/delete.png"alt="">
//             </div>
//             <p>Yeah the film bros are right…you need to see this...</p>
//         </div>
//         <div id="reviewHeader">
//             <div class="reviewText">
//                 <h3>Review by <span class="userSpan">SpaceFan01</span></h3>
//                 <h3 class="reviewMovie">/ DUNE Part II /</h3>
//                 <img id="deleteButton" src="./icons/delete.png"alt="">
//             </div>
//             <p>Yeah the film bros are right…you need to see this...</p>
//         </div>
//     </div>
// </div>


// <div id="likedMovie"></div>
// <div id="likedMovie"></div>
// <div id="likedMovie"></div>
// <div id="likedMovie"></div>
// <div id="likedMovie"></div>
// <div id="likedMovie"></div>
// <div id="likedMovie"></div>
// <div id="likedMovie"></div>