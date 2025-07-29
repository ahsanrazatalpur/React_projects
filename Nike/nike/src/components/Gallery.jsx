import React from 'react';

const galleryImages = [
    "/men-black-03.png",
    "/men-red-01.png",
    "/women-white-01.png",
    "/women-black-01.png",
    "/women-red-01.png",
    "/women-pink-01.png",
    "/unisex-yellow-01.png",
    "/unisex-white-01.png",
    "/men-green-01.png",
    "/men-black-01.png",
    "/women-red-01.png",
    "/unisex-white-02.png",
    "/women-black-01.png",
    "/women-pink-01.png",
    "/unisex-yellow-01.png",
    "/men-red-01.png",
    
];

function Gallery() {
    return (
        <section className="gallery-section" id='gallery'>
            <h2 className="gallery-heading">Gallery</h2>
            <div className="gallery-grid">
                {galleryImages.map((img, index) => (
                    <div className="gallery-card" key={index}>
                        <img src={img} alt={`Nike ${index + 1}`} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Gallery;
