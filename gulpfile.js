var gulp = require("gulp");
var browserSync = require("browser-sync").create();

// Copy third party libraries from /node_modules into /vendor
gulp.task("vendor", () => {
	// Bootstrap
	gulp.src([
		"./node_modules/bootstrap/dist/**/*", "!./node_modules/bootstrap/dist/css/bootstrap-grid*", "!./node_modules/bootstrap/dist/css/bootstrap-reboot*"
	]).pipe(gulp.dest("./vendor/bootstrap"));

	// jQuery
	gulp.src([
		"./node_modules/jquery/dist/*", "!./node_modules/jquery/dist/core.js"
	]).pipe(gulp.dest("./vendor/jquery"));

	gulp.src([
		"./node_modules/typed.js/lib/typed.min.js"
	]).pipe(gulp.dest("./vendor/typed.js"));
});

// Configure the browserSync task
gulp.task("browserSync", () => {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});

// Dev task
gulp.task("dev", [
	"browserSync"
], () => {
	gulp.watch("./css/*.css", browserSync.reload);
	gulp.watch("./*.html", browserSync.reload);
	gulp.watch("./porfolio/**/*", browserSync.reload);
});

// Default task
gulp.task("default", [
	"dev"
]);
