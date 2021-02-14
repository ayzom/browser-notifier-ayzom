module.exports = async (req, res) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"device":"samsung123"});
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    await fetch("https://ayzompush.firebaseio.com/index.json", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
    const { name = 'World' } = req.query
    res.status(200).send(`Namaste ${name}!`)
}
