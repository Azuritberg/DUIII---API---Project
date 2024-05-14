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
                            <h3>${instanceData.username} <span class="userSpan">/ ${instanceData.title} /</span></h3> 
                            <img id="deleteButton" src="./icons/delete.png"alt="">
                            </div>
                            <p>${instanceData.info}</p>
                        </div>
                        <div id="reviewHeader"> 
                            <div class="reviewText">
                                <h3>SpaceFan01 <span class="userSpan">/ DUNE Part II /</span></h3> 
                                <img id="deleteButton" src="./icons/delete.png"alt="">
                            </div>
                            <p>Yeah the film bros are right…you need to see this...</p>
                        </div>

                        <div id="reviewHeader"> 
                            <div class="reviewText">
                                <h3>SpaceFan01 <span class="userSpan">/ DUNE Part II /</span></h3> 
                                <img id="deleteButton" src="./icons/delete.png"alt="">
                            </div>
                            <p>Yeah the film bros are right…you need to see this...</p>
                        </div>
                        <div id="reviewHeader"> 
                            <div class="reviewText">
                                <h3>SpaceFan01 <span class="userSpan">/ DUNE Part II /</span></h3> 
                                <img id="deleteButton" src="./icons/delete.png"alt="">
                            </div>
                            <p>Yeah the film bros are right…you need to see this...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }


    const deleteLikeButton = document.getElementById("deleteButton");
    deleteLikeButton.addEventListener("click", (event) => {
        
    });


    const likedMovieUserPage = document.getElementById("likedMovie");
    likedMovieUserPage.style.backgroundImage = `url(${instanceData.poster})`;




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