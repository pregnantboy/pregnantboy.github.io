renderFolders();

function loadUrl(url, doNotChangeHistory) {
	$("#content").load(url);
	if (!doNotChangeHistory) {
		addToHistory(url);
	}
}

function renderFolders() {
	let folderData = [{
		"folder-name": "Fickle",
		"folder-img": "/img/folder.svg",
		url: "/portfolio/fickle"
	},
	{
		"folder-name": "Pepo",
		"folder-img": "/img/folder.svg",
		url: "/portfolio/fickle"
	},
	{
		"folder-name": "AED App",
		"folder-img": "/img/folder.svg",
		url: "/portfolio/fickle"
	},
	{
		"folder-name": "DMGify",
		"folder-img": "/img/folder.svg",
		url: "/portfolio/fickle"
	},
	{
		"folder-name": "Minecraft AI Creator",
		"folder-img": "/img/folder.svg",
		url: "/portfolio/fickle"
	},
	{
		"folder-name": "Bigtube",
		"folder-img": "/img/folder.svg",
		url: "/portfolio/fickle"
	},
	{
		"folder-name": "Vault",
		"folder-img": "/img/folder.svg",
		url: "/portfolio/fickle"
	},
	{
		"folder-name": "School Apps",
		"folder-img": "/img/folder.svg",
		url: "/portfolio/fickle"
	}];

	let folderTemplate = {
		"<>": "div",
		class: "folder-container align-items-center col-lg-4 col-6",
		html: [{
			"<>": "div",
			class: "folder",
			html: [{ "<>": "img", src: "${folder-img}", html: "" }, { "<>": "span", html: "${folder-name}" }],
			ondblclick: e => {
				loadUrl(e.obj.url);
			}
		}]
	};

	$("#content").html("<div class=\"folder-list row\"></div>");

	$(".folder-list").json2html(folderData, folderTemplate);
}

let historyLog = ["root"];
let historyPointer = 0;
updateForwardBackButtons();

function addToHistory(url) {
	historyPointer++;
	// replace existing history log
	if (historyLog.length >= historyPointer) {
		historyLog.splice(historyPointer);
	}
	historyLog.push(url);
	updateForwardBackButtons();
}

function updateForwardBackButtons() {
	$("#history").trigger("update", [historyLog.length, historyPointer]);
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
