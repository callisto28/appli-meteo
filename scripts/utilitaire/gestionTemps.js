const day_week = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi',  'Dimanche']

/*on vient cherche la date actuelle*/
let ajd = new Date();

let options = {weekday : 'long'};
/*on vient mettre la date actuel (adj) avec l'ajout du jour en français*/
let day = ajd.toLocaleDateString('fr-FR', options);
day = day.charAt(0).toUpperCase() + day.slice(1);
console.log(day, ajd);

/**Pour mettre en place les jours par rapport au moment on va venir
 * prendre le tableau et le découper grace au slice et on lui dit grace a 
 * l'indexof de partir du jour actuel(day) puis apres je concat le nouveau tableau et je refait un 
 * slice pour rajouter les jouts manquants
 */

let tabDay = day_week.slice(day_week.indexOf(day)).concat(day_week.slice(0, day_week.indexOf(day)));
console.log(tabDay);

export default tabDay;