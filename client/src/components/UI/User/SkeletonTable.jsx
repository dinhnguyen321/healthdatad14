export function SkeletonTable() {
  const skeletonRows = Array.from({ length: 5 });

  return (
  <tbody>
        {skeletonRows.map((_, i) => (
          <tr key={i} className="animate-pulse">
              <td className="p-1"><div className="text-center">
                        <input 
                        type="checkbox" 
                        className='w-4 h-4 border rounded-xs bg-white accent-blue-500 focus:ring-2 focus:ring-blue-400'
                        />
                </div></td>
              <td className="p-1"><div className="h-4 bg-gray-300 rounded"></div></td>
              <td className="p-1"><div className="h-4 bg-gray-300 rounded"></div></td>
              <td className="p-1"><div className="h-4 bg-gray-300 rounded"></div></td>
              <td className="p-1"><div className="h-4 bg-gray-300 rounded"></div></td>
              <td className="p-1"><div className="h-4 bg-gray-300 rounded"></div></td>
              <td className="p-1"><div className="h-4 bg-gray-300 rounded"></div></td>
              <td className="p-1"><div className="h-4 bg-gray-300 rounded"></div></td>
              <td className="p-1"><div className="h-4 bg-gray-300 rounded"></div></td>
          </tr>
          ))}
    </tbody>
  );
}
