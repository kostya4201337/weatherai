import "./MonthlyPage.css"
import "../styles.css"
import MonthlyDayForecast from "./components/MonthlyDayForecast/MonthlyDayForecast.tsx";
import {WeatherTypes} from "../../common/constants/weatherTypes.ts";


export default function MonthlyPage() {

    var date = new Date();

    return (
        <div className="actual-monthly-page">
            <div className="page-container monthly-page">
                <div className="monthly-title">
                    <p className="city-text">Прогноз на месяц</p>
                    <p className="forecast-range-text">Город Иркутск. {date.getDate()} Марта
                        - {date.getDate()} Апреля</p>
                </div>
                <div className="monthly-table-container">
                    <table className="monthly-table">
                        <tbody>
                            <tr className="monthly-tr" >
                                <th align="left" className="monthly-date-text">Пн</th>
                                <th align="left" className="monthly-date-text">Вт</th>
                                <th align="left" className="monthly-date-text">Ср</th>
                                <th align="left" className="monthly-date-text">Чт</th>
                                <th align="left" className="monthly-date-text">Пт</th>
                                <th align="left" className="monthly-date-text monthly-weekend-day-text">Сб</th>
                                <th align="left" className="monthly-date-text monthly-weekend-day-text">Вс</th>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th></th>
                                <th></th>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Ср" type={WeatherTypes.OVERCAST}/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Чт"/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Пт" type={WeatherTypes.RAIN}/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Сб"/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Вс"/>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Пн"/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Вт" type={WeatherTypes.SNOW}/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Ср"/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Чт"/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Пт"/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Сб" type={WeatherTypes.STORM}/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Вс"/>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Пн"/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Вт"/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Ср"/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Чт" type={WeatherTypes.CLOUDY}/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Пт"/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Сб"/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Вс"/>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Пн"/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Вт"/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Ср"/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Чт"/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Пт"/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Сб"/>
                                <MonthlyDayForecast day={date.getDate()} tempDay={12} tempNight={-9} weekDay="Вс"/>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}