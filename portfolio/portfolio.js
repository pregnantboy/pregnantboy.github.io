function loadUrl(folder, doNotChangeHistory) {
	$("#content").html(`<iframe src="${folder.url}" frameborder="0" style="height: 100%; width: 100%;"></iframe>`);
	if (!doNotChangeHistory) {
		addToHistory(folder);
	}
	pushState(folder);
}

let portfolioFolderObject = {
	url: "/portfolio",
	"folder-name": "Portfolio"
};

function renderFolders() {
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
		"folder-img": "/portfolio/bigtube/icon.png",
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
		"folder-name": "AED App",
		"folder-img": "",
		url: "/portfolio/fickle/index.html"
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

	$(".folder-list").json2html(folderData, folderTemplate);

	pushState(portfolioFolderObject);
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
	let folderName = historyLog[historyPointer]["folder-name"];
	$("#history").trigger("update", [historyLog.length,
		historyPointer,
		folderName]);
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

// Dealing with hashes here

window.onhashchange = e => {
	// if (window.location.hash.replace("#", "") !== historyLog[historyPointer]["folder-name"])
};

window.onpopstate = e => {
	console.log(e);
};

function pushState(folder) {
	// window.location.hash = hash;
	history.pushState(folder, folder["folder-name"], folder["url"].replace("/index.html", ""));
}
