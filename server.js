const express = require('express');
const app = express();
const path = require('path');
const eventbrite = require('./api/eventbrite');
const model = require('./database/model');

var cookieParser = require('cookie-parser');
var session = require('express-session'); 


app.use(cookieParser());
app.use(session({
    name: 'session',
    secret:  process.env.session_secret,
    saveUninitialized: true,
    resave: true,
    httpOnly: true
}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Umbler listening on 	port: ${port}`);
});

app.get('/', (req, res) => {
  res.render('./index', {
  	title: 'Mulher Tech Sim Senhor'
	});
});


app.get('/encomendas', async (req,res) => {

  const user = req.session.user;
  const code = req.query && req.query.code ? req.query.code : false;
  const items = req.query && req.query.items? req.query.items : false;
  
  if(!user && code) {
      
    authenticate(req, res, code);

  } else if(user && items) {

    saveItems(req, res, items);
    
  } else if(user) {

    res.render('./encomendas', {
      title: 'Lojinha',
      authUrl: `https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=${api_key}&redirect_uri=${redirect_uri}`
    });

  } else {

    res.render('./encomendas-login', {
      title: 'Lojinha',
      authUrl: `https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=${api_key}&redirect_uri=${redirect_uri}`
    });
  }

  })


const authenticate = async (req,res, code) => {

  console.log(code);

  // const token = "P3T6ZVHAHKRZDR2RSWIB";
  // const id = "163390035792";
  
  const id = await eventbrite.getUserToken(code)
  .then(eventbrite.getUserId)
  .then( id => {

    req.session.user = id; 
    res.render('./encomendas', {
      title: 'Lojinha',
      authUrl: `https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=${api_key}&redirect_uri=${redirect_uri}`
    });

  })
  .catch(e => {
    res.render('./encomendas-erro', {
      title: 'Lojinha',
      authUrl: `https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=${api_key}&redirect_uri=${redirect_uri}`
    });
    console.log("error", e)
  })
}

const saveItems = (req,res,items) => {
   console.log(items);
    
    model.insert([req.session.user, items])
    .then(save => {
      console.log("save!", save);

      res.render('./encomendas', {
        title: 'Lojinha',
        authUrl: `https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=${api_key}&redirect_uri=${redirect_uri}`
      });
      
    })
    .catch(e => console.log("error", e))
}


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/past_years'));

var fs = require('fs');
global.content = JSON.parse(fs.readFileSync(__dirname + '/content.json', 'utf8'));
global.lojinha = JSON.parse(fs.readFileSync(__dirname + '/lojinha.json', 'utf8'));
