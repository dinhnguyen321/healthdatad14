import React from 'react';

 const InputUser = React.memo(({ 
    label,
    type,
    value,
    title,
    id,
    onChangeInput,
    textarea = false,
    readOnly = false
}) => { 
    return (
        <div 
        className='flex flex-col w-full relative'>
            {
                textarea ? (
                    <textarea 
                    rows={6}
                    value={value ?? ""}
                    placeholder={""} 
                    onChange={onChangeInput}
                    name={id}
                    id={id}
                    readOnly={readOnly}
                    className={`
                    block px-2.5 pb-2.5 pt-4 w-full text-sm 
                    text-heading bg-transparent rounded-lg 
                    border border-default-medium appearance-none 
                    focus:outline-none focus:ring-0 focus:border-blue-600 peer
                    ${title === "detail" ? " focus:select-none text-gray-500 cursor-not-allowed pointer-none select-none":""}
                    `}
                    />
                ) : (
            <input
            placeholder={""} 
            onChange={onChangeInput}
            value={value ?? ""}
            // disabled={false}
            type={type} 
            name={id}
            id={id}
            readOnly={title === "detail" ? true : false}
            className={`
                block px-2.5 pb-2.5 pt-4 w-full text-sm 
                text-heading bg-transparent rounded-lg 
                border border-default-medium appearance-none 
                focus:outline-none focus:ring-0 focus:border-blue-600 peer
                ${title === "detail" ? " focus:select-none text-gray-500 cursor-not-allowed pointer-none select-none":""}
                `}
            />
                )
            }
                <label 
               htmlFor={id}
                className={`
                    absolute text-sm text-body 
                    duration-300 transform -translate-y-4 scale-75 top-2 z-10
                    origin-left bg-neutral-primary px-2 
                    peer-focus:px-2 peer-focus:text-fg-brand 
                    peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:-translate-y-1/2
                    peer-focus:top-2 
                    peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600
                    rtl:peer-focus:translate-x-1/4
                    rtl:peer-focus:left-auto start-1
                    bg-white
                    ${textarea ? " peer-placeholder-shown:top-1/6": "peer-placeholder-shown:top-1/2"}
                    ${title === "detail" ? " text-gray-500 focus:select-none cursor-not-allowed pointer-none select-none":""}
                    `}>{label} {id === "name" || id === "SHQN" ? (
                        <span className='text-red-600'>
                            (Bắt buộc điền)
                        </span>
                    ) : ""}</label>
        </div>
    );
})
export default InputUser;