import './App.css';
import { Route, Routes } from 'react-router-dom';
import LinesPage from './Pages/LinesPage';
import MainPage from './Pages/MainPage';

function App() {
  return (
    <Routes>
        <Route index element={<MainPage />} />
        <Route path="/red" element={<LinesPage color="red" />} />
        <Route path="/green" element={<LinesPage color="green" />} />
        <Route path="/blue" element={<LinesPage color="blue" />} />
        <Route path="/gold" element={<LinesPage color="gold" />} />
    </Routes>
  );
}

export default App;

