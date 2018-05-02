var divs = document.getElementsByClassName("stack-logo");
[...divs].forEach(div => {
	new Tooltip(div, {
		title: div.getAttribute("data-tooltip"),
		trigger: "hover focus"
	});
});
