document.getElementById('navbarToggle').addEventListener('blur', function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 576) {
        $("#navbarManu").collapse('hide');
    }
});
