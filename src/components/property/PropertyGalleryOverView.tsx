import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
}

const PropertyGalleryOverView: React.FC<ImageGalleryProps> = ({ images }) => {
  if (!images || images.length < 5) {
    throw Error("6 images needed for gallary");
  }

  const mainImage = images[0];
  const galleryImages = images.slice(1, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[550px]">
        <div className="relative h-full overflow-hidden rounded-l-xl">
          <Image
            src={mainImage}
            alt="Main gallery view"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          {galleryImages.map((src, index) => (
            <div key={index} className="relative w-full h-full overflow-hidden">
              <Image
                src={src}
                alt={`Gallery view ${index + 1}`}
                fill
                sizes="25vw"
                className={`object-cover w-full h-full ${
                  index === 1 ? 'rounded-tr-xl' : ''
                } ${index === 3 ? 'rounded-br-xl' : ''}`}
              />
              {index === 3 && (
                <button
                  onClick={() => alert('View all photos clicked!')}
                  className="absolute bottom-4 right-4 bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  View all photos
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyGalleryOverView;