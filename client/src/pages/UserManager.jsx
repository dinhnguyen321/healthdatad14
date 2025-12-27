import React, { useEffect, useState } from 'react';
import HandlerUser from '../components/UI/HandlerUser';
import DeleteUser from '../components/UI/DeleteUser';
import InputSearch from '../components/UI/inputSearch';
import axios from 'axios';
import { SkeletonTable } from '../components/UI/User/SkeletonTable';
import Pagination from '../components/UI/User/Pagination';
import { Bounce, toast,ToastContainer } from 'react-toastify';
import {format} from "date-fns"
import DropdownCRUD from '../components/UI/DropdownCRUD';
// import {useSearchParams} from 'react-router-dom'
function UserManager() {
    const role = localStorage.getItem("role")
    const API_URL = import.meta.env.VITE_API_URL
    // const [searchParams, setSearchParams] = useSearchParams()
    const [selectedIds ,setSelectedIds] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [keyword, setKeyword] = useState({
        name:"",
        health_insurance_code:""
    });
    const [showPopup,setShowPopup] = useState(false)
    const [inForPopup,setInForPopup] = useState({
        title:"",
        idUser:""
    })
    // Pagination
    const [page, setPage] = useState(1);
    const [dataUser,setDataUser] = useState([])
    
    const getAllUser = async()=>{
        try {
            setIsLoading(true)
            await axios.get(`${API_URL}/api/users`,{
                params:{page, limit:10}
            })
            .then((res)=>{
                setDataUser(res.data)
                setIsLoading(false);
            })
        } catch (error) {
                console.log("error: ",error);
        }
}   

const handleSelectOne = (idUser) => {
    setSelectedIds((prev)=> 
        prev.includes(idUser) 
    ? prev.filter((item) => item !== idUser) 
    : [...prev, idUser]
        )
    }         
    
    const confirmDeleteUser = () =>{
        if (selectedIds.length === 0) {
                toast.warning("Chưa chọn người dùng cần xóa!")
                return
            };  
            setInForPopup({
                title:"delete",
                idUser: selectedIds
            }),
            setShowPopup(!showPopup)
    }

    const deleteUser  = async() => {
             const loadingToast = toast.loading('Đang xử lý xóa...'); 
             try {
                 if(selectedIds.length > 1){
                    await axios.post(`${API_URL}/api/users/bulk-delete`,
                     { ids: selectedIds}
                    )
                } else {
                    await axios.delete(`${API_URL}/api/users/${selectedIds[0]}`)
                    .then(()=>{
                        toast.success('Đã xóa 1 người dùng thành công!')
                    }).catch((err)=>{
                        console.error("Lỗi xóa 1 người dùng:", err);
                    })
                } 
                toast.success('Đã xóa thành công!', {Id: loadingToast})
                toast.dismiss(loadingToast);
                setSelectedIds([])
                getAllUser()
            } catch (error) {
                console.error("Lỗi xóa người dùng:", error);
                toast.error('Xóa thất bại!', { Id: loadingToast });
                toast.dismiss(loadingToast);
            }
    }
    
const handleSearch = async () => {
    const loadingToast = toast.loading('Đang tìm người dùng...'); 
    try {
        const res = await axios.get(
        `${API_URL}/api/users/search`,{
            params:{
                limit:10,
                page,
                name:keyword.name,
                health_insurance_code:keyword.health_insurance_code,
            }
        }
      );
      if(res.status === 200){
          setDataUser(res.data);   
          toast.dismiss(loadingToast);
      }
      toast.dismiss(loadingToast);
    } catch (err) {
      console.error("Search error:", err);
    }
};
useEffect(()=>{       
    getAllUser()
// eslint-disable-next-line react-hooks/exhaustive-deps
},[page])

  return (
        <div className='mx-auto text-black w-3/4 font-semibold' >
             <div className='flex lg:flex-row flex-col justify-between items-center'>
                <p className='text-xl uppercase '>
                 Danh sách quân nhân Tiểu Đoàn
                </p>

                {/* search */}
                <div className='flex items-center mb-2 gap-x-4'>
                  <InputSearch handleSearch={handleSearch} value={keyword} setKeyword={setKeyword}/>
                  {/* Thêm mới User */}
                </div>
            </div>
        <div className='overflow-x-auto'>
             { role === "user" ? "" : ( 
                <div className='flex justify-end items-center gap-x-2'>
                <button 
                className="flex items-center gap-x-2 px-4 py-2 rounded-xl bg-gray-700 text-gray-100 hover:bg-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-blue-500"
                onClick={()=>(
                    setShowPopup(!showPopup),
                    setInForPopup({
                        title:"add"
                }))
                    }>
                 <svg className="mx-auto fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
                   <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                 </svg>
                 <span className="max-xs:sr-only">Thêm mới</span>
                </button> 
                <button 
                onClick={()=>confirmDeleteUser()}
                className='flex justify-end relative my-2  
                '>
                    <svg className='rounded-lg h-9 w-9 p-2 hover:bg-red-500 bg-gray-700 text-gray-200' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    </path>
                                    <path d="M14 12V17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" strokeLinejoin="round"></path> 
                                    <path d="M4 7H20" stroke="#ffffff" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                                    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                                    </g>
                    </svg>
                </button>
                </div>
            )}
              <table className="table-auto min-w-full">
                <thead>
                    <tr>
                    <th></th>
                    <th className='text-start px-1 py-2'>Họ và Tên</th>
                    <th className='text-start px-1 py-2'>Nhập ngũ</th>
                    <th className='text-start px-1 py-2'>Năm sinh</th>
                    <th className='text-start px-1 py-2'>Cấp bậc</th>
                    <th className='text-start px-1 py-2'>Chức Vụ</th>
                    <th className='text-start px-1 py-2'>Đơn vị</th>
                    <th className='text-start px-1 py-2'></th>
                    </tr>
                </thead>
                {
                isLoading ? <SkeletonTable/> :(
                <tbody>
                    {dataUser.users?.length === 0 ? (
                        <tr>
                        <td colSpan={8} className='text-center font-bold py-4'>
                            Tên người dùng không có trong danh sách 
                        </td>
                        </tr>  
                        ) : 
                        dataUser.users?.map((item,key)=>(
                        <tr key={key} >
                        <td className='border-b text-center px-1 py-2'>
                            <input type="checkbox" 
                            name={item.idUser}
                             id={item.idUser} 
                             className='m-1 w-4 h-4 rounded-xs bg-white focus:ring-2 focus:ring-blue-500'
                             checked={selectedIds.includes(item.idUser)}
                             onChange={()=>handleSelectOne(item.idUser)}
                             />
                        </td>
                        <td className='border-b text-start px-1 py-2 cursor-pointer'
                        onClick={()=>{
                              setInForPopup({
                                title:"detail",
                                idUser: item.idUser
                            }),
                            setShowPopup(!showPopup)
                        }}
                        >
                            <div className='flex items-center gap-x-2'>
                                <div>
                                    <img
                                    className='w-12 h-12 object-cover rounded-full'
                                    src={`${ item.avt ? item.avt : "https://res.cloudinary.com/dssyoikpk/image/upload/v1766493367/z7192639253857_35218d5daa47f331e561cea0993af9ec_uv7epe.jpg"}`} alt="avt" />
                                </div>
                                <div>
                                    <p className='font-extrabold hover:underline hover:underline-offset-4'>{item.name}</p>
                                    <span className='font-sans font-normal'>SHQN: {item.SHQN}</span>
                                </div>
                            </div>
                        </td>
                        <td className='border-b text-start px-1 py-2'>{item.enlistment_date ? format(new Date(item.enlistment_date), 'MM/yyyy') : ""}</td>
                        <td className='border-b text-start px-1 py-2'>{item.birth_day ? format(new Date(item.birth_day), 'dd/MM/yyyy') : ""}</td>
                        <td className='border-b text-start px-1 py-2'>{item.rank}</td>
                        <td className='border-b text-start px-1 py-2'>{item.position}</td>
                        <td className='border-b text-start px-1 py-2'>{item.department}</td>
                        <td className='border-b text-center px-1 py-2'>
                            <DropdownCRUD setSelectedIds={setSelectedIds} item={item} setInForPopup={setInForPopup} setShowPopup={setShowPopup} showPopup={showPopup}/>
                        </td>
                    </tr>
                    ))}
                </tbody>
                )}
                </table>
                <div>
                    {
                        dataUser.pagination ? (
                            <Pagination pagination={dataUser.pagination} setPage={setPage} page={page}/>
                        ): ""
                    }
                </div>
        </div>
 {
     inForPopup.title ? (
         <div className="fixed w-full lg:w-4/5 left-1/2 top-1/2 -translate-1/2 h-full bg-white z-40"></div>
     ):("")
 }
 {inForPopup.title === "detail" || inForPopup.title === "edit" || inForPopup.title === "add" && showPopup ? (
     <HandlerUser resetData={getAllUser} data={dataUser} setInForPopup={setInForPopup} setOpen={setShowPopup} inForPopup={inForPopup}/>
 ):""}
 {inForPopup.title === "delete" && showPopup ? (
     <DeleteUser deleteUser={deleteUser} close={setShowPopup} setInForPopup={setInForPopup}/>
 ):""}
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

export default UserManager;

