import React,{Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ForecastPresenter from './ForecastPresenter';


const Container=styled.div``;
const Row=styled.div``;
const Col=styled.div``;

const API_KEY="6d6f0aa47313879f0e43029f6c4b03ca";

export default class extends React.Component{
  _isMounted = false;
    state={
            isLoading:true,
            error:null,
            data:null
        };
      //  this.showLocation=this.showLocation.bind(this)
    
    getWeather = async (latitude, longitude) => {
      if(latitude!==undefined && longitude !==undefined){
        const {data} = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
        );
        // console.log(data);
        this.setState({ isLoading: false, temp: data.main.temp, data:data});
      }
    };

    componentDidMount() {
      this.getLocation();
      this.showLocation();
      this._isMounted = true;
    }

    componentWillUnmount() {
      this._isMounted = false;
    }
    

    showLocation = async (position) => {
      if(position){
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
    }
      await this.getWeather(latitude, longitude)
      // alert("Latitude : " + latitude + " Longitude: " + longitude);
   }

    getLocation = async () => {
      try{
        if(navigator.geolocation){
        const location = await navigator.geolocation.getCurrentPosition(this.showLocation);
        console.log(location);
      }
      }catch{
        this.setState({ error: "Can't find anything." });
      }finally {
        this.setState({ isloading: false });
      }
    }

    

    

render(){
  const{isLoading,temp,data}=this.state
  // console.log(temp)
    return(
        <div>
          {isLoading===false?<ForecastPresenter 
        temp={Math.round(temp)}
        data={data} 
        isLoading={isLoading}
        />:""}
        </div>
        
    );
}
}