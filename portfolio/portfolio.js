function loadUrl(folder, doNotReplaceHistory, doNotPushState) {
	if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
		window.open(folder.url, "_blank");
		return;
	}

	$("#content").html(`<iframe src="${folder.url}" frameborder="0" width="100%;" style="height: 80vh" scrolling="yes" onload="this.contentWindow.focus()"></iframe>`);
	if (!doNotReplaceHistory) {
		addToHistory(folder);
	}
	if (!doNotPushState) {
		pushState(folder);
	}
}

let portfolioFolderObject = {
	url: "/portfolio",
	"folder-name": "Portfolio",
	"folder-img": "/img/folder.svg"
};

function renderFolders(doNotPushState) {
	let folderData = [{
		"folder-name": "Fickle",
		"folder-img": "/portfolio/fickle/img/icon.png",
		url: "/portfolio/fickle/index.html"
	},
	{
		"folder-name": "Pepo",
		"folder-img": "/portfolio/pepo/pepo-logo.png",
		url: "/portfolio/pepo/index.html"
	},
	{
		"folder-name": "Bigtube",
		"folder-img": "/portfolio/bigtube/img/icon.png",
		url: "/portfolio/bigtube/index.html"
	},
	{
		"folder-name": "Minecraft AI Creator",
		"folder-img": "/portfolio/minecraft/img/128.png",
		url: "/portfolio/minecraft/index.html"
	},
	{
		"folder-name": "Vault",
		"folder-img": "/portfolio/vault/img/icon128.png",
		url: "/portfolio/vault/index.html"
	},
	{
		"folder-name": "AED Crowdsourcing",
		"folder-img": "/portfolio/aed/img/aed-logo.png",
		url: "/portfolio/aed/index.html"
	},
	{
		"folder-name": "adelinetng.com",
		"folder-img": "/img/adel-logo.png",
		url: "https://adelinetng.com"
	},
	{
		"folder-name": "DMGify",
		"folder-img": "",
		url: "/portfolio/fickle/index.html"
	},
	{
		"folder-name": "School Apps",
		"folder-img": "",
		url: "/portfolio/fickle/index.html"
	}];

	let folderTemplate = {
		"<>": "div",
		class: "folder-container align-items-center col-lg-4 col-6",
		html: [{
			"<>": "div",
			class: "folder",
			html: [{
				"<>": "div",
				class: "folder-image",
				html: [{ "<>": "img", src: "${folder-img}", html: "" }]
			}, { "<>": "span", html: "${folder-name}" }],
			onclick: e => {
				loadUrl(e.obj);
			}
		}]
	};

	$("#content").html("<div class=\"folder-list row\"></div>");

	if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
		$(".folder-list").append("<div class=\"file-container-warning\">Pages will open in new tabs on iOS devices</div>");
	}

	$(".folder-list").json2html(folderData, folderTemplate);

	if (!doNotPushState) {
		pushState(portfolioFolderObject);
	}
}

let historyLog, historyPointer;
function resetHistoryLog() {
	historyLog = [portfolioFolderObject];
	historyPointer = 0;
}
resetHistoryLog();
updateForwardBackButtons();

function addToHistory(folder) {
	historyPointer++;
	// replace existing history log
	if (historyLog.length >= historyPointer) {
		historyLog.splice(historyPointer);
	}
	historyLog.push(folder);
	updateForwardBackButtons();
}

function updateForwardBackButtons() {
	$("#history").trigger("update", [historyLog.length,
		historyPointer,
		historyLog[historyPointer]]);
}

$("#history").on("goBack", () => {
	console.log("Navigating back");
	if (historyLog.length > 0 && historyPointer > 0) {
		historyPointer--;
		updateForwardBackButtons();
		if (historyPointer <= 0) {
			renderFolders();
		} else {
			let urlToGo = historyLog[historyPointer];
			loadUrl(urlToGo, true);
		}
	} else if (historyLog.length === 0 || historyPointer < 0) {
		resetHistoryLog();
		updateForwardBackButtons();
		renderFolders();
	}
});

$("#history").on("goForward", () => {
	console.log("Navigating forward");
	if (historyLog.length - 1 > historyPointer) {
		historyPointer++;
		updateForwardBackButtons();
		let urlToGo = historyLog[historyPointer];
		loadUrl(urlToGo, true);
	} else {
		updateForwardBackButtons();
	}
});

$("#history").on("close", () => {
	pushState({});
	resetHistoryLog();
	updateForwardBackButtons();
});

$("#history").on("openExternal", () => {
	window.open(historyLog[historyPointer].url.replace("/index.html", ""), "_blank");
});

// Dealing with history states here

window.onpopstate = e => {
	let state = e.state;
	if ($.isEmptyObject(state)) {
		// close window
		if (isWindowShown()) {
			$("#history").trigger("closeWindow");
		}
	} else {
		let currentFolderName = historyLog[historyPointer]["folder-name"];
		let stateFolderName = state["folder-name"];
		if (currentFolderName === stateFolderName) {
			// check if already in state
			return;
		} else {
			resetHistoryLog();
			if (stateFolderName === "Portfolio") {
				// if in terminal, it will render folders but not show window
				renderFolders(true);
			} else {
				loadUrl(state, false, true);
			}
			updateForwardBackButtons();
		}
	}
};

function pushState(folder) {
	// window.location.hash = hash;
	let urlSuffix = "/";
	if (folder.url) {
		urlSuffix = folder.url.replace("/index.html", "").replace(/^https?:\/\//, "/portfolio/");
	}
	history.pushState(folder, folder["folder-name"], urlSuffix);
}
