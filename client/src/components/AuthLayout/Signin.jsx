import React, { useState } from 'react';
import logo from "../../assets/logo.jpg";
import axios from "axios"
import { Bounce, ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
// import { redirect } from 'react-router';

const Signin = () => {
    const [dataSignIn, setDataSignIn] = useState({})
    const onChangeDataSignIn = (e) => {
        const {name, value} = e.target
        setDataSignIn((prev)=> ({...prev,[name]:value}) )
    }
    const signIn = async() => {
            const data = {
              email:dataSignIn.email,
              password:dataSignIn.password
            }
            try {
              if(data.email || data.password){
               const signinUser = await axios.post("http://localhost:4000/account/signin",data)
               localStorage.setItem("name", signinUser.data.name),
                  localStorage.setItem("idUser", signinUser.data.idUser),
                  localStorage.setItem("role", signinUser.data.role),
                  window.location.reload()
                toast.success(`Xin chào ${signinUser.data.name}`)
              }
            } catch (error) {
              console.log("error singin: ",error.response.data.message);
              toast.error(error.response.data.message)
            }
    }
    return (
        <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
        
        <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-gray-800x p-6 space-y-4 md:space-y-6 sm:p-8 rounded-lg shadow">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src={logo} alt="HealthDataD14" className="mx-auto h-20 w-auto rounded-full" />
          <p className="mt-5 bg-clip-text uppercase text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 font-bold leading-tight tracking-tight text-lg text-center lg:text-xl">Đăng Nhập Tài Khoản</p>
          <div className='h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                bg-300% animate-gradient-flow'></div>
        </div>
          <form action="" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Địa chỉ Email</label>
              <div className="mt-2">
                <input onChange={onChangeDataSignIn} id="email" type="email" name="email" required autoComplete="email" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
              </div>
            </div>
        
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Mật Khẩu</label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">Quên Mật Khẩu?</a>
                </div>
              </div>
              <div className="mt-2">
                <input onChange={onChangeDataSignIn} id="password" type="password" name="password" required autoComplete="current-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
              </div>
            </div>
        
            <div>
              <button 
              onClick={signIn} 
              type="button" 
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Đăng nhập</button>
            </div>

          </form>
          <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
              />
          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Bạn chưa có tài khoản?
            <a href="/account/register" className="pl-2 font-semibold text-indigo-400 hover:text-indigo-300">Đăng ký ngay!</a>
          </p>
        </div>
        </div>
    );
};

export default Signin;