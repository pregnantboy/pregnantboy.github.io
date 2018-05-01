if ($("link[href='/vendor/bootstrap/css/bootstrap.min.css']")[0].sheet.cssRules.length == 0) {
	$("head").append($("<link rel=\"stylesheet\" type=\"text/css\" />").attr("href", "/vendor/bootstrap/css/bootstrap.min.cssl"));
}
