import React from 'react';
import { Link } from 'react-router-dom';

export default function MainPage() {
  const allColors = ['gold', 'blue', 'red', 'green'];

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-white mb-8">MARTA Train Tracker</h1>
      <div className="flex space-x-4">
        {allColors.map((color) => (
          <Link
            key={color}
            to={`/${color}`}
            className={`flex items-center justify-center border px-8 py-2 border-white rounded-md`}
            style={{ backgroundColor: color, color: 'white', minWidth: '100px' }}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  );
}
