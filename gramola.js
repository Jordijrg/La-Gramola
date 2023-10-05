var audio;
var cançoActual = 0;
var ON = false;
let playlistActual2 = null;

//JP
async function obtenirCancons() {
    const resposta = await fetch('songs.json');
    return resposta.json();
}

var cançons = await obtenirCancons();

const totesCancons = cançons.totesSongs;
var PlaylistActual = cançons.totesSongs;
let reproduintTotes = true;

const cançonss = document.getElementById("cançonss");
var mostr = false;
cançonss.addEventListener("click", function () {
    if (!mostr) {
        mostr = true;
        cançonss.style.backgroundColor = "rgb(40, 40, 40)";
        playlistSeleccionada.style.backgroundColor = "";
    }else{
        mostr = false;
        cançonss.style.backgroundColor = "rgb(0,0,0)";
    };
    reproduintTotes = true;
    PlaylistActual = cançons.totesSongs;
    song_list.innerHTML = "";
    totesCancons.forEach(function (song) {
        song_list.innerHTML += `
            <button class="cançons" song_id="${song.id}" song_url="${song.url}">${song.title} - ${song.artist} <img class"imgbotosong" src="${song.cover}"></button>
        `;
    });
    song_list.querySelectorAll("button").forEach(function (canço) {
        canço.addEventListener("click", function () {
            cançoActual = parseInt(canço.getAttribute("song_id"));
            sonarCancion(cançoActual);
            console.log(cançoActual);
        });
    });
    sonarCancion(0);
});

const song_list = document.getElementById("song-list");
totesCancons.forEach(function (song) {
    song_list.innerHTML += `
        <button class="cançons" song_id="${song.id}" song_url="${song.url}">${song.title} - ${song.artist} <img class"imgbotosong" src="${song.cover}"></button>
    `;
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
    mostrarVolum();

});
 function mostrarVolum() {
    // Obtiene una referencia a la imagen grande
    const Volum = document.getElementById("barravolum");

    // Cambia el estilo de la imagen grande para mostrarla
    if (Volum.style.display === "block") {
        // Si está visible, la oculta
        Volum.style.display = "none";
    } else {
        // Si está oculta, la muestra
        Volum.style.display = "block";
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
    ON = true;
    // console.log("Sonando canción " + idCancion, cançoActual);
    resumeAnimation();
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
            if (playlistActual2) {
                // Incrementa el contador de reproducciones de la playlist actual
                playlistActual2.reproducciones++;

                // Actualiza el archivo JSON o la base de datos solo para la playlist actual
                fetch('songs.json', {
                    method: 'POST', // Puedes usar 'POST' o 'PUT' según tu configuración
                    body: JSON.stringify({ playlists: cançons.playlists }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        // Manejar la respuesta si es necesario
                        console.log('Comptador de reproduccions de la playlist actualitzat amb èxit');
                    })
                    .catch(error => {
                        console.error('Error en actualitzar el comptador de reproduccions de la playlist', error);
                    });
            }
            audio.src = song.url;
            audio.currentTime = 0;
            audio.play();
        }
        
    });

    if (!trobat) {
        console.log("No s'ha trobat la canço");
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
    // console.log(PlaylistActual, idCancion)
    coverImg.innerHTML = `<img src="${totesCancons[idCancion].cover}" alt="cover" class="portadasong">`;
    const nomSong = document.getElementById("nomSong");
    nomSong.innerHTML = `<p>${totesCancons[idCancion].title}<br> ${totesCancons[idCancion].artist}</p>`;
    // console.log(totesCancons[idCancion].cover);
    // coverImg.src = totesCancons[idCancion].cover;
    audio.addEventListener("ended", function () {
        nextSong();
    });
  function sonarCancion(idCancion) {
    // Resto del código ...

    const cancionActual = totesCancons.find(song => song.id === idCancion);

    if (cancionActual) {
        // Obtén todas las listas de reproducción que contienen esta canción
        const playlistsConCancion = cançons.playlists.filter(playlist => playlist.songs.includes(idCancion));
        
        // Incrementa el contador de reproducciones de cada playlist
        playlistsConCancion.forEach(playlist => {
            playlist.reproducciones++;
        });

        // Actualiza todas las playlists en el archivo JSON o en tu base de datos si es necesario
        // Ejemplo de cómo actualizar en el archivo JSON:
        fetch('songs.json', {
            method: 'POST', // Puedes usar 'POST' o 'PUT' según tu configuración
            body: JSON.stringify({ playlists: cançons.playlists }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                // Manejar la respuesta si es necesario
                console.log('Comptador de reproduccions de totes les playlists actualitzat amb èxit');
            })
            .catch(error => {
                console.error('Error en actualitzar els comptadors de reproduccions de les playlists', error);
            });
    }

    // Resto del código ...
}
    mostrarPlaylistMasEscuchada();
    mostrarRankingPlaylists();
    setLastPlaylistCookie(playlistActual2.id);
    mostrarUltimaPlaylist();
    
}

function pausarCancion() {
    if (audio == undefined) return;
   //Si el audio está pausado, lo reproduce
    if (audio.paused) {
        audio.play();
        resumeAnimation();
    } else {
        audio.pause();
        pauseAnimation();
    }
}
var ant =document.getElementById("ant");
ant.addEventListener("click", function () {
    antSong();
});

function antSong() {
    
    if (reproduintTotes) {
        cançoActual = PlaylistActual[PlaylistActual.map(r => r.id).indexOf(((cançoActual - 1) + PlaylistActual.length) % PlaylistActual.length)].id;

        if (cançoActual == undefined) {
            cançoActual = PlaylistActual[PlaylistActual.indexOf(0)].id;

        }
        sonarCancion(PlaylistActual[cançoActual].id);
    } else {

        if (PlaylistActual.indexOf(cançoActual) - 1 < 0) {
            cançoActual = PlaylistActual[PlaylistActual.length - 1];
        } else {
            cançoActual = (PlaylistActual[(PlaylistActual.indexOf(cançoActual) + -1)]);

        }
        sonarCancion(cançoActual);
    }
    console.log(cançoActual);
};

var next = document.getElementById("next");
next.addEventListener("click", function () {
    nextSong();
});
function nextSong() {
    console.log(PlaylistActual);
    if (reproduintTotes) {
        cançoActual = PlaylistActual[PlaylistActual.map(r => r.id).indexOf((cançoActual + 1) % PlaylistActual.length)].id;
        if (cançoActual == undefined) {
            cançoActual = PlaylistActual[PlaylistActual.indexOf(PlaylistActual.length - 1)].id;
        }
        sonarCancion(PlaylistActual[cançoActual].id);
    } else {
        cançoActual = (PlaylistActual[(PlaylistActual.indexOf(cançoActual) + 1) % PlaylistActual.length]);
        sonarCancion(cançoActual);
    }
};

const randomButton = document.getElementById("randomButton");
randomButton.addEventListener("click", function () {
    reproducirCancionAleatoria();
});


function reproducirCancionAleatoria() {
    let ultimaCancion = null;
    let cancionAleatoria = null;
    if (reproduintTotes) {
        ultimaCancion = cançoActual;
        cançoActual = PlaylistActual[Math.floor(Math.random() * PlaylistActual.length)].id;
        while (ultimaCancion == cançoActual) {
            cançoActual = PlaylistActual[Math.floor(Math.random() * PlaylistActual.length)].id;
        }
        sonarCancion(PlaylistActual[cançoActual].id);
    } else {
        ultimaCancion = cançoActual;
        cançoActual = (PlaylistActual[Math.floor(Math.random() * PlaylistActual.length)]);
        while (ultimaCancion == cançoActual) {
            cançoActual = (PlaylistActual[Math.floor(Math.random() * PlaylistActual.length)]);
        }
        sonarCancion(cançoActual);
    }
}

const pararaButton = document.getElementById("pararButton");
pararaButton.addEventListener("click", function () {
    pararCancion();
});
function pararCancion() {
    audio.pause();
    audio.currentTime = 0;
    playButton.style.display = "block";
    pauseButton.style.display = "none";
}




// function resaltarCancion(cancionSeleccionada) {
//     songs.forEach(function (s) {
//         cancionSeleccionada.classList.remove("selected");
//     });
    
//     cancionSeleccionada.classList.add("selected");

// }


//JP
const cançonsHTML = document.querySelectorAll(".Pcançons");
let playlistSeleccionada = null;
cançonsHTML.forEach(function (canço) {
    canço.addEventListener("click", function () {
        mostr = true;
        if (!mostr) {
            mostr = true;
            cançonss.style.backgroundColor = "rgb(40, 40, 40)";
        }else{
            mostr = false;
            cançonss.style.backgroundColor = "rgb(0,0,0)";
        };

        console.log(PlaylistActual);
        reproduintTotes = false;
        let PID = parseInt(canço.getAttribute("playlist-id") - 1);
        const songsJSON = cançons.playlists[PID].songs;
        PlaylistActual = songsJSON;
        playlistActual2 = cançons.playlists[PID];
        //Controla el estilo de la playlist seleccionada
        // Restaura el estilo de la playlist seleccionada anteriormente, si la hay
        if (playlistSeleccionada) {
            playlistSeleccionada.style.backgroundColor = ""; // Restaura el color de fondo por defecto
        }
        canço.style.backgroundColor = "rgb(40, 40, 40)";
        playlistSeleccionada = canço; // Guarda la playlist seleccionada actualmente
        //Fin del control de la playlist seleccionada
        sonarCancion(songsJSON[0]);

        song_list.innerHTML = "";

        songsJSON.forEach(function (song) {
            const button = document.createElement("button");
            button.className = "cançons";
            button.setAttribute("song_cover", totesCancons[song].cover);
            button.setAttribute("song_id", song);
            
            // Crea un párrafo para mostrar el título y el artista
            const paragraph = document.createElement("p");
            paragraph.textContent = `${totesCancons[song].title} - ${totesCancons[song].artist}`;
            
            // Crea una imagen y establece su atributo src con la URL de la portada
            const img = document.createElement("img");
            img.src = totesCancons[song].cover;
            img.alt = "cover";
        
            // Agrega primero el párrafo y luego la imagen al botón
            button.appendChild(paragraph);
            button.appendChild(img);
        
            button.addEventListener("click", function () {
                cançoActual = parseInt(button.getAttribute("song_id"));
                sonarCancion(cançoActual);
            });
        
            song_list.appendChild(button);
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
                    showButtons.style.backgroundColor = "rgb(40, 40, 40)";
                } else {
                    button.style.display = "none";
                    showButtons.style.backgroundColor = "rgb(0,0,0)";
                }
            });
        });
        




// Agrega un evento al formulario para prevenir su envío por defecto
const loginForm = document.getElementById('submit');



const agregarCancionBtn = document.getElementById("agregarCancion");
const formularioAgregar = document.getElementById("formularioAgregar");
const nuevaCancionForm = document.getElementById("nuevaCancionForm");

// Escucha el clic en el botón "AFEGIR CANÇO"
agregarCancionBtn.addEventListener("click", function () {
    // Muestra el formulario de agregar canción
    if (formularioAgregar.style.display === "block") {
        formularioAgregar.style.display = "none";
        agregarCancionBtn.style.backgroundColor = "rgb(0,0,0)";
    } else {
    formularioAgregar.style.display = "block";
    agregarCancionBtn.style.backgroundColor = "rgb(40, 40, 40)";
    };
});

// ...
const ranking = document.getElementById("ranking");


function encontrarPlaylistMasEscuchada() {
    let playlistMasEscuchada = null;
    let maxReproducciones = -1;

    cançons.playlists.forEach(function (playlist) {
        if (playlist.reproducciones > maxReproducciones) {
            maxReproducciones = playlist.reproducciones;
            playlistMasEscuchada = playlist;
        }
    });

    return playlistMasEscuchada;
}

function mostrarPlaylistMasEscuchada() {
    const playlistMasEscuchada = encontrarPlaylistMasEscuchada();

    if (playlistMasEscuchada) {
        console.log(`La playlist més escoltada és: ${playlistMasEscuchada.name} (${playlistMasEscuchada.reproducciones} reproducciones)`);
        // Actualiza la interfaz con la playlist más escuchada
        ranking.innerHTML = `<p>La playlist més escoltada és: ${playlistMasEscuchada.name} (${playlistMasEscuchada.reproducciones} reproducciones)</p>`;
    } else {
        console.log("No s'han trobat playlists escoltades.");
    }
}
function encontrarPlaylistsOrdenadasPorReproducciones() {
    // Copia la lista de playlists para evitar modificar la original
    const playlistsCopiadas = [...cançons.playlists];

    // Ordena las playlists en función de las reproducciones (de mayor a menor)
    playlistsCopiadas.sort((a, b) => b.reproducciones - a.reproducciones);

    return playlistsCopiadas;
}

function mostrarRankingPlaylists() {
    const playlistsOrdenadas = encontrarPlaylistsOrdenadasPorReproducciones();

    if (playlistsOrdenadas.length > 0) {
        console.log("Ranking de playlists por reproducciones:");
        playlistsOrdenadas.forEach(function (playlist, index) {
            console.log(`${index + 1}. ${playlist.name} (${playlist.reproducciones} reproducciones)`);
        });

        // Actualiza la interfaz con el ranking de playlists
        ranking.innerHTML = "Rànquing de playlists per reproduccions:<br>";
        playlistsOrdenadas.forEach(function (playlist, index) {
            ranking.innerHTML += `${index + 1}. ${playlist.name} (${playlist.reproducciones} reproducciones)<br>`;
        });
    } else {
        console.log("No s'han trobat playlists escoltades.");
    }
}

//Mostra informacio tecnica
const showInfoLink = document.getElementById("showInfoLink");
  const infoDiv = document.getElementById("infoDiv");
  const backButton = document.getElementById("backButton");
  const playlistRanking = document.getElementById("playlistRanking");

  // Agrega un evento de clic al enlace "INFORMACIÒ TÈCNICA"
  showInfoLink.addEventListener("click", function (e) {
    e.preventDefault(); // Evita la acción por defecto del enlace
    // Muestra el div de información técnica
    infoDiv.style.display = "block";
    // Llama a la función para cargar y mostrar el ranking de playlists (puedes personalizar esto)
  });

  // Agrega un evento de clic al botón "Atrás"
  backButton.addEventListener("click", function () {
    // Oculta el div de información técnica
    infoDiv.style.display = "none";
  });





  //Cookies
  // Obtén el elemento donde quieres mostrar la última playlist
const lastPlaylistDiv = document.getElementById("lastplaylist");

// Función para establecer una cookie con el ID de la última lista de reproducción y la fecha de escucha
function setLastPlaylistCookie(playlistId) {
    // Obtenemos la fecha actual
    const currentDate = new Date();

    // Configuramos la fecha de expiración de la cookie (30 días a partir de la fecha actual)
    const expirationDate = new Date(currentDate);
    expirationDate.setDate(expirationDate.getDate() + 30);

    // Creamos el valor de la cookie con el ID de la lista de reproducción y la fecha
    const cookieValue = `last_playlist=${playlistId}; expires=${expirationDate.toUTCString()}; path=/`;

    // Establecemos la cookie en el documento
    document.cookie = cookieValue;

    // También almacenamos la fecha actual en otra cookie llamada "last_playlist_date"
    const dateCookieValue = `last_playlist_date=${currentDate.toUTCString()}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = dateCookieValue;
}
// Funció per obtenir l'ID de la darrera llista de reproducció des de la cookie
function getLastPlaylistFromCookie() {
    // Separem totes les cookies en un array
    const cookies = document.cookie.split(";");

    // Recorrem les cookies
    for (const cookie of cookies) {
        // Separem el nom i el valor de la cookie
        const parts = cookie.split("=");
        const name = parts[0].trim();

        // Comprovem si el nom és "last_playlist"
        if (name === "last_playlist") {
            // Retornem el valor de la cookie (l'ID de la darrera llista de reproducció)
            return parseInt(parts[1]);
        }
    }

    // Retornem null si la cookie no es troba
    return null;
}
// Funció per obtenir la data d'escolta de l'última llista de reproducció des de la cookie
function getLastPlaylistDateFromCookie() {
    // Separem totes les cookies en un array
    const cookies = document.cookie.split(";");

    // Recorrem les cookies
    for (const cookie of cookies) {
        // Separem el nom i el valor de la cookie
        const parts = cookie.split("=");
        const name = parts[0].trim();

        // Comprovem si el nom és "last_playlist_date"
        if (name === "last_playlist_date") {
            // Retornem el valor de la cookie (la data d'escolta)
            return new Date(parts[1]);
        }
    }

    // Retornem null si la cookie no es troba
    return null;
}



// Cridem a la funció per obtenir l'ID de la darrera llista de reproducció des de la cookie
const lastPlaylistId = getLastPlaylistFromCookie();

// Funció per buscar la informació de la llista de reproducció pel seu ID
function findPlaylistById(playlistId) {
    // Recorrem les dades de les llistes de reproducció i busquem la llista amb l'ID corresponent
    const foundPlaylist = cançons.playlists.find(playlist => playlist.id === playlistId);
    return foundPlaylist;
}

// Obtenim la informació de l'última llista de reproducció i la seva data d'escolta
function mostrarUltimaPlaylist() {
    // Obtenim l'ID de l'última llista de reproducció des de la cookie
    const lastPlaylistId = getLastPlaylistFromCookie();

    // Obtenim la data d'escolta des de la cookie
    const lastPlaylistDate = getLastPlaylistDateFromCookie();

    // Cerquem la informació de l'última llista de reproducció pel seu ID
    const lastPlaylist = findPlaylistById(lastPlaylistId);

    // Verifiquem si s'ha trobat l'última llista de reproducció i mostrem-ne la informació si està disponible
    if (lastPlaylist) {
        const ultimaPlay = document.getElementById("ultimaPlay");
        ultimaPlay.textContent = `Última llista de reproducció: ${lastPlaylist.name}, Escoltada el: ${lastPlaylistDate.toLocaleDateString()}`;
    } else {
        // Si no es troba l'última llista de reproducció, podeu mostrar un missatge predeterminat o prendre altres mesures
        const ultimaPlay = document.getElementById("ultimaPlay");
        ultimaPlay.textContent = "Cap llista de reproducció s'ha escoltat encara.";
    }
}

//Parar Animació
const musicVisualizer = document.getElementById('music-visualizer');

function pauseAnimation() {
    musicVisualizer.classList.add("paused");
  }
  
  function resumeAnimation() {
    musicVisualizer.classList.remove("paused");
  }

  //Funcions Teclat
  // Agrega un event listener al documento para escuchar el evento "keydown"
document.addEventListener('keydown', function(event) {
    // Verifica si la tecla presionada es la tecla de espacio (código 32)
    if (event.keyCode === 32) {
        // Evita el comportamiento predeterminado de la tecla de espacio (como desplazar la página hacia abajo)
        event.preventDefault();
        
        // Llama a la función para pausar o reanudar la canción
        pausarCancion();
        if(audio.paused){
            playButton.style.display = "block";
            pauseButton.style.display = "none";
        }else{
            playButton.style.display = "none";
            pauseButton.style.display = "block";
        };
    }
        // Verifica si la tecla presionada es la flecha derecha (código 39)
        if (event.keyCode === 39) {
            // Evita el comportamiento predeterminado de la tecla de flecha derecha
            event.preventDefault();
            
            // Llama a la función nextSong para avanzar a la siguiente canción
            nextSong();
        }
        // Verifica si la tecla presionada es la flecha izquierda (código 37)
        else if (event.keyCode === 37) {
            // Evita el comportamiento predeterminado de la tecla de flecha izquierda
            event.preventDefault();
            
            // Llama a la función antSong para retroceder a la canción anterior
            antSong();
        }
});
