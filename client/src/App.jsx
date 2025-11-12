import React, {useEffect} from "react";
import {
  Navigate,
  Route, Routes, useLocation
} from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import UserManager from "./pages/UserManager";
function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
    <Routes>
      <Route  element={<MainLayout/>}>
      <Route  path="/" element={<Navigate to="/dashboard" replace/>}/>
      <Route  path="/dashboard" element={<Dashboard/>}/>
      <Route  path="/user-manager" element={<UserManager/>}/>
      </Route>
    </Routes>
    </>
  );
}

export default App;
