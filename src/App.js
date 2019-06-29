import React from "react";
import Titles from "./Components/Titles";
import Form from "./Components/Form";
import Weather from "./Components/Weather";
require('dotenv').config()

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class App extends React.Component {
  //Defines State
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  
  getWeather = async (e) => {
    e.preventDefault();
    //Creates the inputs
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    //API call + convert to JSON
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
    const data = await api_call.json();

    //When city/country entered, get data from JSON
    if (city && country) {
      console.log(data);
      this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: "",
    });
    //When no city/country, return error
    } else {
      this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: "Please enter City & Country",
      });
    }
  }

  //Render to browser
  render() {
    return(
      <div>
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-5 title-container">
                <Titles />
              </div>
              <div className="col-xs-7 form-container">
                <Form getWeather={this.getWeather}/>
                <Weather temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };
}





export default App;