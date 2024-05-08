"use strict"

function renderLogoutAndDeleteUser (parentID) {
    //const TOKEN = localStorage.getItem("token");
    const mainContainer = document.getElementById(parentID);

    // const logoutAndDeleteUserContainer = document.createElement("div");
    // logoutAndDeleteUserContainer.id = "container-user-panel";
    
    const logoutButton = document.createElement("button");
    logoutButton.textContent = "Logout";
    logoutButton.addEventListener('click', () => {
        //localStorage.removeItem("token");
        location.reload();
    });

    // const deleteUserButton = document.createElement("button");
    // deleteUserButton.textContent = "Delete user";
    // deleteUserButton.addEventListener('click', async () => {
    //     let result = await fetcher(new Request("api/users.php", {
    //         headers: {"Content-Type": "application/json"},
    //         method: 'DELETE',
    //         body: JSON.stringify( {token: TOKEN} ),
    //     }));
    //     if(!result.ok) {
    //         console.log(result.status);
    //         return;
    //     }

    //     //window.alert("User has been deleted");
    //     localStorage.removeItem("");
    //     location.reload();
    // });

    logoutAndDeleteUserContainer.appendChild(logoutButton);
    //logoutAndDeleteUserContainer.appendChild(deleteUserButton);
    mainContainer.appendChild(logoutAndDeleteUserContainer);

}