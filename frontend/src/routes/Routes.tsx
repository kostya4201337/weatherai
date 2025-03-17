import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.tsx";
import MonthlyPage from "../pages/MonthlyPage";
import ArchivePage from "../pages/ArchivePage";
import App from "../App.tsx";
import AboutPage from "../pages/AboutPage.tsx";
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