const axios = require('axios');
const querystring = require('querystring');


global.api_key = "H3VFT5EEX6UMNPUZIY"
global.redirect_uri = "http://1cd9c1a9.ngrok.io/encomendas"

module.exports.getUserToken = async (code) => { 

    const client_secret = "Q24MSHCTDXU6KF46X2SQOD6S4QQV2IZEW3PSIOEN55VJNRCV3K";
  
  
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    const params = {
      grant_type: "authorization_code",
      client_id: api_key,
      client_secret: client_secret,
      code: code,
      redirect_uri: redirect_uri
    }

    const http = axios.create({
      baseURL: 'https://www.eventbrite.com/',
      timeout: 2000,
      headers: {'X-Custom-Header': 'foobar'}
    });

    try {
      const result = await http.post("/oauth/token", querystring.stringify(params));
      const { access_token } = result.data;
      return access_token; 

    } catch (e) { 
      throw e.response.data;
    }

}


module.exports.getUserId = async (token) => { 
  const base_url = "https://www.eventbriteapi.com/v3";
  const endpoint = "/users/me/";
  const params = { token };

  try{
    const result = await axios.get(base_url + endpoint, { params });
    const user = result.data;

    return user.id
  } catch (e) {
    throw e.response.data;
  }

}