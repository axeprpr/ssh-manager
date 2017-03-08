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








Terminal.loadAddon('fit');
let term = new Terminal();
term.open(document.getElementById("#terminal1"));
term.fit();
console.log(term.element);

// let term2 = new Terminal();
// term2.open(document.getElementById("#terminal2"));
// term2.fit();
// console.log(term2.element);

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
        if (err) {
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
    host: '193.168.0.249',
    port: 22,
    username: 'coder',
    password: 'Stop2MkLove@night'
});