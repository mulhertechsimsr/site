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
  const userIsAttending = req.session.userIsAttending;

  const code = req.query && req.query.code ? req.query.code : true;
  const items = req.query && req.query.items? req.query.items : false;
  
  if(!user && code) {
      
    authenticate(req, res, code);

  } else if(user && items) {

    saveItems(req, res, items);
    
  } else if(user && userIsAttending) {

    res.render('./encomendas', {
      title: 'Lojinha',
      authUrl: eventbrite.authUrl 
    });

  } else if(user) {
    res.render('./encomendas-inscrevase', {
        title: 'Lojinha',
        authUrl: eventbrite.authUrl
      });
  } else {

    res.render('./encomendas-login', {
      title: 'Lojinha',
      authUrl: eventbrite.authUrl
    });
  }

  })


const authenticate = async (req,res, code) => {

  const id = await eventbrite.getUserToken(code)
  .then(eventbrite.getUser)
  .then( user => {
    req.session.user = user.id; 
    req.session.userIsAttending = user.isAttending; 

    if(req.session.userIsAttending) {
      res.render('./encomendas', {
        title: 'Lojinha',
        authUrl: eventbrite.authUrl
      });
    } else {
      res.render('./encomendas-inscrevase', {
        title: 'Lojinha',
        authUrl: eventbrite.authUrl
      });
    }

  })
  .catch(e => {
    res.render('./encomendas-erro', {
      title: 'Lojinha',
      authUrl: eventbrite.authUrl
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
        authUrl: eventbrite.authUrl 
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
