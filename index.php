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
                <div class="img"><img src="Imatges/user.png" class="user" alt=""></div>
            </nav>
            <div class="playlist">
                <?php

                    $songs = file_get_contents("songs.json");
                    $songs = json_decode($songs, true);

                    $playlists = $songs["playlists"];
                
                
                // <p>LES MEVES PLAYLIST</p>
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
                        <img src="Imatges/volum.png" id="volum" class="vol" alt="Imatge" onclick="mostrarImatge()"></img>
                        <input type="range" id="barravolum" max="100" value="0"></progress>
                        <img src="Imatges/replay.png" class="rep"></img>
                        <img src="Imatges/rand.png" class="ale"></img>
                    </div>
                    <div>
                        <img src="Imatges/ant.png" class="ant"></img>
                        <img onclick="pausarCancion() " id="playButton" src="Imatges/play.png" class="pausa"></img>
                        <img onclick="pausarCancion()" id="pauseButton" src="Imatges/pausa.png" class="pausa"></img>
                        <img src="Imatges/next.png" class="next"></img>
                    </div>
                    
                </div>
                <div class="musica">
                    <h6>0:00</h6>
                    <input type="range" id="barraProgreso" max="100" value="0"></progress>
                    
                    <h6>3:00</h6>
                </div>
                
                <div class="imgsong"> <img src="Imatges/anuel.jpg" class="portadasong"></div>
            </div>
        </div>
    </div>
</body>
</html>