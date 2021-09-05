import React from "react";

type WeatherState = {
  
    coords: [number, number],
    weather: string,
    temp: number | null,
    speed: string,
    cityname: string
}

type WeatherDisplayProps={
    weather: string,
    temp: number | null,
    speed: string,
    cityname: string
}

class Weather extends React.Component<{}, WeatherState>{
    constructor(props: {}){
        super(props)
        this.state = {
          coords: [0, 0],
          weather:"",
          temp: null,
          speed: "",
          cityname: ""
        }
    }
      
      weatherfetch= () => {
          navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                coords: [position.coords.latitude, position.coords.longitude],
              })
              fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.coords[0]}&lon=${this.state.coords[1]}&appid=c03b4026b8715cc7b0d9debdd70d763a`, {
                method: 'GET'
              }).then(res => res.json())
              .then(res => {
                this.setState({
                  weather: res.weather[0].main,
                  temp: res.main.temp,
                  speed: res.wind.speed,
                  cityname: res.name

                })
              }).catch((err) => console.log(err))
            });
            }

    // componentWillMount(){ ------- deprecated - we put instead inside of Constructor!!!!!!

    componentDidMount(){
      this.weatherfetch();
    }

      render(){
        return(
          <div>
            <WeatherDisplay weather={this.state.weather} speed={this.state.speed} temp={this.state.temp} cityname={this.state.cityname} />
          </div>
        )
      }
    }

    const WeatherDisplay = (props:WeatherDisplayProps) => {
      return (
        <div>
          <h1>City Name: {props.cityname}</h1>
          <h3>Weather: {props.weather}</h3>
          <h3>Speed: {props.speed}</h3>
          <h3>Temperature: {props.temp}</h3>
        </div>
      )
    }


export default Weather;