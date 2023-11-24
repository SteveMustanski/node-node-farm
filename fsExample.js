const fs = require('fs');


// this section is blocking / synchronous 
const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textInput);
const textOut = `This is what we know about the avocado: ${textInput}. \n Created on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log(textOut);
console.log('File update complete!');

// this section is non-blocking / asynchronous
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
  if (err) return console.log('ERROR!')
  fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
    fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
      fs.writeFile('.txt/final.txt', `${data2} \n ${data3}`, 'utf-8', err => {
        console.log('File has been writen 📁')
      })
    });
  });
});