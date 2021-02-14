var axios = require('axios');
const webPush = require("web-push");

const express = require("express");
var bodyParser = require('body-parser')
var cors = require('cors')

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())

const VAPID_PUBLIC_KEY="BBupVJwAFiLot1JDseHWTugXwXqFwycSUZ9s3lEQWhtyG0HGN10e0qd5cn7Ob6FJGFu3pDhivqFn7HGgyDMF8_g";
const VAPID_PRIVATE_KEY="W3T4oLIY1ahRRjy8serG6RVDreEWLJdXPKEZ9ubv9MU";

webPush.setVapidDetails(
    'mailto:akhilesh@ayzom.com',
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
  );

app.get('/', (req, res) => res.send('Home Page Route'));

app.get('/about', (req, res) => res.send('About Page Route'));

app.get('/portfolio', (req, res) => res.send('Portfolio Page Route'));

app.get('/contact', (req, res) => res.send('Contact Page Route'));

app.post('/notify', async (req, res) => {
        const subscription = req.body.subscription;
        const payload = null;
        const options = {
            TTL: req.body.ttl,
        };
        const config = {
            method: 'put',
            url: 'https://ayzompush.firebaseio.com/index.json',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : JSON.stringify(subscription)
          };
          
          await axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });


        
        setTimeout(function () {
            webPush
            .sendNotification(subscription, payload, options)
            .then(function () {
                res.sendStatus(201);
            })
            .catch(function (error) {
                console.log(error);
                res.sendStatus(500);
            });
        }, req.body.delay * 1000);
});

app.get('/save-vapid', async (req, res) => {
    
    const { name = 'World' } = req.query
    res.status(200).send(`Namaste ${name}!`)

})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));

