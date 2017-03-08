//css
require("./render.css");
require("./node_modules/xterm/dist/xterm.css");
//library.
let angular = require("angular");
let Terminal = require("xterm");
Terminal.loadAddon('fit');

let electron = require("electron");
let ssh2 = require("ssh2");
let Client = ssh2.Client;

angular.module('BlankApp', [])

.controller('mainController', ['$scope', function($scope) {
    $scope.show1 = 'hello';
}]);


let term = new Terminal();
term.open(document.getElementById("#terminal1"));
term.writeln('Zshell Build 2017.03.08');
term.writeln('Copyright (c) 2016-∞ sun@chengcheng. All rights reserved.');
term.writeln("");
term.writeln("Type `help' to learn how to use Zshell prompt.");
term.write("[~]$ ");
term.fit();

let conn = new Client();
let ssh_stream = null;
let ssh_ping_timer = null;

term.on('key', (key, e) => {
    ssh_stream.write(key);
});

conn.on('ready', () => {
    console.log('Client :: ready');
    conn.shell((err, stream) => {
        ssh_ping_timer = setInterval(() => {
            if (!!!ssh_stream) {
                clearInterval(ssh_ping_timer);
            }
            console.log('ssh ping.');
            ssh_stream._client._sshstream.ping();
        }, 60 * 1000);
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
console.log('prepare connect to remote host.');