import React from 'react';

function Footer() {
    return (
            <div className='grid grid-cols-2 p-5 mx-auto bg-white'>
            <div className='w-3/4 h-3/4 m-auto'>
                <img src="https://baoquankhu7.vn/BaoQK7/images/logo_new_v2.jpg" 
                className='h-full w-full object-fill rounded-md'
                alt="" />
            </div>
            <div>
                <ul className='flex flex-col gap-y-5 font-bold text-gray-700 list-disc'>
                    <li>Cơ quan chủ quản: Bộ Tư lệnh Quân khu 7</li>
                    <li>Giấy phép số 486/GP-BTTTT ngày 28/07/2021</li>
                    <li>© Báo Quân khu 7 điện tử giữ bản quyền nội dung trên website này.</li>
                    <li>Chỉ được phát hành lại thông tin từ website này khi có sự đồng ý bằng văn bản của báo.</li>
                    <li>Email: hssk@gmail.com</li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;