import tabDay from './utilitaire/gestionTemps.js';


// console.log(tabDay);
const apiKey = 'af3455bd56d9f8de201809a1599f9dda';

let resultatAPI;


/**je viens cibler les champs(class) qui vont permet d'afficher les données retournées par l 'api */
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const wind = document.querySelector('.wind');
const hour = document.querySelectorAll('.heure-nom-prevision');
const hourPreview = document.querySelectorAll('.heure-prevision-valeur');
const dayDiv = document.querySelectorAll('.jour-prevision-nom');
const tempsDiv = document.querySelectorAll('.jour-prevision-temps');
const icon = document.querySelector('.logo-image');
const chargementContainer = document.querySelector('.overlay-icone-chargement');
const wall = document.querySelector('.img');




/**On va créer uen condition si le navigateur a bien une geolocalisation
 * - puis on creer un event position,
 * - avec le console.log je vais checker les infos que l'api me retourne,
 * - puis je mets en place les variables longitude et latitude,
 * - je mets  en place la méthodes pour appeler l'api CallApi
*/

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude
        CallApi(long, lat);

    }, () => {
        alert('vous venez de refuser la géolocalisation, veuillez activer la géolocalisation')
    })

}

function CallApi(long, lat) {
    /**on utilisele fetch pour faire la demande sur la api
     * puis quand (.then) on recoit les données
     * on fait un return de la reponse en json
    */
    //  console.log(long,lat);
    /*fetch appel sur api par longitude et latitude*/
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${apiKey}`)


        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("les datas", data);
            resultatAPI = data;


            temps.innerText = resultatAPI.current.weather[0].description;
            temperature.innerText = `${Math.round(resultatAPI.current.temp)}°`;
            localisation.innerText = resultatAPI.timezone;
            wind.innerText = `${Math.round(resultatAPI.current.wind_speed)} km/h`;

            /**On va venir créer une variable afin d'afficher l'heure actuelle puis pas tranche de 3h avec leur température */
            let hourActually = new Date().getHours();

            for (let i = 0; i < hour.length; i++) {

                let hourFor = hourActually + i * 3;
                if (hourFor > 24) {
                    hour[i].innerText = `${hourFor - 24} h`;

                } else if (hourFor === 24) {
                    hour[i].innerText = "00 h";
                } else {
                    hour[i].innerText = `${hourFor} h`;
                }
            }
            //température toute les 3h
            for (let j = 0; j < hourPreview.length; j++) {
                hourPreview[j].innerText = `${Math.round(resultatAPI.hourly[j * 3].temp)}°`
            }

            //Jour avec les 3 premières lettres
            for (let d = 0; d < tabDay.length; d++) {
                dayDiv[d].innerText = tabDay[d].slice(0, 3)
            }

            for (let t = 0; t < 7; t++) {
                tempsDiv[t].innerText = `${Math.round(resultatAPI.daily[t + 1].temp.day)}°`
            }

            if (hourActually >= 6 && hourActually < 21 ) {
                icon.src = `ressources/jour/${resultatAPI.current.weather[0].icon}.svg`
                document.getElementById('contain').classList.add( 'jour');
                document.getElementById('contain').classList.remove('nuit');
                // wall.src = 'ressources/wallpaper/soleil.jpg';
            }
            else {
                icon.src = `ressources/nuit/${resultatAPI.current.weather[0].icon}.svg`
                document.getElementById('contain').classList.add( 'nuit');
                document.getElementById('contain').classList.remove('jour');
                // wall.src = 'ressources/wallpaper/nuit.jpg';
            }

            // let indice = resultatAPI.current.temp

            // if (indice >= 15 || indice <= 50) {
            //     console.log("temp", indice);

            //     wall.src = 'ressources/wallpaper/soleil.jpg';
            // } else {
            //     console.log("temp nuit",);
            //     wall.src = 'ressources/wallpaper/nuit.jpg';
            // }

            // chargementContainer.classList.add('disparition');

        })



};

let callCity = function (city) {
    /**On fait appel a l'API seulement pour la ville recherché */
    /*fetch appel sur api par ville*/
    fetch(`https://api.openweathermap.org/data/2.5/weather?&units=metric&lang=fr&q=${city}&appid=${apiKey}`)
        // fetch(`https://api.openweathermap.org/data/2.5/weather?&units=metric&lang=fr&q=lyon&appid=${apiKey}`)

        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("les datas2", data);


            document.querySelector('.ChoiceCity').innerHTML = data.name;
            document.querySelector('.tempCity').innerHTML = data.main.temp + '°';
            document.querySelector('.ciel').innerHTML = data.weather[0].description;

        })

   

};
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    let ville = document.querySelector('.choiceCity').value;
    callCity(ville)
});
 

// (function () {
//     function checkTime(i) {
//         console.log("check1");
//         return (i < 10) ? "0" + i : i;

//     }

//     function startTime() {
//         console.log("check2");
//         let today = new Date(),
//             h = checkTime(today.getHours()),
//             m = checkTime(today.getMinutes()),
//             s = checkTime(today.getSeconds());
//         document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
//         window.onload = function() {
            
//             setInterval("checkTime()", 500);
//             };
//     }
//     startTime();
// })();

// function refresh(){
//     let t = 1000; // rafraîchissement en millisecondes
//     setTimeout('showDate()',t)
// }

// function showDate() {
//     let date = new Date()
//     let h = date.getHours();
//     let m = date.getMinutes();
//     let s = date.getSeconds();
//     if( h < 10 ){ h = '0' + h; }
//     if( m < 10 ){ m = '0' + m; }
//     if( s < 10 ){ s = '0' + s; }
//     let time = h + ':' + m + ':' + s
//     document.getElementById('horloge').innerHTML = time;
//     refresh();
//  }
//  showDate()

