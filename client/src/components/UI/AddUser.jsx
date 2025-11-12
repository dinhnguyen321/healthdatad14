import React from 'react';

function AddUser({setOpen}) {
    return (
        <div className='fixed top-1/2 -bottom-1/2 h-screen opacity-80 inset-0 z-50'>
            <div className='w-3/4 mx-auto bg-amber-50 text-black relative rounded-lg'>
            <h2 className="text-xl font-bold mb-4">Thêm mới</h2>
           <div>
            
           </div>
           
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Đóng
            </button>
            </div>
        </div>
    );
}

export default AddUser;