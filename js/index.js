var term = new Terminal();
term.setTextSize("1.2rem");
term.setLineHeight("2.2rem");
term.setMinHeight("90vh");
term.setAutoScroll(true);
$("terminal").append(term.html);

var id = "Guest";
var selected = null;

var type = msg => term.type.bind(term, msg);
var skip = lines => term.skip.bind(term, lines);
var sleep = milliseconds => term.sleep.bind(term, milliseconds);
var clear = () => term.clear.bind(term);
var print = (msg, keepSpaces) => term.print.bind(term, msg, keepSpaces);

getLoginId()
	.then(newId => {
		id = newId;
		return getSelectedChoice();
	})
	.then(selectedChoice => {
		selected = selectedChoice;
		if (selected === "Portfolio") {
			console.log("here");
		} 
		showModal();		
	});

function getLoginId(skip) {
	if (skip) {
		return Promise.resolve("Guest");
	}
	return new Promise((resolve, reject) => {
		var newId = null;
		async.waterfall([
			type("Booting up...^500"),
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
			clear()
		],
		err => {
			if (err) {
				reject(err);
			} else {
				resolve(newId);
			}
		});
	});
}

function getSelectedChoice() {
	return new Promise((resolve, reject) => {
		var selectedChoice = -1;
		async.waterfall([
			window.innerWidth > 600
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
				true),
			next => {
				// must be done in a function for id to be updated;
				term.type("Welcome " + id + "!", next);
			},
			skip(1),
			type("What would you like to access today?"),
			skip(1),
			next => {
				term.choice([
					{ choice: "Portfolio" }, { choice: "Resume" }, { choice: "Contact Info" }
				], choice => {
					selectedChoice = choice;
					next();
				});
			},
			skip(1),
			next => {
				// must be done in a function for selected to be updated;
				term.type(selectedChoice + " selected.", next);
			},
			type("Checking user permissions... ^100OK"),
			type("Installing updates... ^100OK"),
			type("Spinning the CPU fan... ^100OK"),
			next => {
				// must be done in a function for selected to be updated;
				term.type("Loading " + selectedChoice + "...", next);
			}
		],
		err => {
			if (err) {
				reject(err);
			} else {
				resolve(selectedChoice);
			}
		});
	});
}

function escapeString(string) {
	var div = document.createElement("div");
	div.appendChild(document.createTextNode(string));
	return div.innerHTML;
}

function showModal() {
	$(".window-body").load("/portfolio/index.html");
	$("#windowModal").modal({
		keyboard: false,
		backdrop: "static"
	});
}

/* exported expandWindow */
function expandWindow() {
	$("#windowModal .modal-dialog").addClass("window-expanded");
}

/* exported shrinkWindow */
function shrinkWindow() {
	$("#windowModal .modal-dialog.window-expanded").removeClass("window-expanded");	
}
