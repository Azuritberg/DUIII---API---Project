
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The User, Games and Characters API Documentation</title>
    <style>
        body {
            margin: 20px auto;
            color: #3a3a3a;
            font-family: Courier;
            line-height: 1.3;
            max-width: 1000px;
        }
        h1 {
            text-align: center;
        }
        .note {
            font-size: 80%;
            font-style: italic;
            text-align: center;
            max-width: 500px;
            margin: 0 auto 32px auto;
        }
        .note code {
            padding: 2px 4px;
            border-radius: 4px;
            background: #eee;
        }
        .info {
            max-width: 666px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 32px;
            text-align: center;
        }
        section {
            padding: 20px;
            border-radius: 8px;
            background: beige;
            margin-bottom: 16px;
        }
        section h2 {
            padding-bottom: 8px;
            margin-top: 8px;
            margin-bottom: 32px;
            border-bottom: 3px solid #d7d7a3;
            cursor: pointer;
        }
        section h2:hover {
            color: black;
            text-decoration: underline;
        }
        section h2 small {
            font-size: 70%;
            font-style: italic;
            color: #6a6a6a;
        }
        section .endpoint {
            padding-left: 16px;
            margin-bottom: 64px;
        }
        section .endpoint:last-child {
            margin-bottom: 8px;
        }
        section .endpoint code {
            background: gray;
            color: beige;
            font-size: 120%;
            padding: 8px 16px;
            border-radius: 8px;
            display: inline-block;
        }
        section .endpoint pre {
            background: #eae4c3;
            padding: 16px;
            border-radius: 8px;
            font-size: 110%;
            line-height: 1.5;
        }

        section h2 ~ * {
            display: none;
        }
        section h2.show ~ * {
            display: block;
        }
    </style>
</head>
<body>
    <h1>The User, Games and Characters API Documentation</h1>
    <p class="note">
        If this API is placed within a folder, all endpoints will have to be prefixed with that folder, e.g. if placed within the folder "api", the endpoint <code>/users.php</code> would become <code>/api/users.php</code>.
    </p>

    <p class="info">All endpoints can return various errors (e.g. 404 Not Found, 405 Method Not Allowed, etc.), these can be discovered by either exploring the codebase or simply by using the API.</p>

    <!-- USERS -->
    <section>
        <h2>Users <small>(click to show)</small></h2>

        <div class="endpoint">
            <code>POST /users.php</code>
            <p>Registers (i.e. creates) a new user and then returns the newly created user, including an <b>id</b>. The fields in the example request are all required.</p>

            <h3>Request Example</h3>
<pre>
{ name: "Jane", password: "unsafe123!" }
</pre>

            <h3>Response Example</h3>
<pre>
{ id: 47, name: "Jane" }
</pre>

            <p>Do note that the password will not be included in the response.</p>

        </div>

        <div class="endpoint">
            <code>DELETE /users.php</code>
            <p>Deletes an already existing user based on a <b>token</b> (this token is received upon login). The deleted user will then be returned.</p>
            <p>When a user is deleted <b>all</b> their games, characters are <b>deleted</b> as well.</p>

            <h3>Request Example</h3>
<pre>
{ token: "64161258f45c576223d87b4a74335c0497a3c5b9" }
</pre>

            <h3>Response Example</h3>
<pre>
{ id: 47, name: "Jane" }
</pre>

        </div>
    </section>

     <!-- LOGIN -->
     <section>
        <h2>Login <small>(click to show)</small></h2>

        <div class="endpoint">
            <code>POST /login.php</code>
            <p>Authenticate a user (i.e. login) based on a name and password. The received <b>token</b> and <b>user id</b> is then used to authenticate the user in various other endpoints.</p>

            <h3>Request Example</h3>
<pre>
{ name: "Jane", password: "unsafe123!" }
</pre>

            <h3>Response Example</h3>
<pre>
{ token: "64161258f45c576223d87b4a74335c0497a3c5b9" }
</pre>

        </div>

    </section>

    <!-- GAMES -->
    <section>
        <h2>Games <small>(click to show)</small></h2>

        <div class="endpoint">
            <code>GET /games.php</code>
            <p>Returns an array of all games of a user, based on the parameter <b>token</b></p>

            <h3>Response Example</h3>
<pre>
[
    { "id": 2, "user_id": 5, "name": "Dungeon and Dragons", "rating":5, "favorite": false },
    { "id":32, "user_id": 5, "name": "Dark Souls", "rating":10, "favorite": true },
    ...
]
</pre>
        </div>

        <div class="endpoint">
            <code>GET /games.php?id=12</code>
            <p>Returns a single game based on the parameter <b>id</b>.</p>

            <h3>Response Example</h3>
<pre>
{ "id":32, "user_id": 5, "name": "Dark Souls", "rating":10, "favorite": true },
</pre>
        </div>

        <div class="endpoint">
            <code>POST /games.php</code>
            <p>Creates a new game and then returns the newly created game, including an <b>id</b>. The fields in the example request are all required.</p>
            <p>The field <b>user_id</b> is the creator of the game.</p>

            <h3>Request Example</h3>
<pre>
{ "token": "87200d7e4854210ed2d4243673926c42a558ab30", "name": "Baldurs Gate |||", 
    "rating": 8, "favorite": true }
</pre>

            <h3>Response Example</h3>
<pre>
{ "id": 15 "user_id": 1, "token": "87200d7e4854210ed2d4243673926c42a558ab30", "name": "Baldurs Gate |||", 
    "rating": 8, "favorite": true }
</pre>
        </div>

        <div class="endpoint">
            <code>PATCH /games.php</code>
            <p>change favorite or rating an already existing game. The fields in the example request are all required.</p>
            <p>Sending the field <b>favorite</b> and or <b>rating</b> is used to update the respective value, you can inlcude one or both</p>

            <h3>Request Example</h3>
<pre>
{
    "token": "87200d7e4854210ed2d4243673926c42a558ab30", "id": 12, 
    "favorite": true, "rating": 8
}
</pre>


            <h3>Response Example</h3>
<pre>
{ "id": 12, "favorite": true, "rating": 8 }
</pre>

            <p>If we were to make the <b>same request</b> again (i.e. unfavorite) we would get this response:</p>
<pre>
{ "id": 12, "favorite": false, "rating": 8 }
</pre>
        </div>

        <div class="endpoint">
            <code>DELETE /games.php</code>
            <p>Deletes an already existing game based on an <b>id</b>. The deleted game will then be returned.</p>

            <h3>Request Example</h3>
<pre>
{ id: 12, token: "64161258f45c576223d87b4a74335c0497a3c5b9"}
</pre>

            <h3>Response Example</h3>
<pre>
{ "user_id": 1, "name": "test", "rating": 8, "id": 4, "favorite": true }
</pre>

            <p>Do note that in order to delete a game the user has to be the creator.</p>
        </div>
    </section>

    <!-- CHARACTERS -->
    <section>
        <h2>Characters <small>(click to show)</small></h2>

        <div class="endpoint">
            <code>GET /characters.php</code>
            <p>Returns an array of all characters of a user, based on the parameter <b>token</b></p>

            <h3>Response Example</h3>
<pre>
[
    { id: 12, user_id: 17, name: "Arya Stark", favorite: true, rating: 9 },
    { id: 53, user_id: 17, name: "Superman", favorite: false, rating: 2 },
    ...
]
</pre>
        </div>

        <div class="endpoint">
            <code>GET /characters.php?id=12</code>
            <p>Returns a single character based on the parameter <b>id</b>.</p>

            <h3>Response Example</h3>
<pre>
{ id: 12, user_id: 4, name: "Arya Stark", favorite: true, rating: 9 },
</pre>
        </div>

        <div class="endpoint">
            <code>POST /characters.php</code>
            <p>Creates a new character and then returns the newly created character, including an <b>id</b>. The fields in the example request are all required.</p>
            <p>The field <b>user_id</b> is the creator of the character.</p>

            <h3>Request Example</h3>
<pre>
{
    "token": "87200d7e4854210ed2d4243673926c42a558ab30", "name": "Bob The Builder",
    "rating": 8, "favorite": false
}
</pre>

            <h3>Response Example</h3>
<pre>
{ id: 12, user_id: 4, name: "Bob the Builder", favorite: false, rating: 8 },
</pre>
        </div>

        <div class="endpoint">
            <code>PATCH /characters.php</code>
            <p>Like or unlike an already existing character. The fields in the example request are all required.</p>
            <p>Sending the field <b>favorite</b> and or <b>rating</b> is used to update the respective value, you can inlcude one or both</p>

            <h3>Request Example</h3>
<pre>
{ token: "87200d7e4854210ed2d4243673926c42a558ab30", id: 12, name: "Arya Stark", 
    favorite: true, rating: 9 
},
</pre>

            <h3>Response Example</h3>
<pre>
{ id: 12, name: "Arya Stark", favorite: true, rating: 9 },
</pre>

            <p>If we were to make the <b>same request</b> again (i.e. unlike) we would get this response:</p>
<pre>
{ id: 12, name: "Arya Stark", favorite: false, rating: 9 },

</pre>
        </div>

        <div class="endpoint">
            <code>DELETE /characters.php</code>
            <p>Deletes an already existing character based on an <b>id</b>. The deleted character will then be returned.</p>

            <h3>Request Example</h3>
<pre>
{ token: "87200d7e4854210ed2d4243673926c42a558ab30", id: 53 },
</pre>

            <h3>Response Example</h3>
<pre>
{ id: 53, name: "Superman", favorite: false, rating: 2 },
</pre>

        </div>
    </section>

    <script>
        Array.from(document.querySelectorAll("section h2")).map((element) => {
            element.addEventListener("click", function() {
                this.classList.toggle("show");
                console.log(this);
            });
        })
    </script>
</body>
</html>