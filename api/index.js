const axios = require('axios');

module.exports = async (req, res) => {

    var data = JSON.stringify({"device":"samsung"});

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
    const { name = 'World' } = req.query
    res.status(200).send(`Namaste ${name}!`)
    })
    .catch(function (error) {
    console.log(error);
    const { name = 'World' } = req.query
    res.status(200).send(`Namaste ${name}!`)
    });
}
