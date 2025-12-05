import React from 'react';

function DeleteUser({close,setInForPopup,deleteUser}) {

    return (
            <div className='fixed top-1/2 -bottom-1/2 h-screen opacity-80 inset-0 z-50'>
              <div className='w-3/4 mx-auto bg-gray-900 text-white relative rounded-lg px-4 py-2'>
              <h2 className="text-xl font-bold mb-4 uppercase">Xóa người dùng </h2>
              <p className="mb-6 text-center text-2xl font-bold">Bạn có chắc chắn muốn xóa ?</p>
             
                <div className='flex justify-between items-center'>
                   <button
                onClick={() =>{
                  setInForPopup({
                    title:""
                  })
                  close(false)
                }
              }
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Đóng
              </button>
                <button 
                className='px-4 py-2 bg-red-500 text-white rounded'
                onClick={()=>{
                  deleteUser()
                  setTimeout(()=>{
                    setInForPopup({
                      title:""
                    }),
                    close(false)
                  },2000)
                }}>
                  Xóa
                </button>
              </div>
              </div>
            
          </div>
    );
}

export default DeleteUser;