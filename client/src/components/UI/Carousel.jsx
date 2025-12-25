import {Swiper, SwiperSlide} from "swiper/react"
import {Navigation,Pagination,Autoplay} from "swiper/modules"
import "swiper/css"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
function Carousel() {

    return (
        <Swiper 
            modules={[Navigation,Pagination,Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{clickable:true}}
            navigation
            onSlideChange={()=>console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            autoplay={{ delay: 3000 }}
            className="w-3/4 overflow-hidden"
        >
            <SwiperSlide><img className="object-cover mx-auto w-full h-[500px]" src="https://binhminh.edu.vn/uploads/thumb/tho-ve-ngay-22-12-7-071140.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img className="object-cover mx-auto w-full h-[500px]" src="https://a.tcnn.vn//Upload/Images/Normal/2025/12/d9c3a07340c21515d5748e6ea45a8a25-81-nam-QD.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img className="object-cover mx-auto w-full h-[500px]" src="https://nhandan.vn/special/muoi-lam-nam-truong-thanh-cua-quan-y/assets/bIWfC5H3zB/nu-quan-y-2000x1358.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img className="object-cover mx-auto w-full h-[500px]" src="https://thethaovanhoa.mediacdn.vn/372676912336973824/2024/12/18/daihanoi-17345286825682009403808.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img className="object-cover mx-auto w-full h-[500px]" src="https://hatinh.gov.vn/uploads/topics/17663660843878.webp" alt="" /></SwiperSlide>
            <SwiperSlide><img className="object-cover mx-auto w-full h-[500px]" src="https://cdn.tuoitrethudo.vn/stores/news_dataimages/2025/122025/21/11/tbt-to-lam-bi-thu-quan-uy-trung-uong-120251221114917.jpg?rt=20251221115400" alt="" /></SwiperSlide>
        </Swiper>
    );
}

export default Carousel;