<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Granola.css">
    <title>La Gramola</title>
    <script src="gramola.js" type="module"></script>
</head>
<body>
<!-- <div id="overlay" class="overlay">
        <div class="center-form">
            <form id="login-form">
                <h2>Iniciar sesión</h2>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required>
                <label for="apellido">Apellido:</label>
                <input type="text" id="apellido" name="apellido" required>
                <label for="usuario">Nombre de usuario:</label>
                <input type="text" id="usuario" name="usuario" required>
                <label for="contrasena">Contraseña:</label>
                <input type="password" id="contrasena" name="contrasena" required>
                <button type="submit">Enviar</button>
            </form>
        </div>
    </div> -->
    <div class="container">
        <div class="grid-container">
            <nav class="nav">
                <form action="tu_script_de_busqueda.php" method="get">
                    <input type="text" id="busqueda" name="q" placeholder="Ingrese su búsqueda aquí" />
                    <button on type="submit">
                        <img src="Imatges/lupa.png" class="lupa" alt="">
                    </button>
                </form>
                <a>Titol</a>
                <div class="user-container">
                <p id="nombreUsuario">Hola</p>
                    <img src="Imatges/user.png" class="user" alt="">
                </div>
            </nav>
            <div class="playlist">
                <button class="P" id="Bcançons" >CANÇONS</button>
                <button class="P" id="showButtons">LES MEVES PLAYLIST</button>
                <?php

                    $songs = file_get_contents("songs.json");
                    $songs = json_decode($songs, true);

                    $playlists = $songs["playlists"];
                
                
                // 
                // <input class="Pcançons" type="button" value="NOM PLAYLIST">
                // <input class="Pcançons" type="button" value="NOM PLAYLIST">
                // <input class="Pcançons" type="button" value="NOM PLAYLIST">
                // <input class="Pcançons" type="button" value="NOM PLAYLIST">
                // <input class="Pcançons" type="button" value="NOM PLAYLIST">
                // <input class="Pcançons" type="button" value="NOM PLAYLIST">
                // <input class="Pcançons" type="button" value="NOM PLAYLIST">
                // <input class="Pcançons" type="button" value="NOM PLAYLIST">
                // <input class="Pcançons" type="button" value="NOM PLAYLIST">
                // <input class="Pcançons" type="button" value="NOM PLAYLIST">
                // <input class="Pcançons" type="button" value="NOM PLAYLIST">
                // <input class="Pcançons" type="button" value="NOM PLAYLIST">
                // <input class="Pcançons" type="button" value="NOM PLAYLIST">
                // <input class="Pcançons" type="button" value="NOM PLAYLIST">
                // <input class="Pcançons" type="button" value="NOM PLAYLIST">
                // <input class="Pcançons" type="button" value="NOM PLAYLIST">
                // <input class="Pcançons" type="button" value="NOM PLAYLIST">
                // <input class="Pcançons" type="button" value="NOM PLAYLIST">
                ?>
                <?php foreach ($playlists as $playlist): ?>
                <button class="Pcançons" id="Pcançons" playlist-id="<?php echo $playlist['id']; ?>"><?php echo $playlist["name"]; ?></button>
                <?php endforeach; ?>
                <p class="showButtons">CANÇO MES ESCOLTADA </p>
                <p class="showButtons"> PLAYLISTS MES ESCOLTADES</p>
            </div>
            <div class="songs" id="song-list">
                <!-- <input class="cançons" type="button" value="TITOL">
                <input class="cançons" type="button" value="TITOL">
                <input class="cançons" type="button" value="TITOL">
                <input class="cançons" type="button" value="TITOL">
                <input class="cançons" type="button" value="TITOL">
                <input class="cançons" type="button" value="TITOL">
                <input class="cançons" type="button" value="TITOL">
                <input class="cançons" type="button" value="TITOL">
                <input class="cançons" type="button" value="TITOL">
                <input class="cançons" type="button" value="TITOL">
                <input class="cançons" type="button" value="TITOL">
                <input class="cançons" type="button" value="TITOL">
                <input class="cançons" type="button" value="TITOL">
                <input class="cançons" type="button" value="TITOL">
                <input class="cançons" type="button" value="TITOL">
                <input class="cançons" type="button" value="TITOL">
                <input class="cançons" type="button" value="TITOL">
                <input class="cançons" type="button" value="TITOL"> -->
                
            </div>
            <div class="barra">
                <div class="cntr">
                    <div class="cntr2">
                        <img src="Imatges/volum.png" id="volum" class="vol" alt="Imatge" ></img>
                        <input type="range" id="barravolum" max="100" value="20"></progress>
                        <img src="Imatges/replay.png" class="rep"></img>
                        <img src="Imatges/rand.png" class="ale"></img>
                    </div>
                    <div>
                        <img src="Imatges/ant.png" class="ant" id="ant"></img>
                        <img onclick="pausarCancion() " id="playButton" src="Imatges/play.png" class="pausa"></img>
                        <img onclick="pausarCancion()" id="pauseButton" src="Imatges/pausa.png" class="pausa"></img>
                        <img src="Imatges/next.png" class="next" id="next"></img>
                    </div>
                    
                </div>
                <div class="musica">
                    <h6 id="temps">00:00</h6>
                    <input type="range" id="barraProgreso" max="100" value="0"></progress>
                    
                    <h6 id="tempsTotal">00:00</h6>
                </div>
                
                <div id="cover" class="imgsong"> </div>
            </div>
        </div>
    </div>
</body>
</html>