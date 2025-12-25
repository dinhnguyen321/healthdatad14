// import axios from 'axios';
// import React, { useEffect, useState} from 'react';
// import {Bounce, ToastContainer, toast} from "react-toastify"
// import InputUser from './User/InputUser';

// function ProfileUser() {
//       const API_URL = import.meta.env.VITE_API_URL
//   const [image, setImage] = useState(null)
//     const [dataUser,setDataUser] = useState({
//          idUser:"",  
//       name: "",
//       email: "",
//       avt:"",
//       phone: "",
//       SHQN:"",
//       birth_day:"",
//       address:"",
//       rank:"",
//       position:"",
//       department:"",
//       enlistment_date:"",
//       password:"12345678b",
//       role:"user",
//       medicalProfile:{
//         health_insurance_code :"",
//         height_cm:"",
//         weight_kg:"",
//         bmi:"",
//         medical_history:"",
//         current_disease:"",
//         treatment_plan:"",
//         blood_type :"",
//         id:"",
//         userId:"",
//         updated_at:"",
//         created_at:"",
//       },
//     })

//     const [inForPopup,setInForPopup] = useState({
//            title:"",
//            idUser:""
//     })

//     const onChangeInput = (e) =>{
//       const {name,value} = e.target
//       setDataUser((prev)=>({...prev, [name]: value}) )
//     }
//     const onChangeMedical = (e) => {
//     const { name, value } = e.target;

//       setDataUser((prev) => ({
//       ...prev,
//       medicalProfile: {
//       ...prev.medicalProfile,
//       [name]: value,
//       },
//       }));
//     };

//   const handleUpload = async () => {
//     if (!image) return alert("Chọn ảnh đã bạn ơi!");
//     const loadingToast = toast.loading('Đang đăng ký người dùng...'); 

//     const formData = new FormData();
//     formData.append('image', image); // 'image' phải trùng với upload.single('image') ở BE
    
//     try {
//       const response = await axios.post(`
//         ${API_URL}/api/upload`,
//          formData,
//       );

//       const data = await response.data;
        
//       if (data.url) {
//         setImage(data.url)
//         toast.success(`"Thành công! Link ảnh: " + ${data.url} `,{id: loadingToast});
//         toast.dismiss(loadingToast);
//         return data.url
//       }
//     } catch (error) {
//       toast.error(`Upload hình ảnh không thành công. `,{id: loadingToast});
//       toast.dismiss(loadingToast);
//       console.error("Lỗi upload:", error);
//     } 
//   };
      
//     const registerUser = async () => {
//       const loadingToast = toast.loading('Đang đăng ký người dùng...'); 
    
//       const dataRegister = {
//         name:dataUser.name,
//         phone:dataUser.phone,
//         email:dataUser.email,
//         password:dataUser.password,
//         rank:dataUser.rank,
//         position:dataUser.position,
//         SHQN:dataUser.SHQN,
//         avt:image !== null ? await handleUpload() : dataUser.avt,
//         department:dataUser.department,
//         enlistment_date:new Date(dataUser.enlistment_date),
//         birth_day:new Date(dataUser.birth_day),
//         role:"user",
//       }
//       const dataMedicalProfileUpdate = {
//         health_insurance_code :dataUser.medicalProfile.health_insurance_code,
//         height_cm:Number(dataUser.medicalProfile.height_cm),
//         weight_kg:Number(dataUser.medicalProfile.weight_kg),
//         bmi:Number(dataUser.medicalProfile.bmi),
//         medical_history:dataUser.medicalProfile.medical_history,
//         current_disease:dataUser.medicalProfile.current_disease,
//         treatment_plan:dataUser.medicalProfile.treatment_plan,
//         blood_type :dataUser.medicalProfile.blood_type
//       }
//       if(!dataRegister.name || !dataRegister.email || !dataUser.password) {
//         toast.dismiss(loadingToast);
//         toast.warning(`Chưa điền đủ thông tin bắt buộc`,{id: loadingToast});
//         return
//         } 
      
//        const resgisterUser = await axios.post(`${API_URL}/api/users`,dataRegister)
//        .then((res)=> {
//         toast.success(`Đăng ký người dùng thành công. ${res.status} `,{id: loadingToast});
//         toast.dismiss(loadingToast);
//       })
//        .catch((error)=>{
//         toast.error(`Đăng ký người không thành công. ${error.response.data.message} `,{id: loadingToast});
//         toast.dismiss(loadingToast);
//         console.log("error", error);
//        })
      
//       if(resgisterUser.status === 200){
//         await axios.post(`${API_URL}/api/users/${resgisterUser.data.idUser}/medical-profile`,dataMedicalProfileUpdate)  
//         .then((res) => {
//           if(res.status === 200){
//               toast.success("Đăng ký hồ sơ thành công!",{id: loadingToast});
//               setTimeout(()=> {
//                 toast.dismiss(loadingToast);
//                 setInForPopup({
//                   title:""
//                 })
//               },1500)
//           }
//         })
//         .catch((error)=>{
//           toast.error("Lỗi đăng ký hồ sơ người dùng: ",error, {id: loadingToast})
//           toast.dismiss(loadingToast);
//           console.log("error đăng ký hồ sơ người dùng: ",error)
//         })}
//   }

//     // cập nhật thông tin người dùng
// const updateUser = async (id)=> {
//   const loadingToast = toast.loading('Đang cập nhật thông tin người dùng...'); 
   
//   const dataUserUpdate = {
//       idUser:dataUser.idUser,  
//       name:dataUser.name,
//       phone:dataUser.phone,
//       rank:dataUser.rank,
//       position:dataUser.position,
//       department:dataUser.department,
//       avt: image !== null ? await handleUpload() : dataUser.avt,
//       SHQN:dataUser.SHQN,
//       enlistment_date:new Date(dataUser.enlistment_date),
//       address:dataUser.address,
//       birth_day:new Date(dataUser.birth_day),
//   }
   
//   const dataMedicalProfileUpdate = {
//         health_insurance_code :dataUser.medicalProfile.health_insurance_code,
//         height_cm:Number(dataUser.medicalProfile.height_cm),
//         weight_kg:Number(dataUser.medicalProfile.weight_kg),
//         bmi:Number(dataUser.medicalProfile.bmi),
//         medical_history:dataUser.medicalProfile.medical_history,
//         current_disease:dataUser.medicalProfile.current_disease,
//         treatment_plan:dataUser.medicalProfile.treatment_plan,
//         blood_type :dataUser.medicalProfile.blood_type
//   }

//   try {
//     const request = await axios.put(`${API_URL}/api/users/${id}`,dataUserUpdate)
//     const requestMedicalProfile = await axios.put(`${API_URL}/api/users/${id}/medical-profile`,dataMedicalProfileUpdate)  
     
//     const [response,responseMedicalProfile ]= await Promise.all([request,requestMedicalProfile])
//     if(response.status && responseMedicalProfile.status === 200){
//          toast.success("thành công")
//          toast.dismiss(loadingToast);
//          setTimeout(()=>{
//           setInForPopup({
//             title:""
//           })
//         },2000)}
//   } catch (error) {
//     toast.warning("Cập nhật thông tin thất bại")
//     toast.dismiss(loadingToast);
//     console.log("error cập nhật người dùng: ",error);
//   }
// }
 
//     useEffect(()=>{
//     },[])
//     const normalizeDate = (v) => {
//       if (!v) return "";
//       return v.length > 10 ? v.split("T")[0] : v;
//     };
//     const getProfileUser = async(idUser)=>{
//     const res = await axios.get(`${API_URL}/api/users/${idUser}`)
//                 console.log(res.data);
                
//     } 

//     useEffect(()=>{
//         const idUser = localStorage.getItem("idUser")
//         if(idUser){
//             getProfileUser(idUser)
//         }
//     },[])
//     return (
//         <div className=''>
//             <ToastContainer
//               position="top-right"
//               autoClose={5000}
//               hideProgressBar={false}
//               newestOnTop={false}
//               closeOnClick={false}
//               rtl={false}
//               pauseOnFocusLoss
//               draggable
//               pauseOnHover
//               theme="light"
//               transition={Bounce}
//               />
//             </div> 
//     );
// }

// export default ProfileUser;