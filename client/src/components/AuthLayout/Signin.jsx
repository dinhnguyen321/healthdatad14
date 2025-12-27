import React, { useState } from 'react';
import axios from "axios"
import { Bounce, ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

const Signin = () => {
    const API_URL = import.meta.env.VITE_API_URL
    console.log("API_URL",API_URL);
    
    const [dataSignIn, setDataSignIn] = useState({})
    const onChangeDataSignIn = (e) => {
        const {name, value} = e.target
        setDataSignIn((prev)=> ({...prev,[name]:value}) )
    }
    const signIn = async() => {
            const data = {
              SHQN:String(dataSignIn.SHQN),
              password:dataSignIn.password
            }
            try {
              if(data.SHHQ || data.password){
               const signinUser = await axios.post(`${API_URL}/account/signin`,data)
               localStorage.setItem("name", signinUser.data.name),
                  localStorage.setItem("idUser", signinUser.data.idUser),
                  localStorage.setItem("role", signinUser.data.role),
                  localStorage.setItem("avt", signinUser.data.avt),
                  window.location.reload()
                toast.success(`Xin chào ${signinUser.data.name}`)
              }
            } catch (error) {
              console.log("error singin: ",error.response.data.message);
              toast.error(error.response.data.message)
            }
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-10 min-h-screen w-full">
        <div className='col-span-1 md:col-span-4 flex justify-center items-center w-full shadow border xl:p-0 bg-gray-200'>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-gray-800x p-6 space-y-4 md:space-y-6 sm:p-8 rounded-lg shadow">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-2">
                <img src={"https://res.cloudinary.com/dssyoikpk/image/upload/v1766220405/HSSK/img2_udl54h.jpg"} alt="HealthDataD14"
                className="mx-auto h-24 w-24 rounded-full object-cover" />
                <p className="text-center bg-linear-to-r bg-clip-text uppercase text-transparent from-red-500 via-yellow-600 to-gray-400 text-xl font-bold leading-tight tracking-tight md:text-2xl">Đăng Nhập Tài Khoản</p>
                <div className='h-1 bg-linear-to-r from-red-500 via-yellow-600 to-gray-400 
                      bg-300% animate-gradient-flow'> </div>
              </div>
              <form action="" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="SHQN" 
                  className="block text-sm/6 font-medium text-gray-700">
                    SHQN</label>
                  <div className="mt-2">
                    <input onChange={onChangeDataSignIn} id="SHQN" type="text" name="SHQN" required autoComplete="SHQN" className="text-sm rounded-lg focus:ring-amber-600 focus:border-primary-600 block w-full p-2.5 bg-gray-300 border-gray-700 placeholder-gray-400 text-black" />
                  </div>
                </div>
            
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-700">Mật Khẩu</label>
                    {/* <div className="text-sm">
                      <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">Quên Mật Khẩu?</a>
                    </div> */}
                  </div>
                  <div className="mt-2">
                    <input onChange={onChangeDataSignIn} id="password" type="password" name="password" required autoComplete="current-password" className="text-sm rounded-lg focus:ring-amber-600 focus:border-primary-600 block w-full p-2.5 bg-gray-300 border-gray-700 placeholder-gray-400 text-black" />
                  </div>
                </div>
            
                <div>
                  <button 
                  onClick={signIn} 
                  type="button" 
                  className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white bg-linear-to-r from-red-500 via-yellow-600 to-gray-400 hover:from-red-600 hover:via-yellow-700 hover:to-gray-500">
                    Đăng nhập</button>
                </div>

              </form>
          
              <p className="mt-10 text-center text-sm/6 text-gray-400">
                Bạn chưa có tài khoản?
                <a href="/account/register" className="pl-2 font-semibold text-indigo-400 hover:text-indigo-300">Đăng ký ngay!</a>
              </p>
            </div>
        </div>
        
        <div className='md:col-span-6 hidden md:flex bg-[#c21e29] justify-center items-center'>
            <img 
            src="https://res.cloudinary.com/dssyoikpk/image/upload/v1766246772/HSSK/covietnam_qolyps.png" alt="covietnam"
            className='w-60 h-40 object-fill' />
        </div>
        
        </div>
    );
};
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
export default Signin;