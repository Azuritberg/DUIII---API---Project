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
                    <div id="likedMovie"></div>
                    <div id="likedMovie"></div>
                    <div id="likedMovie"></div>
                    <div id="likedMovie"></div>
                    <div id="likedMovie"></div>
                    <div id="likedMovie"></div>
                    <div id="likedMovie"></div>
                    <div id="likedMovie"></div>
                </div>
            </div>
            
            <div id="reviewContainer">
                <div id="reviewBottom"></div>
                </div>
        </div>`;
    }
    
    // RENDER USER REVIEWS
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
    
        // Find reviewed movies
        for (let i = 0; i < user_reviews.length; i++) {
            for (let j = 0; j < movies_copy.length; j++) {
                if (user_reviews[i].movie_id === movies_copy[j].id) {
                    reviewed_movies.push(movies_copy[j]);
                }
            }
        }
        
        console.log(user_reviews);
        console.log(reviewed_movies);
    
        let parent = document.getElementById("reviewBottom");
        let movie_title = ""
        for (let m = 0; m < user_reviews.length; m++) {
            let review = user_reviews[m].review;
            for (let a = 0; a < reviewed_movies.length; a++) {
                if (user_reviews[m].movie_id===reviewed_movies[a].id) {
                     movie_title = reviewed_movies[a].title
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
            span.textContent = " / " + movie_title + " /";
            h3.append(span);
    
            let img = document.createElement("img");
            img.id = "deleteButton";
            img.src = "./icons/delete.png";
            img.review_id = user_reviews[m].review_id; // Lägg till reviewens ID direkt som en egenskap  samma sak  // img.setAttribute("data-review-id", user_reviews[m].id); // Lägg till recensionens ID
            text.append(img);
    
            let p = document.createElement("p"); 
            p.classList.add("reviewInfo");   
            p.textContent = review;
            parent.append(p);

             // Lägg till event listener för delete-knappen
            img.addEventListener("click", async (event) => {
                event.preventDefault();
                console.log("hej");

                const reviewId = event.target.event.target.review_id; // Hämta recensionens ID direkt från egenskapen getAttribute('data-review-id'); 
                if (reviewId) {
                    const deleteReview = await State.DELETE({ entity: "reviews", row: reviewId });
                    console.log(deleteReview);

                    // Ta bort recension från DOM om den raderas framgångsrikt
                    if (deleteReview) {
                        renderUserReviews(instanceData); // Rendera om recensionerna
                    }
                }
            });
        }
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