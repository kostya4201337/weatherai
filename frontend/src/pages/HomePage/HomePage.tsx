import "../styles.css"
import "./HomePage.css"
import sunnyIcon from "../../assets/weatherIcons/clear-icon.png"
import windIcon from "../../assets/sideInfoIcons/wind-icon.png"
import pressureIcon from "../../assets/sideInfoIcons/pressure-icon.png"
import wetIcon from "../../assets/sideInfoIcons/wet-icon.png"
import HourStatus from "./components/HourStatus/HourStatus.tsx"
import {WeatherTypes} from "../../common/constants/weatherTypes.ts";
import clearBackground from "../../assets/weatherBackgrounds/clear-background.png"

export default function HomePage() {
    return (
      <div className="page-container">
          <div className="inline-div">
              <div className="vert-div">
                  <div>
                      <p className="location-text">Иркутск, микрорайон Университетский</p>
                      <p className="date-text">1 апреля, сейчас 14:88</p>
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
      </div>
    );
}