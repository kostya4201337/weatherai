// import React from 'react';

import {Navbar} from "./components/Navbar/Navbar.tsx";
import {Outlet} from "react-router-dom";


function App() {
  return (
      <>
          <Navbar/>
          <Outlet/>
          <footer className="footer">©2024–2025 weather.ai</footer>
      </>
  );
}

export default App;