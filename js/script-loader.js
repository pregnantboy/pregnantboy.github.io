let scriptsLoaded = {};

/* exported scriptPaths*/
let scriptPaths = {
	portfolio: "/portfolio/portfolio.js"
};

/* exported loadScript*/
function loadScript(path, callback) {
	if (!scriptsLoaded[path]) {
		$.getScript(path, success => {
			scriptsLoaded[path] = success;
			if (callback) {
				callback();
			}
		});
	} else {
		if (callback) {
			callback();
		}
	}
}
