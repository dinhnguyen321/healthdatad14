import { useEffect, useState } from "react";
import {
  Navigate,
  Route, Routes
} from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import UserManager from "./pages/UserManager";
import Signin from "./components/AuthLayout/Signin";
import HandlerUser from "./components/UI/HandlerUser.jsx";
import {AuthGuard,IsLoggedIn} from "./layouts/ProtectedRoute.jsx";
import SignUp from "./components/AuthLayout/SignUp.jsx";
function App() {
const isLoggedIn = IsLoggedIn()
const [profileUser,setProfileUser] = useState({})

useEffect(()=>{
    const name = localStorage.getItem("name")
    const role = localStorage.getItem("role")
  if(isLoggedIn){
    setProfileUser({name:name,role:role})
  }
},[isLoggedIn])
return (
    <>
    <Routes>
    {/* Chuyển hướng người dùng đến trang phù hợp ngay từ đầu */}
      <Route
        path={"/"}  
        element={<Navigate to={isLoggedIn ? "dashboard":"/account/signin"} replace/> }  
      />
      {/* Tuyến đường Đăng nhập (/signin) */}
       <Route
        path={"/account/signin"}  
        element={isLoggedIn ? <Navigate to={"/dashboard"} replace/>: <Signin/> }  
      />
       <Route
        path={"/account/register"}  
        element={isLoggedIn ? <Navigate to={"/dashboard"} replace/>: <SignUp/> }   
      />
      {/* AuthGuard sẽ kiểm tra đăng nhập cho tất cả các Route con */}
       <Route element={<AuthGuard/>}> 
            <Route element={<MainLayout profileUser={profileUser}/>}>
                <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/user-manager" element={<UserManager/>} />
            </Route> 
       </Route> 
       
    </Routes>
    </>
  );
}

export default App;
