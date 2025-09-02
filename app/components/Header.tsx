import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard BMN</h1>
      <div className="flex items-center gap-4">
        <span>User</span>
        <img src="https://via.placeholder.com/40" alt="User" className="rounded-full" />
      </div>
    </header>
  )
}

export default Header;
