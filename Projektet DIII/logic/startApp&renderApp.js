// STARTAPP

async function startApp() {
    const TOKEN = localStorage.getItem("token");
    //console.log(TOKEN)
    if (!TOKEN) {
        window.location.replace(`${window.location.origin}/login`);
        // window.location.href = "/login";
        return;
    }
    renderApp(TOKEN);
}


// RENDERAPP

async function renderApp(TOKEN) {
    Token = TOKEN;
    // ska ta emot TOKEN som login.php returnerar
    try {
        const data = {
            method: "GET"
        }
        const gamesRequest = new Request(`/api/games.php?token=${TOKEN}`, data)
        const gamesRespons = await fetcher(gamesRequest);

        const charactersRequest = new Request(`/api/characters.php?token=${TOKEN}`, data)
        const charactersRespons = await fetcher(charactersRequest);
        if (gamesRespons.ok) {
            //console.log(gamesRespons);
            STATE.games = gamesRespons.data; //data
        }
        if (charactersRespons.ok) {
            STATE.characters = charactersRespons.data;
        }  
    } catch (error) {
        console.error("Fetching error:", error);
            throw new Error(`Fetching error: ${error.message}`);
    }
    

    renderLogoutAndDeleteUser('wrapper');
}