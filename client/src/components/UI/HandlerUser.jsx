  /* eslint-disable no-dupe-keys */
import React, {useEffect, useState } from 'react';
import InputUser from './User/InputUser';
import axios from "axios"
import {Bounce, ToastContainer, toast} from "react-toastify"
import { PlayPauseIcon } from '@heroicons/react/20/solid';
import UploadImage from './UploadImage';

function HandlerUser({setOpen,setInForPopup,inForPopup,resetData}) {
  const API_URL = import.meta.env.VITE_API_URL
  const [image, setImage] = useState(null)
  const [initialData, setInitialData] = useState(null)
  const [dataUser, setDataUser] = useState({
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
    const onChangeInput = (e) =>{
      const {name,value} = e.target
      setDataUser((prev)=>({...prev, [name]: value}) )
    }
    const onChangeMedical = (e) => {
      const { name, value } = e.target;

        setDataUser((prev) => ({
        ...prev,
        medicalProfile: {
        ...prev.medicalProfile,
        [name]: value,
        },
        }));
    };
    
    
    const handleUpload = async () => {
    if (!image) return alert("Chọn ảnh đã bạn ơi!");

    const formData = new FormData();
    formData.append('image', image); // 'image' phải trùng với upload.single('image') ở BE
    
    try {
      const response = await axios.post(`
        ${API_URL}/api/upload`,
         formData,
      );

      const data = await response.data;
        
      if (data.url) {
        setImage(data.url)
        // toast.success(`"Thành công! Link ảnh: " + ${data.url} `,{id: loadingToast});
        // toast.dismiss(loadingToast);
        return data.url
      }
    } catch (error) {
      // toast.error(`Upload hình ảnh không thành công. `,{id: loadingToast});
      // toast.dismiss(loadingToast);
      console.error("Lỗi upload:", error);
    } 
  };
      
    const registerUser = async () => {
      const loadingToast = toast.loading('Đang đăng ký người dùng ...'); 

      const dataRegister = {
        name:dataUser.name,
        phone:dataUser.phone,
        email:dataUser.email,
        password:dataUser.password,
        rank:dataUser.rank,
        position:dataUser.position,
        SHQN:dataUser.SHQN,
        avt:image !== null ? await handleUpload() : dataUser.avt,
        department:dataUser.department,
        enlistment_date:new Date(dataUser.enlistment_date),
        birth_day:new Date(dataUser.birth_day),
        role:"user",
      }
      const dataMedicalProfileUpdate = {
        health_insurance_code :dataUser.medicalProfile.health_insurance_code,
        height_cm:Number(dataUser.medicalProfile.height_cm),
        weight_kg:Number(dataUser.medicalProfile.weight_kg),
        bmi:Number(dataUser.medicalProfile.bmi),
        medical_history:dataUser.medicalProfile.medical_history,
        current_disease:dataUser.medicalProfile.current_disease,
        treatment_plan:dataUser.medicalProfile.treatment_plan,
        blood_type :dataUser.medicalProfile.blood_type
      }

      if(!dataRegister.name || !dataRegister.SHQN || !dataUser.password) {
        toast.dismiss(loadingToast);
        toast.warning(`Chưa điền đủ thông tin bắt buộc`,{id: loadingToast});
        return
      } 
      try {
        const resgisterUser = await axios.post(`${API_URL}/api/users`,dataRegister)
        
         if(resgisterUser.status === 200){
            await axios.post(`${API_URL}/api/users/${resgisterUser.data.idUser}/medical-profile`,dataMedicalProfileUpdate)  
            .then((res)=>{
              if(res.status === 200){
              toast.dismiss(loadingToast);
              toast.success("Đăng ký hồ sơ thành công!",{id: loadingToast});
              setTimeout(()=> {
                toast.dismiss(loadingToast);
                setInForPopup({
                  title:""
                }),
                resetData()
                setOpen(false)
              },1500)
              }
            })
            .catch((error)=>{
              toast.warning("Đăng ký hồ sơ không thành công!",error);
              return
            })
        }
      } catch (error) {
          toast.error("Lỗi đăng ký hồ sơ người dùng: ",error, {id: loadingToast})
          toast.dismiss(loadingToast);
          console.log("error đăng ký hồ sơ người dùng: ",error)
      }}
        // cập nhật thông tin người dùng
        const updateUser = async (id)=> {
  const loadingToast = toast.loading('Đang cập nhật thông tin người dùng...'); 
   
  const dataUserUpdate = {
      idUser:dataUser.idUser,  
      name:dataUser.name,
      phone:dataUser.phone,
      rank:dataUser.rank,
      position:dataUser.position,
      department:dataUser.department,
      avt: image !== null ? await handleUpload() : dataUser.avt,
      SHQN:dataUser.SHQN,
      enlistment_date:new Date(dataUser.enlistment_date),
      address:dataUser.address,
      birth_day:new Date(dataUser.birth_day),
  }
   
  const dataMedicalProfileUpdate = {
        health_insurance_code :dataUser.medicalProfile.health_insurance_code,
        height_cm:Number(dataUser.medicalProfile.height_cm),
        weight_kg:Number(dataUser.medicalProfile.weight_kg),
        bmi:Number(dataUser.medicalProfile.bmi),
        medical_history:dataUser.medicalProfile.medical_history,
        current_disease:dataUser.medicalProfile.current_disease,
        treatment_plan:dataUser.medicalProfile.treatment_plan,
        blood_type :dataUser.medicalProfile.blood_type
  }
  
  if(!hasChanges()){
    toast.info("Không có thông tin gì thay đổi.")
    toast.dismiss(loadingToast)
    return
  }
  
  try {
    const request = await axios.put(`${API_URL}/api/users/${id}`,dataUserUpdate)
    const requestMedicalProfile = await axios.put(`${API_URL}/api/users/${id}/medical-profile`,dataMedicalProfileUpdate)  
     
    const [response,responseMedicalProfile ]= await Promise.all([request,requestMedicalProfile])
    if(response.status && responseMedicalProfile.status === 200){
         toast.success("thành công")
         toast.dismiss(loadingToast);
         setTimeout(()=>{
          resetData()
          setInForPopup({
            title:""
          }),
          setOpen(false)
        },2000)}
  } catch (error) {
    toast.warning("Cập nhật thông tin thất bại")
    toast.dismiss(loadingToast);
    console.log("error cập nhật người dùng: ",error);
  }
}

        // Kiểm tra xem có dữ liệu thay đổi thì cho tiến hành update
        const hasChanges = () => {
          if(image !== null) return true;

          const checkDeep = (current, original) => {
            // Duyệt qua tất cả các key của dataUser
            for (let key in current) {
              if(['updated_at', 'created_at', 'id', 'userId', 'role', 'password'].includes(key)) continue; // danh sách các trường k thay đổi

              const val1 = current[key]
              const val2 = original ? original[key] : undefined

              // check medicalProfile
              if(val1 && typeof val1 === 'object' && !(val1 instanceof Date)){
                if(checkDeep(val1,val2)) return true
              }
              // So sánh ngày tháng qua getTime()
              else if (val1 instanceof Date || (typeof val1 === 'string' && !isNaN(Date.parse(val1)) && key.includes('_'))) {
              if (new Date(val1).getTime() !== new Date(val2).getTime()) return true;
              }
              // So sánh các giá trị thông thường đưa về chuỗi để tránh lệch kiểu
              else {
                if (String(val1 || "") !== String(val2 || "")) return true;
              }
            }
            return false;
          }
          return checkDeep(dataUser, initialData)
        }

    const getUserById =async() => {
          const res = await axios.get(`${API_URL}/api/users/${inForPopup.idUser}`)
          setDataUser(res.data)
          setInitialData(JSON.parse(JSON.stringify(res.data))) // tạo bản sao dữ liệu để check khi update
          return
    }
 
    useEffect(()=>{
      getUserById()
    },[])
    const normalizeDate = (v) => {
      if (!v) return "";
      return v.length > 10 ? v.split("T")[0] : v;
    };
    
    return (
        <div className='fixed inset-0 flex items-center justify-center z-90'>
            <div className='w-full lg:w-4/5 border mx-auto text-black rounded-lg z-100 max-h-[90vh] overflow-y-auto'>
              <div className='flex items-center justify-between border-b px-4 bg-gray-300 rounded-lg'>
              <h2 className="text-xl font-bold px-4 py-2">
              {inForPopup.title === "edit" ? "Chỉnh sửa" : ""}
              {inForPopup.title === "detail" ? "Xem chi tiết" : ""}
              {inForPopup.title === "add" ? "Thêm mới" : ""}
              </h2>
             <button
              onClick={() =>(
                setInForPopup({
                  title:""
                }),
                setOpen(false)
              )
            }
              className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded"
            >
              X
            </button>
            </div>
           
            <div className='grid grid-cols-12 p-5'>
                <div className='col-span-12 space-y-2'>
                  <h2 className='font-bold text-xl'>Thông tin quân nhân</h2>
                  <div className='border-2 space-y-4 px-2 py-4 border-purple-800 rounded-md'>
                    <div className='flex justify-center items-center'>
                      <UploadImage avtfromData={dataUser.avt} setImage={setImage}/>
                    </div>
                    <div className='gap-x-5'>
                        <InputUser
                      onChangeInput={onChangeInput}
                      title={inForPopup.title}
                      value={dataUser.SHQN} 
                      label={"Số hiệu quân nhân"}
                      type={"text"}
                      id={"SHQN"}
                      />  
                    </div>
                  {/* row 1 */}
                  <div className='flex gap-x-5'>
                      <InputUser
                      onChangeInput={onChangeInput}
                      title={inForPopup.title}
                      value={dataUser.name} 
                      label={"Họ và Tên"}
                      type={"text"}
                      id={"name"}
                      />
                      <InputUser
                      onChangeInput={onChangeInput}
                      title={inForPopup.title}
                      value={dataUser.phone} 
                      label={"SĐT"}
                      type={"text"}
                      id={"phone"}
                      />
                      <InputUser
                      onChangeInput={onChangeInput}
                      title={inForPopup.title}
                      value={normalizeDate(dataUser.birth_day)} 
                      label={"Ngày/Tháng/Năm sinh"}
                      type={"date"}
                      id={"birth_day"}
                      />
                  </div>
                  {/* row 2 */}
                  <div className='flex gap-x-5'>
                      <InputUser
                      onChangeInput={onChangeInput}
                      title={inForPopup.title}
                      value={dataUser.rank}  
                      label={"Cấp bậc"}
                      type={"text"}
                      id={"rank"}
                      />
                      <InputUser
                      onChangeInput={onChangeInput}
                      title={inForPopup.title}
                      value={dataUser.position} 
                      label={"Chức vụ"}
                      type={"text"}
                      id={"position"}
                      />
                        <InputUser
                      onChangeInput={onChangeInput}
                      title={inForPopup.title}
                      value={dataUser.department} 
                      label={"Đơn vị"}
                      type={"text"}
                      id={"department"}
                      />
                  </div>
                  {/* row 3 */}
                  <div className='flex gap-x-5'>
                      <InputUser
                      onChangeInput={onChangeInput}
                      title={inForPopup.title}
                      value={normalizeDate(dataUser.enlistment_date)}  
                      label={"Tháng/Năm Nhập ngũ"}
                      type={"date"}
                      id={"enlistment_date"}
                      />
                      <InputUser
                      onChangeInput={onChangeInput}
                      title={inForPopup.title}
                      value={dataUser.address}  
                      label={"Địa chỉ"}
                      type={"text"}
                      id={"address"}
                      />
                        <InputUser
                      onChangeInput={onChangeInput}
                      title={inForPopup.title}
                      value={dataUser.email}  
                      label={"Email"}
                      type={"text"}
                      id={"email"}
                      />
                    </div>
                  </div>
                  <h2 className='font-bold text-xl'>Thông tin hồ sơ sức khỏe</h2>
                  <div className='border-2 px-2 py-4 space-y-4 border-purple-800 rounded-md'>
                  {/* row 1 */}
                  <div className='flex gap-x-5'>
                      <InputUser
                      onChangeInput={onChangeMedical}
                      title={inForPopup.title}
                      value={dataUser.medicalProfile.health_insurance_code} 
                      label={"Mã BHYT"}
                      type={"text"}
                      id={"health_insurance_code"}
                      />
                      <InputUser
                      onChangeInput={onChangeMedical}
                      title={inForPopup.title}
                      value={dataUser.medicalProfile.blood_type} 
                      label={"Nhóm máu ABO"}
                      type={"text"}
                      id={"blood_type"}
                      />
                  </div>
                  {/* row 2 */}
                  <div className='flex gap-x-5'>
                       <InputUser
                      onChangeInput={onChangeMedical}
                      title={inForPopup.title}
                      value={dataUser.medicalProfile.height_cm}  
                      label={"Chiều cao"}
                      type={"number"}
                      id={"height_cm"}
                      />
                      <InputUser
                      onChangeInput={onChangeMedical}
                      title={inForPopup.title}
                      value={dataUser.medicalProfile.weight_kg} 
                      label={"Cân nặng"}
                      type={"number"}
                      id={"weight_kg"}
                      />
                       <InputUser
                      onChangeInput={onChangeMedical}
                      title={inForPopup.title}
                      value={dataUser.medicalProfile.bmi} 
                      label={"Chỉ số BMI"}
                      type={"number"}
                      id={"bmi"}
                      />
                  </div>
                  {/* row 3*/}
                  <div className='flex gap-x-5'>
                      <InputUser
                      textarea={true}
                      onChangeInput={onChangeMedical}
                      title={inForPopup.title}
                      value={dataUser.medicalProfile.medical_history} 
                      label={"Tiền sử bệnh"}
                      type={"text"}
                      id={"medical_history"}
                      />
                      <InputUser
                      textarea={true}
                      onChangeInput={onChangeMedical}
                      title={inForPopup.title}
                      value={dataUser.medicalProfile.current_disease} 
                      label={"Căn bệnh hiện tại"}
                      type={"text"}
                      id={"current_disease"}
                      />
                      <InputUser
                      textarea={true}
                      onChangeInput={onChangeMedical}
                      title={inForPopup.title}
                      value={dataUser.medicalProfile.treatment_plan} 
                      label={"Hướng điều trị"}
                      type={"text"}
                      id={"treatment_plan"}
                      />
                    </div>
                  </div>
                </div>
            </div> 

                <div className='py-5 flex items-center justify-center'>
               
                  {/* button tạo mới */}
                  {inForPopup.title === "add" ? 
                   ( <button className='flex items-center justify-center bg-red-500 hover:bg-red-700 px-2 py-1 rounded-md text-white'
                    onClick={registerUser}>
                  <svg fill="white" className='h-8 w-8' viewBox="0 0 256.00 256.00" xmlns="http://www.w3.org/2000/svg" stroke="#b9b1b1" strokeWidth="0.00256"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fillRule="evenodd"> <path d="M65.456 48.385c10.02 0 96.169-.355 96.169-.355 2.209-.009 5.593.749 7.563 1.693 0 0-1.283-1.379.517.485 1.613 1.67 35.572 36.71 36.236 37.416.665.707.241.332.241.332.924 2.007 1.539 5.48 1.539 7.691v95.612c0 7.083-8.478 16.618-16.575 16.618-8.098 0-118.535-.331-126.622-.331-8.087 0-16-6.27-16.356-16.1-.356-9.832.356-118.263.356-126.8 0-8.536 6.912-16.261 16.932-16.261zm-1.838 17.853l.15 121c.003 2.198 1.8 4.003 4.012 4.015l120.562.638a3.971 3.971 0 0 0 4-3.981l-.143-90.364c-.001-1.098-.649-2.616-1.445-3.388L161.52 65.841c-.801-.776-1.443-.503-1.443.601v35.142c0 3.339-4.635 9.14-8.833 9.14H90.846c-4.6 0-9.56-4.714-9.56-9.14s-.014-35.14-.014-35.14c0-1.104-.892-2.01-1.992-2.023l-13.674-.155a1.968 1.968 0 0 0-1.988 1.972zm32.542.44v27.805c0 1.1.896 2.001 2 2.001h44.701c1.113 0 2-.896 2-2.001V66.679a2.004 2.004 0 0 0-2-2.002h-44.7c-1.114 0-2 .896-2 2.002z"></path> <path d="M127.802 119.893c16.176.255 31.833 14.428 31.833 31.728s-14.615 31.782-31.016 31.524c-16.401-.259-32.728-14.764-32.728-31.544s15.735-31.963 31.91-31.708zm-16.158 31.31c0 9.676 7.685 16.882 16.218 16.843 8.534-.039 15.769-7.128 15.812-16.69.043-9.563-7.708-16.351-15.985-16.351-8.276 0-16.045 6.52-16.045 16.197z"></path> </g> </g></svg>
                  <p className='text-lg'>Lưu</p>
                  </button> 
                  ):""}
                  {/* button sửa */}
                  {inForPopup.title === "edit" ?  
                    (
                      <button className='flex items-center justify-center bg-red-500 hover:bg-red-700 px-2 py-1 rounded-md text-white'
                      onClick={()=>updateUser(inForPopup.idUser)}>
                      <svg fill="white" className='h-8 w-8' viewBox="0 0 256.00 256.00" xmlns="http://www.w3.org/2000/svg" stroke="#b9b1b1" strokeWidth="0.00256"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fillRule="evenodd"> <path d="M65.456 48.385c10.02 0 96.169-.355 96.169-.355 2.209-.009 5.593.749 7.563 1.693 0 0-1.283-1.379.517.485 1.613 1.67 35.572 36.71 36.236 37.416.665.707.241.332.241.332.924 2.007 1.539 5.48 1.539 7.691v95.612c0 7.083-8.478 16.618-16.575 16.618-8.098 0-118.535-.331-126.622-.331-8.087 0-16-6.27-16.356-16.1-.356-9.832.356-118.263.356-126.8 0-8.536 6.912-16.261 16.932-16.261zm-1.838 17.853l.15 121c.003 2.198 1.8 4.003 4.012 4.015l120.562.638a3.971 3.971 0 0 0 4-3.981l-.143-90.364c-.001-1.098-.649-2.616-1.445-3.388L161.52 65.841c-.801-.776-1.443-.503-1.443.601v35.142c0 3.339-4.635 9.14-8.833 9.14H90.846c-4.6 0-9.56-4.714-9.56-9.14s-.014-35.14-.014-35.14c0-1.104-.892-2.01-1.992-2.023l-13.674-.155a1.968 1.968 0 0 0-1.988 1.972zm32.542.44v27.805c0 1.1.896 2.001 2 2.001h44.701c1.113 0 2-.896 2-2.001V66.679a2.004 2.004 0 0 0-2-2.002h-44.7c-1.114 0-2 .896-2 2.002z"></path> <path d="M127.802 119.893c16.176.255 31.833 14.428 31.833 31.728s-14.615 31.782-31.016 31.524c-16.401-.259-32.728-14.764-32.728-31.544s15.735-31.963 31.91-31.708zm-16.158 31.31c0 9.676 7.685 16.882 16.218 16.843 8.534-.039 15.769-7.128 15.812-16.69.043-9.563-7.708-16.351-15.985-16.351-8.276 0-16.045 6.52-16.045 16.197z"></path> </g> </g></svg>
                      <p className='text-lg'>Thay đổi</p>
                      </button> 
                    ):""  
                }
                {inForPopup.title === "detail" ? (
                   <button className='flex items-center justify-center bg-red-500 hover:bg-red-700 px-2 py-1 rounded-md text-white'
                   onClick={() =>(
                    setInForPopup({
                      title:""
                    }),
                    setOpen(false)
                  )
                }
                   >
                   <svg fill="white" className='h-8 w-8' viewBox="0 0 256.00 256.00" xmlns="http://www.w3.org/2000/svg" stroke="#b9b1b1" strokeWidth="0.00256"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fillRule="evenodd"> <path d="M65.456 48.385c10.02 0 96.169-.355 96.169-.355 2.209-.009 5.593.749 7.563 1.693 0 0-1.283-1.379.517.485 1.613 1.67 35.572 36.71 36.236 37.416.665.707.241.332.241.332.924 2.007 1.539 5.48 1.539 7.691v95.612c0 7.083-8.478 16.618-16.575 16.618-8.098 0-118.535-.331-126.622-.331-8.087 0-16-6.27-16.356-16.1-.356-9.832.356-118.263.356-126.8 0-8.536 6.912-16.261 16.932-16.261zm-1.838 17.853l.15 121c.003 2.198 1.8 4.003 4.012 4.015l120.562.638a3.971 3.971 0 0 0 4-3.981l-.143-90.364c-.001-1.098-.649-2.616-1.445-3.388L161.52 65.841c-.801-.776-1.443-.503-1.443.601v35.142c0 3.339-4.635 9.14-8.833 9.14H90.846c-4.6 0-9.56-4.714-9.56-9.14s-.014-35.14-.014-35.14c0-1.104-.892-2.01-1.992-2.023l-13.674-.155a1.968 1.968 0 0 0-1.988 1.972zm32.542.44v27.805c0 1.1.896 2.001 2 2.001h44.701c1.113 0 2-.896 2-2.001V66.679a2.004 2.004 0 0 0-2-2.002h-44.7c-1.114 0-2 .896-2 2.002z"></path> <path d="M127.802 119.893c16.176.255 31.833 14.428 31.833 31.728s-14.615 31.782-31.016 31.524c-16.401-.259-32.728-14.764-32.728-31.544s15.735-31.963 31.91-31.708zm-16.158 31.31c0 9.676 7.685 16.882 16.218 16.843 8.534-.039 15.769-7.128 15.812-16.69.043-9.563-7.708-16.351-15.985-16.351-8.276 0-16.045 6.52-16.045 16.197z"></path> </g> </g></svg>
                   <p className='text-lg'>Đóng</p>
                   </button> 
                ) : ""}
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

export default HandlerUser;