import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination,Navigation, Scrollbar, A11y, Autoplay  } from 'swiper/modules';
const CarouselMini = ({images}) => {

  return (
    <>
      <Swiper
      className="mySwipers"
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination,Navigation, Scrollbar, A11y, Autoplay]}
        speed={1000}
        autoplay={{ delay: 11000, disableOnInteraction: false }}
        loop={true}
        
      >
        {images.map((item,index)=>(

        <SwiperSlide key={index}><img src={item} alt="pizza" /></SwiperSlide>
        ))}

      </Swiper>
    </>
  )
}

export default CarouselMini
