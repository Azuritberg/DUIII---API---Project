"use strict";

function renderLikesContainer(parentID) {
    const likesContainer = document.createElement("div");
    document.getElementById(parentID).append(likesContainer); 
    likesContainer.id = "likes-container";
    likesContainer.innerHTML = `
        <div id="likes-main">
          <h2 class="likes-title">Likes</h2> 
        </div>
        <div id="likes-images">${getLikedImages()}</div>
    `;
};


function getLikedImages(MOVIES) { //ska skicka array av strängarna till varje path
    return MOVIES.map(name => `<img src="${name}" alt="${name}">`).join('');
}

renderLikesContainer('wrapper'); 



// TODO!! OBS!! kolla att vägen till bilderna stämmer!






