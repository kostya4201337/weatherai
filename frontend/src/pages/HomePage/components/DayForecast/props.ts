import {WeatherTypes} from "../../../../common/constants/weatherTypes.ts";

export interface DayForecastProps {
    weekDay?: string;
    day?: number;
    month?: string;
    type?: WeatherTypes;
    tempDay?: number;
    tempNight?: number;
    tempFeeling?: number;
    wind?: number;
    windDirection?: string;
    pressure?: number;
    wet?: number;
}