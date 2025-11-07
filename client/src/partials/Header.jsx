import React from 'react';
import DropdownProfile from '../components/UI/DropdownProfile';

function Header({sidebarOpen,setSidebarOpen}) {
    
    return (
        <div className=' p-4 pb-6 bg-[#1e2939] lg:bg-amber-200 lg:text-black'>
                  {/* Header: Left side */}
          <div className="flex justify-between">
{/* Hamburger button */}
<button
  className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 lg:hidden"
  aria-controls="sidebar"
  aria-expanded={sidebarOpen}
  onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
>
  <span className="sr-only">Open sidebar</span>
  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="5" width="16" height="2" />
    <rect x="4" y="11" width="16" height="2" />
    <rect x="4" y="17" width="16" height="2" />
  </svg>
</button>
  <div>
    <h1>
        
      </h1>
  </div>  
  <div className='flex space-x-2 items-center'>
    <p>
      Trần Đinh Nguyễn
    </p>
  <DropdownProfile items={[
    {
      name:"Hồ Sơ Người Dùng",
      href:"/profile-user",
    },
    {
      name:"Đăng Xuất",
      href:"/logout",
    }
  ]}/>
   
    </div>  
</div>
        </div>
    );
}

export default Header;