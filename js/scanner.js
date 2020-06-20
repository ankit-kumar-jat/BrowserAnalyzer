function startScanning(){
    document.getElementById('button_1').style.display='none';
    document.getElementById('scanning').style.display='block';
    document.location='#scanning';
    basicScan();
}

function basicScan(){
    console.log('basicScan');
}

jQuery.ajax({

	    type: "GET",

	    url: 'https://privacy.net/wp-admin/admin-ajax.php',

		data: {

		  'action': 'browserscan',

		},

	    dataType: "json",

	    success: function(data) {

	    	// Scroll to the position of the test tabs.
	    	window.location.hash = "#accordion";



			var browser = data.browser;
			
			var headers = data.headers;

			var country_info = data.country_info;

			var userIP = data.ip;

			var browserUA = data.ua;

			var host = data.host;
			//user basic info

			var userInfo = "";
			console.log(browser);
		}
});





