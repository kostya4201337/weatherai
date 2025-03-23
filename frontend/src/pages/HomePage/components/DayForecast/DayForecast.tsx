import * as React from "react";
import {DayForecastProps} from "./props.ts";
import "./DayForecast.css"
import {WeatherTypes} from "../../../../common/constants/weatherTypes.ts";
import CloudyOutlineIcon from "../../../../assets/weatherOutlineIcons/cloudy-outline-icon.png";
import OvercastOutlineIcon from "../../../../assets/weatherOutlineIcons/overcast-outline-icon.png";
import RainOutlineIcon from "../../../../assets/weatherOutlineIcons/rain-outline-icon.png";
import StormOutlineIcon from "../../../../assets/weatherOutlineIcons/storm-outline-icon.png";
import SnowOutlineIcon from "../../../../assets/weatherOutlineIcons/snow-outline-icon.png";
import ClearOutlineIcon from "../../../../assets/weatherOutlineIcons/clear-outline-icon.png";
import PressureBlackIcon from "../../../../assets/sideInfoBlackIcons/pressure-black-icon.png";
import WetBlackIcon from "../../../../assets/sideInfoBlackIcons/wet-black-icon.png";
import WindBlackIcon from "../../../../assets/sideInfoBlackIcons/wind-black-icon.png";

const DayForecast: React.FC<DayForecastProps> = ({weekDay, day, month, tempDay, tempNight, tempFeeling, type, wet, wind, windDirection, pressure}) => {

    let src;
    let typeName;
    switch (type) {
        case WeatherTypes.CLEAR:
            src = ClearOutlineIcon;
            typeName = "Ясно";
            break;
        case WeatherTypes.CLOUDY:
            src = CloudyOutlineIcon;
            typeName = "Облачно";
            break;
        case WeatherTypes.OVERCAST:
            src = OvercastOutlineIcon;
            typeName = "Пасмурно";
            break;
        case WeatherTypes.RAIN:
            src = RainOutlineIcon;
            typeName = "Дождь";
            break;
        case WeatherTypes.STORM:
            src = StormOutlineIcon;
            typeName = "Гроза";
            break;
        case WeatherTypes.SNOW:
            src = SnowOutlineIcon;
            typeName = "Снег";
            break;
        default:
            src = ClearOutlineIcon;
            typeName = "Ясно";
    }

    return (
        <div className="day-forecast-container">
            <div className="day-forecast-wrap">
                <div className="inline-div date-div">
                    <p className={weekDay != "Сб" && weekDay != "Вс" ? "week-day-text" : "week-day-text weekend-day-text"}>{weekDay}</p>
                    <div className="le-wrap"><p className="day-forecast-date-text">{day} {month?.toLowerCase().slice(0, 3)}</p></div>
                </div>
                <div className="inline-div day-weather-status-div">
                    <img src={src} alt={type} className="day-forecast-weather-icon"/>
                    <div style={{ width: "100%"}}>
                        <div className="temp-day-div">
                            <p className="temp-day-text">{tempDay != null && tempDay > 0 ? "+" : ""}{tempDay}°</p>
                        </div>
                        <div className="temp-day-div">
                            <p className="temp-night-text">{tempNight != null && tempNight > 0 ? "+" : ""}{tempNight}° ночь</p>
                        </div>
                    </div>
                </div>
                <div className="add-info-div">
                    <p className="temp-feeling-text">Ощущается как {tempFeeling != null && tempFeeling > 0 ? "+" : ""}{tempFeeling}°</p>
                    <p className="day-status-text">{typeName}</p>
                </div>
                <div className="side-info-div">
                    <div className="inline-div side-info-line">
                        <div className="side-info-icon-div"><img src={WindBlackIcon} alt={"wind-black-icon"} className="wind-black-icon"/></div>
                        <div className="side-info-line-text-div"><p className="side-info-line-text">{wind} м/с, {windDirection}</p></div>
                    </div>
                    <div className="inline-div side-info-line">
                        <div className="side-info-icon-div"><img src={PressureBlackIcon} alt={"pressure-black-icon"} className="pressure-black-icon"/></div>
                        <div className="side-info-line-text-div"><p className="side-info-line-text">{pressure} гПа</p></div>
                    </div>
                    <div className="inline-div side-info-line">
                        <div className="side-info-icon-div"><img src={WetBlackIcon} alt={"wet-black-icon"} className="wet-black-icon"/></div>
                        <div className="side-info-line-text-div"><p className="side-info-line-text">{wet}%</p></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DayForecast;