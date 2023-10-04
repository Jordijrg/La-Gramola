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
            <button class="cançons" song_id="${song.id}" song_url="${song.url}">${song.title} - ${song.artist} ${song.cover}</button>
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
        <button class="cançons" song_id="${song.id}" song_url="${song.url}">${song.title} - ${song.artist}</button>
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
    ON = true;
    // console.log("Sonando canción " + idCancion, cançoActual);
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
            setLastPlaylistCookie(playlistActual2.id);
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
    nomSong.innerHTML = `<p>${totesCancons[idCancion].title}</p>`;
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
    // Obtiene la información de la última playlist

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
            button.textContent = totesCancons[song].title + " - " +totesCancons[song].artist;
            //Añadir imagen al boton
            // button.innerHTML = `<img src="${totesCancons[song].cover}" alt="cover" class="portadasong">`;
            
            button.addEventListener("click", function () {
                cançoActual = parseInt(button.getAttribute("song_id"));
                sonarCancion(cançoActual);

                // Remueve la clase 'selected-song' de todos los botones de canciones
                song_list.querySelectorAll("button").forEach(function (btn) {
                    btn.classList.remove("selected-song");
                });

                // Agrega la clase 'selected-song' al botón de canción seleccionado
                button.classList.add("selected-song");
                console.log(button);
                
            });

            song_list.appendChild(button);
        });
    });
});


// // Dentro de tu evento 'click' para los botones de canciones
// song_list.querySelectorAll("button").forEach(function (canço) {
//     canço.addEventListener("click", function () {
//         cançoActual = parseInt(canço.getAttribute("song_id"));
//         sonarCancion(cançoActual);

//         // Remueve la clase 'selected-song' de todos los botones de canciones
//         song_list.querySelectorAll("button").forEach(function (btn) {
//             btn.classList.remove("selected-song");
//         });

//         // Agrega la clase 'selected-song' al botón de canción seleccionado
//         canço.classList.add("selected-song");

//         console.log(canço);
//     });
// });

// ...


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

//Cookies
// document.getElementById("login-form").addEventListener("submit", function(event) {
//     // Evita que el formulario se envíe de forma predeterminada
//     event.preventDefault();

//     // Obtén el valor del campo de nombre
//     const nombre = document.getElementById("nombre").value;

//     // Establece una cookie de sesión con el nombre del formulario
//     document.cookie = `formulario_nombre=${nombre}; path=/;`;

//     // Redirecciona o realiza otras acciones después de guardar la cookie si es necesario
//     // Por ejemplo, puedes redirigir a otra página:
//     // window.location.href = "/nueva-pagina.html";
// });

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



  // Obtén el elemento donde quieres mostrar la última playlist
const lastPlaylistDiv = document.getElementById("lastplaylist");

// Llama a la función para obtener el ID de la última playlist desde la cookie
const lastPlaylistId = getLastPlaylistFromCookie();

// Función para buscar la información de la playlist por su ID
function findPlaylistById(playlistId) {
    // Recorre tus datos de playlists y busca la playlist con el ID correspondiente
    const foundPlaylist = cançons.playlists.find(playlist => playlist.id === playlistId);
    return foundPlaylist;
}


// Obtiene la información de la última playlist
const lastPlaylist = findPlaylistById(lastPlaylistId);

// Verifica si se encontró la última playlist y muestra su información si está disponible
if (lastPlaylist) {
    const ultimaPlay = document.getElementById("ultimaPlay");
    ultimaPlay.textContent = `${lastPlaylist.name} )`;
} else {
    // Si no se encuentra la última playlist, puedes mostrar un mensaje predeterminado o hacer lo que desees
    const ultimaPlay = document.getElementById("ultimaPlay");
    ultimaPlay.textContent = "Ninguna playlist se ha escuchado aún.";
}




//Cookie playlist
function setLastPlaylistCookie(playlistId) {
    const expirationDate = new Date();
    // Define la duración de la cookie (por ejemplo, 30 días)
    expirationDate.setDate(expirationDate.getDate() + 30);
  
    // Crea una cadena con el valor de la cookie
    const cookieValue = `last_playlist=${playlistId}; expires=${expirationDate.toUTCString()}; path=/`;
  
    // Establece la cookie en el navegador
    document.cookie = cookieValue;
  }
  function getLastPlaylistFromCookie() {
    const cookies = document.cookie.split(";");
  
    for (const cookie of cookies) {
      const parts = cookie.split("=");
      const name = parts[0].trim();
      if (name === "last_playlist") {
        // Retorna el valor de la cookie (el ID de la última playlist)
        return parseInt(parts[1]);
      }
    }
  
    // Retorna null si la cookie no se encuentra
    return null;
  }


