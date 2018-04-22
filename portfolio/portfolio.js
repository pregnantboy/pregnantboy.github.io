renderFolders();

function renderFolders() {
	let folderData = [
		{
			"folder-name": "Fickle",
			"folder-img": "/img/folder.svg"
		},
		{
			"folder-name": "Pepo",
			"folder-img": "/img/folder.svg"
		},
		{
			"folder-name": "AED App",
			"folder-img": "/img/folder.svg"
		},
		{
			"folder-name": "DMGify",
			"folder-img": "/img/folder.svg"
		},
		{
			"folder-name": "Minecraft AI Creator",
			"folder-img": "/img/folder.svg"
		},
		{
			"folder-name": "Bigtube",
			"folder-img": "/img/folder.svg"
		},
		{
			"folder-name": "Vault",
			"folder-img": "/img/folder.svg"
		},
		{
			"folder-name": "School Apps",
			"folder-img": "/img/folder.svg"
		}
	];

	let transforms = {
		folders: {
			"<>": "div",
			class: "folder-container align-items-center col-lg-4 col-6",
			html: [
				{
					"<>": "div",
					class: "folder",
					html: [
						{ "<>": "img", src: "${folder-img}", html: "" }, { "<>": "span", html: "${folder-name}" }
					],
					ondblclick: e => {
						console.log(e.obj["folder-name"] + " clicked");
					}
				}
			]
		},
		"folder-list": {
			"<>": "div",
			class: "folder-list row",
			html: () => {
				return json2html.transform(folderData, transforms.folders);
			}
		}
	};

	$("#content").json2html({}, transforms["folder-list"]);
}
