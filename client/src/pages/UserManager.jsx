import React, { useEffect, useState } from 'react';
import HandlerUser from '../components/UI/HandlerUser';
import DeleteUser from '../components/UI/DeleteUser';
import InputSearch from '../components/UI/inputSearch';
import axios from 'axios';

function UserManager() {
    const [keyword, setKeyword] = useState({
        name:"",
        phone:""
    });
    const [showPopup,setShowPopup] = useState(false)
    const [inForPopup,setInForPopup] = useState({
        title:"",
        idUser:""
    })
    const [dataUser,setDataUser] = useState([])
    const getAllUser = async()=>{
        try {
            await axios.get("http://localhost:4000/api/users")
            .then((res)=>{
                setDataUser(res.data)
            })
        } catch (error) {
                console.log("error: ",error);
        }    
}   
    useEffect(()=>{
        getAllUser()
    },[])
     
    const deleteUser  = async() => {
            const idUser = inForPopup.idUser    
        try {
                if(idUser){
                    await axios.delete(`http://localhost:4000/api/users/${idUser}`)
                    getAllUser()
                }
            } catch (error) {
                console.log("error: ",error);
                
            }
    }
    
const handleSearch = async () => {
    console.log(keyword.name,keyword.phone);
    
    try {
      const res = await axios.get(
        `http://localhost:4000/api/users/search`,{
            params:{
                name:keyword.name,
                phone:keyword.phone,
            }
        }
      );
      setDataUser(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };
    return (
        <div className='mx-auto text-black'>
             <div className='flex justify-between items-center'>
                <p className='text-xl uppercase '>
                 Danh sách quân nhân Tiểu Đoàn
                </p>

                {/* search */}
                <div className='flex items-center mb-2 gap-x-4'>
                  <InputSearch handleSearch={handleSearch} value={keyword} setKeyword={setKeyword}/>
                  {/* Thêm mới User */}
                <button 
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
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
                </div>
            </div>
        <div className='overflow-x-auto'>
              <table class="table-auto min-w-full">
                <thead>
                    <tr>
                    <th className='border px-4 py-2'>STT</th>
                    <th className='border px-4 py-2'>Họ và Tên</th>
                    <th className='border px-4 py-2'>Cấp bậc</th>
                    <th className='border px-4 py-2'>Chức Vụ</th>
                    <th className='border px-4 py-2'>Đơn vị</th>
                    <th className='border px-4 py-2'>Số Điện Thoại</th>
                    <th className='border px-4 py-2'>Email</th>
                    <th className='border px-4 py-2'></th>
                    </tr>
                </thead>
                <tbody>
                    {dataUser.map((item,key)=>(
                <tr key={key}>
                <td className='border px-4 py-2'>{key + 1}</td>
                <td className='border px-4 py-2'>{item.name}</td>
                <td className='border px-4 py-2'>{item.rank}</td>
                <td className='border px-4 py-2'>{item.position}</td>
                <td className='border px-4 py-2'>{item.department}</td>
                <td className='border px-4 py-2'>{item.phone}</td>
                <td className='border px-4 py-2'>{item.email}</td>
                <td className='border px-4 py-2'>
                    <div>
                        <button 
                        onClick={()=>(
                            setInForPopup({
                                title:"edit",
                                idUser: item.idUser
                            }),
                            setShowPopup(!showPopup)
                        )}
                        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' title='Chỉnh sửa'>
                    <svg className='h-4 w-4 lg:h-6 lg:w-6' 
                    viewBox="-1 -3 24 24" 
                    version="1.1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    xmlns:xlink="http://www.w3.org/1999/xlink"fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>edit [#1479]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-99.000000, -400.000000)" 
                        fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z" id="edit-[#1479]"> </path> </g> </g> </g> </g></svg>
                        </button>

                        <button 
                        onClick={()=>(
                            setInForPopup({
                                title:"delete",
                                idUser: item.idUser
                            }),
                            setShowPopup(!showPopup)
                            )}
                        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-red-800 dark:focus:ring-blue-800' title='Xóa'>
                    <svg className='h-4 w-4 lg:h-6 lg:w-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                        <path d="M14 12V17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
                        <path d="M4 7H20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
                        </g>
                        </svg>
                        </button>

                        <button 
                        onClick={()=>(
                        setInForPopup({
                            title:"detail",
                            idUser: item.idUser
                        }),
                        setShowPopup(!showPopup)
                        )}
                        title='Xem chi tiết' 
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-green-800 dark:focus:ring-blue-800">
                        <svg fill="#ffffff" className='h-4 w-4 lg:h-6 lg:w-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z">
                                </path><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z"></path></g></svg>
                        </button>
                    </div>
                </td>
                </tr>
                    ))}
                </tbody>
                </table>
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
        </div>
    
);
}

export default UserManager;

