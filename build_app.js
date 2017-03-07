let fs = require("fs");
let asar = require("asar");

let copy = (src, dst) => {
    fs.readFile(src, (err, data) => {
        if (err) throw err;
        fs.writeFile(dst, data, (err) => {
            if (err) throw err;
        });
    });
};

fs.stat('dist/tmp', (err, stat) => {
    if (err) {
        fs.mkdirSync('dist/tmp');
    }
    fs.stat('dist/tmp/dist', (err, stat) => {
        if (err) {
            fs.mkdirSync('dist/tmp/dist');
        }
    });
});

copy('dist/render.bundle.js', 'dist/tmp/dist/render.bundle.js');
copy('package.json', 'dist/tmp/package.json');
copy('main.js', 'dist/tmp/main.js');
copy('render.html', 'dist/tmp/render.html');

let src = "dist/tmp";
let dest = "dist/app.asar";

asar.createPackage(src, dest, () => {
    console.log('done');
    // fs.rmdir('dist/tmp', (err) => {
    //     if (err) {
    //         console.log('done, but rmdir dist/tmp failed.');
    //     }
    // });
});