import React, { useState } from 'react';
const ScraperForm = ({ onScrape }) => {
  const [asin, setAsin] = useState('');

  const handleScrape = () => {
    onScrape(asin);
  };

  return (
    <div>
      <h1>Amazon Seller Scraper</h1>
      <p>Enter an ASIN to scrape seller information:</p>
      <input
        type="text"
        placeholder="Enter ASIN"
        value={asin}
        onChange={(e) => setAsin(e.target.value)}
      />
      <button onClick={handleScrape}>Scrape Seller Info</button>
    </div>
  );
};

export default ScraperForm;
