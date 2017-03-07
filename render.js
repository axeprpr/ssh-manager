//css
require("./render.css");
require("./node_modules/xterm/dist/xterm.css");
//library.
let angular = require("angular");
let Terminal = require("xterm");
let electron = require("electron");
let ssh2 = require("ssh2");

let Client = ssh2.Client;

angular.module('BlankApp', [])

.controller('mainController', ['$scope', function($scope) {
	$scope.show1 = 'hello';
}]);









let term = new Terminal();
term.open(document.getElementById("#terminal"));


let conn = new Client();
let ssh_stream = null;

term.on('key', (key, e) => {
	ssh_stream.write(key);
});
term.on('open', () => {
	term.fit();
});

conn.on('ready', () => {
	console.log('Client :: ready');
	conn.shell((err, stream) => {
		if(err) {
			throw err;
		}
		ssh_stream = stream;
		stream.on('close', (code, signal) => {
			console.log('Stream :: Close :: code: ' + code + ', signal: ' + signal);
			conn.end();
			term.write("CLOSED.");
			ssh_stream = null;
		});
		stream.on('data', (data) => {
			console.log(data);
			term.write(new TextDecoder("utf-8").decode(data));
		});
		stream.stderr.on('data', (data) => {
			console.log("STDERR: " + data);
			term.write(new TextDecoder("utf-8").decode(data));
		});
	});
});

conn.connect({
	host: '192.168.0.1',
	port: 22,
	username: 'root',
	password: 'admin'
});

