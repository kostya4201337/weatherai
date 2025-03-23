import logo from "../../../public/logo.png";
import "./AboutPage.css"

export default function AboutPage() {
    return (
        <div className="about-page">
            <div className="page-container">
                <div className="monthly-title">
                    <div className="inline-div">
                        <p className="city-text">О проекте</p>
                        <img src={logo} alt="logo" className="about-logo"/>
                    </div>
                    <div className="about-wrap">
                        <p className="about-text">
                            Этот сайт был создан в рамках школьного проекта учениками
                            <b className="about-bold"> 9 «М» </b>
                            класса
                            <b className="about-bold"> МАОУ г. Иркутска Гимназии №2, </b>
                            под руководством учителя
                            <b className="about-bold"> Стерховой Елены Леонидовны</b>
                        </p>
                        <p className="about-text how-it-works" style={{ paddingTop: "2rem"}}>
                            <b className="about-bold how-it-works">Как это работает?</b>
                        </p>
                        <p className="about-text">
                            Наш сайт использует модель глубокого обучения для получения данных о погоде и её предсказания.
                            Мы обрабатываем эту информацию и представляем её в удобном формате.
                            Вы можете узнать текущую погоду, прогноз на месяц вперёд,
                            а также другие метеорологические данные. Также, можно просмотреть архив погоды
                            за последние 12 месяцев.
                        </p>

                        <p className="about-text how-it-works" style={{ paddingTop: "2rem"}}>
                            <b className="about-bold how-it-works">Наша команда:</b>
                            <ul className="about-list">
                                <li>
                                    <p className="about-text">
                                        <b className="about-bold">Васильев Константин</b> - разработка клиенсткой части (веб-сайта) и дизайна
                                    </p>
                                </li>
                                <li>
                                    <p className="about-text">
                                        <b className="about-bold">Шиповский Александр</b> - разработка серверной части и создание прогнозной модели
                                    </p>
                                </li>
                            </ul>
                        </p>

                        <p className="about-text how-it-works" style={{ paddingTop: "2rem"}}>
                            <b className="about-bold how-it-works">Технологический стэк:</b>
                            <ul className="about-list">
                                <li>
                                    <p className="about-text">
                                        <b className="about-bold">Клиенсткая часть</b>: React, Typescript, HTML, CSS.
                                    </p>
                                </li>
                                <li>
                                    <p className="about-text">
                                        <b className="about-bold">Серверная часть / модель</b>: FastAPI, TensorFlow, Plotly, Pandas.
                                    </p>
                                </li>
                            </ul>
                        </p>

                        <p className="about-text" style={{ paddingTop: "2rem"}}>
                            Репозиторий проекта доступен по
                            <b className="about-bold"><a className="about-bold" href="https://github.com/kostya4201337/weatherai"> ссылке</a></b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}