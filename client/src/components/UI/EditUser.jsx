import React, {useEffect, useState } from 'react';
import InputUser from './User/InputUser';

function EditUser({setOpen,setTitlePopup}) {
  const [file, setFile]=useState("")
  const [preview, setPreview]=useState("data:image/png;base64,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")
    const onChangeFile = (e) => {
      const fileImg = e.target.files[0]
      if(fileImg){
        // const url = URL.createObjectURL(fileImg)
        setFile(fileImg)
        e.target.value = "";
      }
    }
    useEffect(()=>{
      if(!file) return;
      const objUrl = URL.createObjectURL(file)
      setPreview(objUrl)
      return () =>  URL.revokeObjectURL(objUrl)
    },[file])

    
    return (
        <div className='fixed inset-0 flex items-center justify-center z-90'>
            <div className='w-full lg:w-4/5 border mx-auto text-black rounded-lg z-100 max-h-[90vh] overflow-y-auto'>
           
            <div className='flex items-center justify-between border-b px-4 bg-gray-300 rounded-lg'>
            <h2 className="text-xl font-bold px-4 py-2">Chỉnh sửa</h2>
            <button
              onClick={() =>(
                setTitlePopup(""),
                setOpen(false)
              )
            }
              className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded"
            >
              X
            </button>
            </div>

            <div className='grid grid-cols-12 p-5'>
                <div className='col-span-3 lg:mb-0 mb-10'>
                  <div className='relative flex justify-center items-center'>
                    <img className='h-24 w-24 object-cover rounded-full z-100' src={preview} alt="" />
               
                    <label className='absolute -bottom-10 left-1/2 -translate-x-1/2 bg-red-500 text-white hover:bg-red-700 font-bold cursor-pointer text-sm px-2 py-1 rounded-md transition-all delay-100 ease-linear'
                     htmlFor='avatar'>Chọn ảnh</label>
               
                  <input className='sr-only'
                   accept='image/*' 
                   type="file" 
                   name="avatar" 
                   id="avatar" 
                   onChange={onChangeFile}/>
                  </div>
                </div>
                <div className='col-span-9 space-y-2'>
                {/* row 1 */}
                <div className='flex gap-x-5'>
                    <InputUser 
                    label={"Họ và Tên"}
                    type={"text"}
                    id={"full_name"}
                    />
                     <InputUser 
                    label={"Sinh nhật"}
                    type={"date"}
                    id={"birth_day"}
                    />
                    </div>
                    {/* row 2 */}
                    <div className='flex gap-x-5'>
                    <InputUser 
                    label={"Nơi đăng ký khai sinh"}
                    type={"text"}
                    id={"birth_place"}
                    />
                     <InputUser 
                    label={"Xã/Phường"}
                    type={"text"}
                    id={"ward"}
                    />
                    </div>
                    {/* row 3 */}
                    <div className='flex gap-x-5'>
                    <InputUser 
                    label={"Dân tộc"}
                    type={"text"}
                    id={"ethnicity"}
                    />
                     <InputUser 
                    label={"Tôn giáo"}
                    type={"text"}
                    id={"religion"}
                    />
                      <InputUser 
                    label={"Nhóm máu ABO"}
                    type={"text"}
                    id={"blood_type"}
                    />
                        <InputUser 
                    label={"Trình độ văn hóa"}
                    type={"text"}
                    id={"education_level"}
                    />
                    </div>
                       {/* row 4*/}
                       <div className='flex gap-x-5'>
                    <InputUser 
                    label={"Số CCCD"}
                    type={"text"}
                    id={"national_id"}
                    />
                        <InputUser 
                    label={"Nơi cấp"}
                    type={"text"}
                    id={"national_place"}
                    />
                    </div>
                    {/* row 4*/}
                    <div className='flex gap-x-5'>
                    <InputUser 
                    label={"Số điện thoại di động"}
                    type={"number"}
                    id={"phone"}
                    />
                     <InputUser 
                    label={"Email"}
                    type={"email"}
                    id={"email"}
                    />
                    </div>
                    {/* row 5*/}
                      <div className='flex gap-x-5'>
                      <InputUser 
                    label={"Quê quán"}
                    type={"text"}
                    id={"hometown"}
                    />

                      {/* <InputUser 
                    label={"Tỉnh/Thành phố"}
                    type={"city"}
                    id={"city"}
                    />
                    <InputUser 
                    label={"Xã/Phường"}
                    type={"city"}
                    id={"city"}
                    /> */}
                      </div>
                    {/* row 6 */}
                    <div className='flex gap-x-5'>
                      <InputUser 
                    label={"Địa chỉ hiện tại"}
                    type={"address"}
                    id={"address"}
                    />
                      {/* <InputUser 
                    label={"Tỉnh/Thành phố"}
                    type={"city"}
                    id={"city"}
                    />
                       <InputUser 
                    label={"Xã/Phường"}
                    type={"city"}
                    id={"city"}
                    /> */}
                      </div>
                </div>
            </div> 
            
            <div className='py-5 flex items-center justify-center'>
                  <button className='flex items-center justify-center bg-red-500 hover:bg-red-700 px-2 py-1 rounded-md text-white' type="button">
                  <svg fill="white" className='h-8 w-8' viewBox="0 0 256.00 256.00" xmlns="http://www.w3.org/2000/svg" stroke="#b9b1b1" stroke-width="0.00256"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill-rule="evenodd"> <path d="M65.456 48.385c10.02 0 96.169-.355 96.169-.355 2.209-.009 5.593.749 7.563 1.693 0 0-1.283-1.379.517.485 1.613 1.67 35.572 36.71 36.236 37.416.665.707.241.332.241.332.924 2.007 1.539 5.48 1.539 7.691v95.612c0 7.083-8.478 16.618-16.575 16.618-8.098 0-118.535-.331-126.622-.331-8.087 0-16-6.27-16.356-16.1-.356-9.832.356-118.263.356-126.8 0-8.536 6.912-16.261 16.932-16.261zm-1.838 17.853l.15 121c.003 2.198 1.8 4.003 4.012 4.015l120.562.638a3.971 3.971 0 0 0 4-3.981l-.143-90.364c-.001-1.098-.649-2.616-1.445-3.388L161.52 65.841c-.801-.776-1.443-.503-1.443.601v35.142c0 3.339-4.635 9.14-8.833 9.14H90.846c-4.6 0-9.56-4.714-9.56-9.14s-.014-35.14-.014-35.14c0-1.104-.892-2.01-1.992-2.023l-13.674-.155a1.968 1.968 0 0 0-1.988 1.972zm32.542.44v27.805c0 1.1.896 2.001 2 2.001h44.701c1.113 0 2-.896 2-2.001V66.679a2.004 2.004 0 0 0-2-2.002h-44.7c-1.114 0-2 .896-2 2.002z"></path> <path d="M127.802 119.893c16.176.255 31.833 14.428 31.833 31.728s-14.615 31.782-31.016 31.524c-16.401-.259-32.728-14.764-32.728-31.544s15.735-31.963 31.91-31.708zm-16.158 31.31c0 9.676 7.685 16.882 16.218 16.843 8.534-.039 15.769-7.128 15.812-16.69.043-9.563-7.708-16.351-15.985-16.351-8.276 0-16.045 6.52-16.045 16.197z"></path> </g> </g></svg>
                  <p className='text-lg'>Lưu</p>
                  </button>      
                </div>          
            </div>
        </div>
    );
}

export default EditUser;