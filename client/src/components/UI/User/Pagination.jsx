import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Pagination({pagination, setPage, page}) {
    const {totalPages} = pagination;
    
    // Hàm xử lý chuyển trang
    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
      }
    };
    const renderPages = () => {
    const pages = [];
    const range = 2; // Số lượng trang hiển thị quanh trang hiện tại

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= page - range && i <= page + range)
      ) {
        pages.push(
          <div key={i} className="relative inline-flex flex-col items-center">
            {/* Thanh indicator màu xanh khi active */}
            {page === i && (
              <div className="absolute top-[-13px] h-0.5 w-full bg-blue-600 transition-all"></div>
            )}
            <button
              onClick={() => handlePageChange(i)}
              className={`px-4 py-2 text-sm font-semibold transition-colors ${
                page === i ? 'text-blue-600' : 'text-gray-900 hover:text-blue-500'
              }`}
            >
              {i}
            </button>
          </div>
        );
      } else if (i === page - range - 1 || i === page + range + 1) {
        pages.push(
          <span key={i} className="px-4 py-2 text-sm font-semibold text-gray-500">
            ...
          </span>
        );
      }
    }
    return pages;
  };
  return (
    <div className="flex items-center justify-between border-t border-gray-400 mt-5 px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between w-full">
        <div>
          <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium transition-colors ${
            page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'
          }`}
            >
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
          <nav className="isolate inline-flex -space-x-px" aria-label="Pagination">
            {renderPages()}
          </nav>
        </div>
        <div>
              <button
                onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                page === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'
              }`}
              >
                <ChevronRightIcon aria-hidden="true" className="size-5" />
              </button>
        </div>
      </div>
    </div>
  )
}
