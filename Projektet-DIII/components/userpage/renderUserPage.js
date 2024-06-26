"use strict";

function renderUserPage(parentID, instanceData) {
    // Save page information in localStorage
    localStorage.setItem('loadedPage', "renderUserPage");
    localStorage.setItem("loadedPage-argumet", JSON.stringify([parentID, instanceData]));
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
                <div id="likeMovieBox"></div>
            </div>
            
            <div id="reviewContainer">
                <div id="reviewBottom"></div>
            </div>
        </div>`;

    checkUserLikes();
    renderUserReviews(instanceData);
}

function renderUserReviews(instanceData) {
    let reviews_copy = State.GET("reviews");
    let movies_copy = State.GET("movies");

    let user_reviews = [];
    let reviewed_movies = [];

    // Filter user reviews
    for (let i = 0; i < reviews_copy.length; i++) {
        if (reviews_copy[i].user_id === instanceData.user_id) {
            user_reviews.push(reviews_copy[i]);
        }
    }

    // Find reviewed movies and store in an object for quick lookup
    for (let i = 0; i < movies_copy.length; i++) {
        reviewed_movies.push(movies_copy[i]);
    }

    // Render user reviews
    let parent = document.getElementById("reviewBottom");

    for (let m = 0; m < reviewed_movies.length; m++) {
        for (let a = 0; a < user_reviews.length; a++) {
            if (reviewed_movies[m].id === user_reviews[a].movie_id) {
                let review = user_reviews[a];
                // Check if review exists
                if (!review) continue;
                const movie_title = reviewed_movies[m].title;

                // Create and append the review elements
                let header = document.createElement("div");
                header.classList.add("reviewHeader");
                header.id = "reviewHeader" + review.review_id;
                parent.append(header);

                let text = document.createElement("div");
                text.classList.add("reviewText");
                header.append(text);

                let h3 = document.createElement("h3");
                h3.textContent = instanceData.username;
                text.append(h3);

                let span = document.createElement("span");
                span.classList.add("userSpan");
                span.textContent = " / " + movie_title + " /";
                h3.append(span);

                let img = document.createElement("img");
                img.id = "deleteButton" + review.review_id;
                img.classList.add("deleteButton");
                img.src = "./icons/delete.png";
                text.append(img);

                let p = document.createElement("p");
                p.classList.add("reviewInfo")
                p.id = "reviewInfo" + review.review_id;
                p.textContent = review.review;
                parent.append(p);

                // Add event listener to delete button
                img.addEventListener("click", () => {
                    deleteReview(review.review_id);
                });
            }
        }
    }
}

// Delete review and update DOM
async function deleteReview(review_id) {
    await State.DELETE({ entity: "reviews", row: { review_id } });

    let reviewHeaderElement = document.getElementById("reviewHeader" + review_id);
    let reviewInfoElement = document.getElementById("reviewInfo" + review_id);
    if (reviewHeaderElement) reviewHeaderElement.remove();
    if (reviewInfoElement) reviewInfoElement.remove();
}

//  Check if user has liked movies
function checkUserLikes() {
    let movies = State.GET("movies");
    let users = State.GET("user");

    let username = localStorage.username;

    let currentUser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            currentUser = users[i];
        }
    }
    let likedMovies = currentUser.liked_movies;

    let likeMovieBox = document.getElementById("likeMovieBox");
    if (likeMovieBox !== null) {
        for (let i = 0; i < movies.length; i++) {
            for (let j = 0; j < likedMovies.length; j++) {
                if (likedMovies[j] === movies[i].id) {
                    let likedMovieDiv = document.createElement("div");
                    likedMovieDiv.classList.add("likedMovie");
                    likedMovieDiv.setAttribute("id", movies[i].id);

                    let p = document.createElement("p");
                    p.textContent = movies[i].title;
                    p.id = movies[i].id;
                    likedMovieDiv.append(p);

                    likedMovieDiv.style.backgroundImage = `url(${movies[i].poster})`;
                    likeMovieBox.appendChild(likedMovieDiv);
                    likedMovieDiv.addEventListener("click", function (event) {
                        clearHtml(event, movies);
                    });
                }
            }
        }
    }
}
