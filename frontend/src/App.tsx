// import React from 'react';

import {Navbar} from "./components/Navbar/Navbar.tsx";
import {Outlet} from "react-router-dom";


function App() {
  return (
      <>
          <Navbar/>
          <Outlet/>
      </>
  );
}

export default App;