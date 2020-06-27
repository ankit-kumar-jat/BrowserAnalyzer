var isFirstLoggedIn = true;

function displayResult(network, loggedIn) {
    var id = loggedIn ? 'loggedIn' : 'notLoggedIn';
    var favicon = faviconUri(network);
    var url = network.domain + network.redirect;
    var el = '<a target="_blank" href="' + url + '" target="_blank" class=network><img src=' + favicon + '><span>' + network.name + '</span></a>';
    if (loggedIn && isFirstLoggedIn) {
        isFirstLoggedIn = false;
        document.getElementById(id).innerHTML = el;
    } else {
        document.getElementById(id).innerHTML += el;
    }
}
leakSocialMediaAccounts(displayResult);

function faviconUri(network) {
    var favicon = network.domain + '/favicon.ico';
    if (network.name === 'Dropbox') {
        favicon = 'https://www.dropbox.com/static/images/favicon.ico';
    }
    if (network.name === 'Youtube') {
        favicon = 'https://www.youtube.com/favicon.ico';
    }
    if (network.name === 'Gmail') {
        favicon = 'https://mail.google.com/favicon.ico';
    }
    return favicon;
}


var fingerprintDiv = document.getElementById('browser-fingerprint-details');
var data_fingerprint ='' ;
// if ( typeof Fingerprint2 === 'undefined' ) {
//     $( '#user-basic-info .preloader-gif' ).css( 'display', 'none' );
//     return;
// }
new Fingerprint2().get(function(result, components) {
    components.forEach(function(element){
    if(element.key == 'webgl' ||  element.key == 'canvas'){
        // data_fingerprint += "<tr><td><b>"+ element.key+'</td></tr>';
        // data_fingerprint += "<tr><td><b>"+ element.key +": </b> </td> <td class=\"value\">" + element.value +'</td></tr>';
    }
    else
    {
        data_fingerprint += "<tr><td>"+ element.key +": </td><td class=\"value\">" + element.value +'</td></tr>';
    }   
    });
     fingerprintDiv.innerHTML  = data_fingerprint;   
});
new Fingerprint2().get(function(result, components_arr) {
var components = "";
var f_print = document.getElementById('user-unique-fingerprint');
f_print.innerHTML += "<h3>Canvas Fingerprinting</h3>"
f_print.innerHTML += "<p><strong>Based on below details here is your unique canvas fingerprint :</strong></p><div class='alert alert-success' role='alert'>"+result+"</div>";
f_print.innerHTML += "<p>which means that I will be able to identify you even if you don't have a cookie stored in your system.</p>";
});
