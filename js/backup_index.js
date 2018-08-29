async.waterfall([type("Randomly generating words... ^100OK"),
	type("Converting to PDF... ^100OK"),
	type("Resume ready for download")], () => {
	let file_path = "/Resume - Chen Wei Ian.pdf";
	let a = document.createElement("A");
	a.href = file_path;
	a.download = file_path.substr(file_path.lastIndexOf("/") + 1);
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	getSelectedChoice();
});
