var side = 0;

$(".map").click(e => {
	console.log("click registered at (" + e.pageX + ", " + e.pageY + ")");
	createMarker(e.pageX, e.pageY);
});

function createMarker(x, y) {
	if (!side) {
		return;
	}
	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	var vmin = Math.min(w, h);
	var markerHeight = (5 / 100) * vmin;

	let marker = document.createElement("img");
	marker.className = "marker animated bounceInDown";
	if (side === 1) {
		marker.src = "/portfolio/aed/img/bluemarker.png";
	} else {
        marker.src = "/portfolio/aed/img/yellowmarker.png";
    }
    // using percentage instead of pixel to make resizing slightly better
	marker.style.left = ((x - markerHeight / 2) / w) * 100 + "%";
    marker.style.top = ((y - markerHeight - 3) / h) * 100 + "%";
    document.body.appendChild(marker); 
}

function selectSide(newSide) {
	side = newSide;
	$(".logo").each((i, el) => {
		console.log(el);
		if (i + 1 === side) {
			$(el).addClass("selected");
		} else {
			$(el).removeClass("selected");
		}
	});
}
