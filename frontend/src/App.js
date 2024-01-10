import React, { useState } from 'react';
import './App.css';
import ScraperForm from './ScraperForm';
import ScrapeResult from './ScrapeResult';

function App() {
  const [result, setResult] = useState(null);

  const handleScrape = async (asin) => {
    // Make a request to your backend to scrape data
    const response = await fetch('http://localhost:3000/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ asin }),
    });

    if (response.ok) {
      const data = await response.json();
      setResult(data);
    }
  };

  return (
    <div className="App">
      <ScraperForm onScrape={handleScrape} />
      {result && <ScrapeResult {...result} />}
    </div>
  );
}

export default App;
