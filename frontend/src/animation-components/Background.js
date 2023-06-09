import React from 'react';

const Background = () => {
  return (
    <div className="background">
      {Array.from({ length: 14 }, (_, index) => (
        <span key={index}></span>
      ))}
    </div>
  );
};

export default Background;
