import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CryptoPrices from './CryptoPrices';
import CryptoDetails from './CryptoDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CryptoPrices />} />
        <Route path="/cryptocurrency/:id" element={<CryptoDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
