
function renderHeaderLogin(parentID, instanceData) {

  let overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.classList.add("overlay");

  let modal = document.createElement("div");
  modal.id = "loginModal";
  modal.classList.add("modal");
  modal.innerHTML = loginModalContent();

  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  // Uppdatera login/logout knappen beroende på användarens inloggningstatus
  updateLoginLogoutButton();

  document.getElementById('login').addEventListener('click', () => openModal(modal));

  overlay.addEventListener('click', () => closeModal(modal));
  document.querySelector('#loginModal').addEventListener('click', event => {
    if (event.target.id === 'register') {
      changeModalContent(modal, 'registerButton');
      let registerButton = document.getElementById("registerButton");
      //console.log(registerButton);
      document.getElementById("registerButton").addEventListener("click", createNewUser);
    } else if (event.target.id === 'logIn') {
      changeModalContent(modal, 'logInButton');
    }
  });

  let loginButton = document.querySelector("#logInButton");
  if (loginButton) {
    loginButton.addEventListener("click", loginUser);
  }
}


function loginModalContent() {
  return `
      <div class="modal-content">
          <h1>Login</h1>
          <form>
              <input type="text" placeholder="Username" id="username"><br><br>
              <input type="password" placeholder="Password" id="password">
              <div class="custom-checkbox">
                  <input type="checkbox" id="eye">
                  <label for="eye"></label>
              </div>

              
              <br><br>
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
              <input type="password" placeholder="Create password" id="newPassword"><br><br>
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

// REGISTER USER
function createNewUser(event) {

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


// Update BUTTON from Login to Logout
function updateLoginLogoutButton() {
  const loginButton = document.getElementById('login');
  if (isLoggedIn()) {
    loginButton.textContent = 'Logout';
    loginButton.removeEventListener('click', openModal);
    loginButton.addEventListener('click', logoutUser);
  } else {
    loginButton.textContent = 'Login';
    loginButton.removeEventListener('click', logoutUser);
    loginButton.addEventListener('click', () => openModal(document.getElementById('loginModal')));
  }
}


function isLoggedIn() {
  return localStorage.getItem("user") !== null;
}

// Login User and set user object to localStorage
async function loginUser(event) {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let user = {
    entity: "login",
    row: { username: username, password: password }
  };

  try {
    const loginUserObject = await State.POST(user);  // returnera user objektet och sparar det i constanten loginUserObject
    if (loginUserObject.ok) {
      localStorage.setItem("user", JSON.stringify(loginUserObject.id));
      
      localStorage.setItem("username", loginUserObject.username);

      closeModal(document.getElementById("loginModal"));
      renderRedirectUserPage("mainPage", loginUserObject);
      //renderHeader(parentID, loginUserObject);
      updateLoginLogoutButton();
      console.log("Login successful");

      window.location.replace('index.html');
    } else {
      console.error("Error logging in", loginUserObject);
    }
  } catch (error) {
    console.error("Error logging in", error);
  }
}


// Logout user and go to mainPage 'index.html'
function logoutUser() {
  localStorage.removeItem("user");
  updateLoginLogoutButton();
  //renderHeader(parentID, null);
  console.log("Logout successful");

  window.location.replace('index.html'); // Go to main'index.html' 
}







//  GAMMLA KODEN FINNS HÄR JAG SKREV OM DELAR AV DEN FÖR ATT FÅ LOGIN ATT FUNGERA - VI KAN RADERA DETTA NÄR VI FÅTTA ALLT ATT FUNGERA  


// function renderHeaderLogin(parentID, instanceData) {
//   //console.log(instanceData);

//   let overlay = document.createElement("div");
//   overlay.id = "overlay";
//   overlay.classList.add("overlay");

//   let modal = document.createElement("div");
//   modal.id = "loginModal";
//   modal.classList.add("modal");
//   modal.innerHTML = loginModalContent();

//   document.body.appendChild(overlay);
//   document.body.appendChild(modal);

//   document.getElementById('login').addEventListener('click', () => openModal(modal));

//   overlay.addEventListener('click', () => closeModal(modal));

//   document.querySelector('#loginModal').addEventListener('click', event => {
//     if (event.target.id === 'register') {
//       changeModalContent(modal, 'registerButton');
//       let registerButton = document.getElementById("registerButton");
//       console.log(registerButton);
//       registerButton.addEventListener("click", createNewUser);
//     } else if (event.target.id === 'logIn') {
//       changeModalContent(modal, 'logInButton');
//     }
//   });

//   let loginButton = document.querySelector("#logInButton");
//   loginButton.addEventListener("click", loginUser);
// }

// function loginModalContent() {
//   return `
//       <div class="modal-content">
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
//           <h1>Register</h1>
//           <form>
//               <input type="text" placeholder="Create username" id="newUsername"><br><br>
//               <input type="text" placeholder="Create password" id="newPassword"><br><br>
//               <button id="registerButton" type="submit">Register</button>
//               <div id="noAccount">
//                 <p>Already have an account?</p>
//                 <button id="logIn">Login</button>
//               </div>
//           </form>
//       </div>
//   `;
// }

// function changeModalContent(modal, type) {
//   if (type === 'logInButton') {
//     modal.innerHTML = loginModalContent();
//   } else if (type === 'registerButton') {
//     modal.innerHTML = registerModalContent();
//   }
// }

// function openModal(modal) {
//   if (modal == null) return;
//   modal.classList.add('active');
//   document.getElementById('overlay').classList.add('active');
// }

// function closeModal(modal) {
//   if (modal == null) return;
//   modal.classList.remove('active');
//   document.getElementById('overlay').classList.remove('active');
// }


// function createNewUser(event) {

//   event.preventDefault();

//   let newUsername = document.getElementById("newUsername").value;
//   let newPassword = document.getElementById("newPassword").value;

//   let newUser = {
//     entity: "sign_up",
//     row: {
//       username: newUsername,
//       password: newPassword,
//     }
//   }
//   State.POST(newUser);
// }


// async function loginUser(event) {
//   try {
//       event.preventDefault();
  
//       let username = document.getElementById("username").value;
//       let password = document.getElementById("password").value;
  
//       let user = {
//         entity: "login",
//         row: {
//           username: username,
//           password: password,
//         }
//       }
//       const loginUserObject = await State.POST(user); // returnera user objektet och sparar det i constanten loginUserObject

//       if (loginUserObject.ok){
//         localStorage.setItem("user", JSON.stringify(loginUserObject.id));
        
//         document.getElementById('overlay').classList.remove('active');
//         document.getElementById("loginModal").classList.remove("active");
//         //console.log(loginUserObject);
//         renderRedirectUserPage("mainPage", loginUserObject);

//         console.log("Login successful");

//       } else {
//         console.error("Error logging in");
//       }
//   } catch (error){
//     console.error("Error logging in", error);
//   } 
// }




















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