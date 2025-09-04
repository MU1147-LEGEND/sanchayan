import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useRef } from "react";
import { useAutoplayProgress } from "./EmblaCarouselAutoPlayProgress";

const EmblaCarousel = (props) => {
    const { slides, options, images } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
            stopOnFocusIn: false,
        }),
    ]);
    const progressNode = useRef(null);
    const { showAutoplayProgress } = useAutoplayProgress(
        emblaApi,
        progressNode
    );

    return (
        <section className="embla ">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((index) => (
                        <div className="embla__slide" key={index}>
                            <div className="embla__slide__number">
                                <img
                                    className="w-full h-full object-cover"
                                    src={images[index].src}
                                    alt={images[index].alt}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* autoplayprogress */}
            <div
                className={`embla__progress`.concat(
                    showAutoplayProgress ? "" : " embla__progress--hidden"
                )}
            >
                <div className="embla__progress__bar" ref={progressNode} />
            </div>
        </section>
    );
};

export default EmblaCarousel;
