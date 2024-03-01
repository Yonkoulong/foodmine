import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { MatModule } from 'src/app/shared/modules/material/mat.module';
// import {A11y, Mousewheel, Navigation, Pagination, SwiperOptions} from 'swiper';
import SwiperCore, { Autoplay, Navigation, Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent, SwiperModule } from 'swiper/angular';
SwiperCore.use([Navigation, Pagination, Autoplay ]);

@Component({
  selector: 'fm-banner',
  templateUrl: './food-banner.component.html',
  styleUrls: ['./food-banner.component.scss'],
  standalone: true,
  imports: [SwiperModule, CommonModule, MatModule]
})
export class FoodBannerComponent {
  slides = [
    {
        title: "Make Your First Order and Get",
        textHighlight: "50% Off",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.",
        textBtn: "Order now",
        imgUrl: "../../../../../assets/images//foods//pizza//vippng 1.png"
    },
    {
        title: "Make Your First Order and Get",
        textHighlight: "50% Off",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.",
        textBtn: "Order now",
        imgUrl: "../../../../../assets/images//foods//pizza//vippng 1.png"
    },
    {
        title: "Make Your First Order and Get",
        textHighlight: "50% Off",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.",
        textBtn: "Order now",
        imgUrl: "../../../../../assets/images//foods//pizza//vippng 1.png"
    }
  ];

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: false,
    
    loop: true,
    pagination: { clickable: true, type: 'bullets' },
    scrollbar: { draggable: true },
  };

  onSwiper(event: any) {
   
  }
  onSlideChange() {}
}
