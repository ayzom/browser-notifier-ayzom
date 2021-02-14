const axios = require('axios');
const webPush = require("web-push");

const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//app.use(cors());

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

app.post('/save-user', async (req, res) => {
    const subscription = req.body.subscription;
    
    const config = {
        method: 'post',
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
});

app.get("/vapidPublicKey", (req, res) => {
    res.send(VAPID_PUBLIC_KEY);
});

app.get("/inform-owner", async (req,res) => {
  
    let subscription = {
      "endpoint" : "https://fcm.googleapis.com/fcm/send/d2K6w8w8TQE:APA91bEUt1eVdpw7gMHEgHYrP9bnBkEk_riAIVAgD0s4hUu6cpgE6yfozX938sXPAHtkGPFsNmyIvcF-Ye6riqwJyu0f3R8XLHPmoLQWzS6pzchP9FrNq2lNuef8-07Cx4vuZmoAsGy7",
      "keys" : {
        "auth" : "QPxZ9RMrtu4PzULhKhZ8XQ",
        "p256dh" : "BMul_sxq2DbsjiE2vQaUK-VicxFwrBdEYdHoUJXlKL2m492bAwO1jShsbXioy_WhXDBXErhOWmQ6FnU3O8wUuJc"
      }
    }

    await webPush
    .sendNotification(subscription)
    .then(function (response) {
        console.log(response);
        return response;
    })
    .catch(function (error) {
        console.log(error);
        return error;
    });
    res.status(200).send(`Sent`);
})

app.post('/notify', async (req, res) => {
        const subscription = req.body.subscription;
        const payload = null;
        const options = {
            TTL: req.body.ttl,
        };
        
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

