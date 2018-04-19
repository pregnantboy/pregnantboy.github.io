// PROMPT_TYPE
var PROMPT_INPUT = 1,
	PROMPT_PASSWORD = 2,
	PROMPT_CONFIRM = 3;

var fireCursorInterval = function(inputField, terminalObj) {
	var cursor = terminalObj._cursor;
	setTimeout(function() {
		if (inputField.parentElement && terminalObj._shouldBlinkCursor) {
			cursor.style.visibility = cursor.style.visibility === "visible" ? "hidden" : "visible";
			fireCursorInterval(inputField, terminalObj);
		} else {
			cursor.style.visibility = "visible";``
		}
	}, 500);
};

var firstPrompt = true;
var promptInput = function(terminalObj, message, PROMPT_TYPE, callback) {
	var shouldDisplayInput = PROMPT_TYPE === PROMPT_INPUT || PROMPT_TYPE === PROMPT_PASSWORD;
	var inputField = document.createElement("input");

	inputField.style.position = "absolute";
	inputField.style.zIndex = "-100";
	inputField.style.outline = "none";
	inputField.style.border = "none";
	inputField.style.opacity = "0";
	inputField.style.fontSize = "0.2em";
	inputField.maxLength = "30";

	terminalObj._inputLine.textContent = "";
	terminalObj._input.style.display = "block";
	terminalObj.html.appendChild(inputField);
	fireCursorInterval(inputField, terminalObj);

	if (message.length)
		terminalObj.type(PROMPT_TYPE === PROMPT_CONFIRM ? message + " (y/n)" : message, function() {
			inputField.onblur = function() {
				terminalObj._cursor.style.display = "none";
			};

			inputField.onfocus = function() {
				inputField.value = terminalObj._inputLine.textContent;
				terminalObj._cursor.style.display = "inline";
			};

			terminalObj.html.onclick = function() {
				inputField.focus();
			};

			inputField.onkeydown = function(e) {
				if (e.which === 37 || e.which === 39 || e.which === 38 || e.which === 40 || e.which === 9) {
					e.preventDefault();
				} else if (shouldDisplayInput && e.which !== 13) {
					setTimeout(function() {
						terminalObj._inputLine.textContent = inputField.value;
						if (PROMPT_TYPE === PROMPT_PASSWORD) {
							terminalObj._inputLine.textContent = "•".repeat(inputField.value.length);
						}
					}, 1);
				}
			};
			inputField.onkeyup = function(e) {
				if (PROMPT_TYPE === PROMPT_CONFIRM || e.which === 13) {
					terminalObj._input.style.display = "none";
					var inputValue = inputField.value;
					if (PROMPT_TYPE === PROMPT_PASSWORD) terminalObj.print("•".repeat(inputValue.length));
					if (PROMPT_TYPE === PROMPT_INPUT) terminalObj.print(inputValue);
					terminalObj.html.removeChild(inputField);
					if (typeof callback === "function") {
						if (PROMPT_TYPE === PROMPT_CONFIRM) {
							callback(inputValue.toUpperCase()[0] === "Y" ? true : false);
						} else callback(inputValue);
					}
				}
			};
			if (firstPrompt) {
				firstPrompt = false;
				setTimeout(function() {
					inputField.focus();
				}, 200);
			} else {
				inputField.focus();
			}
		});
};

var terminalBeep = document.createElement("audio");
var source = "<source src=\"http://www.erikosterberg.com/terminaljs/beep.";
terminalBeep.innerHTML = source + "mp3\" type=\"audio/mpeg\">" + source + "ogg\" type=\"audio/ogg\">";
terminalBeep.volume = 0.05;

/* exported Terminal */
class Terminal {
	constructor(id) {
		this.html = document.createElement("div");
		this.html.className = "Terminal";
		if (typeof id === "string") {
			this.html.id = id;
		}
		this._innerWindow = document.createElement("div");
		this._output = document.createElement("p");
		this._inputLine = document.createElement("span"); //the span element where the users input is put
		this._cursor = document.createElement("span");
		this._input = document.createElement("p"); //the full element administering the user input, including cursor
		this._shouldBlinkCursor = true;

		this._input.appendChild(this._inputLine);
		this._input.appendChild(this._cursor);
		this._innerWindow.appendChild(this._output);
		this._innerWindow.appendChild(this._input);
		this.html.appendChild(this._innerWindow);

		this.html.style.margin = "0";
		this._innerWindow.style.padding = "10px";
		this._input.style.margin = "0";
		this._output.style.margin = "0";
		this._cursor.style.background = "white";
		this._cursor.innerHTML = "C"; //put something in the cursor..
		this._cursor.style.display = "none"; //then hide it
		this._input.style.display = "none";
		this._lineHeight = "auto";
		this._typed = null;
		this._selectedChoice = 0;
		this._choiceDivs = [];
		this._choices = [];

		this.setBackgroundColor("transparent");
		this.setTextColor("white");
		this.setTextSize("1em");
		this.setWidth("100%");
		this.setHeight("100%");
		this.setLineHeight("auto");

		document.onkeydown = function(e) {
			if (this._choiceDivs.length > 1) {
				if (e.which === 38) {
					console.log("key up");
					this._selectedChoice = (this._choices.length + this._selectedChoice - 1) % this._choices.length;
					this.updateChoice();
				}
				if (e.which === 40) {
					console.log("key down");
					this._selectedChoice = (this._selectedChoice + 1) % this._choices.length;
					this.updateChoice();
				}
				if (e.which === 13) {
					// enter key
					var selectedDiv = this._choiceDivs[this._selectedChoice];
					selectedDiv.onclick();
				}
			}
		}.bind(this);
	}

	beep() {
		terminalBeep.load();
		terminalBeep.play();
	}

	print(message, keepSpace) {
		var newLine = document.createElement("div");
		newLine.style["line-height"] = this._lineHeight;		
		if (keepSpace) {
			var newPre = document.createElement("pre");
			newPre.innerText = message;
			newPre.style.color = this.html.style.color;
			newPre.style["font-family"] = this._output.style["font-family"];
			newPre.style["line-height"] = "120%";
			newPre.style.fontSize = this._output.style.fontSize;
			newLine.append(newPre);
		} else {
			newLine.textContent = message;
		}
		this._output.appendChild(newLine);
		return newLine;
	}

	type(message, callback) {
		var newText = document.createElement("span");
		var newLine = document.createElement("div");
		newLine.style["line-height"] = this._lineHeight;
		newLine.append(newText);
		this._output.appendChild(newLine);
		this._typed = new Typed(newText, {
			strings: [
				message
			],
			typeSpeed: 20,
			showCursor: true,
			onStringTyped: function() {
				$(newText)
					.siblings(".typed-cursor")
					.remove();
				delete this._typed;
				if (callback) {
					callback();
				}
			}
		});
		return newLine;
	}

	skip(numLines) {
		for (var i = 0; i < numLines; i++) {
			var newLine = document.createElement("div");
			newLine.style.height = this._output.style.fontSize;
			this._output.appendChild(newLine);
		}
	}

	input(message, callback) {
		promptInput(this, message, PROMPT_INPUT, callback);
	}

	password(message, callback) {
		promptInput(this, message, PROMPT_PASSWORD, callback);
	}

	confirm(message, callback) {
		promptInput(this, message, PROMPT_CONFIRM, callback);
	}

	choice(choices, callback) {
		this._choiceDivs = [];
		this._choices = choices;
		this._selectedChoice = 0;
		async.eachOfSeries(choices,
			(choice, index, next) => {
				var optionDiv = this.type(choice.choice, () => {
					next();
				});
				optionDiv.style.cursor = "pointer";
				optionDiv.onclick = () => {
					this._selectedChoice = index;
					this.updateChoice();
					callback(choice.choice);
				};
				this._choiceDivs.push(optionDiv);
			},
			() => {
				this.updateChoice();
			});
	}

	updateChoice() {
		if (this._choices.length === 0 || this._choiceDivs.length === 0) {
			return;
		}
		for (var i = 0; i < this._choices.length; i++) {
			if (this._selectedChoice === i) {
				this._choiceDivs[i].innerText = "►" + this._choices[i].choice;
			} else {
				this._choiceDivs[i].innerText = this._choices[i].choice;
			}
		}
	}

	clear() {
		this._output.innerHTML = "";
		this._typed = null;
	}

	sleep(milliseconds, callback) {
		setTimeout(callback, milliseconds);
	}

	setTextSize(size) {
		this._output.style.fontSize = size;
		this._input.style.fontSize = size;
	}

	setTextColor(col) {
		this.html.style.color = col;
		this._cursor.style.background = col;
	}

	setFont(font) {
		this._output.style["font-family"] = font;
		this._input.style["font-family"] = font;
	}

	setBackgroundColor(col) {
		this.html.style.background = col;
	}

	setWidth(width) {
		this.html.style.width = width;
	}

	setHeight(height) {
		this.html.style.height = height;
	}

	setLineHeight(lineHeight) {
		this._lineHeight = lineHeight;
		this._input.style["line-height"] = lineHeight;
	}

	blinkingCursor(bool) {
		bool = bool.toString().toUpperCase();
		this._shouldBlinkCursor = bool === "TRUE" || bool === "1" || bool === "YES";
	}
}
