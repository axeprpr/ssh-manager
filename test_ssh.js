let {Client} = require("ssh2");
let {ipcMain} = require("electron");

let sender = null;
let conn = new Client();
function TestSSH(webContents) {
	conn.on('ready', () => {
		console.log('Client :: ready');
		conn.shell((err, stream) => {
			if(err) {
				throw err;
			}
			stream.on('close', (code, signal) => {
				console.log('Stream :: Close :: code: ' + code + ', signal: ' + signal);
				conn.end();
			});
			stream.on('data', (data) => {
				console.log(data);
				webContents.send('data', data);
			});
			stream.stderr.on('data', (data) => {
				console.log("STDERR: " + data);
				webContents.send('data', data);
			});

			ipcMain.on('keypress', (evt, arg) => {
				console.log(typeof(arg));
				console.log('recv key press' + arg);
				stream.write(arg);
			});
			stream.write('ls /\n');
			stream.write('\t\t');
		});
	});

	conn.connect({
		host: '192.168.8.219',
		port: 22,
		username: 'sunday',
		password: '123'
	});
}

module.exports = TestSSH;
