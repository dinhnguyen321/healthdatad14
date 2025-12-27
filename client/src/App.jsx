import { useEffect, useState } from "react";
import {
  Navigate,
  Route, Routes
} from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import UserManager from "./pages/UserManager";
import Signin from "./components/AuthLayout/Signin";
import {AuthGuard,IsLoggedIn} from "./layouts/ProtectedRoute.jsx";
import SignUp from "./components/AuthLayout/SignUp.jsx";
import ProfileUser from "./pages/ProfileUser.jsx";
// import axios from "axios";
function App() {
const isLoggedIn = IsLoggedIn()
const [profileUser,setProfileUser] = useState({})

useEffect(()=>{
    const name = localStorage.getItem("name")
    const role = localStorage.getItem("role")
    const avt = localStorage.getItem("avt")
  if(isLoggedIn){
    // getProfileUser()
    setProfileUser({name:name,role:role,avt:avt})
  }
},[isLoggedIn])
return (
    <>
    <Routes>
    {/* Chuyển hướng người dùng đến trang phù hợp ngay từ đầu */}
      <Route
        path={"/"}  
        element={<Navigate to={isLoggedIn ? "homepage":"/account/signin"} replace/> }  
      />
      {/* Tuyến đường Đăng nhập (/signin) */}
       <Route
        path={"/account/signin"}  
        element={isLoggedIn ? <Navigate to={"/homepage"} replace/>: <Signin/> }  
      />
       <Route
        path={"/account/register"}  
        element={isLoggedIn ? <Navigate to={"/homepage"} replace/>: <SignUp/> }   
      />
      {/* AuthGuard sẽ kiểm tra đăng nhập cho tất cả các Route con */}
       <Route element={<AuthGuard/>}> 
            <Route element={<MainLayout profileUser={profileUser}/>}>
                <Route path="/" element={<Navigate to="/homepage" replace/>}/>
                <Route path="/homepage" element={<Dashboard/>}/>
                <Route path="/user-manager" element={<UserManager/>} />
                <Route path="/profile-user" element={<ProfileUser/>} />
            </Route> 
       </Route> 
    </Routes>
    </>
  );
}

export default App;
