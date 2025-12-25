import React, { useEffect, useRef } from 'react';
import DropdownProfile from '../components/UI/DropdownProfile';
import { NavLink, useLocation } from 'react-router';

function Header({sidebarOpen,setSidebarOpen,profileUser}) {
      const trigger = useRef(null)
      const sidebar = useRef(null)
      const location = useLocation();
      const variant = 'default'
    const { pathname } = location;
    const logOut = () => {
      localStorage.clear()
      window.location.reload()
    }
       // close on click outside
      useEffect(() => {
        const clickHandler = ({ target }) => {
          if (!sidebar.current || !trigger.current) return;
          if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
          setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
      });
    
        // close if the esc key is pressed
      useEffect(() => {
          const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
          };
          document.addEventListener("keydown", keyHandler);
          return () => document.removeEventListener("keydown", keyHandler);
        });
    return (
        <div className='flex justify-between items-center p-4 border-b-2 border-gray-300 bg-[#111f1f] lg:text-black'>
        {/* Header: Left side */}
        {/* Sidebar backdrop (mobile only) */}
        <div
          className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden="true"
        ></div>
        <div id='sidebar' 
          ref={sidebar}
          className={`flex lg:flex-row flex-col items-center justify-between transition-all duration-200 ease-in-out z-40 h-full
            ${variant === 'v2' ? 'border-r border-gray-200 dark:border-gray-700/60' : 'shadow-xs'}
            `}>
              {/* ${sidebarOpen ? "bg-red-600" : ""}  */}
      {/* Hamburger button */}
          <div className=''>
              <button
                className="text-gray-500 hover:text-gray-400 lg:hidden block"
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
              <NavLink end to="/" className="text-white flex items-center justify-center gap-x-2">
                         <img className='h-10 w-10 object-cover rounded-full' src={"https://ttagencyads.com/wp-content/uploads/2022/03/logo-quan-y-quan-doi-nhan-dan-viet-nam.jpg"} alt="logo" />
                       <h2 className='font-bold text-xs lg:text-lg pt-2 lg:pt-0 uppercase'>
                         Quản lý sức khỏe
                       </h2>
              </NavLink>
          </div>
          {/* links */}
          {/* desktop */}
          <ul className='lg:flex hidden items-center mx-1 ml-5 gap-x-2'>
                <NavLink 
                className={`w-full hover:bg-[#f2ff00e3] hover:text-white p-2 
                flex justify-center lg:justify-between items-center 
                border-gray-400 rounded-lg transition-all delay-100 ease-linear
                ${pathname === "/dashboard" ? "text-red-500 bg-[#f3ff00]" : "text-white"}
                `} to={"/dashboard"}>
                  <p className={`text-sm block px-2 text-nowrap font-bold
                    `}>Trang chủ</p> 
                </NavLink>
                <NavLink 
                className={`w-full hover:bg-gray-300 hover:text-white p-2 
                flex justify-center lg:justify-between items-center 
                border-gray-400 rounded-lg transition-all delay-100 ease-linear
                ${pathname === "/user-manager" ? "text-red-500 bg-[#f3ff00]" : "text-white"}
                `} to={"/user-manager"}>
                <p className='text-sm block px-2 text-nowrap font-bold'>
                  Quản lý người dùng
                </p>
                </NavLink>
                <NavLink 
                className={`w-full hover:bg-gray-300 hover:text-white p-2 
                flex justify-center lg:justify-between items-center 
                border-gray-400 rounded-lg transition-all delay-100 ease-linear
                ${pathname === "/profile-user" ? "text-red-500 bg-[#f3ff00]" : "text-white"}
                `} to={"/profile-user"}>
                <p className='text-sm block px-2 text-nowrap font-bold'>
                  Hồ sơ cá nhân
                </p>
                </NavLink>
          </ul>
            {/* mobile  */}
            <div className={`hidden top-0 left-0  flex-col justify-start items-start bg-white overflow-y-hidden h-screen sapce-y-2
            `}>
              {/* ${sidebarOpen ? "fixed" : "opacity-0"} */}
              <div className='text-end'>
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
                <NavLink end to="/" className="flex items-center flex-col justify-center">
                          <img className='h-10 w-10 object-cover rounded-full' src={"https://res.cloudinary.com/dssyoikpk/image/upload/v1766220405/HSSK/img2_udl54h.jpg"} alt="logo" />
                        <h2 className='lg:block hidden font-bold text-xs lg:text-lg pt-2 lg:pt-0'>
                          QLSK
                        </h2>
                </NavLink>
              </div>
            <ul className='flex lg:flex-row flex-col items-center text-xs lg:text-xl mx-1 space-y-2'>
                  <NavLink 
                  className={`w-full hover:bg-gray-300 hover:text-white p-2 
                  flex justify-start lg:justify-between items-center 
                  border-gray-400 rounded-lg transition-all delay-100 ease-linear
                  ${pathname === "/dashboard" ? "text-white bg-gray-300" : ""}
                  `} to={"/dashboard"}>
                    <p className={`text-sm text-black block px-2 text-nowrap
                      `}>Trang chủ</p> 
                  </NavLink>
                  <NavLink 
                  className={`w-full hover:bg-gray-300 hover:text-white p-2 
                  flex justify-start lg:justify-between items-center 
                  border-gray-400 rounded-lg transition-all delay-100 ease-linear
                  ${pathname === "/user-manager" ? "text-white bg-gray-300" : ""}
                  `} to={"/user-manager"}>
                  <p className='text-sm text-black block px-2 text-nowrap'>
                    Quản lý người dùng
                  </p>
                  </NavLink>
                  <NavLink 
                  className={`w-full hover:bg-gray-300 hover:text-white p-2 
                  flex justify-start lg:justify-between items-center 
                  border-gray-400 rounded-lg transition-all delay-100 ease-linear
                  ${pathname === "/profile-user" ? "text-white bg-gray-300" : ""}
                  `} to={"/profile-user"}>
                  <p className='text-sm text-black block px-2 text-nowrap'>
                    Hồ sơ cá nhân
                  </p>
                  </NavLink>
              </ul>
            </div>
        </div>
          <div className='flex space-x-2 items-center'>
                  <p className='text-white font-bold'>
                    {profileUser ? profileUser.name : "USER"}
                  </p>
                  <DropdownProfile avt={profileUser.avt} items={[
                    {
                      name:"Hồ Sơ Người Dùng",
                      href:"/profile-user",
                    },
                    {
                      name:"Đăng Xuất",
                      href:"/",
                      onClick:logOut
                    }
                  ]}/>
          </div>  
       
        </div>
    );
}

export default Header;