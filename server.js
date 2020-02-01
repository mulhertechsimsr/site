const express = require('express');
const app = express();

const server = app.listen(7000, () => {
  console.log(`Express running on address: http://localhost:${server.address().port}`);
});

app.get('/', (req, res) => {
  res.render('index', {
  	title: 'Mulher Tech Sim Senhor'
	});
});

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));