import * as React from "react";
import {MonthlyDayForecastProps} from "./props.ts";
import {WeatherTypes} from "../../../../common/constants/weatherTypes.ts";
import CloudyOutlineIcon from "../../../../assets/weatherOutlineIcons/cloudy-outline-icon.png";
import OvercastOutlineIcon from "../../../../assets/weatherOutlineIcons/overcast-outline-icon.png";
import RainOutlineIcon from "../../../../assets/weatherOutlineIcons/rain-outline-icon.png";
import StormOutlineIcon from "../../../../assets/weatherOutlineIcons/storm-outline-icon.png";
import SnowOutlineIcon from "../../../../assets/weatherOutlineIcons/snow-outline-icon.png";
import ClearOutlineIcon from "../../../../assets/weatherOutlineIcons/clear-outline-icon.png";
import "./MonthlyDayForecast.css"

const MonthlyDayForecast: React.FC<MonthlyDayForecastProps> = ({weekDay, day, type, tempDay, tempNight}) => {

    let src;
    switch (type) {
        case WeatherTypes.CLEAR:
            src = CloudyOutlineIcon;
            break;
        case WeatherTypes.CLOUDY:
            src = CloudyOutlineIcon;
            break;
        case WeatherTypes.OVERCAST:
            src = OvercastOutlineIcon;
            break;
        case WeatherTypes.RAIN:
            src = RainOutlineIcon;
            break;
        case WeatherTypes.STORM:
            src = StormOutlineIcon;
            break;
        case WeatherTypes.SNOW:
            src = SnowOutlineIcon;
            break;
        default:
            src = ClearOutlineIcon;
    }


    return (
        <th className="monthly-day-cell" align="left">
            <div className="monthly-day-div">
                <p className={weekDay == "Сб" || weekDay == "Вс" ? "monthly-date-text monthly-weekend-day-text" : "monthly-date-text"}>{day}</p>
                <div className="inline-div monthly-day-info-div">
                    <div className="monthly-day-icon-wrap">
                        <img src={src} alt="monthly-day-weather-icon" className="monthly-day-weather-icon"/>
                    </div>
                    <div>
                        <p className="monthly-temp-day-text">{tempDay != null && tempDay > 0 ? "+" : ""}{tempDay}°</p>
                        <p className="monthly-temp-night-text">{tempNight != null && tempNight > 0 ? "+" : ""}{tempNight}°</p>
                    </div>
                </div>
            </div>
        </th>
    )
}

export default MonthlyDayForecast;