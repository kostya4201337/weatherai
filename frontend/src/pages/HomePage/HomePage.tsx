import "../styles.css"
import "./HomePage.css"
import windIcon from "../../assets/sideInfoIcons/wind-icon.png"
import pressureIcon from "../../assets/sideInfoIcons/pressure-icon.png"
import wetIcon from "../../assets/sideInfoIcons/wet-icon.png"
import HourStatus from "./components/HourStatus/HourStatus.tsx"
import {WeatherTypes} from "../../common/constants/weatherTypes.ts";

import ClearBackground from "../../assets/weatherBackgrounds/clear-background.png"
import CloudyBackground from "../../assets/weatherBackgrounds/cloudy-background.png"
import OvercastBackground from "../../assets/weatherBackgrounds/overcast-background.png"
import RainBackground from "../../assets/weatherBackgrounds/rain-background.png"
import SnowBackground from "../../assets/weatherBackgrounds/snow-background.png"
import StormBackground from "../../assets/weatherBackgrounds/storm-background.png"

import ClearIcon from "../../assets/weatherIcons/clear-icon.png"
import OvercastIcon from "../../assets/weatherIcons/overcast-icon.png"
import CloudyIcon from "../../assets/weatherIcons/cloudy-icon.png"
import RainIcon from "../../assets/weatherIcons/rain-icon.png"
import SnowIcon from "../../assets/weatherIcons/snow-icon.png"
import StormIcon from "../../assets/weatherIcons/storm-icon.png"

import Timer from "./components/Timer.tsx";
import DayForecast from "./components/DayForecast/DayForecast.tsx";
import {useEffect, useState} from "react";
import {IHour} from "../../types/hours.ts";
import {IDay} from "../../types/day.ts";

const initialCurrent: IDay = {
    temperature_2m: 0,
    temperature_night_2m: 0,
    humidity: 0,
    wind_speed: 0,
    wind_direction: 0,
    WMO_code: 0,
    pressure: 0,
    day_of_week: "Пн",
    datetime: "1"
}

export default function HomePage() {
    const [hours, setHours] = useState<IHour[]>([]);
    const [days, setDays] = useState<IDay[]>([]);
    const [current, setCurrent] = useState<IDay>(initialCurrent);
    let srcBackground;
    let srcWeatherIcon;
    type mapWeatherCode = Record<number, WeatherTypes>;
    const codes: mapWeatherCode = {
        0: WeatherTypes.CLEAR,
        1: WeatherTypes.CLEAR,
        2: WeatherTypes.CLOUDY,
        3: WeatherTypes.CLOUDY,
        45: WeatherTypes.OVERCAST,
        48: WeatherTypes.OVERCAST,
        51: WeatherTypes.RAIN,
        53: WeatherTypes.RAIN,
        55: WeatherTypes.RAIN,
        56: WeatherTypes.RAIN,
        57: WeatherTypes.RAIN,
        61: WeatherTypes.RAIN,
        63: WeatherTypes.RAIN,
        65: WeatherTypes.RAIN,
        66: WeatherTypes.RAIN,
        67: WeatherTypes.RAIN,
        71: WeatherTypes.SNOW,
        73: WeatherTypes.SNOW,
        75: WeatherTypes.SNOW,
        77: WeatherTypes.SNOW,
        80: WeatherTypes.RAIN,
        81: WeatherTypes.RAIN,
        82: WeatherTypes.RAIN,
        85: WeatherTypes.RAIN,
        86: WeatherTypes.RAIN,
        95: WeatherTypes.STORM,
        96: WeatherTypes.STORM,
        99: WeatherTypes.STORM,
    };
    switch (codes[current.WMO_code]) {
        case WeatherTypes.CLEAR.toString():
            srcBackground = ClearBackground;
            srcWeatherIcon = ClearIcon;
            break;
        case WeatherTypes.CLOUDY.toString():
            srcBackground = CloudyBackground;
            srcWeatherIcon = CloudyIcon;
            break;
        case WeatherTypes.OVERCAST.toString():
            srcBackground = OvercastBackground;
            srcWeatherIcon = OvercastIcon;
            break;
        case WeatherTypes.RAIN.toString():
            srcBackground = RainBackground;
            srcWeatherIcon = RainIcon;
            break;
        case WeatherTypes.STORM.toString():
            srcBackground = StormBackground;
            srcWeatherIcon = StormIcon;
            break;
        case WeatherTypes.SNOW.toString():
            srcBackground = SnowBackground;
            srcWeatherIcon = SnowIcon;
            break;
        default:
            srcBackground = ClearBackground;
            srcWeatherIcon = ClearIcon;
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://127.0.0.1:5000/api/prediction?city=Irkutsk&period=weekp');
            const jsonResult = await result.json();
            setCurrent(jsonResult.today[0])
            setHours(jsonResult.hourly.splice(1, 12));
            setDays(jsonResult.daily)
            console.log(jsonResult.hourly);
            console.log(jsonResult.daily);

        }
        fetchData()
        console.log(hours);
        console.log(days)
    }, [hours, days, current]);


    // console.log(hours[0].weather_code)
    // console.log(hours.splice(1, 12))

    console.log(hours);
    console.log(days);


    return (
      <div className="page-container">
          <div className="inline-div upper-half">
              <div className="vert-div">
                  <div>
                      <p className="location-text">Иркутск, микрорайон Университетский</p>
                      <Timer/>
                  </div>
                  <div className="inline-div">
                      <p className="current-temp-text">{Math.round(current.temperature_2m)}°</p>
                      <div className="goofy-wrap">
                          <div className="inline-div weather-bar">
                              <img src={srcWeatherIcon} alt="sunny-icon" className="weather-icon"/>
                              <div>
                                  <div className="weather-status-div" style={{width: 60 * Math.pow(100, 1/codes[current.WMO_code].length)}}><p className="weather-status">{codes[current.WMO_code]}</p></div>
                                  <p className="feeling-temp">Ощущается как {Math.round(current.temperature_2m - 5)}°</p>
                              </div>
                          </div>
                      </div>
                      <div className="vert-div side-info-container">
                          <div className="side-info">
                              <img src={windIcon} alt="wind-icon" className="wind-icon"/>
                          </div>
                          <div className="side-info">
                              <img src={pressureIcon} alt="pressure-icon" className="pressure-icon"/>
                          </div>
                          <div className="side-info">
                              <img src={wetIcon} alt="wet-icon" className="wet-icon"/>
                          </div>
                      </div>
                      <div className="side-info-text-container">
                          <div className="side-info-text"><p>{Math.round(current.wind_speed)} м/c, Ю↑</p></div>
                          <div className="side-info-text"><p>{Math.round(current.pressure)} гПа.</p></div>
                          <div className="side-info-text"><p>{Math.round(current.humidity)}%</p></div>
                      </div>
                  </div>
                  <div className="inline-div hours">
                      {/*<HourStatus hour={15} temp={-13} type={WeatherTypes.SNOW}/>*/}
                      {/*<HourStatus hour={16} temp={9} type={WeatherTypes.OVERCAST}/>*/}
                      {/*<HourStatus hour={17} temp={0} type={WeatherTypes.CLOUDY}/>*/}
                      {/*<HourStatus hour={18} temp={-10} type={WeatherTypes.RAIN}/>*/}
                      {/*<HourStatus hour={19} temp={30} type={WeatherTypes.CLEAR}/>*/}
                      {/*<HourStatus hour={20} temp={-66} type={WeatherTypes.STORM}/>*/}
                      {/*<HourStatus hour={21} temp={-13} type={WeatherTypes.SNOW}/>*/}
                      {/*<HourStatus hour={22} temp={9} type={WeatherTypes.OVERCAST}/>*/}
                      {/*<HourStatus hour={23} temp={0} type={WeatherTypes.CLOUDY}/>*/}
                      {/*<HourStatus hour={0} temp={-10} type={WeatherTypes.RAIN}/>*/}
                      {/*<HourStatus hour={1} temp={30} type={WeatherTypes.CLEAR}/>*/}
                      {/*<HourStatus hour={2} temp={-66} type={WeatherTypes.STORM}/>*/}
                      {hours.map((hour, key) => (
                          <HourStatus
                              key={key}
                              hour={Number(hour.datetime.slice(11, 13)) >= 16 ? Number(hour.datetime.slice(11, 13)) - 16 : Number(hour.datetime.slice(11, 13)) + 8}
                              temp={Math.round(hour.temperature)}
                              type={codes[hour.weather_code]}
                          />
                      ))}
                  </div>
              </div>
              <div className="cringe-wrap">
                  <div className="goofy-wrap2">
                      <div className="background">
                          <img src={srcBackground} alt="weather-background" className="background"/>
                      </div>
                  </div>
              </div>
          </div>
          <div className="ten-days-container">
              <div className="ten-days-wrap">
                  <p className="ten-days-container-title">Прогноз на 10 дней</p>
                  <div className="inline-div days-scroll-list">
                      {/*<DayForecast weekDay="Пн" day={13} month="Декабрь" tempDay={-15} tempNight={-21}*/}
                      {/*             tempFeeling={-19} type={WeatherTypes.SNOW} wind={10} windDirection="ЮВ"*/}
                      {/*             pressure={728} wet={40}/>*/}
                      {/*<DayForecast weekDay="Вт" day={14} month="Декабрь" tempDay={-20} tempNight={-30}*/}
                      {/*             tempFeeling={-24} type={WeatherTypes.SNOW} wind={20} windDirection="З"*/}
                      {/*             pressure={709} wet={80}/>*/}
                      {/*<DayForecast weekDay="Ср" day={15} month="Декабрь" tempDay={0} tempNight={10} tempFeeling={-5}*/}
                      {/*             type={WeatherTypes.RAIN} wind={3} windDirection="СЗ" pressure={654} wet={10}/>*/}
                      {/*<DayForecast weekDay="Чт" day={16} month="Декабрь" tempDay={21} tempNight={-9}*/}
                      {/*             tempFeeling={19} type={WeatherTypes.CLEAR} wind={10} windDirection="ЮВ"*/}
                      {/*             pressure={728} wet={40}/>*/}
                      {/*<DayForecast weekDay="Пт" day={17} month="Декабрь" tempDay={21} tempNight={-9}*/}
                      {/*             tempFeeling={19} type={WeatherTypes.CLOUDY} wind={10} windDirection="ЮВ"*/}
                      {/*             pressure={728} wet={40}/>*/}
                      {/*<DayForecast weekDay="Сб" day={18} month="Декабрь" tempDay={21} tempNight={-9}*/}
                      {/*             tempFeeling={19} type={WeatherTypes.SNOW} wind={10} windDirection="ЮВ"*/}
                      {/*             pressure={728} wet={40}/>*/}
                      {/*<DayForecast weekDay="Вс" day={19} month="Декабрь" tempDay={21} tempNight={-9}*/}
                      {/*             tempFeeling={19} type={WeatherTypes.OVERCAST} wind={10} windDirection="ЮВ"*/}
                      {/*             pressure={728} wet={40}/>*/}
                      {/*<DayForecast weekDay="Пн" day={19} month="Декабрь" tempDay={21} tempNight={-9}*/}
                      {/*             tempFeeling={19} type={WeatherTypes.OVERCAST} wind={10} windDirection="ЮВ"*/}
                      {/*             pressure={728} wet={40}/>*/}
                      {/*<DayForecast weekDay="Вт" day={19} month="Декабрь" tempDay={21} tempNight={-9}*/}
                      {/*             tempFeeling={19} type={WeatherTypes.OVERCAST} wind={10} windDirection="ЮВ"*/}
                      {/*             pressure={728} wet={40}/>*/}
                      {/*<DayForecast weekDay="Ср" day={19} month="Декабрь" tempDay={21} tempNight={-9}*/}
                      {/*             tempFeeling={19} type={WeatherTypes.OVERCAST} wind={10} windDirection="ЮВ"*/}
                      {/*             pressure={728} wet={40}/>*/}

                      {days.map((day, key) => (
                          <DayForecast
                              key={key}
                              weekDay={day.day_of_week.charAt(0) + day.day_of_week.charAt(1).toLowerCase()}
                              day={Number(day.datetime.slice(8, 10))}
                              month="Март"
                              tempDay={Math.round(day.temperature_2m)}
                              tempNight={Math.round(day.temperature_night_2m)}
                              tempFeeling={Math.round(day.temperature_2m)}
                              type={codes[day.WMO_code]}
                              wind={Math.round(day.wind_speed)}
                              windDirection="ЮВ"
                              pressure={Math.round(day.pressure)}
                              wet={Math.round(day.humidity)}
                          />
                      ))}
                  </div>
              </div>
          </div>
      </div>
    );
}