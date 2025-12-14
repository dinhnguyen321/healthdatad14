/* eslint-disable no-unused-vars */
import React,{useEffect,useRef} from 'react';
import { NavLink, useLocation } from "react-router-dom"
import logo from "../assets/logo.jpg"
function Sidebar({
    sidebarOpen,
    setSidebarOpen,
    variant = 'default'
}) {
  const trigger = useRef(null)
  const sidebar = useRef(null)
  
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
    // useEffect(() => {
    //   const keyHandler = ({ keyCode }) => {
    //     if (!sidebarOpen || keyCode !== 27) return;
    //     setSidebarOpen(false);
    //   };
    //   document.addEventListener("keydown", keyHandler);
    //   return () => document.removeEventListener("keydown", keyHandler);
    // });

    const location = useLocation();
    const { pathname } = location;
  
    return (
      <div className='min-w-fit'>
              {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>
        {/* Sidebar */}   
        <div id="sidebar"
        ref={sidebar}
        className={`flex lg:flex! flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-24 lg:w-40 shrink-0 bg-white text-black py-4 transition-all duration-200 ease-in-out 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} 
          ${variant === 'v2' ? 'border-r border-gray-200 dark:border-gray-700/60' : 'shadow-xs'}`}
        >
        {/* Header sidebar */}
        <div className='pb-8 border-gray-300 border-b-2 text-center'>
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400 absolute top-0 left-0 w-1/3 flex justify-between"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            {/* <span className="sr-only">Close sidebar</span>
          */}  <svg className="w-6 h-6 text-violet-600 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg> 
          </button>
              {/* Logo */}
              <NavLink end to="/" className="flex items-center flex-col justify-center">
                <img className='h-10 w-10' src={logo} alt="logo" />
              {/* <svg className="fill-violet-500 mx-auto lg:mx-0" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
              <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
              </svg> */}
              <h2 className='font-bold text-xs lg:text-lg pt-2 lg:pt-0'>
                QLSK
              </h2>
            </NavLink>
        </div>
        {/* Links */}
        <div className="space-y-8">
          {/* Page group */}
         <div className='space-y-4'>
           <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span 
              className="lg:hidden lg:sidebar-expanded:block 2xl:block"
              >
                Pages</span>
            </h3>
            <ul className='flex flex-col text-xs lg:text-xl'>
             <NavLink className={`hover:bg-gray-300 hover:text-white lg:justify-start justify-center flex items-center border-b-[1px] border-gray-400`} to={"/dashboard"}>
            <svg className="p-0 lg:p-2 w-6 h-6 lg:w-16 lg:h-16 "
            viewBox="-2.5 -2.5 30.00 30.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#dedede" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)" strokeWidth="0.00025"><g id="SVGRepo_bgCarrier" strokeWidth="0" 
                transform="translate(2.5,2.5), scale(0.8)">
                  <rect x="-2.5" y="-2.5" width="30.00" height="30.00" rx="15"
                   fill="white" strokeWidth="0"></rect></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.1"></g><g id="SVGRepo_iconCarrier"> <path d="M20.25 9C20.25 8.58579 19.9142 8.25 19.5 8.25C19.0858 8.25 18.75 8.58579 18.75 9L20.25 9ZM11.5 18.25C11.0858 18.25 10.75 18.5858 10.75 19C10.75 19.4142 11.0858 19.75 11.5 19.75V18.25ZM18.75 9C18.75 9.41421 19.0858 9.75 19.5 9.75C19.9142 9.75 20.25 9.41421 20.25 9L18.75 9ZM11.5 4.25C11.0858 4.25 10.75 4.58579 10.75 5C10.75 5.41421 11.0858 5.75 11.5 5.75V4.25ZM19.5 9.75C19.9142 9.75 20.25 9.41421 20.25 9C20.25 8.58579 19.9142 8.25 19.5 8.25V9.75ZM11.5 8.25C11.0858 8.25 10.75 8.58579 10.75 9C10.75 9.41421 11.0858 9.75 11.5 9.75V8.25ZM6.25 12C6.25 11.5858 5.91421 11.25 5.5 11.25C5.08579 11.25 4.75 11.5858 4.75 12H6.25ZM11.5 19.75C11.9142 19.75 12.25 19.4142 12.25 19C12.25 18.5858 11.9142 18.25 11.5 18.25V19.75ZM4.75 12C4.75 12.4142 5.08579 12.75 5.5 12.75C5.91421 12.75 6.25 12.4142 6.25 12H4.75ZM11.5 5.75C11.9142 5.75 12.25 5.41421 12.25 5C12.25 4.58579 11.9142 4.25 11.5 4.25V5.75ZM5.5 11.25C5.08579 11.25 4.75 11.5858 4.75 12C4.75 12.4142 5.08579 12.75 5.5 12.75L5.5 11.25ZM11.5 12.75C11.9142 12.75 12.25 12.4142 12.25 12C12.25 11.5858 11.9142 11.25 11.5 11.25V12.75ZM12.25 12C12.25 11.5858 11.9142 11.25 11.5 11.25C11.0858 11.25 10.75 11.5858 10.75 12H12.25ZM10.75 19C10.75 19.4142 11.0858 19.75 11.5 19.75C11.9142 19.75 12.25 19.4142 12.25 19H10.75ZM10.75 12C10.75 12.4142 11.0858 12.75 11.5 12.75C11.9142 12.75 12.25 12.4142 12.25 12H10.75ZM12.25 9C12.25 8.58579 11.9142 8.25 11.5 8.25C11.0858 8.25 10.75 8.58579 10.75 9H12.25ZM12.25 5C12.25 4.58579 11.9142 4.25 11.5 4.25C11.0858 4.25 10.75 4.58579 10.75 5H12.25ZM10.75 9C10.75 9.41421 11.0858 9.75 11.5 9.75C11.9142 9.75 12.25 9.41421 12.25 9H10.75ZM18.75 9V15H20.25V9L18.75 9ZM18.75 15C18.75 16.7949 17.2949 18.25 15.5 18.25V19.75C18.1234 19.75 20.25 17.6234 20.25 15H18.75ZM15.5 18.25H11.5V19.75H15.5V18.25ZM20.25 9C20.25 6.37665 18.1234 4.25 15.5 4.25L15.5 5.75C17.2949 5.75 18.75 7.20507 18.75 9L20.25 9ZM15.5 4.25H11.5V5.75H15.5L15.5 4.25ZM19.5 8.25H11.5V9.75H19.5V8.25ZM4.75 12V15H6.25V12H4.75ZM4.75 15C4.75 17.6234 6.87665 19.75 9.5 19.75V18.25C7.70507 18.25 6.25 16.7949 6.25 15H4.75ZM9.5 19.75H11.5V18.25H9.5V19.75ZM6.25 12L6.25 9H4.75L4.75 12H6.25ZM6.25 9C6.25 7.20507 7.70507 5.75 9.5 5.75V4.25C6.87665 4.25 4.75 6.37665 4.75 9H6.25ZM9.5 5.75H11.5V4.25H9.5V5.75ZM5.5 12.75H11.5V11.25H5.5L5.5 12.75ZM10.75 12V19H12.25V12H10.75ZM12.25 12V9H10.75V12H12.25ZM10.75 5V9H12.25V5H10.75Z" fill="#000000"></path> </g></svg>
             <p className='text-sm text-black lg:block hidden'>Dashboard</p> 
             </NavLink>
             <NavLink className={`hover:bg-gray-300 hover:text-white lg:justify-start justify-center flex items-center`} to={"/user-manager"}>
             <svg  className="p-0 lg:p-2 w-6 h-6 lg:w-16 lg:h-16" viewBox="-7.2 -7.2 38.40 38.40" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(2.3999999999999986,2.3999999999999986), scale(0.8)"><rect x="-7.2" y="-7.2" width="38.40" height="38.40" rx="19.2" 
             fill="white" strokeWidth="0"></rect></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.288"></g><g id="SVGRepo_iconCarrier"> <path d="M3 19H1V18C1 16.1362 2.27477 14.5701 4 14.126M6 10.8293C4.83481 10.4175 4 9.30621 4 7.99999C4 6.69378 4.83481 5.58254 6 5.1707M21 19H23V18C23 16.1362 21.7252 14.5701 20 14.126M18 5.1707C19.1652 5.58254 20 6.69378 20 7.99999C20 9.30621 19.1652 10.4175 18 10.8293M10 14H14C16.2091 14 18 15.7909 18 18V19H6V18C6 15.7909 7.79086 14 10 14ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z" stroke="#000000" strokeWidth="1.752" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
             <p className='text-sm text-black lg:block hidden'>
              Quản lý user
             </p>
             </NavLink>
            </ul>
          </div>
        </div>
        </div>
        </div>
    );
}

export default Sidebar;