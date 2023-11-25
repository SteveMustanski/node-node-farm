const fs = require('fs');
const http = require('http');
const url = require('url')

// // this section is blocking / synchronous 
// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textInput);
// const textOut = `This is what we know about the avocado: ${textInput}. \n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log(textOut);
// console.log('File update complete!');

// // this section is non-blocking / asynchronous
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//   if (err) return console.log('ERROR!')
//   fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
//     fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//       fs.writeFile('.txt/final.txt', `${data2} \n ${data3}`, 'utf-8', err => {
//         console.log('File has been writen 📁')
//       })
//     });
//   });
// });

// http server

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%ID%}/g, product.id);

  if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

  return output;
}

// preload temlates
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productDataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // overview
  if(pathName === '/' || pathName === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html'});

    const cardsHtml = productDataObject.map(el => replaceTemplate(templateCard, el)).join('');

    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
    res.end(output);

    // product
  } else if(pathName === '/product') {
  res.end('This is the product!');

  // api
  } else if(pathName === '/api') {
     res.writeHead(200, { 'Content-type': 'application/json'})
     res.end(data);
  
  // not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html'
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server is listening on port 8000');
})
