/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState} from 'react';
import {Bounce, ToastContainer, toast} from "react-toastify"
import InputUser from '../components/UI/User/InputUser';
import UploadImage from '../components/UI/UploadImage';

function ProfileUser() {
      const API_URL = import.meta.env.VITE_API_URL
      const idUser = localStorage.getItem("idUser")
    const [dataUser,setDataUser] = useState({
         idUser:"",  
      name: "",
      email: "",
      avt:"",
      phone: "",
      SHQN:"",
      birth_day:"",
      address:"",
      rank:"",
      position:"",
      department:"",
      enlistment_date:"",
      password:"12345678b",
      role:"user",
      medicalProfile:{
        health_insurance_code :"",
        height_cm:"",
        weight_kg:"",
        bmi:"",
        medical_history:"",
        current_disease:"",
        treatment_plan:"",
        blood_type :"",
        id:"",
        userId:"",
        updated_at:"",
        created_at:"",
      },
    })
    const getUserById = async() =>{
       const res = await axios.get(`${API_URL}/api/users/${idUser}`)
          setDataUser(res.data)
          return
    }
    useEffect(()=>{
          if(idUser){
            getUserById()
          }
    })
    return (
        <div className='w-5/6 mx-auto'>
          <div className="flex justify-between items-center">
           <div className="flex justify-center items-center gap-x-5">
             <img
            className="w-20 h-20 rounded-full object-cover"
            src={"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMHBhUTBxMVFhUWFxUVEBcXEBASFxYVFRUWFhcRExgYHSggGB0xGxYVITEiJSkrLi8uFx8zPDUsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EADUQAQABAgIHBQYGAwEAAAAAAAABAgMEEQUSITFBUXETMmGBkSKhscHR4SMzNEKi8FKSshT/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADK3aquz+HEz0iZdNOjLtX7fWafqDkHZOjLsft/lS5rtiqz+bTMdY2eoMAAAAAAAAAAAAAAAAAAAAAAAe26JuVxFG+dwPbVubteVuM5TOE0VTbjO/7U8uEfV04HCRhbWzfPen+8HSDymmKYyp2PQAeTGe96A4MVoum9Gdv2Z8N3nCFxFirD3MrsZfCfGFpacVh4xNrK55TynnAKwNmIszh7s03N8e+ObWAAAAAAAAAAAAAAAAAAAmNCYbKjXq47KenGf7yQ8RnOxarFvsrUUxwiIBmAAAAAAADg0vhu1w+tTvp2+XGPmgVsmM42qtft9lemnlMwDAAAAAAAAAAAAAAAAAAG3CRniqM/8AKn4rQq2Gq1cTTPKqn4rSAAAAAAAAArmlYyx9Xl/zCxq3pOrWx9XlHpEQDmAAAAAAAAAAAAAAAAAAWjC3e3w8VRxjb14+9V0noXE6tepXx209eQJoAAAAAAAGNyqKKJmrdG2fJVrlfaXJmeMzPql9NYnVt6lG+e905IYAAAAAAAAAAAAAAAAAAAicp2ACe0dj4xFOrc73x8Yd6pROU7EnhNLTRGWJ2xzjf58wTQ02cVRf/KqifDdPo3AA1XcRTZj8WqI8/kDa5MdjYwtHOqd0fOfBx4rS+zLDR5z8oRVdU11Z1znM7wK65uVzNc5zO94AAAAAAAAAAAAAAAAAAAAAAM7Vmq9P4VMz0gGtspvVU92qqOlUw7LeiblXfyjzzn3N9OhdntV/x+4I2b9dXeqq/wBpa0vOheVf8fu0XNEV09yYn1iQR423sNXY/NpmPHh6tQAAAAAAAAAAAAAAAAAAAADbhsNViasrUdZ4R1l14DR03/avbKeEcZ+kJu3bi1RlbjKI3A4MLoqm3tu+1Pu9EhTTFMZU7HoAAAABMZ73DidGUXu57M+G7zh3AKzisHVhp9uNnON32aFsqp1qcqvND4/Rer7WG86fp9ARY8egAAAAAAAAAAAAAAJPRej+0yrvxs/bHPxnwadGYP8A9N3Ovux755J+Iy3A9AAAAAAAAAAABF6T0frxNdiNv7o5+MeKGW1CaXwfZ1a9rdPe8J5gjQAAAAAAAAAAAGVq3N25FNG+dkMUroOxnM11dKfnIJTD2Yw9mKaOH9zbAAAAAAAAAAAAAAY3KIuUTFW6dksgFXxdicNfmmfLxjhLUmtN2NezFUb6d/Sfv8UKAAAAAAAAAAAs2BtdjhaY8NvWdsq5h6O0v0xzmI961QAAAAAAAAAAAAAAAADC7RF23MVcYmPVVqo1asp4bJ8lsVvSVGpjauufrGYOYAAAAAAAAAG/AfraOqzAAAAAAAAAAAAAAAAAAr+mP109IAHEAAAAAD//2Q=="} alt=" " />
            <p className="flex flex-col items-start text-black font-bold">Trần Đinh Nguyễn
              <span className='font-normal font-sans'>
                SHQN: 123456789
              </span>
            </p>
            </div>
            <div className='items-end'>
                <button className='border rounded-md py-2 px-4 bg-blue-500 hover:bg-blue-400 focus:ring-2 focus:ring-blue-500'>
                    Chỉnh sửa
                </button>
            </div>
          </div>
          <div>
            <div>
            <InputUser title={"name"} type="text" value={""} label={"Họ và tên"}/>
            <InputUser title={"birth_day"} type="text" value={""} label={"Ngày sinh"}/>
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
        </div> 
    );
}

export default ProfileUser;