/* eslint-disable no-undef */
import React, { useRef, useState } from 'react';
import {TransitionGroup, CSSTransition, } from "react-transition-group";
function DropdownProfile({items,avt}) {
    const [show, setShow] = useState(false)
    const nodeRef = useRef(null);
    return (
        <div className='relative z-50'>
             <button 
             className=''
             onClick={()=> setShow(!show)}
             >
                <img 
                className='p-1 h-16 w-16 rounded-full object-cover'
                src={avt ?? "   "} alt="" />
            </button>
            {/* <TransitionGroup>
                {
                  items.map((item)=>(
                    <CSSTransition key={item} timeout={300} in={show} classNames="fade" unmountOnExit  >

                    </CSSTransition>
                  ))  
                }
            </TransitionGroup> */}
            <CSSTransition classNames="fade" nodeRef={nodeRef} timeout={300} in={show} unmountOnExit >
                <div ref={nodeRef} className='rounded-l-xl fixed top-18 right-0 bg-white p-4 flex flex-col space-y-2'>
                    {items.map((item,idx)=>(
                        <button
                         onClick={item.onClick}
                         key={idx} className='text-white border-gray-300 rounded-xl overflow-hidden py-2 px-4 bg-white flex items-center justify-center space-x-2 border-2'>
                            <a className='hover:text-white text-black' href={item.href}>{item.name}</a>
                        </button>   
                    ))}
                </div>
            </CSSTransition>
        </div>
    );
}

export default DropdownProfile;