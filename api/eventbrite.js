const axios = require('axios');
const querystring = require('querystring');

const authUrl = `https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=${process.env.api_key}&redirect_uri=${process.env.redirect_uri}`


const getUserToken = async (code) => { 
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    const params = {
      grant_type: "authorization_code",
      client_id:  process.env.api_key,
      client_secret:  process.env.client_secret,
      code: code,
      redirect_uri:  process.env.redirect_uri
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
const base_url = "https://www.eventbriteapi.com/v3";


const userIsAttending = async (email) => {
   const http = axios.create({
      baseURL: base_url,
      timeout: 2000,
      headers: {'Authorization': 'Bearer ' + process.env.api_key }
  });

  const endpoint = "/events/" + process.env.event_id + "/orders/";

  const params = { status: "active", only_emails: email };

  try {
    const result = await http.get(base_url + endpoint , { params });
    const { orders } = result.data; 
    return orders.length > 0;
  } catch (e) {
    console.log(e);
    return false
  }
}

const getUser = async (token) => { 
    const params = { token };

    try{
      const endpoint = "/users/me/";
      const result = await axios.get(base_url + endpoint, { params });
      const user = result.data;

      const userEmail = user.emails[0].email;

      const isAttending = await userIsAttending(userEmail);
      
      return { id: user.id, isAttending }

    } catch (e) {
      throw e.response.data;
    }

}

module.exports = { authUrl, getUserToken, userIsAttending, getUser }