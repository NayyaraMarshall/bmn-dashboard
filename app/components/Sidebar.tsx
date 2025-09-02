import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white shadow h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">BMN Dashboard</h2>
      <nav>
        <ul className="space-y-4">
          <li><a href="#" className="block text-gray-700 hover:text-blue-500">Home</a></li>
          <li><a href="#" className="block text-gray-700 hover:text-blue-500">Data BMN</a></li>
          <li><a href="#" className="block text-gray-700 hover:text-blue-500">Reports</a></li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar;
