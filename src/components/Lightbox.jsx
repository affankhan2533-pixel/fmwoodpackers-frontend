import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Lightbox({ images, currentIndex, onClose, onNext, onPrev }) {
  if (currentIndex === null || currentIndex === undefined) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
          aria-label="Close lightbox"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Navigation */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
          aria-label="Previous image"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
          aria-label="Next image"
        >
          <FaChevronRight className="w-5 h-5" />
        </button>

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="max-w-5xl max-h-[85vh] px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-[70vh] rounded-lg overflow-hidden bg-charcoal flex items-center justify-center border border-white/10">
            {images[currentIndex]?.src ? (
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].title}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <span className="text-8xl opacity-40">{images[currentIndex]?.emoji || '📦'}</span>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/50 to-transparent">
              <h3 className="text-white font-heading font-bold text-lg">{images[currentIndex]?.title}</h3>
              <p className="text-gold font-bold text-xs uppercase tracking-wider mt-1">{images[currentIndex]?.category}</p>
            </div>
          </div>
        </motion.div>

        {/* Counter */}
        <div className="absolute bottom-6 text-white/50 text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
