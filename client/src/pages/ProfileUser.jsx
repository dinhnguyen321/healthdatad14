import axios from 'axios';
import  { useEffect, useState} from 'react';
import InputUser from '../components/UI/User/InputUser';
import HandlerUser from '../components/UI/HandlerUser';
function ProfileUser() {
    const API_URL = import.meta.env.VITE_API_URL
    const idUser = localStorage.getItem("idUser")
    const [showPopup,setShowPopup] = useState(false)
    const [inForPopup,setInForPopup] = useState({
              title:"",
              idUser:""
          })
          
    const [dataUser,setDataUser] = useState({
         idUser:"",  
      name: "",
      email: "",
      avt:"",
      phone: "",
      SHQN:"",
      birth_day:"",
      address:"",
      cccd_place:"",
      cccd_id:"",
      ethnicity:"",
      religion:"",
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
       const normalizeDate = (v) => {
      if (!v) return "";
      return v.length > 10 ? v.split("T")[0] : v;
    };
    useEffect(()=>{
            getUserById()
    },[])
    return (
        <div className='w-5/6 mx-auto space-y-5 bg-white p-5 rounded-md shadow-gray-400 shadow '>
          <div className="flex justify-between items-center">
           <div className="flex justify-center items-center gap-x-5">
             <img
            className="w-20 h-20 rounded-full object-cover"
            src={dataUser.avt ? dataUser.avt : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMHBhUTBxMVFhUWFxUVEBcXEBASFxYVFRUWFhcRExgYHSggGB0xGxYVITEiJSkrLi8uFx8zPDUsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EADUQAQABAgIHBQYGAwEAAAAAAAABAgMEEQUSITFBUXETMmGBkSKhscHR4SMzNEKi8FKSshT/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADK3aquz+HEz0iZdNOjLtX7fWafqDkHZOjLsft/lS5rtiqz+bTMdY2eoMAAAAAAAAAAAAAAAAAAAAAAAe26JuVxFG+dwPbVubteVuM5TOE0VTbjO/7U8uEfV04HCRhbWzfPen+8HSDymmKYyp2PQAeTGe96A4MVoum9Gdv2Z8N3nCFxFirD3MrsZfCfGFpacVh4xNrK55TynnAKwNmIszh7s03N8e+ObWAAAAAAAAAAAAAAAAAAAmNCYbKjXq47KenGf7yQ8RnOxarFvsrUUxwiIBmAAAAAAADg0vhu1w+tTvp2+XGPmgVsmM42qtft9lemnlMwDAAAAAAAAAAAAAAAAAAG3CRniqM/8AKn4rQq2Gq1cTTPKqn4rSAAAAAAAAArmlYyx9Xl/zCxq3pOrWx9XlHpEQDmAAAAAAAAAAAAAAAAAAWjC3e3w8VRxjb14+9V0noXE6tepXx209eQJoAAAAAAAGNyqKKJmrdG2fJVrlfaXJmeMzPql9NYnVt6lG+e905IYAAAAAAAAAAAAAAAAAAAicp2ACe0dj4xFOrc73x8Yd6pROU7EnhNLTRGWJ2xzjf58wTQ02cVRf/KqifDdPo3AA1XcRTZj8WqI8/kDa5MdjYwtHOqd0fOfBx4rS+zLDR5z8oRVdU11Z1znM7wK65uVzNc5zO94AAAAAAAAAAAAAAAAAAAAAAM7Vmq9P4VMz0gGtspvVU92qqOlUw7LeiblXfyjzzn3N9OhdntV/x+4I2b9dXeqq/wBpa0vOheVf8fu0XNEV09yYn1iQR423sNXY/NpmPHh6tQAAAAAAAAAAAAAAAAAAAADbhsNViasrUdZ4R1l14DR03/avbKeEcZ+kJu3bi1RlbjKI3A4MLoqm3tu+1Pu9EhTTFMZU7HoAAAABMZ73DidGUXu57M+G7zh3AKzisHVhp9uNnON32aFsqp1qcqvND4/Rer7WG86fp9ARY8egAAAAAAAAAAAAAAJPRej+0yrvxs/bHPxnwadGYP8A9N3Ovux755J+Iy3A9AAAAAAAAAAABF6T0frxNdiNv7o5+MeKGW1CaXwfZ1a9rdPe8J5gjQAAAAAAAAAAAGVq3N25FNG+dkMUroOxnM11dKfnIJTD2Yw9mKaOH9zbAAAAAAAAAAAAAAY3KIuUTFW6dksgFXxdicNfmmfLxjhLUmtN2NezFUb6d/Sfv8UKAAAAAAAAAAAs2BtdjhaY8NvWdsq5h6O0v0xzmI961QAAAAAAAAAAAAAAAADC7RF23MVcYmPVVqo1asp4bJ8lsVvSVGpjauufrGYOYAAAAAAAAAG/AfraOqzAAAAAAAAAAAAAAAAAAr+mP109IAHEAAAAAD//2Q=="} alt=" " />
            <p className="flex flex-col items-start text-black font-bold">Trần Đinh Nguyễn
              <span className='font-normal font-sans'>
                SHQN: {dataUser.SHQN ? dataUser.SHQN : ""}
              </span>
            </p>
            </div>
            <div className='items-end'>
                <button
                onClick={()=>{
                setInForPopup({
                  title:"edit",
                  idUser: dataUser.idUser
                  }),
                  setShowPopup(!showPopup)
                  }}
                className='border rounded-md py-2 px-4 bg-blue-500 hover:bg-blue-400 focus:ring-2 focus:ring-blue-500'>
                    Chỉnh sửa
                </button>
            </div>
          </div>
          <div className='space-y-5 border-b-2 border-black pb-4'>
            <h1 className='text-black uppercase font-bold tracking-wider'>Hồ sơ cá nhân</h1>
            <div className='flex lg:flex-row flex-col items-center gap-5 text-black'>
              <InputUser title="detail" readOnly={true} id={"name"} type="text" value={dataUser.name} label={"Họ và tên"}/>
              <InputUser title="detail" readOnly={true} id={"birth_day"} type="date" value={dataUser.birth_day ? normalizeDate(dataUser.birth_day): ""} label={"Ngày sinh"}/>
              <InputUser title="detail" readOnly={true} id={"phone"} type="text" value={dataUser.phone} label={"Số liên hệ"}/>
              <InputUser title="detail" readOnly={true} id={"address"} type="text" value={dataUser.address} label={"Địa chỉ"}/>
            </div>

            <div className='flex lg:flex-row flex-col items-center gap-5 text-black'>
              <InputUser title="detail" readOnly={true} id={"ethnicity"} type="text" value={dataUser.ethnicity} label={"Dân tộc"}/>
              <InputUser title="detail" readOnly={true} id={"religion"} type="text" value={dataUser.religion} label={"Tôn giáo"}/>
              <InputUser title="detail" readOnly={true} id={"cccd_id"} type="text" value={dataUser.cccd_id} label={"CCCD"}/>
              <InputUser title="detail" readOnly={true} id={"cccd_place"} type="text" value={dataUser.cccd_place} label={"Nơi cấp"}/>
            </div>

            <div className='flex lg:flex-row flex-col items-center gap-5 text-black'>
              <InputUser title="detail" readOnly={true} id={"enlistment_date"} type="date" value={dataUser.enlistment_date ? normalizeDate(dataUser.enlistment_date) : ""} label={"Nhập ngũ"}/>
              <InputUser title="detail" readOnly={true} id={"rank"} type="text" value={dataUser.rank} label={"Cấp bậc"}/>
              <InputUser title="detail" readOnly={true} id={"position"} type="text" value={dataUser.position} label={"Chức vụ"}/>
              <InputUser title="detail" readOnly={true} id={"department"} type="text" value={dataUser.department} label={"Đơn vị"}/>
              <InputUser title="detail" readOnly={true} id={"education_level"} type="text" value={dataUser.education_level} label={"Học vấn"}/>
            </div>

          </div>
          <div className='space-y-5'>
            <h1 className='text-black uppercase font-bold tracking-wider'>Hồ sơ sức khỏe</h1>
            <div className='flex lg:flex-row flex-col items-center gap-5 text-black'>
              <InputUser title="detail" readOnly={true} id={"health_insurance_code"} type="text" value={dataUser.medicalProfile.health_insurance_code} label={"Mã BHYT"}/>
              <InputUser title="detail" readOnly={true} id={"blood_type"} type="text" value={dataUser.medicalProfile.blood_type} label={"Nhóm máu AOB"}/>
            </div>

             <div className='flex lg:flex-row flex-col items-center gap-5 text-black'>
              <InputUser title="detail" readOnly={true} id={"height_cm"} type="text" value={dataUser.medicalProfile.height_cm} label={"Chiều cao"}/>
              <InputUser title="detail" readOnly={true} id={"weight_kg"} type="text" value={dataUser.medicalProfile.weight_kg} label={"Cân nặng"}/>
              <InputUser title="detail" readOnly={true} id={"bmi"} type="text" value={dataUser.medicalProfile.bmi} label={"Chỉ số BMI"}/>
            </div>

            <div className='flex lg:flex-row flex-col items-center gap-5 text-black'>
               <InputUser title="detail" textarea={true} readOnly={true} id={"medical_history"} type="date" value={dataUser.medical_history} label={"Tiền sử bệnh"}/>
              <InputUser title="detail" textarea={true} readOnly={true} id={"current_disease"} type="text" value={dataUser.current_disease} label={"Căn bệnh hiện tại"}/>
              <InputUser title="detail" textarea={true} readOnly={true} id={"treatment_plan"} type="text" value={dataUser.treatment_plan} label={"Phương án điều trị"}/>
            </div>
          </div>
              {
                inForPopup.title ? (
                    <div className={`fixed w-full left-1/2 top-1/2 -translate-1/2 z-50 bg-white h-full opacity-50
                        `}></div>
              ):("")}
              { inForPopup.title === "edit" && showPopup ? (
                  <HandlerUser resetData={getUserById} data={dataUser} setInForPopup={setInForPopup} setOpen={setShowPopup} inForPopup={inForPopup}/>
              ):""}
        </div> 
    );
}

export default ProfileUser;