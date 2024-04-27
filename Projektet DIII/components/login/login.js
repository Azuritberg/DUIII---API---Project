
function renderHeader(parentID, instanceData) {
    console.log(instanceData);
    let header = document.createElement("div");
    parentID.append(header);
    header.id = "header";
    header.innerHTML = `
          <div id="headerLeft">
            <img id="logo" src="./icons/rocket-vit.png" alt="">
          </div>
          <div id="headerMiddle">
              <p>The Random Universe.</p>
          </div>
          <div id="headerRight">
            <div id="userName">Username</div>
            <button id="login">Login</button>
          </div>
      `;
  
    // Create modal and overlay
    let overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.classList.add("overlay");
  
    let modal = document.createElement("div");
    modal.id = "loginModal";
    modal.classList.add("modal");
  
    modal.innerHTML = `
      <div class="modal-content">
          <span class="close-button" data-close-button>&times;</span>
          <h1>Login</h1>
          <form>
              <input type="text" placeholder="Username:" id="username"><br><br>
              <input type="text" placeholder="Password:" id="password"><br><br>
              <button id="logIn" type="submit">Login</button>
              <div id="noAccount">
                <p>Don't have an account?</p>
                <button id="register">Register</button></p>
              </div>
          </form>
      </div>
    `;
  
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
  
    document.getElementById('login').addEventListener('click', () => openModal(modal));
  
    overlay.addEventListener('click', () => closeModal(modal));
  
    modal.querySelector('[data-close-button]').addEventListener('click', () => closeModal(modal));
  }
  
  function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    document.getElementById('overlay').classList.add('active');
  }
  
  function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
  }
  