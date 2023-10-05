<?php session_start();?>
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
    <?php 
        if (isset($_POST["nombre"]))  {
            $nom = $_POST['nombre'];
            $_SESSION["usuari"] = $nom;
            $_SESSION["logged_in"] = true; // Agregar esta línea para indicar que el usuario ha iniciado sesión
        }        
    ?>
<div id="overlay" class="overlay" style="display: <?php
    if (isset($_SESSION["logged_in"]) && $_SESSION["logged_in"] === true) {
        echo "none";
    } else {
        echo "block";
    }?>">
        <div class="center-form">
            <form id="login-form" action="/" method="POST">
                <h2>Sessió</h2>
                <label for="nombre">Nom:</label>
                <input type="text" id="nombre" name="nombre" required>
                <label for="apellido">Cognom:</label>
                <input type="text" id="apellido" name="apellido" required>
                <button id="submit" class="submit" type="submit">Enviar</button>
            </form>
        </div>
    </div>
    <div class="container">
        <div class="grid-container">
            <nav class="nav">
                <div class="nav1">
                <form action="#" class="cerca" method="get" id="searchForm">
                    <input type="text" id="busqueda" name="q" placeholder="Introduïu la vostra cerca aquí"/>
                    <button on type="submit" >
                        <img src="Imatges/lupa.png" class="lupa" alt="">
                    </button>
                </form>
                </div>
                <div class="nav2">
                <a id="showInfoLink">INFORMACIÒ TÈCNICA</a>
                <div id="infoDiv" class="infoDiv">
                    <div class="infoContent">
                        <h2>Ranking de Playlists</h2>
                        <div id="playlistRanking"><p class="showRanking" id="ranking"> </p></div>
                        <h2>Última Playlist Escoltada</h2>
                        <div id="lastplaylist"><p class="showRanking" id="ultimaPlay"> </p></div>
                        <button id="backButton">Enrere</button>
                    </div>
                </div>
                </div>
                <div class="user-container nav2">
                    <?php
                        if (isset($_POST["nombre"]))  {
                            $nom = $_POST['nombre'];
                            $_SESSION["usuari"] = $nom;
                        }   
                        if (isset($_SESSION["usuari"])) {
                            echo "<p id='nombreUsuario'>Nom d'usuari: " . $_SESSION["usuari"] . "</p>";
                        }
                    ?>
                    <img src="Imatges/user.png" class="user" alt="">
                </div>
            </nav>
            <div class="playlist">
            <button class="P " id="cançonss"><p>CANÇONS</p></button>
            <button class="P AA" id="agregarCancion"><p>AFEGIR CANÇO</p> <img id="imgbaixplist" src="Imatges/fbaix.png"></button>
            <div id="formularioAgregar" style="display: none;">
        <h2>Afegir Nova Cançó</h2>

        <form id="nuevaCancionForm" method="post" action="">
            <label for="titulo">Títol:</label>
            <input type="text" id="titulo" name="titulo" required><br><br>

            <label for="artista">Artista:</label>
            <input type="text" id="artista" name="artista" required><br><br>

            <label for="url">URL de la canço:</label>
            <input type="text" id="url" default="" name="url" required><br><br>

            <label for="portada">URL de la portada:</label>
            <input type="text" id="portada" name="portada" required><br><br>

            <input type="submit" value="Afegir Cançó">
        </form>
        <?php
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                // Verificar si se han recibido todos los parámetros necesarios
                if (isset($_POST["titulo"]) && isset($_POST["artista"]) && isset($_POST["url"]) && isset($_POST["portada"])) {
                    // Obtener los datos del formulario
                    $titulo = $_POST["titulo"];
                    $artista = $_POST["artista"];
                    $url = $_POST["url"];
                    $portada = $_POST["portada"];

                    // Leer el archivo JSON existente
                    $songs = file_get_contents("songs.json");
                    $songs = json_decode($songs, true);

                    // Crear un nuevo objeto de canción
                    $newSong = [
                        "id" => count($songs["totesSongs"]),
                        "title" => $titulo,
                        "artist" => $artista,
                        "url" => $url,
                        "cover" => $portada
                    ];

                    // Agregar la nueva canción al array "totesSongs"
                    $songs["totesSongs"][] = $newSong;

                    // Actualizar el archivo JSON con la nueva canción
                    file_put_contents("songs.json", json_encode($songs));

                    // Mostrar un mensaje de éxito o redirigir a la página principal
                    echo "Nova cançó afegida correctament.";
                    // Puedes redirigir a la página principal después de unos segundos si lo deseas
                } else {
                    // Si falta algún parámetro, mostrar un mensaje de error
                    echo "Falten paràmetres per afegir la cançó.";
                }
            }
        ?>


    </div>
                <button class="P AA" id="showButtons"><p>LES MEVES PLAYLIST</p> <img id="imgbaixplist" src="Imatges/fbaix.png"></button>
                <?php

                    $songs = file_get_contents("songs.json");
                    $songs = json_decode($songs, true);

                    $playlists = $songs["playlists"];
                
                ?>
                <?php foreach ($playlists as $playlist): ?>
                <button class="Pcançons" id="Pcançons" playlist-id="<?php echo $playlist['id']; ?>"><?php echo $playlist["name"]; ?></button>
                <?php endforeach; ?>
            </div>
            <div class="songs" id="song-list">
                <!-- Canciones de cada playlist     -->
            </div>
            <div class="barra">
                <div class="cntr">
                    <div >
                        <img src="Imatges/volum.png" id="volum" class="vol bhover" alt="Imatge" ></img>
                        <input type="range" id="barravolum" max="100" value="20"></progress>
                        <img src="Imatges/ant.png" class="ant bhover" id="ant"></img>
                        <img src="Imatges/pararr.png" id="pararButton" class="rep bhover"></img>
                        <img id="playButton" src="Imatges/play.png" class="pausa bhover"></img>
                        <img id="pauseButton" src="Imatges/pausa.png" class="pausa bhover"></img>
                        <img src="Imatges/next.png" class="next bhover" id="next"></img>
                        <img src="Imatges/rand.png" id="randomButton" class="ale bhover"></img>
                    </div>  
                </div>
                <div class="musica">
                    <h6 id="temps">00:00</h6>
                    <input type="range" id="barraProgreso" max="100" value="0"></progress>
                    <h6 id="tempsTotal">00:00</h6>
                </div>
                <div class="music-visualizer paused" id="music-visualizer">
                    <div class="bar bar-1"></div>
                    <div class="bar bar-2"></div>
                    <div class="bar bar-3"></div>
                    <div class="bar bar-4"></div>
                    <div class="bar bar-5"></div>
                </div>
                
                <div id="cover" class="imgsong"><img src="/Imatges/cuadrado.png" alt="cover" class="portadasong"> </div>
                <div id="nomSong" class="nomSong"><p>----</p></div>
            </div>
        </div>
    </div>
</body>
</html>