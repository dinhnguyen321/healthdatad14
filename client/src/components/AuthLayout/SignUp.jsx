import React, { useState } from 'react';
import logo from "../../assets/logo.jpg"
import axios from 'axios';
const SignUp = () => {
    const [data,setData] = useState({})
    const [textValid,setTextValid] = useState({
        textEmail:"",
        textPassword:""
    })
    const onChangeInput = (e) => {
        e.preventDefault();
        const {name, value} = e.target
        setData((prev)=>({...prev,[name]:value}))
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Mật khẩu: 8-10 ký tự, ít nhất 1 chữ cái (a-z) và 1 chữ số (0-9)
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,10}$/i;
    const validateForm = () => {
        let isValid = true;
        // reset trước khi valid
        setTextValid({
            textEmail: "",
            textPassword: "",
            textName:""
        });
        // Kiểm tra name
        if(!data.name){
            const messageN = 'Tên không được để trống';
            setTextValid((prev)=>({...prev,textName:messageN}))  
            isValid = false
        }

        // Kiểm tra email
        if(!data.email){
            const messageE = 'Email không được để trống';
            setTextValid((prev)=>({...prev,textEmail:messageE}))  
            isValid = false
        }else if(!emailRegex.test(data.email)){
            const messageE = 'Email không hợp lệ';
            setTextValid((prev)=>({...prev,textEmail:messageE}))  
            isValid = false
        }
     
        // Kiểm tra mặt khẩu
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
        const dataRegister = {
                email:data.email,
                password:data.password,
                role:"user",
                name:data.name
            }
          
            try {
                if(validateForm()){
                const res = await axios.post("http://localhost:4000/account/register",dataRegister)
                if(res.data){
                    setInterval(()=>{
                        window.location.href = "/account/signin"
                    },1000)
                }
            }
            } catch (error) {
                console.log("error signup: ", error);
            }
          
    }
    return (
        <>
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="grid grid-cols-12 w-full px-6 py-8 mx-auto lg:py-0">
       <div className='hidden col-span-4 lg:flex justify-center items-center'>
         <a href="/" className="flex flex-col justify-center w-full items-center space-y-4 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-24 h-24 mr-2 rounded-full" src={logo} alt="logo"/>
        <p className='bg-gradient-to-r bg-clip-text uppercase font-bold text-transparent bg-gradient-to-r from-indigo-500 to-purple-500'>  HealthData  </p>  
        </a>
        </div>
        <div className="lg:col-span-8 col-span-12 mx-auto w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className=" bg-gradient-to-r bg-clip-text uppercase text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 text-xl font-bold leading-tight tracking-tight md:text-2xl">
                 Tạo tài khoản
              </h1>
              <div className='h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                bg-300% animate-gradient-flow'></div>
              <form className="space-y-4 md:space-y-6" action="" onSubmit={(e)=>handleSignup(e)}>
              <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
                      <input 
                      onChange={(e)=>onChangeInput(e)}
                      type="text" 
                      name="name" 
                      id="name" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Nguyễn Văn A" 
                      required=""/>
                        {
                        textValid.textName ? (
                        <p className="mt-2 px-3 text-red-500 rounded text-sm font-semibold">
                        {textValid.textName}
                        </p>
                        ):""
                      }
                  </div>
                  
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email của bạn</label>
                      <input 
                      onChange={(e)=>onChangeInput(e)}
                      type="email" 
                      name="email" 
                      id="email" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="fullname@gmail.com" 
                      required=""/>
                        {
                        textValid.textEmail ? (
                        <p className="mt-2 px-3 text-red-500 rounded text-sm font-semibold">
                        {textValid.textEmail}
                        </p>
                        ):""
                      }
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                      <input 
                      onChange={(e)=>onChangeInput(e)}
                      type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      required=""/>
                      {
                        textValid.textPassword ? (
                        <p className="mt-2 px-3 text-red-500 rounded text-sm font-semibold">
                        {textValid.textPassword}
                        </p>
                        ):("")
                      }
                       <p className='text-xs mt-1 font-bold'>
                                (8-10 ký tự, ít nhất 1 chữ cái (A-z) và 1 chữ số (0-9))
                        </p>
                  </div>
                  <div>
                      <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xác nhận mật khẩu</label>
                      <input 
                      onChange={(e)=>onChangeInput(e)}
                      type="password" name="confirmPassword" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      required=""/>
                          {
                        textValid.textConfirmPassword ? (
                        <p className="mt-2 px-3 text-red-500 rounded text-sm font-semibold">
                        {textValid.textConfirmPassword}
                        </p>
                        ):("")
                      }
                  </div>
                  {/* <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
                        required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div> */}
                  <button onClick={(e)=>handleSignup(e)} className="border w-full text-white bg-primary-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                      Bạn đã có tài khoản? <a href="/account/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng nhập tại đây</a>
                  </p>
              </form>
          </div>
        </div>
        </div>
        </section>
        </>
    );
};

export default SignUp;