"use strict";
function renderLikesContainer (parentID) {

    const likesContainer = document.createElement("div");
    parentID.append(likesContainer)
    likesContainer.id = "likes-container";
    likesContainer.innerHTML = `
        <div id="likes-main">
          <h2 calss="likes-title">Likes</h2>
        </div>
        <div id="likes-middle">
            <img src="../images/poster/" alt="">  
        </div>
    `
};


// TODO!! OBS!! kolla att vägen till bilderna stämmer!