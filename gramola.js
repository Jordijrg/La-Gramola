async function obtenirCancons() {
    const resposta = await fetch('songs.json');
    return resposta.json();
}

var cançons = await obtenirCancons();


const totesCancons = cançons.totesSongs;
const song_list = document.getElementById("song-list");      
totesCancons.forEach(function (song) {
    console.log(song);
    song_list.innerHTML += `
        <button class="cançons" song_url="${song.url}">${song.title}</button>
    `;
});

song_list.querySelectorAll("button").forEach(function (canço) {
    canço.addEventListener("click", function () {
            let song_url = canço.getAttribute("song_url");
            sonarCancion(song_url);
    });
});

//  // JavaScript para controlar la barra de progreso
//  const cancion = document.getElementById("miCancion");
//  const barraProgreso = document.getElementById("barraProgreso");

//  cancion.addEventListener("timeupdate", () => {
//      const porcentaje = (cancion.currentTime / cancion.duration) * 100;
//      barraProgreso.value = porcentaje;
//  });
 function mostrarImatge() {
    // Obtiene una referencia a la imagen grande
    const Imatge = document.getElementById("barravolum");

    // Cambia el estilo de la imagen grande para mostrarla
    if (Imatge.style.display === "block") {
        // Si está visible, la oculta
        Imatge.style.display = "none";
    } else {
        // Si está oculta, la muestra
        Imatge.style.display = "block";
    }
}
// Obtiene referencias a los botones
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");

// Agrega eventos de clic a los botones
playButton.addEventListener("click", function () {
    console.log("Reproduciendo...");
    // Oculta el botón de reproducción
    playButton.style.display = "none";

    // Muestra el botón de pausa
    pauseButton.style.display = "block"; // O "block" dependiendo del estilo deseado
});

pauseButton.addEventListener("click", function () {
    console.log("Reproduciendo...");

    // Oculta el botón de pausa
    pauseButton.style.display = "none";

    // Muestra el botón de reproducción
    playButton.style.display = "block"; // O "block" dependiendo del estilo deseado
});


// function mostrarCanciones(canciones) {
//     const songList = document.getElementById('song-list');
//     songList.innerHTML = '';

//     canciones.forEach(song => {
//         const button = document.createElement('button');
//         button.textContent = song.title;
//         songList.appendChild(button);
//     });
// }

var audio;

function sonarCancion(cancion) {
    console.log(cancion);
    if (audio === undefined) {
        audio = new Audio();
    }
    audio.src = cancion;
    audio.currentTime = 0;
    audio.play();
}

function pausarCancion() {
    if (audio == undefined) return;
   //Si el audio está pausado, lo reproduce
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
// function nextSong(){
//     sonarCancion(cancion);
//     audio.currentTime = 0;
//     audio.play();
// }

const cançonsHTML = document.querySelectorAll(".Pcançons");

cançonsHTML.forEach(function (canço) {
    canço.addEventListener("click", function () {

        let PID = parseInt(canço.getAttribute("playlist-id") - 1);



        const song_list = document.getElementById("song-list");
        song_list.innerHTML = "";


        let songsJSON = cançons.playlists[PID].songs;


        songsJSON.forEach(function (song) {
            console.log(song);
            song_list.innerHTML += `
                <button class="cançons" song_url="${song.url}">${song.title}</button>
            `;
        });

        song_list.querySelectorAll("button").forEach(function (canço) {
            canço.addEventListener("click", function () {
                    let song_url = canço.getAttribute("song_url");
                    sonarCancion(song_url);
            });
        });

    });
});







window.mostrarCançons = function(id) {
    console.log(id);
}