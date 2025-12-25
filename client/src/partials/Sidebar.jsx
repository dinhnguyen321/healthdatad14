/* eslint-disable no-unused-vars */
import React,{useEffect,useRef,useState} from 'react';
import { NavLink, useLocation } from "react-router-dom"
import logo from "../assets/logo.jpg"
function Sidebar({
    sidebarOpen,
    setSidebarOpen,
    variant = 'default'
}) {
  const trigger = useRef(null)
  const sidebar = useRef(null)
  const location = useLocation();
    const { pathname } = location;
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
              className="lg:hidden lg:sidebar-expanded:block 2xl:block pt-2"
              >
                Home</span>
            </h3>
            <ul className='flex flex-col text-xs lg:text-xl mx-1'>
             <NavLink 
             className={`w-full hover:bg-gray-300 hover:text-white p-2 
             flex justify-center lg:justify-between items-center 
             border-gray-400 rounded-lg transition-all delay-100 ease-linear
             ${pathname === "/dashboard" ? "text-white bg-gray-300" : ""}
             `} to={"/dashboard"}>
             <svg width="30px" height="30px" viewBox="0 -0.5 25 25" 
             fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier"> <path d="M20.25 9C20.25 8.58579 19.9142 8.25 19.5 8.25C19.0858 8.25 18.75 8.58579 18.75 9L20.25 9ZM11.5 18.25C11.0858 18.25 10.75 18.5858 10.75 19C10.75 19.4142 11.0858 19.75 11.5 19.75V18.25ZM18.75 9C18.75 9.41421 19.0858 9.75 19.5 9.75C19.9142 9.75 20.25 9.41421 20.25 9L18.75 9ZM11.5 4.25C11.0858 4.25 10.75 4.58579 10.75 5C10.75 5.41421 11.0858 5.75 11.5 5.75V4.25ZM19.5 9.75C19.9142 9.75 20.25 9.41421 20.25 9C20.25 8.58579 19.9142 8.25 19.5 8.25V9.75ZM11.5 8.25C11.0858 8.25 10.75 8.58579 10.75 9C10.75 9.41421 11.0858 9.75 11.5 9.75V8.25ZM6.25 12C6.25 11.5858 5.91421 11.25 5.5 11.25C5.08579 11.25 4.75 11.5858 4.75 12H6.25ZM11.5 19.75C11.9142 19.75 12.25 19.4142 12.25 19C12.25 18.5858 11.9142 18.25 11.5 18.25V19.75ZM4.75 12C4.75 12.4142 5.08579 12.75 5.5 12.75C5.91421 12.75 6.25 12.4142 6.25 12H4.75ZM11.5 5.75C11.9142 5.75 12.25 5.41421 12.25 5C12.25 4.58579 11.9142 4.25 11.5 4.25V5.75ZM5.5 11.25C5.08579 11.25 4.75 11.5858 4.75 12C4.75 12.4142 5.08579 12.75 5.5 12.75L5.5 11.25ZM11.5 12.75C11.9142 12.75 12.25 12.4142 12.25 12C12.25 11.5858 11.9142 11.25 11.5 11.25V12.75ZM12.25 12C12.25 11.5858 11.9142 11.25 11.5 11.25C11.0858 11.25 10.75 11.5858 10.75 12H12.25ZM10.75 19C10.75 19.4142 11.0858 19.75 11.5 19.75C11.9142 19.75 12.25 19.4142 12.25 19H10.75ZM10.75 12C10.75 12.4142 11.0858 12.75 11.5 12.75C11.9142 12.75 12.25 12.4142 12.25 12H10.75ZM12.25 9C12.25 8.58579 11.9142 8.25 11.5 8.25C11.0858 8.25 10.75 8.58579 10.75 9H12.25ZM12.25 5C12.25 4.58579 11.9142 4.25 11.5 4.25C11.0858 4.25 10.75 4.58579 10.75 5H12.25ZM10.75 9C10.75 9.41421 11.0858 9.75 11.5 9.75C11.9142 9.75 12.25 9.41421 12.25 9H10.75ZM18.75 9V15H20.25V9L18.75 9ZM18.75 15C18.75 16.7949 17.2949 18.25 15.5 18.25V19.75C18.1234 19.75 20.25 17.6234 20.25 15H18.75ZM15.5 18.25H11.5V19.75H15.5V18.25ZM20.25 9C20.25 6.37665 18.1234 4.25 15.5 4.25L15.5 5.75C17.2949 5.75 18.75 7.20507 18.75 9L20.25 9ZM15.5 4.25H11.5V5.75H15.5L15.5 4.25ZM19.5 8.25H11.5V9.75H19.5V8.25ZM4.75 12V15H6.25V12H4.75ZM4.75 15C4.75 17.6234 6.87665 19.75 9.5 19.75V18.25C7.70507 18.25 6.25 16.7949 6.25 15H4.75ZM9.5 19.75H11.5V18.25H9.5V19.75ZM6.25 12L6.25 9H4.75L4.75 12H6.25ZM6.25 9C6.25 7.20507 7.70507 5.75 9.5 5.75V4.25C6.87665 4.25 4.75 6.37665 4.75 9H6.25ZM9.5 5.75H11.5V4.25H9.5V5.75ZM5.5 12.75H11.5V11.25H5.5L5.5 12.75ZM10.75 12V19H12.25V12H10.75ZM12.25 12V9H10.75V12H12.25ZM10.75 5V9H12.25V5H10.75Z" 
              fill="#000000"></path> </g></svg>
             <p className={`text-sm text-black lg:block hidden px-2
              `}>Dashboard</p> 
             </NavLink>
             <NavLink 
             className={`w-full hover:bg-gray-300 hover:text-white p-2 
             flex justify-center lg:justify-between items-center 
             border-gray-400 rounded-lg transition-all delay-100 ease-linear
             ${pathname === "/user-manager" ? "text-white bg-gray-300" : ""}
             `} to={"/user-manager"}>
             <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
             <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.144"></g>
             <g id="SVGRepo_iconCarrier"> 
              <circle cx="12" cy="6" r="4" stroke="#000000" strokeWidth="1.5"></circle>
              <path d="M19.9975 18C20 17.8358 20 17.669 20 17.5C20 15.0147 16.4183 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C14.231 22 15.8398 21.8433 17 21.5634" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path>
              </g></svg>
             <p className='text-sm text-black lg:block hidden px-2'>
              Quản lý user
             </p>
             </NavLink>
             <NavLink 
             className={`w-full hover:bg-gray-300 hover:text-white p-2 
             flex justify-center lg:justify-between items-center 
             border-gray-400 rounded-lg transition-all delay-100 ease-linear
             ${pathname === "/profile-user" ? "text-white bg-gray-300" : ""}
             `} to={"/profile-user"}>
              <svg width="30px" height="30px" viewBox="-2 -2 24.00 24.00" version="1.1"
               xmlns="http://www.w3.org/2000/svg" xmlnsXlinklink="http://www.w3.org/1999/xlink" fill="#000000">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.12"></g>
                <g id="SVGRepo_iconCarrier"> <title>profile_round [#000000]</title> <desc>Created with Sketch.</desc> <defs> </defs>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
                <g id="Dribbble-Light-Preview" transform="translate(-420.000000, -2119.000000)" fill="#000000">
                <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M378.083123,1964.99998 C378.083123,1962.79398 376.251842,1960.99998 374,1960.99998 C371.748158,1960.99998 369.916877,1962.79398 369.916877,1964.99998 C369.916877,1967.20598 371.748158,1968.99998 374,1968.99998 C376.251842,1968.99998 378.083123,1967.20598 378.083123,1964.99998 M381.945758,1978.99998 L380.124685,1978.99998 C379.561214,1978.99998 379.103904,1978.55198 379.103904,1977.99998 C379.103904,1977.44798 379.561214,1976.99998 380.124685,1976.99998 L380.5626,1976.99998 C381.26898,1976.99998 381.790599,1976.30298 381.523154,1975.66198 C380.286989,1972.69798 377.383888,1970.99998 374,1970.99998 C370.616112,1970.99998 367.713011,1972.69798 366.476846,1975.66198 C366.209401,1976.30298 366.73102,1976.99998 367.4374,1976.99998 L367.875315,1976.99998 C368.438786,1976.99998 368.896096,1977.44798 368.896096,1977.99998 C368.896096,1978.55198 368.438786,1978.99998 367.875315,1978.99998 L366.054242,1978.99998 C364.778266,1978.99998 363.773818,1977.85698 364.044325,1976.63598 C364.787453,1973.27698 367.107688,1970.79798 370.163906,1969.67298 C368.769519,1968.57398 367.875315,1966.88998 367.875315,1964.99998 C367.875315,1961.44898 371.023403,1958.61898 374.733941,1959.04198 C377.422678,1959.34798 379.650022,1961.44698 380.05323,1964.06998 C380.400296,1966.33098 379.456073,1968.39598 377.836094,1969.67298 C380.892312,1970.79798 383.212547,1973.27698 383.955675,1976.63598 C384.226182,1977.85698 383.221734,1978.99998 381.945758,1978.99998 M377.185857,1974.46398 C377.584982,1974.85498 377.584982,1975.48798 377.185857,1975.87898 L374,1978.99998 L371.834924,1976.87898 C371.435799,1976.48798 371.435799,1975.85498 371.834924,1975.46398 L371.834924,1975.46398 C372.233028,1975.07398 372.879183,1975.07398 373.278308,1975.46398 L374,1976.17198 L375.742473,1974.46398 C376.141598,1974.07398 376.787752,1974.07398 377.185857,1974.46398" id="profile_round-[#000000]"> </path> </g> </g> </g> </g></svg>
             <p className='text-sm text-black lg:block hidden px-2'>
              Hồ sơ cá nhân
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