function renderHeader(parentID, instanceData) {

  let header = document.createElement("div");
  parentID.append(header)
  header.id = "header";
  header.innerHTML = `
        <div id="headerLeft">
          <img src="./icons/rocket-vit.png" alt="">
        </div>
        <div id="headerMiddle">
            <p>The Random Universe.</p>
        </div>
        <div id="headerRight">
          <button id="login">Login</button>
        </div>
    `
};
