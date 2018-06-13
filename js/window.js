/* exported showWindow */
function showWindow(async) {
	// load again in case not called from choice select
	$(".window-body").load("/portfolio/index.html");

	$("#history").on("update", (event, historyLength, historyPointer, folder) => {
		$("#window-title").html(`<img id="window-title-icon" src="${folder["folder-img"]}" ><span> ${folder["folder-name"]} </span>`);
		$("#forward").prop("disabled", historyPointer >= historyLength - 1);
		$("#back").prop("disabled", historyPointer === 0);
		// whether to show the open external button
		if (folder["folder-name"] === "Portfolio") {
			$(".open-external-btn").removeClass("show");
		} else {
			$(".open-external-btn").addClass("show");
		}
	});

	$("#history").on("closeWindow", () => {
		closeWindow();
	});

	if (async) {
		return $("#window");
	} else {
		$("#window").show();
	}
}

function isWindowShown() {
	return $("#window").is(":visible");
}

/* exported closeWindow */
function closeWindow() {
	if (!isWindowShown()) {
		return;
	}
	$("#window").hide();
	getSelectedChoice();
	$("#history").trigger("close");
}

/* exported expandWindow */
function expandWindow() {
	if (!isWindowShown()) {
		return;
	}
	$("#window").addClass("expanded");
}

/* exported shrinkWindow */
function shrinkWindow() {
	if (!isWindowShown()) {
		return;
	}
	$("#window").removeClass("expanded");
}

/* exported toggleWindow */
function toggleWindow() {
	if (!isWindowShown()) {
		return;
	}
	if ($("#window").hasClass("expanded")) {
		shrinkWindow();
	} else {
		expandWindow();
	}
}

/* exported goBack */
function goBack() {
	if (!isWindowShown()) {
		return;
	}
	$("#history").trigger("goBack");
}

/* exported goForward */
function goForward() {
	if (!isWindowShown()) {
		return;
	}
	$("#history").trigger("goForward");
}

/* exported openExternal */
function openExternal() {
	if (!isWindowShown()) {
		return;
	}
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
