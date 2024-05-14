"use strict";

function renderUserPage(parentID, instanceData) {
    // let username = localstorage.getItem("username");
    // console.log(username);
    console.log(instanceData);
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
                <div id="reviewBottom">
                    <div id="reviewHeader"> 
                        <div class="reviewText">
                            <h3>Review by <span class="userSpan">SpaceFan01</span></h3> 
                            <h3 class="reviewMovie">DUNE Part II</h3>
                        </div>
                        <p>Yeah the film bros are right…you need to see this...Yeah the film bros are right…you need to see this...Yeah the film bros are right…you need to see this...</p>
                        <button id="deleteButton">Delete</button>
                    </div>
                    <div id="reviewHeader"> 
                    <div class="reviewText">
                        <h3>Review by <span class="userSpan">SpaceFan01</span></h3> 
                        <h3 class="reviewMovie">Star Wars: Episode IX - The Rise of Skywalker</h3>
                    </div>
                    <p>Yeah the film bros are right…you need to see this...</p>
                    <button id="deleteButton">Delete</button>
                    </div>
                    <div id="reviewHeader"> 
                    <div class="reviewText">
                        <h3>Review by <span class="userSpan">SpaceFan01</span></h3> 
                        <h3 class="reviewMovie">DUNE Part II</h3>
                    </div>
                    <p>Yeah the film bros are right…you need to see this...</p>
                    <button id="deleteButton">Delete</button>
                    </div>
                    <div id="reviewHeader"> 
                        <div class="reviewText">
                            <h3>Review by <span class="userSpan">SpaceFan01</span></h3> 
                            <h3 class="reviewMovie">DUNE Part II</h3>
                        </div>
                        <p>Yeah the film bros are right…you need to see this...</p>
                        <button id="deleteButton">Delete</button>
                    </div>
            </div>
        </div>
    </div>`;

}





