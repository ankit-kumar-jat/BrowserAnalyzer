document.getElementById("button_1").addEventListener("click", function (){
    document.getElementById('button_1').style.display='none';
    document.getElementById('scanning').style.display='block';
    document.location='#scanning';
    basicScan();
});



async function basicScan(){

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
    userInfo += "<p><div class='your-ip-here'><span class='bold'>Your IP Address: </span><br><br><span class='normal'>IPv4: <ip class='border'</span>"+ basicData.userIPv4 +"</ip><br><br>IPv6: <ip class='border'>"+ basicData.userIPv6 +"</ip></span></div></p><br>";
    userInfo += "<span class='normal'>According to your IP address</span>";
	if(basicData.countryName != null){
        userInfo += "<span class='normal'> you are located in </span><span class='bold'>"+ basicData.cityName +", "+ basicData.regionName +", "+ basicData.countryName +"</span>";
	}
	if(basicData.isp != null){
        userInfo += "<span class='normal'> and use internet provided by </span><span class='bold'> "+ basicData.isp +".</span>";
	}
    userInfo += "<span class='normal'> You are using a "+ basicData.device +" running </span><span class='bold'> "+ basicData.os +" OS.</span><span class='normal'> Your browser is </span><span class='bold'>"+ basicData.browser +"</span><span class='normal'> and resolution is set to </span><span class='bold'>"+ basicData.resolution +".</span>";
    if(basicData.batteryPercentage != null){
        userInfo += "<span class='normal'> Your Laptop or Desktop has </span><span class='bold'>"+ basicData.batteryPercentage +"</span><span class='normal'> battery remaining.</span>";
    }
    document.getElementById("userinfo").innerHTML = userInfo;
    document.getElementById("basic-scan").style.marginBottom = '20em';
    document.getElementById("basic-scan").style.marginTop = '3.5em'; 
    document.getElementById('scanning').style.display='none';
    document.getElementById("scan-manu").style.display = 'block';
    document.getElementById("basic-scan").style.display = 'block';
    document.location='#scan-manu';
}







