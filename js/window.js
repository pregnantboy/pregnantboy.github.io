/* exported showWindow */
function showWindow() {
	loadScript(scriptPaths.portfolio, () => {
		$(".window-body").load("/portfolio/index.html");
	});
	$("#windowModal").modal({
		keyboard: true,
		backdrop: "static"
	});

	$("#windowModal").on("hide.bs.modal", (e) => {
		getSelectedChoice();
		$(e.currentTarget).unbind();
	});

	$("#windowModal .modal-dialog").draggable({
		handle: ".modal-header"
	});

	storeModalPosition(true);

	$("#history").on("update", (event, historyLength, historyPointer, folderName) => {
		$("#window-title").text(folderName);
		$("#forward").prop("disabled", historyPointer >= historyLength - 1);
		$("#back").prop("disabled", historyPointer === 0);
	});
}

/* exported expandWindow */
function expandWindow() {
	storeModalPosition();
	resetModalPosition(true);
	$("#windowModal .modal-dialog").draggable("disable");
	$("#windowModal .modal-dialog").addClass("window-expanded");
}

/* exported shrinkWindow */
function shrinkWindow() {
	resetModalPosition();
	$("#windowModal .modal-dialog").draggable("enable");
	$("#windowModal .modal-dialog.window-expanded").removeClass("window-expanded");
}

/* exported toggleWindow */
function toggleWindow() {
	if ($("#windowModal .modal-dialog").hasClass("window-expanded")) {
		shrinkWindow();
	} else {
		expandWindow();
	}
}

function storeModalPosition(original) {
	let data = {};
	data[original ? "originalLeft" : "newLeft"] = $("#windowModal .modal-dialog").css("left");
	data[original ? "originalTop" : "newTop"] = $("#windowModal .modal-dialog").css("top");
	$("#windowModal .modal-dialog").data(data);
}

function resetModalPosition(original) {
	$("#windowModal .modal-dialog").css({
		left: $("#windowModal .modal-dialog").data(original ? "originalLeft" : "newLeft"),
		top: $("#windowModal .modal-dialog").data(original ? "originalTop" : "newTop")
	});
}

/* exported goBack */
function goBack() {
	$("#history").trigger("goBack");
}

/* exported goForward */
function goForward() {
	$("#history").trigger("goForward");
}
