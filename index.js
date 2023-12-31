const fs = require('fs');
const http = require('http');
const url = require('url')

const replaceTemplate = require('./modules/replaceTemplate')


// http server
// preload temlates
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productDataObject = JSON.parse(data);

const server = http.createServer((req, res) => {

  const {query, pathname} = url.parse(req.url, true)

  // overview
  if(pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html'});

    const cardsHtml = productDataObject.map(el => replaceTemplate(templateCard, el)).join('');

    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
    res.end(output);

    // product
  } else if(pathname === '/product') {

    const product = productDataObject[query.id]
    res.writeHead(200, { 'Content-type': 'text/html'});
    const output = replaceTemplate(templateProduct, product)
    res.end(output);

  // api
  } else if(pathname === '/api') {
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
