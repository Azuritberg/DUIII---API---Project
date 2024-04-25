function renderUserPage(parentID, instanceData) {

    const wrapper = document.getElementById(parentID);
    const userContainer = document.createElement("main");
    userContainer.id = "userContainer";
    wrapper.append(userContainer);

    userContainer.innerHTML = `
    <div id="userContainer">
        <h1 id="userNamePage">User Name</h1>
        <div id="mainLikeReviweBox">
            <div id="likeContainer">
                <div id="likeMain">
                    <h2 class="likeTitle">Likes</h2>
                </div>
                <div id="likeMovieBox">
                        <div id="likedMovie">${instanceData.liked_movies}</div>
                        <div id="likedMovie">${instanceData.liked_movies}</div>
                        <div id="likedMovie">${instanceData.liked_movies}</div>
                        <div id="likedMovie">${instanceData.liked_movies}</div>
                    </div>
                </div>
            
            <div id="reviewContainer">
                <div id="reviewTop">
                    <h2 class="reviewTitle">Reviews</h2>
                </div>
                <div id="reviewBottom">
                    <div id="reviewHeader"> 
                        <div class="reviewText">
                            <h3>Review by: <span class="userSpan">SpaceFan01</span></h3>
                            <h3>/ DUNE Part II /</h3>
                        </div>
                        <p>Yeah the film bros are right…you need to see this...</p>
                    </div>
                    <div id="reviewHeader"> 
                        <div class="reviewText">
                            <h3>Review by: <span class="userSpan">SpaceFan01</span></h3>
                            <h3>/ DUNE Part II /</h3>
                        </div>
                        <p>Yeah the film bros are right…you need to see this...</p>
                    </div>
                    <div id="reviewHeader"> 
                        <div class="reviewText">
                            <h3>Review by: <span class="userSpan">SpaceFan01</span></h3>
                            <h3>/ DUNE Part II /</h3>
                        </div>
                        <p>Yeah the film bros are right…you need to see this...</p>
                    </div>
                    <div id="reviewHeader"> 
                        <div class="reviewText">
                            <h3>Review by: <span class="userSpan">SpaceFan01</span></h3>
                            <h3>/ DUNE Part II /</h3>
                        </div>
                        <p>Yeah the film bros are right…you need to see this...</p>
                    </div>
                    <div id="reviewHeader"> 
                        <div class="reviewText">
                            <h3>Review by: <span class="userSpan">SpaceFan01</span></h3>
                            <h3>/ DUNE Part II /</h3>
                        </div>
                        <p>Yeah the film bros are right…you need to see this...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;


}