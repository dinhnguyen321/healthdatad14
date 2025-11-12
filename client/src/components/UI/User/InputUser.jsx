import React from 'react';

function InputUser({ label,type,id}) {
    return (
        <div className='flex flex-col w-full'>
             <label 
            htmlFor={id}
             className="block mb-2 text-sm font-medium text-white dark:text-gray-900">{label}</label>
            <input 
            type={type} 
            name={label} 
            id={id} 
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
               {/* <label htmlFor={id}>{label}</label>
               <input
               className={`min-w-fit outline-2 pl-2 py-2 focus:outline-blue-500 focus:outline-4 rounded-xl`} type={type} name={label} id={id} /> */}
        </div>
    );
}

export default InputUser;