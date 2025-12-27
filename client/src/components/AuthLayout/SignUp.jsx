import axios from 'axios';
import React, { useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const [data,setData] = useState({})
    const [textValid,setTextValid] = useState({
        textSHQN:"",
        textPassword:""
    })
    const onChangeInput = (e) => {
        e.preventDefault();
        const {name, value} = e.target
        setData((prev)=>({...prev,[name]:value}))
    }
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Mật khẩu: 8-10 ký tự, ít nhất 1 chữ cái (a-z) và 1 chữ số (0-9)
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,10}$/i;
    const validateForm = () => {
        let isValid = true;
        // reset trước khi valid
        setTextValid({
            // textEmail: "",
            textSHQN: "",
            textPassword: "",
            textName:""
        });

        if(!data.name){
            const messageN = 'Tên không được để trống';
            setTextValid((prev)=>({...prev,textName:messageN}))  
            isValid = false
        }

           if(!data.SHQN){
            const messageN = 'SHQN không được để trống';
            setTextValid((prev)=>({...prev,textSHQN:messageN}))  
            isValid = false
        }
        // Kiểm tra email
        // if(!data.email){
        //     const messageE = 'Email không được để trống';
        //     setTextValid((prev)=>({...prev,textEmail:messageE}))  
        //     isValid = false
        // }else if(!emailRegex.test(data.email)){
        //     const messageE = 'Email không hợp lệ';
        //     setTextValid((prev)=>({...prev,textEmail:messageE}))  
        //     isValid = false
        // }
     
        // Kiểm tra mật khẩu
        if(!data.password){
            const messageP = 'Mật khẩu không được để trống';
             setTextValid((prev)=>({...prev,textPassword:messageP}))  
             isValid = false
         }else if(!passwordRegex.test(data.password)){
           const messageP = 'Mật khẩu chưa hợp lệ';
            setTextValid((prev)=>({...prev,textPassword:messageP}))  
            isValid = false
        }
        if(!data.confirmPassword){
            const messageConfirmPassword = 'Mật khẩu không được để trống';
             setTextValid((prev)=>({...prev,textConfirmPassword:messageConfirmPassword}))  
             isValid = false
        }else if(data.password !== data.confirmPassword){
            const messageConfirmPassword = 'Mật khẩu chưa giống nhau';
            setTextValid((prev)=>({...prev,textConfirmPassword:messageConfirmPassword}))  
            isValid = false
        }

        return isValid
    }
    const handleSignup = async(e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Đang đăng ký người dùng...")
        const dataRegister = {
                SHQN:String(data.SHQN),
                password:data.password,
                role:"user",
                name:data.name
            }
            try {
                if(validateForm()){
                const res = await axios.post(`${API_URL}/account/register`,dataRegister)
                if(res.data){
                    toast.dismiss(loadingToast)
                    toast.success("Đăng ký thành công")
                    setInterval(()=>{
                        window.location.href = "/account/signin"
                    },2000)
                }
            }
            } catch (error) {
                console.log("error signup: ", error);
            }
          
    }
    return (
        <section className="grid grid-cols-1 md:grid-cols-10 min-h-screen w-full">
       <div className="md:col-span-6 hidden md:flex bg-[#c21e29] justify-center items-center"
         >
            <img src="https://res.cloudinary.com/dssyoikpk/image/upload/v1766234784/HSSK/codang_ofoxn8.png" alt="codang"
            className='w-44 h-40 object-fill' />
        </div>
        <div className="col-span-1 md:col-span-4 flex justify-center items-center w-full shadow border xl:p-0 bg-gray-200">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 sm:max-w-md ">
              <h1 className=" bg-linear-to-r bg-clip-text uppercase text-transparent from-red-500 via-yellow-600 to-gray-400 text-xl font-bold leading-tight tracking-tight md:text-5xl">
                 Đăng ký tài khoản
                 </h1>
              <div className='h-1 bg-linear-to-r from-red-500 via-yellow-600 to-gray-400
                bg-300% animate-gradient-flow'></div>
              <form className="space-y-4 md:space-y-6" action="" onSubmit={(e)=>handleSignup(e)}>
              <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Họ và tên</label>
                      <input 
                      onChange={(e)=>onChangeInput(e)}
                      type="text" 
                      name="name" 
                      id="name" 
                      className="text-sm rounded-lg focus:ring-amber-600 focus:border-primary-600 block w-full p-2.5 bg-gray-300 border-gray-700 placeholder-gray-400 text-black"
                       placeholder="Nguyễn Văn A" 
                      required=""/>
                        {
                        textValid.textName ? (
                        <p className="mt-2 text-red-500 rounded text-sm font-semibold">
                        {textValid.textName}
                        </p>
                        ):""
                      }
                  </div>
                  
                  <div>
                      <label htmlFor="SHQN" className="block mb-2 text-sm font-medium text-gray-700">SHQN</label>
                      <input 
                      onChange={(e)=>onChangeInput(e)}
                      type="text" 
                      name="SHQN" 
                      id="SHQN" 
                      className="text-sm rounded-lg focus:ring-amber-600 focus:border-primary-600 block w-full p-2.5 bg-gray-300 border-gray-700 placeholder-gray-400 text-black"
                       placeholder="123456789" 
                      required=""/>
                        {
                        textValid.textSHQN ? (
                        <p className="mt-2 text-red-500 rounded text-sm font-semibold">
                        {textValid.textSHQN}
                        </p>
                        ):""
                      }
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Mật khẩu</label>
                      <input 
                      onChange={(e)=>onChangeInput(e)}
                      type="password" name="password" id="password" placeholder="••••••••" className="text-sm rounded-lg focus:ring-amber-600 focus:border-primary-600 block w-full p-2.5 bg-gray-300 border-gray-700 placeholder-gray-400 text-black" 
                      required=""/>
                      {
                        textValid.textPassword ? (
                        <p className="mt-2 text-red-500 rounded text-sm font-semibold">
                        {textValid.textPassword}
                        </p>
                        ):("")
                      }
                       <p className='text-xs mt-1 font-bold text-gray-700'>
                                (8-10 ký tự, ít nhất 1 chữ cái (A-z) và 1 chữ số (0-9))
                        </p>
                  </div>
                  <div>
                      <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                      <input 
                      onChange={(e)=>onChangeInput(e)}
                      type="password" name="confirmPassword" id="confirm-password" placeholder="••••••••" className="text-sm rounded-lg focus:ring-amber-600 focus:border-primary-600 block w-full p-2.5 bg-gray-300 border-gray-700 placeholder-gray-400 text-black" 
                      required=""/>
                          {
                        textValid.textConfirmPassword ? (
                        <p className="mt-2 text-red-500 rounded text-sm font-semibold">
                        {textValid.textConfirmPassword}
                        </p>
                        ):("")
                      }
                  </div>
                  <button onClick={(e)=>handleSignup(e)} className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white bg-linear-to-r from-red-500 via-yellow-600 to-gray-400 hover:from-red-600 hover:via-yellow-700 hover:to-gray-500">
                    Đăng ký tài khoản</button>
                  <p className="text-center text-md font-light text-gray-700">
                      Bạn đã có tài khoản? 
                      <a href="/account/signin" 
                      className="font-extrabold hover:underline">
                        Đăng nhập tại đây</a>
                  </p>
              </form>
          </div>
        </div>
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
        </section>
    );
};

export default SignUp;