import {WeatherTypes} from "../../../../common/constants/weatherTypes.ts";

export interface HourStatusProps {
    hour?: number;
    temp?: number;
    type?: WeatherTypes;
}