function refresh(){
    let t = 1000; // rafraîchissement en millisecondes
    setTimeout('showDate()',t)
}

function showDate() {
    let date = new Date()
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    if( h < 10 ){ h = '0' + h; }
    if( m < 10 ){ m = '0' + m; }
    if( s < 10 ){ s = '0' + s; }
    let time = h + ':' + m + ':' + s
    document.getElementById('time').innerHTML = time;
    refresh();
 }
 showDate()