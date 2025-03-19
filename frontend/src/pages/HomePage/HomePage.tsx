import "../styles.css"
import "./HomePage.css"
import sunnyIcon from "../../assets/weatherIcons/clear-icon.png"
import windIcon from "../../assets/sideInfoIcons/wind-icon.png"
import pressureIcon from "../../assets/sideInfoIcons/pressure-icon.png"
import wetIcon from "../../assets/sideInfoIcons/wet-icon.png"
import HourStatus from "./components/HourStatus/HourStatus.tsx"
import {WeatherTypes} from "../../common/constants/weatherTypes.ts";
import clearBackground from "../../assets/weatherBackgrounds/clear-background.png"
import DayForecast from "./components/DayForecast/DayForecast.tsx";

export default function HomePage() {
    return (
      <div className="page-container">
          <div className="inline-div upper-half">
              <div className="vert-div">
                  <div>
                      <p className="location-text">Иркутск, микрорайон Университетский</p>
                      <p className="date-text">1 апреля, воскресенье, сейчас 14:88</p>
                  </div>
                  <div className="inline-div">
                      <p className="current-temp-text">+19°</p>
                      <div className="goofy-wrap">
                          <div className="inline-div weather-bar">
                              <img src={sunnyIcon} alt="sunny-icon" className="weather-icon"/>
                              <div>
                                <p className="weather-status">Ясно</p>
                                <p className="feeling-temp">Ощущается как +15°</p>
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
                          <div className="side-info-text"><p>1 м/c, Ю↑</p></div>
                          <div className="side-info-text"><p>721 мм рт. ст.</p></div>
                          <div className="side-info-text"><p>65%</p></div>
                      </div>
                  </div>
                  <div className="inline-div">
                      <HourStatus hour={15} temp={-13} type={WeatherTypes.SNOW}/>
                      <HourStatus hour={16} temp={9} type={WeatherTypes.OVERCAST}/>
                      <HourStatus hour={17} temp={0} type={WeatherTypes.CLOUDY}/>
                      <HourStatus hour={18} temp={-10} type={WeatherTypes.RAIN}/>
                      <HourStatus hour={19} temp={30} type={WeatherTypes.CLEAR}/>
                      <HourStatus hour={20} temp={-66} type={WeatherTypes.STORM}/>
                      <HourStatus hour={21} temp={-13} type={WeatherTypes.SNOW}/>
                      <HourStatus hour={22} temp={9} type={WeatherTypes.OVERCAST}/>
                      <HourStatus hour={23} temp={0} type={WeatherTypes.CLOUDY}/>
                      <HourStatus hour={0} temp={-10} type={WeatherTypes.RAIN}/>
                      <HourStatus hour={1} temp={30} type={WeatherTypes.CLEAR}/>
                      <HourStatus hour={2} temp={-66} type={WeatherTypes.STORM}/>
                  </div>
              </div>
              <div className="cringe-wrap">
                  <div className="goofy-wrap2">
                      <div>
                          <img src={clearBackground} alt="clear-background" className="background"/>
                      </div>
                  </div>
              </div>
          </div>
          <div className="ten-days-container">
              <div className="ten-days-wrap">
                  <p className="ten-days-container-title">Прогноз на 10 дней</p>
                  <div className="inline-div days-scroll-list">
                      <DayForecast weekDay="Пн" day={13} month="Декабрь" tempDay={-15} tempNight={-21}
                                   tempFeeling={-19} type={WeatherTypes.SNOW} wind={10} windDirection="ЮВ"
                                   pressure={728} wet={40}/>
                      <DayForecast weekDay="Вт" day={14} month="Декабрь" tempDay={-20} tempNight={-30}
                                   tempFeeling={-24} type={WeatherTypes.SNOW} wind={20} windDirection="З"
                                   pressure={709} wet={80}/>
                      <DayForecast weekDay="Ср" day={15} month="Декабрь" tempDay={0} tempNight={10} tempFeeling={-5}
                                   type={WeatherTypes.RAIN} wind={3} windDirection="СЗ" pressure={654} wet={10}/>
                      <DayForecast weekDay="Чт" day={16} month="Декабрь" tempDay={21} tempNight={-9}
                                   tempFeeling={19} type={WeatherTypes.CLEAR} wind={10} windDirection="ЮВ"
                                   pressure={728} wet={40}/>
                      <DayForecast weekDay="Пт" day={17} month="Декабрь" tempDay={21} tempNight={-9}
                                   tempFeeling={19} type={WeatherTypes.CLOUDY} wind={10} windDirection="ЮВ"
                                   pressure={728} wet={40}/>
                      <DayForecast weekDay="Сб" day={18} month="Декабрь" tempDay={21} tempNight={-9}
                                   tempFeeling={19} type={WeatherTypes.SNOW} wind={10} windDirection="ЮВ"
                                   pressure={728} wet={40}/>
                      <DayForecast weekDay="Вс" day={19} month="Декабрь" tempDay={21} tempNight={-9}
                                   tempFeeling={19} type={WeatherTypes.OVERCAST} wind={10} windDirection="ЮВ"
                                   pressure={728} wet={40}/>
                      <DayForecast weekDay="Пн" day={19} month="Декабрь" tempDay={21} tempNight={-9}
                                   tempFeeling={19} type={WeatherTypes.OVERCAST} wind={10} windDirection="ЮВ"
                                   pressure={728} wet={40}/>
                      <DayForecast weekDay="Вт" day={19} month="Декабрь" tempDay={21} tempNight={-9}
                                   tempFeeling={19} type={WeatherTypes.OVERCAST} wind={10} windDirection="ЮВ"
                                   pressure={728} wet={40}/>
                      <DayForecast weekDay="Ср" day={19} month="Декабрь" tempDay={21} tempNight={-9}
                                   tempFeeling={19} type={WeatherTypes.OVERCAST} wind={10} windDirection="ЮВ"
                                   pressure={728} wet={40}/>
                  </div>
              </div>
          </div>
      </div>
    );
}