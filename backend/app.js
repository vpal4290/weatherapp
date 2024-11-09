const express = require('express'); // import expressjs module (3rd party) in script


const WEATHER_API_KEY = '55db68ed5b664d5bb6780243240411'; // Weather API registered API Key
const LANG_CODE = 'en-IN'; //Language Code for English India (en-IN)
const port = 5001;

const getTemperatureInfo = (cityName) => { //3rd party API for Weather Info
    let weatherAPIUrl = `https://api.weatherapi.com/v1/current.json?q=${cityName}&lang=${LANG_CODE}&key=${WEATHER_API_KEY}`;
    console.log(weatherAPIUrl);
    return fetch(weatherAPIUrl)
}

const app = express(); // get object of express
app.use(express.json()); // to enable json format in request/response

app.get('/', (req, res) => {
    res.send("Hello, world!")
});// create an endpoint / on app object

app.get('/temperature/:city', (req, res) => {//multi level promise
    let inputCity = req.params.city;
    getTemperatureInfo(inputCity)
    .then((result) => {
        return result.json()
    })
    .then((json) => {
        res.send(json);
    }).catch((err) => {
        console.log(err);
    });    
}); // create an endpoint /temperature/city on app object

app.get('/temperature', async (req, res) => {//async-await to block event loop to finish current call
    try {
        let inputCity = req.query.city;
        console.log(inputCity);
        let result = await getTemperatureInfo(inputCity);
        let json = await result.json();
        res.send(json);
    } catch (err) {
        console.error(err);
    }
});// create an endpoint /temperature on app object

app.listen(port, () => {
    console.log(`App is running on ${port}`);
});