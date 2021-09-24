import tabDay from './utilitaire/gestionTemps.js';



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
const icon1 = document.querySelector('.logo-image1');
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
        // console.log(position);
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
            console.log('api1', resultatAPI);


            temps.textContent = resultatAPI.current.weather[0].description;
            temperature.textContent = `${Math.round(resultatAPI.current.temp)}°`;
            localisation.textContent = resultatAPI.timezone;
            wind.textContent = `${Math.round(resultatAPI.current.wind_speed)} km/h`;

            /**On va venir créer une variable afin d'afficher l'heure actuelle puis pas tranche de 3h avec leur température */
            let hourActually = new Date().getHours();

            for (let i = 0; i < hour.length; i++) {

                let hourFor = hourActually + i * 3;
                if (hourFor > 24) {
                    hour[i].textContent = `${hourFor - 24} h`;

                } else if (hourFor === 24) {
                    hour[i].textContent = "00 h";
                } else {
                    hour[i].textContent = `${hourFor} h`;
                }
            }
            //température toute les 3h
            for (let j = 0; j < hourPreview.length; j++) {
                hourPreview[j].textContent = `${Math.round(resultatAPI.hourly[j * 3].temp)}°`

            }

            //Jour avec les 3 premières lettres
            for (let d = 0; d < tabDay.length; d++) {
                dayDiv[d].textContent = tabDay[d].slice(0, 3)
            }

            for (let t = 0; t < 7; t++) {
                tempsDiv[t].textContent = `${Math.round(resultatAPI.daily[t + 1].temp.day)}°`
            }

            // if (hourActually >= 6 && hourActually < 21) {
            if (resultatAPI.current.weather[0].icon.includes('d')) {
                icon.src = `ressources/jour/${resultatAPI.current.weather[0].icon}.svg`

                // document.getElementById('myModal').classList.add( 'jour');
                // document.getElementById('myModal').classList.remove('nuit');
                document.getElementById('contain').classList.add('meteo');
                // }
            }
            else {
                icon.src = `ressources/nuit/${resultatAPI.current.weather[0].icon}.svg`
                // document.getElementById('myModal').classList.add( 'nuit');
                // document.getElementById('myModal').classList.remove('jour');
                document.getElementById('contain').classList.add('meteo');
            }

        })

};








let callCity = function (city) {
    /**On fait appel a l'API seulement pour la ville recherché */
    /*fetch appel sur api par ville*/
    fetch(`https://api.openweathermap.org/data/2.5/weather?&units=metric&lang=fr&q=${city}&appid=${apiKey}`)


        .then((response) => {
            return response.json();
        })
        .then((data2) => {
            console.log(data2, 'data2');

            if (data2.weather[0].icon.includes('d')) {
                console.log("le data", data2.weather[0].icon.includes('d'));
                icon1.src = `ressources/ressource2/jour1/${data2.weather[0].icon}.png`
                console.log('il fait jour');
            }
            else {
                icon1.src = `ressources/ressource2/nuit1/${data2.weather[0].icon}.png`
                console.log('il fait nuit');
            }

            document.querySelector('.ChoiceCity').textContent = `Ville : ${data2.name}`;
            document.querySelector('.tempCities').textContent = `Température : ${Math.round(data2.main.temp)}° - Ressentie : ${Math.round(data2.main.feels_like)}°`;
            document.querySelector('.ciel').textContent = `Tendance : ${data2.weather[0].description}`;
            document.querySelector('.pays').textContent = `Pays : ${data2.sys.country}`;

            let date = new Date()
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            if (h < 10) { h = '0' + h; }
            if (m < 10) { m = '0' + m; }
            if (s < 10) { s = '0' + s; }
            let times = data2.timezone / 3600 - 2;
            let time2 =  (h + times ) < 24 ? `${h + times}:${m}:${s}` : `0${h + times - 24}:${m}:${s}`;
            console.log('time2', time2);

            document.querySelector('.hours').textContent = `Heure locale : ${time2}`;
         
        })


};
// create alert error saisi ville


document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    let ville = document.querySelector('.choiceCity').value || 'Paris';
      
    
    callCity(ville);
});










