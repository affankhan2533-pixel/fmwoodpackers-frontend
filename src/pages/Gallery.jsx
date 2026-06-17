import { useState, useEffect, useRef } from 'react';
import PageHero from '../components/PageHero';
import Lightbox from '../components/Lightbox';
import { gsap } from 'gsap';

const categories = ['All', 'Wooden Crates', 'Wooden Pallets', 'Export Packaging', 'Industrial Packing', 'Warehouse Operations'];

const galleryItems = [
  { id: '1', src: '/image.png', title: 'Heavy Duty Export Packaging', category: 'Export Packaging' },
  { id: '2', src: '/image copy.png', title: 'Industrial Wooden Crates', category: 'Wooden Crates' },
  { id: '3', src: '/image copy 2.png', title: 'Custom Export Crating', category: 'Export Packaging' },
  { id: '4', src: '/image copy 3.png', title: 'CNC Machine Export Crate', category: 'Industrial Packing' },
  { id: '5', src: '/image copy 4.png', title: 'Premium Timber Pallets', category: 'Wooden Pallets' },
  { id: '6', src: '/image copy 5.png', title: 'Custom Shipping Crate', category: 'Wooden Crates' },
  { id: '7', src: '/image copy 6.png', title: 'Industrial Cargo Crating', category: 'Industrial Packing' },
  { id: '8', src: '/image copy 7.png', title: 'Tailored Packaging Solutions', category: 'Export Packaging' },
  { id: '9', src: '/image copy 8.png', title: 'Warehouse Storage and Pallets', category: 'Warehouse Operations' },
  { id: '10', src: '/image copy 9.png', title: 'Standard Double-Face Pallet', category: 'Wooden Pallets' },
  { id: '11', src: '/image copy 10.png', title: 'Custom Machinery Crate', category: 'Wooden Crates' },
  { id: '12', src: '/image copy 11.png', title: 'ISPM-15 Certified Sea Crate', category: 'Export Packaging' },
  { id: '13', src: '/image copy 12.png', title: 'Heavy Load Industrial Base', category: 'Industrial Packing' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const gridRef = useRef(null);

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  const prevImage = () => setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll('.gallery-item-wrapper');
    if (items && items.length > 0) {
      gsap.fromTo(items,
        { opacity: 0, y: 20, scale: 0.96 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.45, 
          stagger: 0.05, 
          ease: 'power2.out',
          overwrite: 'auto'
        }
      );
    }
  }, [activeCategory]);

  return (
    <main className="bg-white">
      <PageHero
        title="Media Gallery"
        subtitle="Take a look behind the scenes at our manufacturing facility, packaging operations, and completed projects."
        breadcrumb="Gallery"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-5 mb-20">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-4.5 rounded-sm text-xs md:text-sm font-black uppercase tracking-widest transition-all duration-300 border-3 ${
                  activeCategory === category
                    ? 'bg-wood text-white border-wood-dark shadow-lg scale-105'
                    : 'bg-white text-charcoal border-gray-200 hover:border-wood/40 hover:text-wood hover:-translate-y-1'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`gallery-item-wrapper group relative overflow-hidden rounded-md cursor-pointer ${
                  index % 3 === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
                } bg-gray-150 border border-gray-200`}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h4 className="text-white font-heading font-bold text-lg mb-1 leading-snug">{item.title}</h4>
                    <p className="text-accent font-semibold text-xs uppercase tracking-widest">{item.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Component */}
      <Lightbox 
        images={filteredItems}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </main>
  );
}

