/* eslint-disable no-unused-vars */
import React,{useState} from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from "../components/UI/DropdownFilter"
function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className='flex h-screen overflow-hidden'>
              <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className='bg-blue-300 relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main className='sm:flex sm:justify-between sm:items-center mb-8'>
                    <div>
                    <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
                    </div>
                    <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                {/* <FilterButton align="right" /> */}
                Datepicker built with React Day Picker
                {/* <Datepicker align="right" /> */}
                {/* Add view button */}
                {/* <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
                  <svg className="fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="max-xs:sr-only">Add View</span>
                </button>                 */}
              </div>
                        </div>
                    </main>
                </div>
        </div>
    );
}

export default Dashboard;