import {WeatherTypes} from "../../../../common/constants/weatherTypes.ts";

export interface MonthlyDayForecastProps {
    weekDay?: string;
    day?: number;
    type?: WeatherTypes;
    tempDay?: number;
    tempNight?: number;
}