import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CryptoDetails = () => {
  const { id } = useParams();
  
  const [cryptoDetails, setCryptoDetails] = useState(null);

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCryptoDetails(response.data);
      } catch (error) {
        console.error('Error fetching crypto details:', error);
      }
    };

    fetchCryptoDetails();
  }, [id]);

  if (!cryptoDetails) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  const {
    name,
    symbol,
    description,
    market_data: {
      current_price,
      market_cap,
      total_volume,
      circulating_supply,
      total_supply,
    },
    market_data: { ath, atl },
  } = cryptoDetails;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-3xl p-2 font-bold mb-4 text-center">{name} Details</h2>
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-1/2">
            <div className="bg-gray-800 p-6 rounded-lg shadow mb-4">
              <h3 className="text-xl font-semibold mb-2">About {symbol}</h3>
              <p>{description?.en.replace(/<[^>]*>?/gm, '') || 'Description not available'}</p>

            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow mb-4">
              <h3 className="text-xl font-semibold mb-2">Market Data</h3>
              <p>Current Price: ${current_price.usd}</p>
              <p>Market Capitalization: ${market_cap.usd}</p>
              <p>Total Volume: ${total_volume.usd}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow mb-4">
              <h3 className="text-xl font-semibold mb-2">Supply Data</h3>
              <p>Circulating Supply: {circulating_supply}</p>
              <p>Total Supply: {total_supply}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">All-Time Data</h3>
              <p>All-Time High: ${ath.usd}</p>
              <p>All-Time Low: ${atl.usd}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
