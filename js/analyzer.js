function browserCapabilitiesCheck(){
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
	BrowserSystemInfo.browserCapabilities += "<br><table class='table table-hover'><tbody><tr><td>Iframes</td><td>" + detect.iframCheck() + "</td><td>Activexcontrols</td><td>" + detect.activexCheck() + "</td></tr><tr><td>Javascript</td><td>" + "Enable" + "</td><td>WebRTC Status</td><td>" + detect.webRTCcheck() + "</td></tr><tr><td>Do Not Track</td><td>" + detect.doNotTrack() + "</td><td>Popup Blocker</td><td>" + BrowserSystemInfo.popup + "</td></tr></tbody></table>";
	BrowserSystemInfo.browserCapabilities += "<br><p><strong>Javascript, iframes, ActiveX,</strong> and <strong>Flash</strong> all allow code to be executed in your browser, which can be a security vulnerability. You can certainly do without ActiveX and Flash, which infamously contain numerous bugs and vulnerabilities. Javascript and iframes can also be disabled, but you may find browsing the web without them a hindrance as many popular sites use them these days.</p>";
	BrowserSystemInfo.browserCapabilities += "<br><i class='glyphicon glyphicon-info-sign'></i><p>When you opened this page, we attempted to generate a popup to test whether your browser blocked it. Popups are not only annoying; they are often malicious.</p>";
	BrowserSystemInfo.browserCapabilities += "<p><strong>Do Not Track</strong> is a setting in most web browsers that opt you out of tracking programs. While it’s good practice to turn this on, not all websites and advertisers abide by it.</p>";
}
// userPlugins
function userPluginsCheck(){
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
}
//social media leaks
function socialMediaLeaksCheck(){
	var isFirstLoggedIn = true;

	function displayResult(network, loggedIn) {
	    var id = loggedIn ? 'loggedIn' : 'notLoggedIn';
	    var favicon = faviconUri(network);
	    var url = network.domain + network.redirect;
	    var el = '<div class="mt-3 mb-3 ml-3 mr-3 pt-1 pb-1 pl-3 pr-3 border border-primary rounded">  <a target="_blank" href="' + network.domain + '" target="_blank" class=network><p class="mb-0"><img src=' + favicon + ' width="32" height="32" alt="' + network.name + '">   ' + network.name + '</p></a></div>';
	    if (loggedIn && isFirstLoggedIn) {
	        isFirstLoggedIn = false;
	        document.getElementById(id).innerHTML = el;
	    } else if(loggedIn){
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
	        favicon = 'https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png';
	    }
	    if (network.name === 'Gmail') {
	        favicon = 'https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon5.ico';
	    }
	    if (network.name === 'Blogger') {
	        favicon = 'https://www.blogger.com/about/favicon/favicon.ico';
	    }
	    if (network.name === 'Meetup'){
	        favicon = 'https://www.meetup.com/mu_static/en-US/favicon.a6878039.ico';
	    }
	    if (network.name === 'Carbonmade'){
	        favicon = 'carbon-marketing.accelerator.net/wp-content/uploads/2019/04/favico2.png';
	    }
	    if (network.name === 'Battle.net'){
	        favicon = 'https://d9me64que7cqs.cloudfront.net/images/favicon.7732eed1be971ac1d7396ffbe6caf75e.ico';
	    }

	    return favicon;
	}
}
//fingerprint Info
function fingerprintCheck(){
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
}
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
               $("#mail-id").prepend("<span style='color:red;'>" + leaked_email + " </span>");
               q('autofill-true').style.display = "block";
               $("#next-step").show();
           } else {
               $("#mail-id").hide();
           }
           if (q('phone').value.length > 0) {
               q('no-autofill').style.display = "none";
               var leaked_ph = q('phone').value;
               $("#phone-res").prepend("<span style='color:red;'>" + leaked_ph + " </span>");
               q('autofill-true').style.display = "block";
           } else {
               $("#phone-res").hide();
           }
           if (q('street').value.length > 0) {
               q('no-autofill').style.display = "none";
               var leaked_street = q('street').value;
               $("#address-res").prepend("<span style='color:red;'>" + leaked_street + " </span>");
               q('autofill-true').style.display = "block";
           } else {
               $("#address-res").hide();
           }
           if (q('postal').value.length > 0) {
               q('no-autofill').style.display = "none";
               var leaked_postal = q('postal').value;
               $("#postal-res").prepend("<span style='color:red;'>" + leaked_postal + " </span>");
               q('autofill-true').style.display = "block";
           } else {
               $("#postal-res").hide();
           }
           if (q('city').value.length > 0) {
               q('no-autofill').style.display = "none";
               var leaked_city = q('city').value;
               $("#city-res").prepend("<span style='color:red;'>" + leaked_city + " </span>");
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
//Third party cookies and ad blocker test
function securityTest(){ 
	function cookieTest(){
	    document.cookie = "ThirdPartyCookie=yes;";
	    if (document.cookie.indexOf("ThirdPartyCookie=") > -1) {
	       browserSequrity += "<tr><td>Third-Party Cookies</td><td><span class='false'>!</span> Allowed — You can be vulnerable to this attack.</td></tr>";
	    } else {
	       browserSequrity += "<tr><td>Third-Party Cookies</td><td><span class='true'>✔</span> Not Allowed — You are not vulnerable to this attack.</td></tr>";
	    }
	}
    //$("body").append('<iframe src="start.html"style="display:none" />')
    // $(window).on("message onmessage", function (evt) {
    //     if (evt.data == 'MM:3PCunsupported') {
    //         console.log("unsupported");
    //         browserSequrity += "<tr><td>Third-Party Cookies</td><td><span class='false'>!</span> Allowed - You can be vulnerable to this attack.</td></tr>";
    //     } else if (evt.data == 'MM:3PCsupported') {
    //         console.log("supported");
    //         browserSequrity += "<tr><td>Third-Party Cookies</td><td><span class='true'>✔</span> Not Allowed - You are not vulnerable to this attack.</td></tr>";
    //     }
    // });
    //window.addEventListener("message", receiveMessage, false);
    ////adblock Protection here
    // Function called if AdBlock is not detected
    function adblockTest(){

	}
	function showHtml(){
		//console.log("it's Done !");
    	document.getElementById("browserSequrity").innerHTML = window.browserSequrity;
	}
	cookieTest();
	adblockTest();
	showHtml();
    
}
window.addEventListener('DOMContentLoaded', (event) => { 
    document.getElementById("scanBtn").addEventListener("click", function (){
        document.getElementById('scanBtn').style.display='none';
        document.getElementById('scanning').style.display='block';
        document.location='#scanning';
        browserCapabilitiesCheck();
        userPluginsCheck();
        socialMediaLeaksCheck();
        fingerprintCheck();
        startScan();
        securityTest();
    });
    async function startScan(){

        if (navigator.maxTouchPoints > 0){
            BrowserSystemInfo.touchScreen = "True";
        } else{
            BrowserSystemInfo.touchScreen = "False";
        }
        basicData.os = navigator.platform;
        basicData.resolution = window.browserInfo.screen;
        // devicename and batteryPercentage
    	if(window.orientation > -1){
    		basicData.device = "Mobile";
    	}
    	if(basicData.device == null){
    		basicData.device = "Laptop or Desktop";
    	}
    	if(typeof navigator.getBattery === "function"){
    		navigator.getBattery().then(function(battery) {
                basicData.batteryPercentage = (Math.floor(battery.level*100*100)/100)+"%";
                if(battery.charging){
                    BrowserSystemInfo.powerStatus = "Connected Charging";
                } else{
                    BrowserSystemInfo.powerStatus = "Disconnected";
                }
    		});
    	}

        // browserName
    	var ua= navigator.userAgent, tem,
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
    	}
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    	}
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        basicData.browser = M.join(' ');

        // ajax requests
        await jQuery.ajax({
    	    type: "GET",
    	    url: ipv6api,
            datatype: "json",
            success: function(data){
                basicData.userIPv6 = data.ip;
            }
        });

        try {
	        await jQuery.ajax({
	    	    type: "GET",
	            url: iplocationapihttps,
	            datatype: "json",
	            success: function(data){
	                basicData.countryName = data.country_name;
	                basicData.regionName = data.region;
	                basicData.cityName = data.city;
	                basicData.isp = data.asn.name;
	                basicData.userIPv4 = data.ip;
	                basicData.tor = data.threat.is_tor;
	                basicData.proxy = data.threat.is_proxy;
	                basicData.anonymous = data.threat.is_anonymous;
	                basicData.threat = data.threat;
	                basicData.api_response = data;
	            }
	        });
	    }catch{
            try{
	            await jQuery.ajax({
	    	        type: "GET",
	                url: "https://api.ipdata.co?api-key=de8fe20471e70f59c26717e16923744ece733cfeeb9e3e0969ee9e3c",
	                datatype: "json",
	                success: function(data){
	                    basicData.countryName = data.country_name;
    	                basicData.regionName = data.region;
	                    basicData.cityName = data.city;
	                    basicData.isp = data.asn.name;
	                    basicData.userIPv4 = data.ip;
	                    basicData.tor = data.threat.is_tor;
	                    basicData.proxy = data.threat.is_proxy;
                        basicData.anonymous = data.threat.is_anonymous;
	                    basicData.threat = data.threat;
	                    basicData.api_response = data;
	                }
	            });
            }catch{
	            await jQuery.ajax({
	    	        type: "GET",
    	            url: iplocationapi,
	                datatype: "json",
	                success: function(data){
	                    basicData.countryName = data.country;
	                    basicData.regionName = data.regionName;
	                    basicData.cityName = data.city;
    	                basicData.isp = data.isp;
	                    basicData.userIPv4 = data.query;
	                    basicData.api_response = data;
	                }
    	        }); 
	        }
        }
        //build userInfo
        userInfo += "<br><p><div class='your-ip-here'><h3>Your IP Address: </h3>IPv4: <br class='ip-br'><div class='ip alert alert-info' role='alert'>"+ basicData.userIPv4 +"</div><br>IPv6: <br class='ip-br'><div class='ip alert alert-info' role='alert'>"+ basicData.userIPv6 +"</div><br>";
        userInfo += "According to your IP address you are located in <strong>"; 
        if(basicData.cityName != null){
            userInfo += basicData.cityName +", ";
        }
        if(basicData.regionName != null){
            userInfo += basicData.regionName +", ";
        }
    	if(basicData.countryName != null){
            userInfo += basicData.countryName;
    	}
        userInfo += "</strong>";
    	if(basicData.isp != null){
            userInfo += " and use internet provided by <strong> "+ basicData.isp +".</strong>";
    	}
        userInfo += " You are using a "+ basicData.device +" running <strong> "+ basicData.os +" OS.</strong> Your browser is <strong>"+ basicData.browser +"</strong> and resolution is set to <strong>"+ basicData.resolution +".</strong>";
        if(basicData.batteryPercentage != null){
            userInfo += " Your "+ basicData.device +" has <strong>"+ basicData.batteryPercentage +"</strong> battery remaining.</div></p>";
        }
        else {
            userInfo += "</div></p>";
        }
        if(basicData.tor || basicData.proxy || basicData.anonymous){
            if (basicData.tor){
                userInfo += "<p>You are using <strong>Tor </strong>to hide yourself from internet threats.</p>";
            } else if (basicData.proxy){
                userInfo += "<p>You are using <strong>Proxy or VPN </strong>to hide yourself from internet threats.</p>";
            }
            else if (basicData.anonymous){
                userInfo += "<p>You are using <strong>VPN </strong>to hide yourself from internet threats.</p>"; 
            }
        }
        if(basicData.threat.is_known_attacker || basicData.threat.is_known_abuser || basicData.threat.is_threat || basicData.threat.is_bogon){
            userInfo += "<div class='alert alert-danger' role='alert'><p>You are using not trustable VPN, Tor or other source. Our system found that Your request source is harmfull or used for harmfull activities.</p></div>";
        }
        document.getElementById("userinfo").innerHTML = userInfo;
        document.getElementById("scanning").style.display = 'none';
        if (window.matchMedia("(max-width: 991.98px)").matches) {
			document.getElementById("myTab").style.display = 'block';
			document.getElementById("myTab").classList.add('text-center');
		} else {
			document.getElementById("myTab").style.display = 'flex';
		}
        document.getElementById("basic-scan").style.display = 'block';
        document.location='#scanInfoShow';
        await browserSystemScan();
        await browserCapabilities();

    }

    function browserSystemScan(){
        document.getElementById("OS").innerHTML = BrowserSystemInfo.userOS;
        document.getElementById("resolution").innerHTML = BrowserSystemInfo.resolution;
        document.getElementById("colorDepth").innerHTML = BrowserSystemInfo.colorDepth;
        document.getElementById("language").innerHTML = BrowserSystemInfo.userLanguage;
        document.getElementById("languageOrder").innerHTML = BrowserSystemInfo.userLanguageOrder;
        document.getElementById("dateTime").innerHTML = BrowserSystemInfo.userDateTime;
        if (navigator.cookieEnabled){
            document.getElementById("cookie").innerHTML = "Enable";
        } else{
            document.getElementById("cookie").innerHTML = "Disable";
        }
        document.getElementById("browserVendor").innerHTML = BrowserSystemInfo.browserVendor;
        document.getElementById("device").innerHTML = basicData.device;
        document.getElementById("hardwareConcurrency").innerHTML = BrowserSystemInfo.logicalProcessors;
        document.getElementById("WEBGLVendor").innerHTML = BrowserSystemInfo.webglVendor;
        document.getElementById("WEBGLRenderer").innerHTML = BrowserSystemInfo.webglRenderer;
        if (BrowserSystemInfo.userDeviceMemory == 'undefined GB'){
            document.getElementById("deviceMemory").innerHTML = '';
        } else{
            document.getElementById("deviceMemory").innerHTML = BrowserSystemInfo.userDeviceMemory;
        }
        document.getElementById("powerStatus").innerHTML = BrowserSystemInfo.powerStatus;
        document.getElementById("touchScreen").innerHTML = BrowserSystemInfo.touchScreen;
        document.getElementById("connection").innerHTML = BrowserSystemInfo.connection;
    };

    function browserCapabilities(){
        document.getElementById("browserCapabilities").innerHTML = BrowserSystemInfo.browserCapabilities;
        document.getElementById("otherPlugins").innerHTML = BrowserSystemInfo.userPlugins;
        document.getElementById("Plugins").innerHTML = BrowserSystemInfo.pluginsInfo;
    }

});


