import { gsap } from 'gsap';
import Swiper from 'swiper/bundle';

export function initHubPage() {
  new Swiper('.swiper-focus .swiper', {
    slidesPerView: 1,

    speed: 500,
    loop: true,

    pagination: {
      el: '.pagination',
      clickable: true,
      renderBullet: function (index, className) {
        const slide = document.querySelectorAll('.swiper-slide')[index];
        const bulletContent =
          slide.getAttribute('data-bullet') || `Slide ${index + 1}`;

        return `<button class="${className}">${bulletContent}</button>`;
      },
    },

    navigation: {
      nextEl: '.button-next',
      prevEl: '.button-prev',
    },
  });
}
