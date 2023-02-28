const fs = require('fs')
const path = require('path');

fs.mkdir(path.join(__dirname, 'main'), (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory created');
});

const arrOfFolders = ['firstFolder', 'secondFolder', 'thirdFolder', 'fourthFolder', 'fifthFolder']
for (const folder of arrOfFolders) {fs.mkdir(path.join('main', folder),(err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory created');
})}

fs.writeFile(path.join('main','firstFolder', 'text1.txt'),'Hello 1', (err) => {
    if (err) throw new Error(err.message)
})

fs.writeFile(path.join('main','secondFolder', 'text2.txt'),'Hello 2', (err) => {
    if (err) throw new Error(err.message)
})

fs.writeFile(path.join('main','thirdFolder', 'text3.txt'),'Hello 3', (err) => {
    if (err) throw new Error(err.message)
})

fs.writeFile(path.join('main','fourthFolder', 'text4.txt'),'Hello 4', (err) => {
    if (err) throw new Error(err.message)
})

fs.writeFile(path.join('main','fifthFolder', 'text5.txt'),'Hello 5', (err) => {
    if (err) throw new Error(err.message)
})


fs.stat(path.join('main'), (err, stats)=>{
    if (err) throw new Error(err.message);
    console.log(`Is this directory: ${stats.isDirectory()}`);
    console.log(`Is this file: ${stats.isFile()}`);
})


fs.stat(path.join('main','firstFolder'), (err, stats)=>{
    if (err) throw new Error(err.message);
    console.log(`Is this directory: ${stats.isDirectory()}`);
    console.log(`Is this file: ${stats.isFile()}`);
})


fs.stat(path.join('main','fifthFolder'), (err, stats)=>{
    if (err) throw new Error(err.message);
    console.log(`Is this directory: ${stats.isDirectory()}`);
    console.log(`Is this file: ${stats.isFile()}`);
})

fs.stat(path.join('main','firstFolder','text1.txt'), (err, stats)=>{
    if (err) throw new Error(err.message);
    console.log(`Is this directory: ${stats.isDirectory()}`);
    console.log(`Is this file: ${stats.isFile()}`);
})

fs.stat(path.join('main','fifthFolder','text5.txt'), (err, stats)=>{
    if (err) throw new Error(err.message);
    console.log(`Is this directory: ${stats.isDirectory()}`);
    console.log(`Is this file: ${stats.isFile()}`);
})
