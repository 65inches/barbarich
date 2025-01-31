import Swiper from 'swiper/bundle';
import Select from './select';
import Video from './video';

import { initSocialButtons } from './social';
import { initOnScrollAnimate } from './animate';
import { initEventsPage } from './pages/events';
import { initAboutPage } from './pages/about';
import { initHubPage } from './pages/hub.js';
import { initHomePage } from './pages/home.js';

document.addEventListener('DOMContentLoaded', () => {
  // initOnScrollAnimate();
  // const swipers = document.querySelectorAll('.swiper');
  // if (swipers) {
  //   swipers.forEach((el) => {
  //     const pagination = el.querySelector('.swiper-pagination');
  //     new Swiper(el, {
  //       slidesPerView: 1,
  //       loop: true,
  //       spaceBetween: 20,
  //       pagination: {
  //         el: pagination,
  //       },
  //     });
  //   });
  // }
  // if (document.querySelector('body')?.classList.contains('page-home')) {
  //   initHomePage();
  // }
  // if (document.querySelector('body')?.classList.contains('page-hub')) {
  //   initHubPage();
  // }
  // if (document.querySelector('body')?.classList.contains('page-about')) {
  //   initAboutPage();
  // }
  // if (document.querySelector('body')?.classList.contains('page-events')) {
  //   initEventsPage();
  // }
  // const selectElements = document.querySelectorAll('.select');
  // selectElements.forEach((selectElement) => {
  //   new Select(selectElement);
  // });
  // const videos = document.querySelectorAll('.video');
  // videos.forEach((video) => {
  //   new Video(video);
  // });
  // initSocialButtons();
});
