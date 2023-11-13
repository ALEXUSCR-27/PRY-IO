import React from "react";

function OptimalTable({arrays}) {
    const numRows = arrays[0].length;

    return (
        <div>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>Tiempos(t)</th>
          <th>G(t)</th>
          <th>Proximo</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(numRows).keys()].reverse().map((rowIndex) => (
          <tr key={rowIndex}>
            {arrays.map((arr, colIndex) => (
              <td key={colIndex}>
                {Array.isArray(arr[rowIndex]) ? arr[rowIndex].toString() : arr[rowIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
        </div>
    )
}

export default OptimalTable;