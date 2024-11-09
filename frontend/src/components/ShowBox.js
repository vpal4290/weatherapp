import './ShowBox.css';
import {useState} from "react";
export default function ShowBox()
{
   const [city, setCity] = useState("");
   const [weather, setWeather] = useState();

//    const WEATHER_API_KEY = '55db68ed5b664d5bb6780243240411';
//    const LANG_CODE = 'en-IN';

   
   
   let  getTemperatureInfo = async () => {
        try{
            let reqUrl=`http://127.0.0.1:5001/temperature?city=${city}`;
            let response = await fetch(reqUrl);
            
//`https://api.weatherapi.com/v1/current.json?q=${city}&lang=${LANG_CODE}&key=${WEATHER_API_KEY}`
            let jsonRespose = await response.json();
            console.log(jsonRespose);
            setWeather(jsonRespose);}
            
            
        catch(error){
            console.log("error",error);
        }
}

   function handleSubmit(event)
        {
            // event.preventDefault();
            // console.log(city)
            setCity("");
            getTemperatureInfo();

        }

    function handleChange(event)
        {
            setCity(event.target.value);     
        }


   return(
<div id="mainBox">
    <div id="box">

        <input type="text" placeholder="Enter The City Name" id="inputId" value={city} onChange={handleChange}></input>

        <button id="btn" type="submit" onClick={handleSubmit}>Check Weather</button>

        {weather ? <>
            <div id="para">
                <h3>Current Weather< span>{weather.location.localtime}</span></h3>
                    <div id="left">
                        <h2>🌤️ {weather.current.temp_c} &deg; C</h2>
                        <h4>{weather.current.condition.text}</h4>
                            <div id="left1">
                                <p>UV Index </p>  <hr></hr>
                                <p>Wind</p><hr></hr>
                                <p>Wind Gusts</p><hr></hr>
                                <p>Humidity</p> <hr></hr>
                          
                            
                            </div>
                            <div id="left2">
                                <p>{weather.current.uv}</p><hr></hr>
                                <p>{weather.current.wind_kph}km/h</p><hr></hr>
                                <p>{weather.current.gust_kph}km/h</p><hr></hr>
                                <p>{weather.current.humidity}</p><hr></hr>

                            </div>
                        
                    </div>
                    <div id="right">
                        <h4>{weather.location.name}</h4>
                            <div id="right1">
                                <p>Real Feel </p>  <hr></hr>
                                <p>Pressure</p><hr></hr>
                                <p>Visibility</p><hr></hr>
                                <p>Dew Point</p> <hr></hr>
                           
                            </div>
                            <div id="right2">
                                <p>{weather.current.feelslike_c}&deg;C</p><hr></hr>
                                <p>{weather.current.pressure_in}</p><hr></hr>
                                <p>{weather.current.vis_km}km</p><hr></hr>
                                <p>{weather.current.dewpoint_c}</p><hr></hr>

                            </div>
                      
                    </div>
                    <div >     
                        <p id="info">Country- {weather.location.country}</p>
                        <p id="info2"> Region- {weather.location.region}</p>

                    </div> 
            
            </div>
           

        </>: 
            <div>
                <h2 style={{margin:"60px"}}>Please Enter the City name</h2>
            </div> }
        
 
    </div>
</div>
)}
