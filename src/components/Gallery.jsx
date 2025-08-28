import H1 from "./custom-tags/H1";

const Gallery = () => {
    const images = [
        {
            id: 1,
            src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
            alt: "Modern bank building",
            title: "Banking Services",
        },
        {
            id: 2,
            src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
            alt: "Financial planning",
            title: "Financial Planning",
        },
        {
            id: 3,
            src: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400",
            alt: "Insurance protection",
            title: "Insurance Coverage",
        },
        {
            id: 4,
            src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
            alt: "Credit cards",
            title: "Credit Solutions",
        },
        {
            id: 5,
            src: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400",
            alt: "Investment growth",
            title: "Investment Services",
        },
        {
            id: 6,
            src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400",
            alt: "Business analytics",
            title: "Business Banking",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <H1>Sanchayan Gallery Corner</H1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105"
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-700 text-center">
                                {image.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
