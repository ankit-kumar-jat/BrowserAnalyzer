document.getElementById("autofill-scan").style.display = "none";
document.getElementById("user-accounts-scan").style.display = "none";
document.getElementById("system-scan").style.display = "none";
document.getElementById("fingerprinting-scan").style.display = "none";
function scanManuEvents(){
    //Event Listner for scan manu
    document.getElementById("scan-item").addEventListener("click", function (){
        document.getElementById("scan-item").style.color = '#3fd6fb';
        document.getElementById("scan-item").style.backgroundColor = '#297bef';
    });
    document.getElementById("btn1").addEventListener("click", function (){
        document.location = "#scan-manu";
        document.getElementById("basic-scan").style.display = "block";
        document.getElementById("autofill-scan").style.display = "none";
        document.getElementById("user-accounts-scan").style.display = "none";
        document.getElementById("system-scan").style.display = "none";
        document.getElementById("fingerprinting-scan").style.display = "none";
    });
    document.getElementById("btn2").addEventListener("click", function (){
        document.location = "#scan-manu";
        document.getElementById("basic-scan").style.display = "none";
        document.getElementById("autofill-scan").style.display = "block";
        document.getElementById("user-accounts-scan").style.display = "none";
        document.getElementById("system-scan").style.display = "none";
        document.getElementById("fingerprinting-scan").style.display = "none";
    });
    document.getElementById("btn3").addEventListener("click", function (){
        document.location = "#scan-manu";
        document.getElementById("basic-scan").style.display = "none";
        document.getElementById("autofill-scan").style.display = "none";
        document.getElementById("user-accounts-scan").style.display = "block";
        document.getElementById("system-scan").style.display = "none";
        document.getElementById("fingerprinting-scan").style.display = "none";
    });
    document.getElementById("btn4").addEventListener("click", function (){
        document.location = "#scan-manu";
        document.getElementById("basic-scan").style.display = "none";
        document.getElementById("autofill-scan").style.display = "none";
        document.getElementById("user-accounts-scan").style.display = "none";
        document.getElementById("system-scan").style.display = "block";
        document.getElementById("fingerprinting-scan").style.display = "none";
    });
    document.getElementById("btn5").addEventListener("click", function (){
        document.location = "#scan-manu";
        document.getElementById("basic-scan").style.display = "none";
        document.getElementById("autofill-scan").style.display = "none";
        document.getElementById("user-accounts-scan").style.display = "none";
        document.getElementById("system-scan").style.display = "none";
        document.getElementById("fingerprinting-scan").style.display = "block";
    });
};

