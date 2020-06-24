window.addEventListener('DOMContentLoaded', (event) => { 
    document.getElementById("scanBtn").addEventListener("click", function (){
        document.getElementById('scanBtn').style.display='none';
        document.getElementById('scanning').style.display='block';
        document.location='#scanning';
        startScan();
    });



    async function startScan(){

        basicData.os = navigator.platform;
        basicData.resolution = window.screen.width + "x" + window.screen.height;
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

        //build userInfo
        userInfo += "<br><p><div class='your-ip-here'><h3>Your IP Address: </h3>IPv4: <div class='ip alert alert-primary' role='alert'>"+ basicData.userIPv4 +"</div>IPv6: <div class='ip alert alert-primary' role='alert'>"+ basicData.userIPv6 +"</div>";
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
    }
});
