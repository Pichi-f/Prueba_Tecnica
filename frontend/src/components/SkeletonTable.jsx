export default function SkeletonTable({ cols = 9, rows = 6 }) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>{Array.from({length: cols}).map((_,i)=><th key={i} className="bg-base-200" />)}</tr>
        </thead>
        <tbody>
          {Array.from({length: rows}).map((_,r)=>(
            <tr key={r}>
              {Array.from({length: cols}).map((_,c)=>(
                <td key={c}><div className="skeleton h-4 w-full" /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
