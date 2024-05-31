import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Container } from 'react-bootstrap';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import slider_1 from "../Assets/banners/Bệnh_viện_Trung_ương_Huế2023.jpg";
import slider_2 from "../Assets/banners/Benh-vien-Trung-uong-Hue.jpg";
import slider_3 from "../Assets/banners/home-banner-dt.jpg";

const images = [
  slider_1,
  slider_2,
  slider_3,
];

const Slider = () => {
  return (
    <Container>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '500px', borderRadius: '10px', border: '1px solid blue', boxShadow: '2px 2px 5px rgba(0, 0, 255, 0.2)' }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Slider;
