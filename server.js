const express = require('express');
const app = express();

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
app.use(express.static(__dirname + '/public'));