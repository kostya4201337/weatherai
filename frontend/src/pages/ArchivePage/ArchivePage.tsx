import MonthlyDayForecast from "../MonthlyPage/components/MonthlyDayForecast/MonthlyDayForecast.tsx";
import {WeatherTypes} from "../../common/constants/weatherTypes.ts";
import MonthButton from "./components/MonthButton.tsx";
import "./ArchivePage.css"
import {useState} from "react";


export default function HomePage() {

    const [activeButton, setActiveButton] = useState<string>("Март");

    var date = new Date();

    const handleClick = (month: string) => {
        setActiveButton(month);
    }

    return (
        <div className="actual-monthly-page">
            <div className="page-container monthly-page">
                <div className="monthly-title">
                    <p className="city-text">Архив прогнозов</p>
                    <p className="forecast-range-text">Город Иркутск. Апрель 2024 - март 2025</p>
                </div>
                <div className="inline-div buttons-div">
                    <MonthButton handleClick={() => handleClick("Апрель")} isSelected={activeButton == "Апрель"} buttonName="Апрель"/>
                    <MonthButton handleClick={() => handleClick("Май")} isSelected={activeButton == "Май"} buttonName="Май"/>
                    <MonthButton handleClick={() => handleClick("Июнь")} isSelected={activeButton == "Июнь"} buttonName="Июнь"/>
                    <MonthButton handleClick={() => handleClick("Июль")} isSelected={activeButton == "Июль"} buttonName="Июль"/>
                    <MonthButton handleClick={() => handleClick("Август")} isSelected={activeButton == "Август"} buttonName="Август"/>
                    <MonthButton handleClick={() => handleClick("Сентябрь")} isSelected={activeButton == "Сентябрь"} buttonName="Сентябрь"/>
                    <MonthButton handleClick={() => handleClick("Октябрь")} isSelected={activeButton == "Октябрь"} buttonName="Октябрь"/>
                    <MonthButton handleClick={() => handleClick("Ноябрь")} isSelected={activeButton == "Ноябрь"} buttonName="Ноябрь"/>
                    <MonthButton handleClick={() => handleClick("Декабрь")} isSelected={activeButton == "Декабрь"} buttonName="Декабрь"/>
                    <MonthButton handleClick={() => handleClick("Январь")} isSelected={activeButton == "Январь"} buttonName="Январь"/>
                    <MonthButton handleClick={() => handleClick("Февраль")} isSelected={activeButton == "Февраль"} buttonName="Февраль"/>
                    <MonthButton handleClick={() => handleClick("Март")} isSelected={activeButton == "Март"} buttonName="Март"/>
                </div>
                <div className="monthly-table-container archive-table">
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