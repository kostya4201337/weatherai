import * as React from "react";
import {HourStatusProps} from "./props.ts";
import {WeatherTypes} from "../../../../common/constants/weatherTypes.ts";
import ClearIcon from "../../../../assets/weatherIcons/clear-icon.png"
import OvercastIcon from "../../../../assets/weatherIcons/overcast-icon.png"
import CloudyIcon from "../../../../assets/weatherIcons/cloudy-icon.png"
import RainIcon from "../../../../assets/weatherIcons/rain-icon.png"
import SnowIcon from "../../../../assets/weatherIcons/snow-icon.png"
import StormIcon from "../../../../assets/weatherIcons/storm-icon.png"
import "./HourStatus.css"

const HourStatus: React.FC<HourStatusProps> = ({hour, temp, type}) => {

    let src;
    switch (type) {
        case WeatherTypes.CLEAR:
            src = ClearIcon;
            break;
        case WeatherTypes.CLOUDY:
            src = CloudyIcon;
            break;
        case WeatherTypes.OVERCAST:
            src = OvercastIcon;
            break;
        case WeatherTypes.RAIN:
            src = RainIcon;
            break;
        case WeatherTypes.STORM:
            src = StormIcon;
            break;
        case WeatherTypes.SNOW:
            src = SnowIcon;
            break;
        default:
            src = ClearIcon;
    }
    return (
        <div className="hour-status-container">
            <div className="goofyahh-wrap">
                <p>{hour != null && hour < 10 ? "0" : ""}{hour}:00</p>
                <img src={src} alt={type} className="hour-status-icon"/>
            </div>
            <p>{temp != null && temp > 0 ? "+" : ""}{temp}°</p>
        </div>
    );
};

export default HourStatus;