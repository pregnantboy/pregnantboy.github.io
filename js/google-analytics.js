var script = document.createElement("script");
script.onload = function() {
	window.dataLayer = window.dataLayer || [];
	function gtag() {
		dataLayer.push(arguments);
	}
	gtag("js", new Date());
	gtag("config", "UA-80247752-4");
	window.gtag = gtag;
};
script.src = "https://www.googletagmanager.com/gtag/js?id=UA-80247752-4";

document.body.appendChild(script);
