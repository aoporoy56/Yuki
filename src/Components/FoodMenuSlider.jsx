import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

const MenuItem = ({ image, category, title, description }) => (
  <div
    className="relative group cursor-pointer"
    onClick={() => {
      console.log(`Clicked: ${title}`);
    }}
  >
    <div className="relative w-full aspect-square overflow-hidden bg-white rounded-lg shadow-md">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="mt-4 space-y-2">
      <div className="flex items-center">
        {category && (
          <span className="inline-block px-3 py-1 bg-orange-500 text-white text-sm rounded-full">
            {category}
          </span>
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const FoodMenuSlider = () => {
  const menuItems = [
    {
      image: "/img/food1.jpg",
      category: "Hot Deal",
      title: "Chicken Katsu Curry Bento",
      description:
        "Chicken, Japanese curry sauce, onion, carrot, rice, kale salad",
    },
    {
      image: "/img/food2.jpg",
      category: "Hot Deal",
      title: "Sweet Chilli Chicken Bento",
      description:
        "Chicken, sweet chilli sauce, onion, green & red peppers, pineapple, rice, kale salad",
    },
    {
      image: "/img/food3.jpg",
      category: "Hot Deal",
      title: "Korean BBQ Chicken Bento",
      description:
        "Sushi Rice, Barbecue Sauce, Green and Red Peppers, Fried Chicken and Pickled Asian Slaw",
    },
    {
      image: "/img/food4.jpg",
      category: "Large Sushi Sets",
      title: "Rainbow Set",
      description:
        "Salmon sashimi, salmon nigiri, prawn nigiri, California chumaki, fried prawn chumaki, crab & cucumber chumaki",
    },
    {
      image: "/img/food5.jpg",
      category: "Large Sushi Sets",
      title: "Tokyo Salmon Set",
      description:
        "Salmon sashimi, salmon nigiri, salmon, avocado & sesame chumaki, salmon hosomaki, wakame, chives",
    },
  ];

  return (
    <div className="container mx-auto px-6 pt-16">
      <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-red-400 to-red-600 text-transparent bg-clip-text tracking-tight">
        Best Sellers
      </h2>
      <div className="w-full max-w-[1400px] mx-auto px-4 pt-12">
        <Swiper
          modules={[FreeMode, Pagination, Navigation]}
          spaceBetween={24}
          slidesPerView={1.2}
          loop={false}
          grabCursor={false}
          freeMode={{
            enabled: false,
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            bulletClass: "w-2 h-2 mx-1 rounded-full bg-gray-300 inline-block",
            bulletActiveClass: "!bg-red-300",
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
            },
            768: {
              slidesPerView: 3.2,
            },
            1024: {
              slidesPerView: 4.2,
            },
          }}
          className="w-full"
        >
          {menuItems.map((item, index) => (
            <SwiperSlide key={index}>
              <MenuItem {...item} />
            </SwiperSlide>
          ))}

          <div className="flex flex-col items-center space-y-4">
            <div className="!static swiper-pagination">
              <style>
                {`
                .swiper-pagination-bullet {
                  background: red !important;
                }
                .swiper-pagination-bullet-active {
                  background: darkred !important;
                }
              `}
              </style>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button className="!static !w-10 !h-10 !mt-0 !transform-none swiper-button-prev bg-red-500 rounded-full flex items-center justify-center after:!content-['']">
                <span className="sr-only">Previous</span>
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="!static !w-10 !h-10 !mt-0 !transform-none swiper-button-next bg-red-500 rounded-full flex items-center justify-center after:!content-['']">
                <span className="sr-only">Next</span>
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default FoodMenuSlider;
