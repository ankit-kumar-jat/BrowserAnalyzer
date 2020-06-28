(function (window) {
    {
    /* test cases
        alert(
            'browserInfo result: OS: ' + browserInfo.os +' '+ browserInfo.osVersion + '\n'+
                'Browser: ' + browserInfo.browser +' '+ browserInfo.browserVersion + '\n' +
                'Mobile: ' + browserInfo.mobile + '\n' +
                'Cookies: ' + browserInfo.cookies + '\n' +
                'Screen Size: ' + browserInfo.screen
        );
    */
        var unknown = 'Unknown';

        

        //browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }

        //IE 11 no longer identifies itself as MS IE, so trap it
        //http://stackoverflow.com/questions/17907445/how-to-detect-ie11
        else if ((browser == 'Netscape') && (nAgt.indexOf('Trident/') != -1)) {

            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
            if ((verOffset = nAgt.indexOf('rv:')) != -1) {
                version = nAgt.substring(verOffset + 3);
            }

        }

        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }

            // Chrome on iPad identifies itself as Safari. Actual results do not match what Google claims
            //  at: https://developers.google.com/chrome/mobile/docs/user-agent?hl=ja
            //  No mention of chrome in the user agent string. However it does mention CriOS, which presumably
            //  can be keyed on to detect it.
            if (nAgt.indexOf('CriOS') != -1) {
                //Chrome on iPad spoofing Safari...correct it.
                browser = 'Chrome';
                //Don't believe there is a way to grab the accurate version number, so leaving that for now.
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        // system
        var os = unknown;
        var clientStrings = [
            {s:'Windows 3.11', r:/Win16/},
            {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
            {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
            {s:'Windows 98', r:/(Windows 98|Win98)/},
            {s:'Windows CE', r:/Windows CE/},
            {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
            {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
            {s:'Windows Server 2003', r:/Windows NT 5.2/},
            {s:'Windows Vista', r:/Windows NT 6.0/},
            {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
            {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
            {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
            {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s:'Windows ME', r:/Windows ME/},
            {s:'Android', r:/Android/},
            {s:'Open BSD', r:/OpenBSD/},
            {s:'Sun OS', r:/SunOS/},
            {s:'Linux', r:/(Linux|X11)/},
            {s:'iOS', r:/(iPhone|iPad|iPod)/},
            {s:'Mac OS X', r:/Mac OS X/},
            {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s:'QNX', r:/QNX/},
            {s:'UNIX', r:/UNIX/},
            {s:'BeOS', r:/BeOS/},
            {s:'OS/2', r:/OS\/2/},
            {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;

        }
        
        // screen
        var screenSize = '';
        if(mobile){
            screenSize += window.screen.width * window.devicePixelRatio + "x";
            screenSize += window.screen.height * window.devicePixelRatio;
        }else{
            screenSize += window.screen.width + "x";
            screenSize += window.screen.height;
        }
    }

    window.browserInfo = {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        mobile: mobile,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled
    };
}(this));


var BrowserSystemInfo = {
    userOS: window.browserInfo.os,
    resolution: window.browserInfo.screen,
    colorDepth: detect.colorDepth(),
    userLanguage: detect.lang(),
    userLanguageOrder: navigator.languages,
    userDateTime: window.Date(),
    browserVendor: navigator.vendor,
    //device from basicData.device
    logicalProcessors: navigator.hardwareConcurrency,
    webglVendor: '',
    webglRenderer: '',
    userDeviceMemory: navigator.deviceMemory + " GB",
    powerStatus: '',
    touchScreen: '',
    connection: '',
    saveData: '',
    browserCapabilities: '',
    userPlugins: '',
    pluginsInfo: ''
}

var WebGL = new Fingerprint2().getWebglCanvas();
try {
    var extensionDebugRendererInfo = WebGL.getExtension('WEBGL_debug_renderer_info')
    if (extensionDebugRendererInfo) {
      BrowserSystemInfo.webglVendor = WebGL.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL);
      BrowserSystemInfo.webglRenderer = WebGL.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL);
    }
} catch (e) { /* squelch */ }
if (navigator.connection){
    if (navigator.connection.saveData){
        BrowserSystemInfo.saveData = "Enable";
    } else{
        BrowserSystemInfo.saveData = "Disable";
    }
    BrowserSystemInfo.connection += "<table><tr><td>Effective Network Type</td><td>" + navigator.connection.effectiveType  + "</td></tr><tr><td>Round Trip Time</td><td>" + navigator.connection.rtt + " ms</td></tr><tr><td>Effective BandWidth</td><td>" + navigator.connection.downlink + " Mbps</td></tr><tr><td>Save Data</td><td>" + BrowserSystemInfo.saveData + "</td></tr></table>";
}
BrowserSystemInfo.browserCapabilities += "<br><table class='table table-hover'><tbody><tr><td>Iframes</td><td>" + detect.iframCheck() + "</td><td>Activexcontrols</td><td>" + detect.activexCheck() + "</td></tr><tr><td>Javascript</td><td>" + "Enable" + "</td><td>WebRTC Status</td><td>" + detect.webRTCcheck() + "</td></tr><tr><td>Do Not Track</td><td>" + detect.doNotTrack() + "</td><td>Popup Blocker</td><td>" + detect.pupupBlocked() + "</td></tr></tbody></table>";
BrowserSystemInfo.browserCapabilities += "<br><p><strong>Javascript, iframes, ActiveX,</strong> and <strong>Flash</strong> all allow code to be executed in your browser, which can be a security vulnerability. You can certainly do without ActiveX and Flash, which infamously contain numerous bugs and vulnerabilities. Javascript and iframes can also be disabled, but you may find browsing the web without them a hindrance as many popular sites use them these days.</p>";
BrowserSystemInfo.browserCapabilities += "<br><i class='glyphicon glyphicon-info-sign'></i><p>When you opened this page, we attempted to generate a popup to test whether your browser blocked it. Popups are not only annoying; they are often malicious.</p>";
BrowserSystemInfo.browserCapabilities += "<p><strong>Do Not Track</strong> is a setting in most web browsers that opt you out of tracking programs. While it’s good practice to turn this on, not all websites and advertisers abide by it.</p>";
// userPlugins
var otherPlugins = window.PluginDetect.Plugins;
var plugins = {
    java: 'Not Installed',
    flash: 'Not Installed',
    quicktime: 'Not Installed',
    shockwave: 'Not Installed',
    silverlight: 'Not Installed',
    vlc: 'Not Installed',
    windowsmediaplayer: 'Not Installed',
    devalvr: 'Not Installed'
}
for (var plug in plugins){
    if(otherPlugins[plug].installed){
        plugins[plug] = 'Installed';
    }
}

BrowserSystemInfo.userPlugins += "<br><table class='table table-hover table-responsive'><tbody>"
BrowserSystemInfo.userPlugins += "<tr><td>Java</td><td>" + plugins.java + " </td></tr>";
BrowserSystemInfo.userPlugins += "<tr><td>Flash Player</td><td>" + plugins.flash + "</td></tr>";
BrowserSystemInfo.userPlugins += "<tr><td>QuickTime Player</td><td>" + plugins.quicktime + "</td></tr>";
BrowserSystemInfo.userPlugins += "<tr><td>Shockwave Player</td><td>" + plugins.shockwave + "</td></tr>";
BrowserSystemInfo.userPlugins += "<tr><td>Silverlight</td><td>" + plugins.silverlight + "</td></tr>";
BrowserSystemInfo.userPlugins += "<tr><td>VLC Player</td><td>" + plugins.vlc + "</td></tr>";
BrowserSystemInfo.userPlugins += "<tr><td>Windows Media Player</td><td>" + plugins.windowsmediaplayer + "</td></tr>";
BrowserSystemInfo.userPlugins += "<tr><td>DevalVR</td><td>" + plugins.devalvr + "</td></tr>";
BrowserSystemInfo.userPlugins += "</tbody></table>"

if (navigator.plugins.length > 0){
    BrowserSystemInfo.pluginsInfo += "<br><div class='alert alert-danger' role='alert'><p>You are using <strong>";
	for(var i=0; i<navigator.plugins.length; i++){
		BrowserSystemInfo.pluginsInfo += "'"+navigator.plugins[i][0].enabledPlugin.name+"', ";
	}
	BrowserSystemInfo.pluginsInfo = BrowserSystemInfo.pluginsInfo.slice(0,-2).replace(/,(?=[^,]*$)/, ' and')+"</strong>";
    BrowserSystemInfo.pluginsInfo += " in your browser. If any site knows this information, vulnerabilities in these plugins can be exploited by hackers to open a backdoor to your system.</p></div>"
}

var userInfo = "";
var basicData = {
    userIPv4: null,
    userIPv6: null,
    countryName: null,
    regionName: null,
    cityName: null,
    isp: null,
    browser: null,
    device: null,
    batteryPercentage: null,
    os: null,
    resolution: null,
    api_response: null,
    tor: null,
    proxy: null,
    anonymous: null
};

//social media leaks
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

//fingerprint Info
//
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
        }else{
            data_fingerprint += "<tr><td>"+ element.key +": </td><td class=\"value\">" + element.value +'</td></tr>';
        }   
    });
    fingerprintDiv.innerHTML  = data_fingerprint;   
});
new Fingerprint2().get(function(result, components_arr) {
    var components = "";
    var f_print = document.getElementById('user-unique-fingerprint');
    f_print.innerHTML += "<h3>Canvas Fingerprinting</h3>"
    f_print.innerHTML += "<p>Based on below details here is your unique canvas fingerprint :</p><div class='ip alert alert-success' role='alert'>"+result+"</div>";
    f_print.innerHTML += "<p>which means that I will be able to identify you even if you don't have a cookie stored in your system.</p>";
});

//autofill
function checkAutoFill() {
   var q = function(id) {
       return document.getElementById(id);
   }
   q('state').oninput = function() {
       q('after-autofill').style.display = "block";
       setTimeout(function() {
           if (q('email').value.length > 0) {
               $("#autofill-false").hide();
               q('no-autofill').style.display = "none";
               var leaked_email = q('email').value;
               $("#mail-id").prepend("<span style='color:red;'>" + leaked_email + "</span>");
               q('autofill-true').style.display = "block";
               $("#next-step").show();
           } else {
               $("#mail-id").hide();
           }
           if (q('phone').value.length > 0) {
               q('no-autofill').style.display = "none";
               var leaked_ph = q('phone').value;
               $("#phone-res").prepend("<span style='color:red;'>" + leaked_ph + "</span>");
               q('autofill-true').style.display = "block";
           } else {
               $("#phone-res").hide();
           }
           if (q('street').value.length > 0) {
               q('no-autofill').style.display = "none";
               var leaked_street = q('street').value;
               $("#address-res").prepend("<span style='color:red;'>" + leaked_street + "</span>");
               q('autofill-true').style.display = "block";
           } else {
               $("#address-res").hide();
           }
           if (q('postal').value.length > 0) {
               q('no-autofill').style.display = "none";
               var leaked_postal = q('postal').value;
               $("#postal-res").prepend("<span style='color:red;'>" + leaked_postal + "</span>");
               q('autofill-true').style.display = "block";
           } else {
               $("#postal-res").hide();
           }
           if (q('city').value.length > 0) {
               q('no-autofill').style.display = "none";
               var leaked_city = q('city').value;
               $("#city-res").prepend("<span style='color:red;'>" + leaked_city + "</span>");
               q('autofill-true').style.display = "block";
           } else {
               $("#city-res").hide();
           }
           q('email').style.display = "none";
           q('street').style.display = "none";
           q('phone').style.display = "none";
           q('postal').style.display = "none";
           q('city').style.display = "none";
       }, 100);
   }
}
window.onload = checkAutoFill;
