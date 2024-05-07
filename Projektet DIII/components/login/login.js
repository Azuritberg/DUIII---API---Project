
function renderHeaderLogin(parentID, instanceData) {
  //console.log(instanceData);

  let overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.classList.add("overlay");

  let modal = document.createElement("div");
  modal.id = "loginModal";
  modal.classList.add("modal");

  modal.innerHTML = loginModalContent();

  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  document.getElementById('login').addEventListener('click', () => openModal(modal));

  overlay.addEventListener('click', () => closeModal(modal));

  document.querySelector('#loginModal').addEventListener('click', event => {
    if (event.target.id === 'register') {
      changeModalContent(modal, 'registerButton');
      let registerButton = document.getElementById("registerButton");
      registerButton.addEventListener("click", registerNewUser);
    } else if (event.target.id === 'logIn') {
      changeModalContent(modal, 'logInButton');
      // let logInButton = document.getElementById("logInButton");
      // console.log(logInButton);
    }
  });
  let logInButton = document.getElementById("logInButton");
  logInButton.addEventListener("click", login);
}

function loginModalContent() {
  return `
      <div class="modal-content">
          <h1>Login</h1>
          <form>
              <input type="text" placeholder="Username" id="username"><br><br>
              <input type="text" placeholder="Password" id="password"><br><br>
              <button id="logInButton" type="submit">Login</button>
              <div id="noAccount">
                <p>Don't have an account?</p>
                <button id="register">Register</button>
              </div>
          </form>
      </div>
  `;
}

function registerModalContent() {
  return `
      <div class="modal-content">
          <h1>Register</h1>
          <form>
              <input type="text" placeholder="Create username" id="newUsername"><br><br>
              <input type="text" placeholder="Create password" id="newPassword"><br><br>
              <button id="registerButton" type="submit">Register</button>
              <div id="noAccount">
                <p>Already have an account?</p>
                <button id="logIn">Login</button>
              </div>
          </form>
      </div>
  `;
}

function changeModalContent(modal, type) {
  if (type === 'logInButton') {
    modal.innerHTML = loginModalContent(); 
  } else if (type === 'registerButton') {
    modal.innerHTML = registerModalContent();
  }
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

// let registerButton = document.getElementById("registerButton");
// console.log(registerButton);
// registerButton.addEventListener("click", registerNewUser);

function registerNewUser(event) {

  event.preventDefault();
  let newUsername = document.getElementById("newUsername").value;
  let newPassword = document.getElementById("newPassword").value;

  let newUser = {
    entity: "sign_up",
    row: {
      username: newUsername,
      password: newPassword,
    }
  }
  State.POST(newUser);
}

function login(event) {

  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  console.log(username);

  let user = {
    entity: "login",
    row: {
      username: username,
      password: password
    }
  }
  State.POST(user);
}









// Knappar som skapar modall på logga in och register. med X för att stänga.

// function loginModalContent() {
//   return `
//       <div class="modal-content">
//           <span class="close-button" data-close-button>&times;</span>
//           <h1>Login</h1>
//           <form>
//               <input type="text" placeholder="Username" id="username"><br><br>
//               <input type="text" placeholder="Password" id="password"><br><br>
//               <button id="logInButton" type="submit">Login</button>
//               <div id="noAccount">
//                 <p>Don't have an account?</p>
//                 <button id="register">Register</button>
//               </div>
//           </form>
//       </div>
//   `;
// }

// function registerModalContent() {
//   return `
//       <div class="modal-content">
//           <span class="close-button" data-close-button>&times;</span>
//           <h1>Register</h1>
//           <form>
//               <input type="text" placeholder="Create username" id="username"><br><br>
//               <input type="text" placeholder="Create password" id="password"><br><br>
//               <button id="registerButton" type="submit">Register</button>
//               <div id="noAccount">
//                 <p>Already have an account?</p>
//                 <button id="logIn">Login</button>
//               </div>
//           </form>
//       </div>
//   `;
// }