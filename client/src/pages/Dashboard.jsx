/* eslint-disable no-unused-vars */
import React,{useState} from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
// import FilterButton from "../components/UI/DropdownFilter"
import UserChart from '../components/UI/UserChart';
function Dashboard() {
    return (
               
                <div className="grid grid-cols-3 sm:auto-cols-max gap-10">
                {/* Filter button */}
                {/* <FilterButton align="right" /> */}
                <div className='flex flex-col items-center justify-center space-y-4'>
                   <div className="text-black text-xl text-center font-bold uppercase py-2 border-b-2 border-gray-400">
                              <p>Số lượng người dùng</p>
                    </div>
                <UserChart/>
                </div>
                <div className='flex flex-col items-center justify-center space-y-4'>
                   <div className="text-black text-xl text-center font-bold uppercase py-2 border-b-2 border-gray-400">
                              <p>Số lượng người dùng</p>
                    </div>
                <UserChart/>
                </div>
                <div className='flex flex-col items-center justify-center space-y-4'>
                   <div className="text-black text-xl text-center font-bold uppercase py-2 border-b-2 border-gray-400">
                              <p>Số lượng người dùng</p>
                    </div>
                <UserChart/>
                </div>
                <div className='flex flex-col items-center justify-center space-y-4'>
                   <div className="text-black text-xl text-center font-bold uppercase py-2 border-b-2 border-gray-400">
                              <p>Số lượng người dùng</p>
                    </div>
                <UserChart/>
                </div>
                </div>
                
                // {/* <Datepicker align="right" /> */}   
    );
}

export default Dashboard;