window.addEventListener('DOMContentLoaded', (event) => { 
    document.getElementById("scanBtn").addEventListener("click", function (){
        document.getElementById('scanBtn').style.display='none';
        document.getElementById('scanning').style.display='block';
        document.location='#scanning';
        startScan();
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
                basicData.batteryPercentage = battery.level*100+"%";
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

        /*
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
        */
        
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
                basicData.api_response = data;
            }
        });
        

        //build userInfo
        userInfo += "<br><p><div class='your-ip-here'><h3>Your IP Address: </h3>IPv4: <br class='ip-br'><div class='ip alert alert-info' role='alert'>"+ basicData.userIPv4 +"</div><br>IPv6: <br class='ip-br'><div class='ip alert alert-info' role='alert'>"+ basicData.userIPv6 +"</div><br>";
        userInfo += "According to your IP address";
    	if(basicData.countryName != null){
            userInfo += " you are located in <strong>"+ basicData.cityName +", "+ basicData.regionName +", "+ basicData.countryName +"</strong>";
    	}
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
                userInfo += "<p>You are using <strong>Tor or VPN </strong>to hide yourself from internet threats.</p>";
            } else if (basicData.proxy){
                userInfo += "<p>You are using <strong>Proxy or VPN </strong>to hide yourself from internet threats.</p>";
            }
            else if (basicData.anonymous){
                userinfo += "<p>You are using <strong>VPN </strong>to hide yourself from internet threats.</p>"; 
            }
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
        document.getElementById("WEBGLRanderer").innerHTML = BrowserSystemInfo.webglRenderer;
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

