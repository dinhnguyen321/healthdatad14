/* eslint-disable no-unused-vars */
import React,{useEffect, useState} from 'react';
// import FilterButton from "../components/UI/DropdownFilter"
import UserChart from '../components/UI/UserChart';
import axios from 'axios';
import { toast } from 'react-toastify';
import Carousel from '../components/UI/Carousel';
function Dashboard() {
    const [profile,setProfile] = useState({
        idUser:"",
        name:"",
        email:"",
        phone:""
    })
    const API_URL = import.meta.env.VITE_API_URL
    useEffect(()=>{
        if(profile){
            const fetchUser = async()=>{
                await axios.get(`${API_URL}/api/users`)
                .then((res)=> {
                    setProfile("user",res.data[0]);
                     toast.success(`Xin chào đồng chí`);
                    })
                .catch((error)=>{
                    console.log("error: ",error);
                    toast.error(`Đăng nhập thất bại`)
                })
            }
            fetchUser()
        }
    },[profile])
    return (
                // <div className="grid grid-cols-1 sm:auto-cols-max gap-10">
                <div className="w-full flex justify-around">
                {/* Filter button */}
                {/* <FilterButton align="right" /> */}
                {/* <div className='flex flex-col items-center justify-center space-y-4'>
                   <div className="text-black text-xl text-center font-bold uppercase py-2 border-b-2 border-gray-400">
                              <p>Số lượng người dùng</p>
                    </div>
                <UserChart/>
                </div> */}
                <div className='w-[20%] rounded-lg overflow-hidden'>
                    <img src="https://res.cloudinary.com/dssyoikpk/image/upload/v1766220406/HSSK/img4_zcci8j.jpg" 
                    className='h-[500px]'
                    alt="" />
                </div>
                <Carousel/>
                <div className='w-[20%] rounded-lg overflow-hidden '>
                    <img src="https://res.cloudinary.com/dssyoikpk/image/upload/v1766220408/HSSK/img5_mkd8sg.jpg" 
                    className='h-[500px]'
                    alt="" />
                </div>
                </div>
                // {/* <Datepicker align="right" /> */}   
    );
}

export default Dashboard;