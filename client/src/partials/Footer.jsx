import React from 'react';

function Footer() {
    return (
            <div className='lg:w-4/5 w-full grid grid-cols-1 lg:grid-cols-2 p-5 mx-auto bg-white gap-2'>
            <div className='m-auto space-y-2'>
                <div className='underline underline-offset-2 text-red-600 font-extrabold'>
                    <p className='uppercase text-xs font-sans'>
                        <i>
                         Trung dũng kiên cường, Năng động sáng tạo, đoàn kết quyết thắng
                        </i>
                    </p>
                </div>
                <div className='flex items-center gap-x-5 text-red-600 font-extrabold'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCqRQ5TUHaG8gRnhCgT--dr0tt2O3bThekhQ&s" 
                    className='h-30 w-30 object-fill rounded-md'
                    alt="" />
                    <div className='uppercase tracking-wider text-2xl'>
                        <h1>
                            Bộ Chỉ huy quân sự 
                            <p className='underline-offset-4 underline'>tỉnh Tây Ninh</p>
                        </h1>
                    </div>
                </div>
            </div>
            <div>
                <ul className='flex flex-col gap-y-2 font-medium font-sans text-gray-700'>
                    <li>Chịu trách nhiệm chính: Đại tá Nguyễn Minh Tấn -  Phó Chính ủy Bộ CHQS tỉnh</li>
                    <li><b>Địa chỉ:</b> 175 Quốc lộ 62, phường Long An, tỉnh Tây Ninh</li>
                    <li><b>Điện thoại:</b> 0723 525 042</li>
                    <li><b>Fax:</b> 0272 525 042</li>
                    <li><b>Email:</b> chqs@tayninh.go.vn</li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;