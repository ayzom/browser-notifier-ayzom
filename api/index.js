var axios = require('axios');
const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Home Page Route'));

app.get('/about', (req, res) => res.send('About Page Route'));

app.get('/portfolio', (req, res) => res.send('Portfolio Page Route'));

app.get('/contact', (req, res) => res.send('Contact Page Route'));

app.get('/save-vapid', async (req, res) => {

    var data = JSON.stringify({"device":"ihpone"});
    
    var config = {
      method: 'put',
      url: 'https://ayzompush.firebaseio.com/index.json',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
    
    const { name = 'World' } = req.query
    res.status(200).send(`Namaste ${name}!`)

})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));

