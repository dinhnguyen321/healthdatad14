import React,{useState} from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { Outlet } from 'react-router';

function MainLayout({profileUser}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
        <div className='flex h-screen overflow-hidden'>
           <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className='bg-gray-200 relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} profileUser={profileUser}/>
                    <main className='sm:flex sm:justify-between sm:items-center mb-8 p-5'>
                    <Outlet />
                    </main>
        
            </div>
        </div>
    );
}

export default MainLayout;