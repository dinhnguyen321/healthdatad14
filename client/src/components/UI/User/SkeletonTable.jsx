export function SkeletonTable() {
  const skeletonRows = Array.from({ length: 5 });

  return (
  <tbody>
        {skeletonRows.map((_, i) => (
          <tr key={i} className="animate-pulse">
              <td className="p-2"><div className="h-4 bg-gray-300 rounded"></div></td>
              <td className="p-2"><div className="h-4 bg-gray-300 rounded"></div></td>
              <td className="p-2"><div className="h-4 bg-gray-300 rounded"></div></td>
              <td className="p-2"><div className="h-4 bg-gray-300 rounded"></div></td>
              <td className="p-2"><div className="h-4 bg-gray-300 rounded"></div></td>
              <td className="p-2"><div className="h-4 bg-gray-300 rounded"></div></td>
              <td className="p-2"><div className="h-4 bg-gray-300 rounded"></div></td>
              <td className="p-2"><div className="h-4 bg-gray-300 rounded"></div></td>
          </tr>
          ))}
    </tbody>
  );
}
