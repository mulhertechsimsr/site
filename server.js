const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Umbler listening on 	port: ${port}`);
});

app.get('/inscricoes', (req, res) => {
  res.redirect("https://mulhertechsimsr2020.eventbrite.com.br/");
});

app.get('/encomendas', (req, res) => {
  res.redirect("https://mulhertechsimsenhor.typeform.com/to/dydGbB");
});

app.get('/encomendas/camisas', (req, res) => {
  res.redirect("https://drive.google.com/drive/u/0/folders/1QB_aFjcRJH5fDM8fYDtDAB0JJlrz8oK1");
});

app.get('/encomendas/cadernos', (req, res) => {
  res.redirect("https://drive.google.com/drive/u/0/folders/1YA4QH312iWTh54X4GL4i7GMCTkBiWMYC");
});

app.get('/', (req, res) => {
  res.render('./index', {
  	title: 'Mulher Tech Sim Senhor'
	});
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/past_years'));

var fs = require('fs');
global.content = JSON.parse(fs.readFileSync(__dirname + '/content.json', 'utf8'));