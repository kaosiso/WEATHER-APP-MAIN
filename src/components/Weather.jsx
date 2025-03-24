import React, { useEffect, useState, useRef } from "react";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const Weather = () => {

  const inputRef = useRef()

  const [weatherData, setWeatherData] = useState(false)

  const allIcons = {
    "01d" : clear_icon,
     "01n" : clear_icon,
     "02d" : cloud_icon,
     "03d" : cloud_icon,
     "03n" : cloud_icon,
     "04d" : drizzle_icon,
     "04n" : drizzle_icon,
     "09d" : rain_icon,
     "09n" : rain_icon,
     "10d" : rain_icon,
     "10n" : rain_icon,
     "13d" : snow_icon,
     "13n" : snow_icon,
  }


  const search = async (city) => {

    if(city ===""){
      alert("Enter city Name:");
      return;
    }


    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon

      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon : icon

      })
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data")
     
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="place-items-start place-self-center rounded-2xl align-items p-10 bg-sky-300 ">
      <div className="  flex flex-row items-center gap-2 mt-0">
        <input ref={inputRef}
          className="bg-white h-10 w-60 rounded-2xl border-none outline-none text-[14px] px-4"
          type="text"
          placeholder="search bar"
        />
        <img
          className="w-9 bg-white h-10 rounded-2xl p-1.5"
          src={search_icon}
          alt=""
          onClick={()=>search(inputRef.current.value)}
        />
      </div>
      {weatherData?<>

      
      <img src={weatherData.icon} alt="" className="w-50 mx-3 my-0" />
      <p className="">{weatherData.temperature}℃</p>
      <p className="">{weatherData.location}</p>
      <div className="w-full mt-4 text-white flex gap-3 justify-between">
        <div className=" items-start gap-1.5">
          <img className="w-[18px] mt-[5px]" src={humidity_icon} alt="" />
          <p>{weatherData.humidity}</p>
          <span className="block text-[16px]">Humidity</span>
        </div>
        <div className=" items-start gap-1.5">
          <img className="w-[18px] mt-[5px]" src={wind_icon} alt="" />
          <p>{weatherData.windspeed}Km/hr</p>
          <span className="block text-[16px]">Wind Speed</span>
        </div>
      </div>
      </>:<></>}
    </div>
  );
};

export default Weather;
