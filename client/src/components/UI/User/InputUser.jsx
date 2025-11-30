import React from 'react';

 const InputUser = React.memo(({ label,type,id,value,title,onChangeInput}) => { 
    return (
        <div 
        className='flex flex-col w-full'>
             <label 
            htmlFor={id}
             className={`block mb-2 text-sm font-medium text-white dark:text-gray-900
                ${title === "detail" ? "bg-gray-200 text-gray-500 focus:select-none cursor-not-allowed pointer-none select-none":""}
             `}>{label}</label>
            <input
            placeholder={value} 
            onChange={onChangeInput}
            // value={value}
            type={type} 
            name={id}
            id={id}
            readOnly={title === "detail" ? true : false}
            className={`block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                ${title === "detail" ? "bg-gray-200 focus:select-none text-gray-500 cursor-not-allowed pointer-none select-none":""}
                `}
            />
        </div>
    );
})

export default InputUser;