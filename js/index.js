let term = new Terminal();
term.setTextSize("1.2rem");
term.setLineHeight("2.2rem");
term.setMinHeight("90vh");
term.setAutoScroll(true);
term.setTypeSpeed(10);
term.setContainerDiv($(".terminal-container")[0]);
$("terminal").append(term.html);

let id = "Guest";

let type = msg => term.type.bind(term, msg);
let skip = lines => term.skip.bind(term, lines);
let sleep = milliseconds => term.sleep.bind(term, milliseconds);
let clear = () => term.clear.bind(term);
let print = (msg, keepSpaces) => term.print.bind(term, msg, keepSpaces);

if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
	showWindow();
	startup(true);
} else {
	startup(false);
}

function startup(skip) {
	let storedId = getCookie("loginId");
	let returning = false;
	if (storedId && storedId.length > 0) {
		id = storedId;
		returning = true;
		skip = true;
	}
	if (skip) {
		showLogo(returning).then(() => {
			getSelectedChoice(true);
		});
	} else {
		getLoginId()
			.then(newId => {
				id = newId;
				setCookie("loginId", id, 30);
				return showLogo();
			})
			.then(() => {
				getSelectedChoice(true);
			});
	}
}

function getLoginId() {
	return new Promise((resolve, reject) => {
		let newId = null;
		async.waterfall([type("Booting up...^500"),
			next => {
				term.input("Please enter your login ID:", msg => {
					msg = msg.trim();
					if (msg && msg.length > 0) {
						newId = escapeString(msg);
					}
					next();
				});
			},
			next => {
				term.password("Please enter your password:", () => {
					next();
				});
			},
			type("Logging in... ^1000 Successful!"),
			sleep(1000),
			clear()],
		err => {
			if (err) {
				reject(err);
			} else {
				resolve(newId);
			}
		});
	});
}

function showLogo(returning) {
	return new Promise((resolve, reject) => {
		async.waterfall([window.innerWidth > 600
			? print(`
    ____                 ______ __
   /  _/____ _ ____     / ____// /_   ___   ____
   / / / __ \`// __ \\   / /    / __ \\ / _ \\ / __ \\
 _/ / / /_/ // / / /  / /___ / / / //  __// / / /
/___/ \\__,_//_/ /_/   \\____//_/ /_/ \\___//_/ /_/
	    		`,
			true)
			: print(`
     ____
    /  _/____ _ ____
    / / / __ \`// __ \\
  _/ / / /_/ // / / /
 /___/ \\__,_//_/ /_/
   ______ __
  / ____// /_   ___   ____
 / /    / __ \\ / _ \\ / __ \\
/ /___ / / / //  __// / / /
\\____//_/ /_/ \\___//_/ /_/
	       		`,
			true), next => {
			// must be done in a function for id to be updated;
			let welcomeMsg = returning ? "Welcome back " : "Welcome ";
			term.type(welcomeMsg + id + "!", next);
		}],
		err => {
			if (err) reject(err);
			else resolve();
		});
	});
}

function getSelectedChoice(firstLoad) {
	let selectedChoice = {};
	async.waterfall([skip(1),
		type(firstLoad ? "What would you like to access today?" : "What would you like to see next?"),
		skip(1),
		next => {
			term.choice([{ choice: "Portfolio", id: 1 },
				{ choice: "Resume", id: 2 },
				{ choice: "Contact Info", id: 3 },
				{ choice: "Logout", id: 4 }], choice => {
				selectedChoice = choice;
				next();
			});
		},
		skip(1),
		next => {
			// must be done in a function for selected to be updated;
			term.type(selectedChoice.choice + " selected.", next);
		}],
	err => {
		if (err) {
			console.error(err);
		} else {
			handleChoice(selectedChoice);
		}
	});
}

function handleChoice(choice) {
	switch (choice.id) {
	case 1:
		var window = showWindow(true);
		// load first
		async.waterfall([type("Spinning the CPU fan... ^100OK"),
			type("Mining some ethereum... ^100OK"),
			type("Unzipping the folders... ^100OK"),
			type("Opening Portfolio")], () => {
			window.show();
		});
		break;
	case 2: {
		async.waterfall([type("Randomly generating words... ^100OK"),
			type("Converting to PDF... ^100OK"),
			type("Resume ready for download")], () => {
			let file_path = "/resume.txt";
			let a = document.createElement("A");
			a.href = file_path;
			a.download = file_path.substr(file_path.lastIndexOf("/") + 1);
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			getSelectedChoice();
		});
		break;
	}
	case 3:
		async.waterfall([type("email: <a target=\"_blank\" href=\"mailto:ian-@gmx.com\">ian-@gmx.com</a>"),
			type("github: <a target=\"_blank\" href=\"https://github.com/pregnantboy\">@pregnantboy</a>"),
			type("linkedin:  <a target=\"_blank\" href=\"https://www.linkedin.com/in/chenweiian/\">chenweiiian</a>")],
		getSelectedChoice);
		break;
	case 4:
		async.waterfall([type("Logging out...^500 Successful!"),
			next => {
				deleteCookie("loginId");
				next();
			},
			type("[Connection terminated]")]);
		break;
	default:
		getSelectedChoice();
	}
}

function escapeString(string) {
	let div = document.createElement("div");
	div.appendChild(document.createTextNode(string));
	return div.innerHTML;
}
