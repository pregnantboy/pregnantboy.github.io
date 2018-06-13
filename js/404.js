let term = new Terminal();
term.setTextSize("1.2rem");
term.setLineHeight("2.2rem");
term.setMinHeight("90vh");
term.setAutoScroll(true);
term.setTypeSpeed(30);
term.setContainerDiv($(".terminal-container")[0]);
$("terminal").append(term.html);

term.print(`
   __ __  ____  __ __
  / // / / __ \\/ // /
 / // /_/ / / / // /_
/__  __/ /_/ /__  __/
  /_/  \\____/  /_/   	   
`,
true);
term.skip(1);
term.skip(1);
term.skip(1);
term.type("404 not found,", () => {
	term.type("just like this missing haiku.", () => {
		term.type("Click <a href=\"/\">here</a> to go home.");
	});
});
