import React, { useEffect, useRef, useState } from 'react';
import {TransitionGroup, CSSTransition, } from "react-transition-group";
function DropdownCRUD({setShowPopup,setInForPopup,showPopup,item}) {
    const [show, setShow] = useState(false)
    const nodeRef = useRef(null);
    const role = localStorage.getItem("role")
    const trigger = useRef(null)
    const dropdownRef = useRef(null)

    useEffect(() => {
            const clickHandler = ({ target }) => {
                
              if (!dropdownRef.current || !trigger.current) return;
              if (!show || dropdownRef.current.contains(target) || trigger.current.contains(target)) return;
              setShow(!show);
            };
            document.addEventListener("click", clickHandler);
            return () => document.removeEventListener("click", clickHandler);
          },[show]);
          
    return (
        <div className='relative'>
            <TransitionGroup>
                    <CSSTransition key={item} timeout={300} in={show} classNames="fade" unmountOnExit  >
                    <button 
                    ref={trigger}
                    className='z-10'
                    onClick={()=> setShow(!show)}
                    >
                    <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000" 
                    className="bi bi-three-dots-vertical"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z">
                    </path></g>
                    </svg> 
                    </button>
                    </CSSTransition>
            </TransitionGroup>
            <CSSTransition classNames="fade" nodeRef={nodeRef} timeout={300} in={show} unmountOnExit >
                <div ref={dropdownRef} className='rounded-xl absolute top-6 right-0 bg-white p-4 flex flex-col space-y-2 w-[300px] z-20'>
                         { role === "user" ? "" : ( 
                                <>
                            <button 
                            onClick={()=>(
                                    setInForPopup({
                                        title:"edit",
                                        idUser: item.idUser
                                    }),
                                    setShowPopup(!showPopup)
                                )}
                                className='text-black hover:bg-gray-300 hover:text-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center flex items-center gap-x-2' title='Chỉnh sửa'>
                                <svg className='h-4 w-4 lg:h-6 lg:w-6' 
                                viewBox="-1 -3 24 24" 
                                version="1.1" 
                                xmlns="http://www.w3.org/2000/svg" 
                                xmlnsXlink="http://www.w3.org/1999/xlink"fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>edit [#1479]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-99.000000, -400.000000)" 
                                fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z" id="edit-[#1479]"> </path> </g> </g> </g> </g></svg>
                                <p>
                                    Chỉnh sửa hồ sơ
                                </p>
                            </button>
                        </>
                            )}
                            <button 
                            onClick={()=>(
                            setInForPopup({
                                title:"detail",
                                idUser: item.idUser
                            }),
                            setShowPopup(!showPopup)
                            )}
                            title='Xem chi tiết' 
                            type="button"
                            className="text-black hover:bg-gray-300 hover:text-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center flex items-center gap-x-2">
                            <svg fill="#000000" className='h-4 w-4 lg:h-6 lg:w-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z">
                                    </path><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z"></path></g></svg>
                                <p>
                                    Chi tiết người dùng
                                </p>
                            </button>  
                </div>
            </CSSTransition>       
        </div>
    );
}

export default DropdownCRUD;