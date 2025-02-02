import Swiper from 'swiper/bundle';
import MenuMobile from './menu-mobile';
import Drawer from './menu-drawer';
import Select from './select';

document.addEventListener('DOMContentLoaded', () => {
  const menuMobile = new MenuMobile('#nav-mobile');

  // Initialize the drawer
  if (document.querySelector('body')?.classList.contains('page-account')) {
    //   initHomePage();
    const drawer = new Drawer('drawer-account');
  }

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

  const selectElements = document.querySelectorAll('.select');

  selectElements.forEach((selectElement) => {
    new Select(selectElement);
  });

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

  const dropdownButton = document.getElementById('dropdown-button');
  const dropdownButtonClose = document.getElementById('dropdown-menu-close');
  const dropdownMenu = document.getElementById('dropdown-menu');
  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
    dropdownMenu.classList.toggle('hidden', !isDropdownOpen);
    dropdownMenu.classList.remove('opacity-0', !isDropdownOpen);
    dropdownMenu.classList.add('opacity-100', !isDropdownOpen);
    dropdownButton.setAttribute('aria-expanded', isDropdownOpen);
  }

  dropdownButton.addEventListener('click', toggleDropdown);

  dropdownButtonClose?.addEventListener('click', () => {
    console.log('aezaze');
    dropdownMenu.classList.add('hidden');
    dropdownButton.setAttribute('aria-expanded', 'false');
    isDropdownOpen = false;
  });

  window.addEventListener('click', (event) => {
    if (
      !dropdownButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      if (isDropdownOpen) {
        requestAnimationFrame(() => {
          dropdownMenu.classList.add('hidden');
          dropdownButton.setAttribute('aria-expanded', 'false');
          isDropdownOpen = false;
        });
      }
    }
  });

  // Mega menu shop
  const nav = document.querySelector('.main-nav');
  const shopMenuLink = document.querySelector('.submenu-toggle');
  const shopMenu = document.querySelector('.menu');
  let isShopMenuOpen = false;

  nav?.addEventListener('mouseover', (e) => {
    if (shopMenuLink && shopMenuLink.contains(e.target)) {
      isShopMenuOpen = true;
      shopMenu?.setAttribute('aria-expanded', 'true');
    } else {
      isShopMenuOpen = false;
      shopMenu?.setAttribute('aria-expanded', 'false');
    }
  });
  shopMenu?.addEventListener('mouseleave', (e) => {
    isShopMenuOpen = false;
    shopMenu?.setAttribute('aria-expanded', 'false');
  });
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
