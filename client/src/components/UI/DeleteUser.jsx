import React from 'react';

function DeleteUser({close,setInForPopup,deleteUser}) {

    return (
            <div className='fixed top-1/2 -bottom-1/2 h-screen opacity-80 inset-0 z-50'>
              <div className='w-3/4 mx-auto bg-amber-50 text-black relative rounded-lg'>
              <h2 className="text-xl font-bold mb-4">Thông báo</h2>
              <p className="text-gray-700 mb-6">Đây là nội dung popup.</p>
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
              </div>
              <div>
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
    );
}

export default DeleteUser;