import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.tsx";
import MonthlyPage from "../pages/MonthlyPage/MonthlyPage.tsx";
import ArchivePage from "../pages/ArchivePage/ArchivePage.tsx";
import App from "../App.tsx";
import AboutPage from "../pages/AboutPage/AboutPage.tsx";
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {path: "", element: <HomePage/>},
            {path: "monthly", element: <MonthlyPage/>},
            {path: "archive", element: <ArchivePage/>},
            {path: "about", element: <AboutPage/>},
        ],
        errorElement: <div>404. Страница не найдена</div>
    }
]);