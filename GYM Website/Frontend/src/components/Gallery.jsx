import React from 'react';

const images = [
  { src: '../public/01.png', text: 'Train like a beast' },
  { src: '../public/02.png', text: 'No excuses, just results' },
  { src: '../public/03.png', text: 'Stronger every day' },
  { src: '../public/background.png', text: 'Push your limits' },
  { src: '../public/05.png', text: 'Earn your body' },
  { src: '../public/06.png', text: 'Discipline = Freedom' },
  { src: '../public/07.png', text: 'Work. Sweat. Achieve.' },
  { src: '../public/08.png', text : 'You vs You' },
];

function Gallery() {
  return (
    <section className="gallery-section" id='gallery'>
      <h2 className="gallery-heading">BETTER BEAST BEST</h2>
      <div className="gallery-grid">
        {images.map((img, index) => (
          <div key={index} className="gallery-item">
            <img src={img.src} alt={`gallery-${index}`} />
            <div className="overlay">
              <p>{img.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;


