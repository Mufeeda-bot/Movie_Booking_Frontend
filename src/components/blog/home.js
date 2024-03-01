import React, { useState, useEffect } from 'react';

const imageUrls = [
  'https://www.keralatv.in/media/2023/11/Neru-Official-Poster.jpg',
  'https://i.ytimg.com/vi/RA-zsQKIswA/maxresdefault.jpg',
  'https://www.hdwallpapers.in/download/brave_movie_2012-wide.jpg',
  
];

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
    
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 

    
    return () => clearInterval(interval);
  }, []); 

  return (
    <div className='home-container'>
      <img src={imageUrls[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} className='image'></img>
    </div>
  );
}

export default Home;
