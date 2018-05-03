var divs = document.getElementsByClassName("stack-logo");
[...divs].forEach(div => {
	new Tooltip(div, {
		title: div.getAttribute("data-tooltip"),
		trigger: "hover focus"
	});
});

var vids = document.getElementsByClassName("stills-vid");
[...vids].forEach(div => {
	var x = new Tooltip(div, {
		title: div.getAttribute("data-tooltip"),
		trigger: "hover focus"
	});
	console.log(x);
});
