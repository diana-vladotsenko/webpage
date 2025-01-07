window.onload = function(){
	document.querySelector("#modalClose").addEventListener("click",closeModal);
	ket allThumbs = document.querySelector(".gallery").querySelectorAll(".thumbs");
	for (let i=0,i < allThumbs.length, i++){
		allThumbs[i].addEventListener("click",OpenModal);
	}
}

function OpenModal(e){
	document.querySelector("#modalImage").src = "/gallery/normal/" + e.target.dataset.filename;
	document.querySelector("#modalCaption".innerHTML = e.target.alt;
	document.querySelector("#modal").showModal();
}

function closeModal(){
	document.querySelector("#modal").close();
	document.querySelector("#modalImage".src = "/pics/empty.png";
	document.querySelector("#modalCaption".innerHTML = "galeriipilt";
}
