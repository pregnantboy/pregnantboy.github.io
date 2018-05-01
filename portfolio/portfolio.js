function loadUrl(folder, doNotChangeHistory) {
	$("#content").load(folder.url + " #page");
	if (!doNotChangeHistory) {
		addToHistory(folder);
	}
}

function renderFolders() {
	let folderData = [{
		"folder-name": "Fickle",
		"folder-img": "/img/folder.svg",
		url: "/portfolio/fickle/index.html"
	},
	{
		"folder-name": "Pepo",
		"folder-img": "/img/folder.svg",
		url: "/portfolio/pepo/index.html"
	},
	{
		"folder-name": "AED App",
		"folder-img": "/img/folder.svg",
		url: "/portfolio/fickle/index.html"
	},
	{
		"folder-name": "DMGify",
		"folder-img": "/img/folder.svg",
		url: "/portfolio/fickle/index.html"
	},
	{
		"folder-name": "Minecraft AI Creator",
		"folder-img": "/img/folder.svg",
		url: "/portfolio/fickle/index.html"
	},
	{
		"folder-name": "Bigtube",
		"folder-img": "/img/folder.svg",
		url: "/portfolio/fickle/index.html"
	},
	{
		"folder-name": "Vault",
		"folder-img": "/img/folder.svg",
		url: "/portfolio/fickle/index.html"
	},
	{
		"folder-name": "School Apps",
		"folder-img": "/img/folder.svg",
		url: "/portfolio/fickle/index.html"
	}];

	let folderTemplate = {
		"<>": "div",
		class: "folder-container align-items-center col-lg-4 col-6",
		html: [{
			"<>": "div",
			class: "folder",
			html: [{ "<>": "img", src: "${folder-img}", html: "" }, { "<>": "span", html: "${folder-name}" }],
			ondblclick: e => {
				loadUrl(e.obj);
			}
		}]
	};

	$("#content").html("<div class=\"folder-list row\"></div>");

	$(".folder-list").json2html(folderData, folderTemplate);
}

let historyLog = [{
	url: "/",
	"folder-name": "Portfolio"
}];
let historyPointer = 0;
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
		historyLog = ["root"];
		historyPointer = 0;
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
