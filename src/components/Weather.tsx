import React from "react";

type WeatherState = {
  
    coords: [number, number],
    weather: object[],
    temp: number | null,
    main: string
}

type WeatherDisplayProps={
    weather: string
}

// type WeatherApi={
//   weather: {main:string}[]
//   main: {temp: number}
// }


class Weather extends React.Component<{}, WeatherState>{
    constructor(props: {}){
        super(props)
        this.state = {
          coords: [0, 0],
          weather:[],
          temp: null,
          main: ""
        }
    }

      
      weatherfetch= () => {
          navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                coords: [position.coords.latitude, position.coords.longitude],
              })
              console.log(this.state.coords)
              fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.coords[0]}&lon=${this.state.coords[1]}&appid=c03b4026b8715cc7b0d9debdd70d763a`, {
                method: 'GET'
              }).then(res => res.json())
              .then(res => {
                console.log(res)
                this.setState({
                  weather: res.weather[0].main,
                  temp: res.main.temp

                })
                console.log(this.state.weather)
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
            <WeatherDisplay weather={this.state.weather}  />
          </div>
        )
      }
    }

    const WeatherDisplay = (props:WeatherDisplayProps) => {
      return (
        <div>
          <h1>{props.weather}</h1>
        </div>
      )
    }


export default Weather;