var term = new Terminal();
term.setTextSize("1.2rem");
$("terminal").append(term.html);

var id = "Guest";

var escapeString = function(string) {
	var div = document.createElement("div");
	div.appendChild(document.createTextNode(string));
	return div.innerHTML;
};

async.waterfall([
	// function(next) {
	// 	term.type("Booting up...", function() {
	// 		term.sleep(500, next);
	// 	});
	// },
	// function(next) {
	// 	term.input("Please enter your login ID:", function(msg) {
	// 		msg = msg.trim();
	// 		if (msg && msg.length > 0) {
	// 			id = escapeString(msg);
	// 		}
	// 		next();
	// 	});
	// },
	// function(next) {
	// 	term.password("Please enter your password:", function() {
	// 		next();
	// 	});
	// },
	// function(next) {
	// 	term.type("Logging in... ^1000 Successful", function() {
	// 		term.sleep(1000, next);
	// 	});
	// },
	function(next) {
		term.clear();
		if (window.innerWidth > 600) {
			term.print(`
     ____                 ______ __               
    /  _/____ _ ____     / ____// /_   ___   ____ 
    / / / __ \`// __ \\   / /    / __ \\ / _ \\ / __ \\
  _/ / / /_/ // / / /  / /___ / / / //  __// / / /
 /___/ \\__,_//_/ /_/   \\____//_/ /_/ \\___//_/ /_/ 
    		`,
			true);
		} else {
			term.print(`
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
			true);
		}
		term.type("Welcome " + id + "!", next);
	},
	function(next) {
		term.skip(3);
		term.type("What would you like to access today?", next);
	},
	function(next) {
		term.skip(1);
		term.choice([
			{
				choice: "Portfolio"
			},
			{
				choice: "Resume"
			},
			{
				choice: "Contact Info"
			}
		],
		function(choice) {
			console.log(choice);
		});
	}
],
function(err) {
	console.log(err || "completed");
});
