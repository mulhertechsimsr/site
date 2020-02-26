const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Umbler listening on 	port: ${port}`);
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