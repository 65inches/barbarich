import Swiper from 'swiper/bundle';

document.addEventListener('DOMContentLoaded', () => {
  const swipers = document.querySelectorAll('.slider');

  if (swipers) {
    swipers.forEach((el) => {
      const swiper = el.querySelector('.swiper');
      const pagination = el.querySelector('.swiper-pagination');
      const btnPrev = el.querySelector('.swiper-button-prev');
      const btnNext = el.querySelector('.swiper-button-next');

      new Swiper(swiper, {
        slidesPerView: 'auto',
        spaceBetween: 0,
        pagination: {
          el: pagination,
        },

        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
      });
    });
  }

  // initOnScrollAnimate();
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

// function decrement(e) {
//   const btn = e.target.parentNode.parentElement.querySelector(
//     'button[data-action="decrement"]'
//   );
//   const target = btn.nextElementSibling;
//   let value = Number(target.value);
//   value--;
//   target.value = value;
// }

// function increment(e) {
//   const btn = e.target.parentNode.parentElement.querySelector(
//     'button[data-action="decrement"]'
//   );
//   const target = btn.nextElementSibling;
//   let value = Number(target.value);
//   value++;
//   target.value = value;
// }

// const decrementButtons = document.querySelectorAll(
//   `button[data-action="decrement"]`
// );

// const incrementButtons = document.querySelectorAll(
//   `button[data-action="increment"]`
// );

// decrementButtons.forEach(btn => {
//   btn.addEventListener("click", decrement);
// });

// incrementButtons.forEach(btn => {
//   btn.addEventListener("click", increment);
// });
