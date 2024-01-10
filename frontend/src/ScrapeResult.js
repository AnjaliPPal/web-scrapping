import React from 'react';
const ScrapeResult = ({ title, price, description }) => {
  return (
    <div>
      <p><strong>Title:</strong> {title}</p>
      <p><strong>Price:</strong> {price}</p>
      <p><strong>Description:</strong> {description}</p>
    </div>
  );
};

export default ScrapeResult;