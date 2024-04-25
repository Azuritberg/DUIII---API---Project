"use strict";
function renderReviewsContainer (parentID) {
    const reviewsContainer = document.createElement("div");
    parentID.append(reviewsContainer)
    reviewsContainer.id = "reviews-container";
    reviewsContainer.innerHTML = `
        <div id="reviews-top">
          <h2 calss="reviews-title">Reviews</h2>
        </div>
        <div id="reviews-bottom">
            <p class="reviews-text"></p>
        </div>
    `
};



// let userName = document.getElementById("userName");
//   userName.addEventListener("click", () => clearHtml(instanceData));


// function clearHtml(event, instanceData) {

//   console.log(instanceData);
//   let mainPage = document.getElementById("mainPage");
//   mainPage.innerHTML = "";
//   renderMoviesPage("wrapper");
// }
