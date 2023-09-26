var audio;
var cançoActual = 0;
//JP
async function obtenirCancons() {
    const resposta = await fetch('songs.json');
    return resposta.json();
}

var cançons = await obtenirCancons();


const totesCancons = cançons.totesSongs;
var PlaylistActual = cançons.totesSongs;
let reproduintTotes = true;


const song_list = document.getElementById("song-list");      
totesCancons.forEach(function (song) {
    song_list.innerHTML += `
        <button class="cançons" song_id="${song.id}" song_url="${song.url}">${song.title}</button>
    `;
});

const Bcançons = document.getElementById("Bcançons");
Bcançons.addEventListener("click", function () {
    const song_list = document.getElementById("song-list");    
    song_list.innerHTML = ``;  
    totesCancons.forEach(function (song) {
    
        song_list.innerHTML += `
            <button class="cançons" song_id="${song.id}" song_url="${song.url}">${song.title}</button>
        `;
});
});


song_list.querySelectorAll("button").forEach(function (canço) {
    canço.addEventListener("click", function () {
            cançoActual = parseInt(canço.getAttribute("song_id"));
            sonarCancion(cançoActual);
            console.log(cançoActual);
    });
});
const volum = document.getElementById("volum");
volum.addEventListener("click", function () {
    mostrarImatge();

});
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
    // Reproducir la canción o reanudarla si está en pausa
    pausarCancion();
});

pauseButton.addEventListener("click", function () {
    console.log("Reproduciendo...");

    // Oculta el botón de pausa
    pauseButton.style.display = "none";

    // Muestra el botón de reproducción
    playButton.style.display = "block"; // O "block" dependiendo del estilo deseado
    pausarCancion();
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

const barravolum = document.getElementById("barravolum");
barravolum.addEventListener("input", () => {
    const nuevoVolumen = barravolum.value / 100; // El valor del rango debe estar en el rango [0, 1]
    audio.volume = nuevoVolumen;
});


// Función para reproducir la canción desde una posición específica
function reproducirDesdePosicion(posicion) {
    if (audio.paused || audio.ended) {
        // Si la canción está en pausa o ha terminado, establece la posición y reproduce
        audio.currentTime = posicion;
        audio.play();
    } else {
        // Si la canción está en reproducción, simplemente establece la posición
        audio.currentTime = posicion;
    }
}

// Agrega un evento de clic a la barra de progreso
barraProgreso.addEventListener("input", () => {
    const nuevaPosicion = barraProgreso.value;
    reproducirDesdePosicion((nuevaPosicion / 100) * audio.duration); // Convierte el valor a segundos
});

var temps = document.getElementById("temps");
var tempsTotal = document.getElementById("tempsTotal");
function formatTime(seconds) {
    const minutos = Math.floor(seconds / 60);
    const segundos = Math.floor(seconds % 60);
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

function sonarCancion(idCancion) {
    console.log("Sonando canción " + idCancion, cançoActual);
    if (audio === undefined) {
        audio = new Audio();
        audio.addEventListener("timeupdate", () => {
            const porcentaje = (audio.currentTime / audio.duration) * 100;
            barraProgreso.value = porcentaje;
            // Mostrar el tiempo de la canción en formato MM:SS
            temps.innerHTML = formatTime(audio.currentTime);
            tempsTotal.innerHTML = formatTime(audio.duration);
        });
    }
    let trobat = false;
    totesCancons.forEach(function (song) {
        if (song.id == idCancion) {
            if (trobat) return;
            trobat = true;
            audio.src = song.url;
            audio.currentTime = 0;
            audio.play();
        }
    });

    if (!trobat) {
        console.log("No se ha encontrado la canción");
    }
    if (audio.paused) {
        // Si la canción está en pausa, muestra el botón de reproducción
        playButton.style.display = "block";
        // Oculta el botón de pausa
        pauseButton.style.display = "none";
    }else{
        // Si la canción está en reproducción, muestra el botón de pausa
        playButton.style.display = "none";
        // Oculta el botón de reproducción
        pauseButton.style.display = "block";
    }
    const coverImg = document.getElementById("cover");
    coverImg.innerHTML = `<img src="${totesCancons[idCancion].cover}" alt="cover" class="portadasong">`;
    // console.log(totesCancons[idCancion].cover);
    // coverImg.src = totesCancons[idCancion].cover;

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
var ant =document.getElementById("ant");
ant.addEventListener("click", function () {


    if (reproduintTotes) {
        cançoActual = PlaylistActual[PlaylistActual.map(r => r.id).indexOf(((cançoActual - 1) + PlaylistActual.length) % PlaylistActual.length)].id;

        if (cançoActual == undefined) {
            cançoActual = PlaylistActual[PlaylistActual.indexOf(0)].id;

        }
        sonarCancion(PlaylistActual[cançoActual].id);
    } else {
    cançoActual = PlaylistActual[PlaylistActual.indexOf(cançoActual) - 1];

        if (cançoActual == undefined) {
            cançoActual = PlaylistActual[PlaylistActual.indexOf(0)];

        }
        sonarCancion(cançoActual);
    }
});

var next = document.getElementById("next");
next.addEventListener("click", function () {

    if (reproduintTotes) {
        cançoActual = PlaylistActual[PlaylistActual.map(r => r.id).indexOf((cançoActual + 1) % PlaylistActual.length)].id;
        if (cançoActual == undefined) {
            cançoActual = PlaylistActual[PlaylistActual.indexOf(PlaylistActual.length - 1)].id;
        }
        sonarCancion(PlaylistActual[cançoActual].id);
    } else {
        cançoActual = PlaylistActual[PlaylistActual.indexOf(cançoActual) + 1];
        if (cançoActual == undefined) {
            cançoActual = PlaylistActual[PlaylistActual.indexOf(PlaylistActual.length - 1)];
        }
        sonarCancion(cançoActual);
    }
    console.log(cançoActual);
});

function resaltarCancion(cancionSeleccionada) {
    songs.forEach(function (s) {
        cancionSeleccionada.classList.remove("selected");
    });
    
    cancionSeleccionada.classList.add("selected");

}



//JP
const cançonsHTML = document.querySelectorAll(".Pcançons");
cançonsHTML.forEach(function (canço) {
    canço.addEventListener("click", function () {
        reproduintTotes = false;
        let PID = parseInt(canço.getAttribute("playlist-id") - 1);
        const song_list = document.getElementById("song-list");
        song_list.innerHTML = "";
        let songsJSON = cançons.playlists[PID].songs;
        PlaylistActual = songsJSON;
        console.log(PlaylistActual);
        songsJSON.forEach(function (song) {
            song_list.innerHTML += `
                <button class="cançons" song_cover="${totesCancons[song].cover}" song_id="${song}">${totesCancons[song].title}</button>
            `;
            console.log(totesCancons[song].cover);
        });
        song_list.querySelectorAll("button").forEach(function (canço) {
            canço.addEventListener("click", function () {
                    cançoActual = parseInt(canço.getAttribute("song_id"));
                    sonarCancion(cançoActual);
                    resaltarCancion(canço); // Resalta la canción seleccionada
                    console.log(canço);
            });
        });
    });
});

//Desplegable playlists
const showButtons = document.getElementById("showButtons");
        const buttons = document.querySelectorAll(".Pcançons");

        // Inicialmente, ocultar los botones
        buttons.forEach(function (button) {
            button.style.display = "none";
        });
        // Agregar un controlador de eventos al elemento <p>
        showButtons.addEventListener("click", function () {
            // Toggle (alternar) la visibilidad de los botones al hacer clic en el elemento <p>
            buttons.forEach(function (button) {
                if (button.style.display === "none") {
                    button.style.display = "block";
                    showButtons.style.backgroundColor = "rgb(255, 255, 255)";
                    showButtons.style.color = "rgb(0, 0, 0)";
                } else {
                    button.style.display = "none";
                    showButtons.style.backgroundColor = "rgb(0, 0, 0)";
                    showButtons.style.color = "rgb(255, 255, 255)";
                }
            });
        });

// const overlay = document.getElementById('overlay');
// overlay.style.display = 'block'; // Mostrar el overlay al cargar
    
//         // Agrega un evento al formulario para prevenir su envío por defecto
// const loginForm = document.getElementById('login-form');
// loginForm.addEventListener('submit', function (e) {
//     e.preventDefault(); // Prevenir el envío del formulario
//      overlay.style.display = 'none'; // Ocultar el overlay
// });
// const form = document.querySelector('form');
// const nombreUsuarioP = document.getElementById('nombreUsuario');
// // Agrega un evento de escucha para el envío del formulario
// form.addEventListener('submit', function (e) {
//     e.preventDefault(); // Evita que se envíe el formulario por defecto

//     // Captura el valor del campo de entrada del formulario
//     const nombreUsuario = document.getElementById('usuario').value;

//     // Actualiza el contenido del elemento <p> con el nombre de usuario
//     nombreUsuarioP.textContent = `Hola, ${nombreUsuario}`;
// });

// Obtén la lista de canciones y agrégales un evento de clic
// Obtén la lista de canciones y agrégales un evento de clic
const songList = document.getElementById("song-list");
const songs = songList.querySelectorAll(".cançons");

songs.forEach(function (song) {
    song.addEventListener("click", function () {
        // Elimina la clase "selected" de todas las canciones
        songs.forEach(function (s) {
            s.classList.remove("selected");
        });

        // Agrega la clase "selected" solo a la canción actual
        this.classList.add("selected");

        // Aquí puedes iniciar la reproducción de la canción seleccionada
        const songId = this.getAttribute("song_id");
        const songUrl = this.getAttribute("song_url");

        // También puedes realizar cualquier otra acción que desees cuando se selecciona una canción
    });
});


