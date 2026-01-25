function InputSearch({setKeyword,handleSearch,value}) {
    const onChange = (e) => {
            e.preventDefault()
            const {name ,value }= e.target
            setKeyword(prev =>  ({
                ...prev,    
                [name]:value
            }))
            
    }
    return (
    <form className="flex lg:flex-row flex-col gap-2 items-center min-w-sm mx-auto">   
        {/* <label htmlFor="simple-search" className="sr-only">Search</label> */}
        <div className="flex gap-2 w-full">
        <div className="relative w-full lg:pr-2 pr-0">
            {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div> */}
            {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-white">
                    <p>
                        Họ và tên
                    </p>
            </div> */}
            <input
            value={value.name}  
            onChange={onChange}
            name="name"
            type="text" id="name" className="border bg-gray-700 border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600"
            placeholder="Họ và tên" required />
        </div>
        <div className="relative w-full">
            {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div> */}
            {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-white">
                    <p>
                        Mã BHYT
                    </p>
            </div> */}
            <input
            value={value.health_insurance_code}
            onChange={onChange}
            name="health_insurance_code"
            type="text" id="health_insurance_code" className="border bg-gray-700 border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600"
            placeholder="Mã BHYT" required />
        </div>
        </div>
        <button onClick={()=>handleSearch()} type="button" className="lg:w-auto w-full p-2.5 lg:ms-2 ms-0 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
        </button>
    </form>
    );
}

export default InputSearch;

