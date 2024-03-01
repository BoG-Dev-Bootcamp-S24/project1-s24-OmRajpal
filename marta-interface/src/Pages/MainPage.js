import React from 'react';
import { Link, Route, Router, Routes } from 'react-router-dom';

// Import your LinesPage component
import LinesPage from './LinesPage';

export default function MainPage() {

  const allColors = ['gold', 'blue', 'red', 'green'];

  return (
    <div className='flex flex-col'>
      <div className="flex flex-row justify-evenly border-grey border-t py-3">
        {allColors.map((color) => (
          <Link
            key={color}
            to={`/${color}`}
            className={`flex flex-row border px-10 py-1 border-black`}
            style={{ backgroundColor: color, color: 'white'}}
          >
            {color}
          </Link>
        ))}
      </div>

      {/* The Routes component should be outside the div that contains the Links */}
      <Routes>
        <Route path="/red" element={<LinesPage color="red" />} />
        <Route path="/green" element={<LinesPage color="green" />} />
        <Route path="/blue" element={<LinesPage color="blue" />} />
        <Route path="/gold" element={<LinesPage color="gold" />} />
      </Routes>
    </div>
  );
}
