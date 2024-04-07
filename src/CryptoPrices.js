import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CryptoPrices = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&sparkline=false');
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-5 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Top 100 Cryptocurrencies</h1>
      <table className="min-w-full divide-y divide-gray-200 bg-gray-800 text-white">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price (USD)</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Market Cap (USD)</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((crypto, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img className="w-6 h-6 mr-2" src={crypto.image} alt={crypto.name} />
                  <Link to={`/cryptocurrency/${crypto.id}`} className="">{crypto.name}</Link>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">${crypto.current_price.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">${crypto.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoPrices;
