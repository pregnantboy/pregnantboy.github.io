/* exported showWindow */
function showWindow() {
	loadScript(scriptPaths.portfolio, () => {
		$(".window-body").load("/portfolio/index.html");
	});

	$("#window").show();	

	$("#history").on("update", (event, historyLength, historyPointer, folderName) => {
		$("#window-title").text(folderName);
		$("#forward").prop("disabled", historyPointer >= historyLength - 1);
		$("#back").prop("disabled", historyPointer === 0);
	});
}

function closeWindow() {
	$("#window").hide();
	getSelectedChoice();
	$("#history").trigger("clear");
}

/* exported expandWindow */
function expandWindow() {
	$("#window").addClass("expanded");
}

/* exported shrinkWindow */
function shrinkWindow() {
	$("#window").removeClass("expanded");
}

/* exported toggleWindow */
function toggleWindow() {
	if ($("#window").hasClass("expanded")) {
		shrinkWindow();
	} else {
		expandWindow();
	}
}

/* exported goBack */
function goBack() {
	$("#history").trigger("goBack");
}

/* exported goForward */
function goForward() {
	$("#history").trigger("goForward");
}
