/*
var electron = require("electron");
var ipcRenderer = electron.ipcRenderer;
var term = new Terminal();
term.open(document.getElementById("#terminal"));

ipcRenderer.on('data', (evt, msg) => {
	console.log(msg);
	console.log(typeof(msg));
	term.write(new TextDecoder("utf-8").decode(msg));
});

term.fit();

term.on('key', (key, e) => {
	console.log(e);
	console.log(key);
	ipcRenderer.send('keypress', key);
});
*/

require("./render.css");
require("./node_modules/xterm/dist/xterm.css");
require("angular");
let Terminal = require("xterm");


angular.module('BlankApp', []);

let term = new Terminal();
term.open(document.getElementById("#terminal"));
