import React from 'react';

const TableBMN: React.FC = () => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-4">Data BMN</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">No</th>
            <th className="border border-gray-300 p-2">Nama Barang</th>
            <th className="border border-gray-300 p-2">Kategori</th>
            <th className="border border-gray-300 p-2">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">1</td>
            <td className="border border-gray-300 p-2">Laptop</td>
            <td className="border border-gray-300 p-2">Elektronik</td>
            <td className="border border-gray-300 p-2">5</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TableBMN;
