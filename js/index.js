document.getElementById("myBtn").addEventListener("click", function (){
    document.location = "analyzer.html";
});
var carousel = '<div class="carousel-inner"><div class="carousel-item active"><picture><source class="d-block w-100" type="image/png" srcset="./assets/carousel/1.png"><img class="d-block w-100" src="./assets/carousel/1.png" alt="First slide"></picture></div><div class="carousel-item"><picture><source class="d-block w-100" type="image/png" srcset="./assets/carousel/2.png"><img class="d-block w-100" src="./assets/carousel/2.png" alt="Second slide"></picture></div><div class="carousel-item"><picture><source class="d-block w-100" type="image/png" srcset="./assets/carousel/3.png"><img class="d-block w-100" src="./assets/carousel/3.png" alt="Third slide"></picture></div><div class="carousel-item"><picture><source class="d-block w-100" type="image/png" srcset="./assets/carousel/4.png"><img class="d-block w-100" src="./assets/carousel/4.png" alt="Fourth slide"></picture></div><div class="carousel-item"><picture><source class="d-block w-100" type="image/png" srcset="./assets/carousel/5.png"><img class="d-block w-100" src="./assets/carousel/5.png" alt="Fifth slide"></picture></div><div class="carousel-item"><picture><source class="d-block w-100" type="image/png" srcset="./assets/carousel/6.png"><img class="d-block w-100" src="./assets/carousel/6.png" alt="Sixth slide"></picture></div></div><a class="carousel-control-prev" href="#carouselControls" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#carouselControls" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>';
if (window.innerWidth >= 576){
	document.getElementById("carouselControls").innerHTML= carousel;
}
function addCarousel(){
	if (window.innerWidth >= 576){
		document.getElementById("carouselControls").innerHTML= carousel;
	}else{
		document.getElementById("carouselControls").innerHTML= "";
	}
}
window.addEventListener("resize", addCarousel);
/*
function addRemove(){
    if (window.innerWidth < 992){
        //document.querySelector("#welcome-note1").style.display = "block";
        //document.querySelector("#welcome-note2").style.display = "block";
        //document.getElementById("hello-img").style.display = "none";
        //document.getElementById("welcome").classList.remove("col-6");
        //document.getElementById("welcome-grid").classList.remove("row");
    }else{
        //document.querySelector("#welcome-note1").style.display = "inline";
        //document.querySelector("#welcome-note2").style.display = "inline";
        //document.getElementById("hello-img").style.display = "flex";
        //document.getElementById("welcome").classList.add("col-6");
        //document.getElementById("welcome-grid").classList.add("row");
    }
}
addRemove();
window.addEventListener("resize", addRemove);
*/
