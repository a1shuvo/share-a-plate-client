import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";

const slides = [
  {
    id: 1,
    image: banner1,
    title: "Reduce Food Waste, Feed the Future",
    subtitle:
      "Join ShareAPlate in redistributing surplus meals to those who need them most.",
  },
  {
    id: 2,
    image: banner2,
    title: "Support Local Communities",
    subtitle:
      "Together, we can make sure no plate goes empty while food is wasted.",
  },
  {
    id: 3,
    image: banner3,
    title: "Empower Charities & Restaurants",
    subtitle: "Connect donors and doers to make food go further.",
  },
];

const HomeBanner = () => {
  return (
    <div className="relative w-full h-[80vh]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect="fade"
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center text-white"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="bg-[#00000050] p-6 rounded-2xl max-w-2xl text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBanner;
