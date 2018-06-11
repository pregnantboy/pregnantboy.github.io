

/* exported showWindow */
function showWindow() {
	// load again in case not called from choice select
	$(".window-body").load("/portfolio/index.html");
	$("#window").show();

	$("#history").on("update", (event, historyLength, historyPointer, folderName) => {
		$("#window-title").text(folderName);
		$("#forward").prop("disabled", historyPointer >= historyLength - 1);
		$("#back").prop("disabled", historyPointer === 0);
	});
}

/* exported closeWindow */
function closeWindow() {
	$("#window").hide();
	getSelectedChoice();
	$("#history").trigger("close");
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

/* exported openExternal */
function openExternal() {
	$("#history").trigger("openExternal");
}

function adjustWindowSize() {
	if ($(window).width() < 767) {
		$("#window").addClass("mobile");
	} else {
		$("#window").removeClass("mobile");
	}
}

adjustWindowSize();
$(window).on("resize", adjustWindowSize);
