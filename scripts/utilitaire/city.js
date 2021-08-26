
// const apiKey = 'af3455bd56d9f8de201809a1599f9dda';

//test avec url 2 
const city1 = document.querySelector('.city')


console.log("je suis dans le script city");

function CallApiCity(city) {
    /**on utilisele fetch pour faire la demande sur la api
     * puis quand (.then) on recoit les données
     * on fait un return de la reponse en json
    */
    //  console.log(long,lat);
   
        /*fetch appel sur api par ville*/
        // fetch(`https://api.openweathermap.org/data/2.5/weather?&units=metric&lang=fr&q=${city}&appid=${apiKey}`)
        fetch(`https://api.openweathermap.org/data/2.5/weather?&units=metric&lang=fr&q=chartres&appid=${apiKey}`)

        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("les datas2", data);
            resultatAPI = data;


        city1.innerText = resultatAPI.name;

    })
    console.log("je suis dans la focntion");
}
export default CallApiBis;