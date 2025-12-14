import React from 'react';

 const InputUser = React.memo(({ label,type,id,value,title,onChangeInput}) => { 
    return (
        <div 
        className='flex flex-col w-full relative'>
            <input
            // placeholder={value} 
            placeholder={""} 
            onChange={onChangeInput}
            value={value ?? ""}
            // disabled={false}
            type={type} 
            name={id}
            id={id}
            readOnly={title === "detail" ? true : false}
            className={`peer block min-w-0 grow py-2 pr-3 pl-2 text-base text-black placeholder:text-gray-500 focus:outline-none sm:text-sm/6 w-full p-4 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500
                ${title === "detail" ? " focus:select-none text-gray-500 cursor-not-allowed pointer-none select-none":""}
                `}
            />
                <label 
               htmlFor={id}
                className={`block mb-2 text-sm font-medium text-black dark:text-gray-900
                    absolute left-3 transition-all
                    peer-focus:text-indigo-500
                    peer-focus:-top-2 
                    peer-focus:text-xs 
                    peer-focus:bg-gray-100
                    peer-[:not(:placeholder-shown)]:-top-2
                    peer-[:not(:placeholder-shown)]:text-xs
                  peer-[:not(:placeholder-shown)]:bg-gray-100
                    ${title === "detail" ? " text-gray-500 focus:select-none cursor-not-allowed pointer-none select-none":""}
                `}>{label}</label>
        </div>
    );
})

export default InputUser;