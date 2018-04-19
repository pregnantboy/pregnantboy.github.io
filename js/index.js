var term = new Terminal();
term.setTextSize(10);
$('terminal').append(term.html);

var id = 'Guest';
asyncWaterfall([
    function (next) {
        term.type('Starting up...', function () {
            term.sleep(500, next);
        });
    },
    function (next) {
        term.input('Login ID:', function (msg) {
            if (msg && msg.length > 0) {
                id = msg;
            }
            next();
        });
    },
    function (next) {
        term.password('Password:', function (pw) {
            next();
        });
    },
    function (next) {
        term.type('Logging in... ^1000 Successful^200', next);
    },
    function (next) {
        term.clear();
        term.print(`
     ____                 ______ __               
    /  _/____ _ ____     / ____// /_   ___   ____ 
    / / / __ \`// __ \\   / /    / __ \\ / _ \\ / __ \\
  _/ / / /_/ // / / /  / /___ / / / //  __// / / /
 /___/ \\__,_//_/ /_/   \\____//_/ /_/ \\___//_/ /_/ 
      `, true);
        term.type('Welcome ' + id + '!', next);
    },
    function(next) {
        term.skip(4);
        term.type('What would you like to do today?', next);
    }

], function (err, result) {
    console.log(err || 'completed');
});
