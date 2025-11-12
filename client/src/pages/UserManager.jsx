import React, { useState } from 'react';
import EditUser from '../components/UI/EditUser';
import DeleteUser from '../components/UI/DeleteUser';
import AddUser from '../components/UI/AddUser';
import InputSearch from '../components/UI/inputSearch';
const data = [
    {
        id:1,
        name:"Trần Đinh Nguyễn",
        rank:"Thượng Sỹ",
            position:"pbt",
            department:"bTT",
            phone:"0829957878",
            email:"tdinhnguyen279@gmail.com"
    },
    {
        id:2,
        name:"Trần Đinh Nguyễn",
        rank:"Thượng Sỹ",
            position:"pbt",
            department:"bTT",
            phone:"0829957878",
            email:"tdinhnguyen279@gmail.com"
    },
    {
        id:3,
        name:"Trần Đinh Nguyễn",
        rank:"Thượng Sỹ",
            position:"pbt",
            department:"bTT",
            phone:"0829957878",
            email:"tdinhnguyen279@gmail.com"
    },
    {
        id:4,
        name:"Trần Đinh Nguyễn",
        rank:"Thượng Sỹ",
            position:"pbt",
            department:"bTT",
            phone:"0829957878",
            email:"tdinhnguyen279@gmail.com"
    },
    {
        id:5,
        name:"Trần Đinh Nguyễn",
        rank:"Thượng Sỹ",
            position:"pbt",
            department:"bTT",
            phone:"0829957878",
            email:"tdinhnguyen279@gmail.com"
    }

]
function UserManager() {
    const [showPopup,setShowPopup] = useState(false)
    const [titlePopup,setTitlePopup] = useState("")
    
    return (
        <div className='mx-auto text-black'>
             <div className='flex justify-between items-center'>
                <p className='text-xl uppercase '>
                 Danh sách quân nhân Tiểu Đoàn
                </p>
                <div className='flex items-center mb-2 gap-x-4'>
                  <InputSearch/>
                <button 
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                onClick={()=>(
                    setShowPopup(!showPopup),
                    setTitlePopup("add"))
                    }>
                 <svg className="mx-auto fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
                   <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                 </svg>
                 <span className="max-xs:sr-only">Thêm mới</span>
               </button> 
               {titlePopup === "add" && showPopup ? (
                     <AddUser setTitlePopup={setTitlePopup} setOpen={setShowPopup}/>
                ):""}  
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
    {data.map((item,key)=>(
  <tr key={key}>
  <td className='border px-4 py-2'>{item.id}</td>
  <td className='border px-4 py-2'>{item.name}</td>
  <td className='border px-4 py-2'>{item.rank}</td>
  <td className='border px-4 py-2'>{item.position}</td>
  <td className='border px-4 py-2'>{item.department}</td>
  <td className='border px-4 py-2'>{item.phone}</td>
  <td className='border px-4 py-2'>{item.phone}</td>
  <td className='border px-4 py-2'>
    <div>
        <button 
        onClick={()=>(
            setTitlePopup("edit"),
            setShowPopup(!showPopup)
        )}
        className='px-2' title='Chỉnh sửa'>
        <svg className='h-6 w-6 lg:h-8 lg:w-8' viewBox="-4.8 -4.8 33.60 33.60" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-4.8" y="-4.8" width="33.60" height="33.60" rx="2.688" 
        fill="#91d9aa" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.7280000000000002" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.7280000000000002" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
        <button 
        onClick={()=>(
            setTitlePopup("delete"),
            setShowPopup(!showPopup)
            )}
        className='px-2' title='Xóa'>
        <svg className='h-6 w-6 lg:h-8 lg:w-8' viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="2.3040000000000003" 
        fill="#bf1d1d" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#000000" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#000000" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#000000" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
    </div>
  </td>
</tr>
    ))}
  </tbody>
</table>
 </div>
 {
     titlePopup ? (
         <div className="fixed w-full lg:w-4/5 left-1/2 top-1/2 -translate-1/2 h-full bg-white z-40"></div>
     ):("")
 }
 {titlePopup === "edit" && showPopup ? (
     <EditUser setTitlePopup={setTitlePopup} setOpen={setShowPopup}/>
 ):""}
 {titlePopup === "delete" && showPopup ? (
     <DeleteUser setTitlePopup={setTitlePopup} setOpen={setShowPopup}/>
 ):""}
        </div>
    
);
}

export default UserManager;

