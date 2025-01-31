import { gsap } from 'gsap';
import { map, lerp, clamp, getMousePos } from '../utils.js';
// const images = Object.entries(require('../../img/demo1/*.jpg'));

import Tab from '../tab';
import Swiper from 'swiper/bundle';

export function initAboutPage() {
  const teamTab = document.querySelector('#team-tab');
  if (teamTab) {
    new Tab(teamTab);
  }

  const swiper = new Swiper('.swiper-horizon .swiper', {
    slidesPerView: 1,
    effect: 'fade',
    allowTouchMove: false,

    speed: 1000,
    loop: false,

    scrollbar: {
      el: '.swiper-scrollbar',
    },

    navigation: {
      nextEl: '.button-next',
      prevEl: '.button-prev',
    },

    on: {
      init: (swiper) => {
        swiper.slides.forEach((slide) => {
          const span = slide.querySelector('span');
          const p = slide.querySelector('p');
          gsap.set([span, p], { opacity: 0, y: 50 });
        });

        const activeSlide = swiper.slides[swiper.activeIndex];
        animateSlide(activeSlide);
        updateSvgYears(swiper);
      },
      slideChangeTransitionStart: (swiper) => {
        updateSvgYears(swiper);
        const activeSlide = swiper.slides[swiper.activeIndex];

        swiper.slides.forEach((slide) => {
          const span = slide.querySelector('span');
          const p = slide.querySelector('p');
          gsap.to([span, p], { opacity: 0, y: 50 });
        });
        animateSlide(activeSlide);
      },
    },
  });

  function animateSlide(activeSlide) {
    const span = activeSlide.querySelector('span');
    const p = activeSlide.querySelector('p');
    gsap.to([span, p], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2,
    });
  }

  function updateSvgYears(swiper) {
    const activeIndex = swiper.activeIndex;
    const slides = swiper.slides;

    const nextIndex = activeIndex + 1;
    const secondNextIndex = activeIndex + 2;
    const nextYear = slides[nextIndex]?.dataset.year || '';
    const secondNextYear = slides[secondNextIndex]?.dataset.year || '';

    const dateOneEl = document
      .getElementById('date-one')
      ?.querySelector('text');
    const dateTwoEl = document
      .getElementById('date-two')
      ?.querySelector('text');

    gsap.fromTo(
      dateOneEl,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.4 }
    );
    gsap.fromTo(
      dateTwoEl,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.6 }
    );

    dateOneEl.textContent = `${nextYear}`;
    dateTwoEl.textContent = `${secondNextYear}`;
  }

  const menuEl = document.querySelector('.team-members');
  new Menu(menuEl);

  let currentItem = null;

  const handleMouseEnter = (event) => {
    const item = event.currentTarget;
    const rect = item.getBoundingClientRect();
    const pointerBelow = event.clientY > rect.bottom;

    if (pointerBelow) {
      item.style.setProperty('--transform-origin', 'bottom center');
    } else {
      item.style.removeProperty('--transform-origin');
    }

    currentItem = item;
  };

  const handleMouseLeave = () => {
    if (currentItem) {
      currentItem.style.removeProperty('--transform-origin');
      currentItem = null;
    }
  };

  document.querySelectorAll('.member-item').forEach((item) => {
    item.addEventListener('mouseenter', handleMouseEnter);
    item.addEventListener('mouseleave', handleMouseLeave);
  });
}

let mousepos = { x: 0, y: 0 };
let mousePosCache = mousepos;
let direction = {
  x: mousePosCache.x - mousepos.x,
  y: mousePosCache.y - mousepos.y,
};

window.addEventListener('mousemove', (ev) => (mousepos = getMousePos(ev)));

class MenuItem {
  constructor(el, inMenuPosition, animatableProperties) {
    this.DOM = { el: el };
    this.inMenuPosition = inMenuPosition;
    this.animatableProperties = animatableProperties;
    this.DOM.textInner = this.DOM.el.querySelector('span');
    this.DOM.reveal = this.DOM.el.querySelector('.hover-reveal');
    // this.DOM.revealImage = this.DOM.el.querySelector('.team__avatar');
    this.DOM.revealInner = this.DOM.el.querySelector('.hover-reveal__inner');
    this.DOM.revealImage = this.DOM.el.querySelector('.hover-reveal__img');
    this.initEvents();
  }
  getMouseArea() {
    return this.bounds.el.top + this.bounds.el.height / 2 <=
      window.innerHeight / 2
      ? 'up'
      : 'down';
  }
  calcBounds() {
    const elBounds = this.DOM.el.getBoundingClientRect();
    const revealBounds = this.DOM.reveal.getBoundingClientRect();

    this.bounds = {
      el: {
        top: elBounds.top + window.scrollY,
        left: elBounds.left,
        width: elBounds.width,
        height: elBounds.height,
      },
      reveal: {
        top: revealBounds.top + window.scrollY,
        left: revealBounds.left,
        width: revealBounds.width,
        height: revealBounds.height,
      },
    };
  }
  initEvents() {
    this.mouseenterFn = (ev) => {
      this.showImage();
      this.firstRAFCycle = true;
      this.DOM.reveal.style.transformOrigin = `0% ${
        this.mouseArea === 'up' ? 0 : 100
      }%`;

      this.loopRender();
    };
    this.mouseleaveFn = () => {
      this.stopRendering();
      this.hideImage();
    };

    this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
    this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
  }
  showImage() {
    gsap.killTweensOf(this.DOM.revealInner);
    gsap.killTweensOf(this.DOM.revealImage);

    this.tl = gsap
      .timeline({
        onStart: () => {
          this.DOM.reveal.style.opacity =
            this.DOM.revealInner.style.opacity = 1;
          gsap.set(this.DOM.el, { zIndex: 5 });
        },
      })
      .to(this.DOM.revealInner, 0.6, {
        ease: 'Expo.easeOut',
        startAt: { scale: 0.6 },
        scale: 1,
      })
      .to(
        this.DOM.revealImage,
        0.6,
        {
          ease: 'Expo.easeOut',
          startAt: { scale: 1.4 },
          scale: 1,
        },
        0
      );
  }
  hideImage() {
    gsap.killTweensOf(this.DOM.revealInner);
    gsap.killTweensOf(this.DOM.revealImage);

    this.tl = gsap
      .timeline({
        onStart: () => {
          gsap.set(this.DOM.el, { zIndex: 1 });
        },
        onComplete: () => {
          gsap.set(this.DOM.reveal, { opacity: 0 });
        },
      })
      .to(this.DOM.revealInner, 0.6, {
        ease: 'Expo.easeOut',
        scale: 0.9,
        opacity: 0,
      })
      .to(
        this.DOM.revealImage,
        0.6,
        {
          ease: 'Expo.easeOut',
          scale: 1,
        },
        0
      );
  }
  loopRender() {
    if (!this.requestId) {
      this.requestId = requestAnimationFrame(() => this.render());
    }
  }
  stopRendering() {
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = undefined;
    }
  }
  render() {
    this.requestId = undefined;

    if (this.firstRAFCycle) {
      this.calcBounds();
      this.mouseArea = this.getMouseArea();
    }

    direction = {
      x: mousePosCache.x - mousepos.x,
      y: mousePosCache.y - mousepos.y,
    };
    mousePosCache = { x: mousepos.x, y: mousepos.y };

    this.animatableProperties.tx.current = Math.abs(
      mousepos.x - this.bounds.el.left - this.bounds.reveal.width / 2
    );

    this.animatableProperties.ty.current =
      this.mouseArea === 'up'
        ? Math.abs(mousepos.y - this.bounds.el.top)
        : Math.abs(mousepos.y - this.bounds.el.top) -
          this.bounds.reveal.height -
          32;

    this.animatableProperties.tx.previous = this.firstRAFCycle
      ? this.animatableProperties.tx.current
      : lerp(
          this.animatableProperties.tx.previous,
          this.animatableProperties.tx.current,
          this.animatableProperties.tx.amt
        );
    this.animatableProperties.ty.previous = this.firstRAFCycle
      ? this.animatableProperties.ty.current
      : lerp(
          this.animatableProperties.ty.previous,
          this.animatableProperties.ty.current,
          this.animatableProperties.ty.amt
        );

    gsap.set(this.DOM.reveal, {
      x: this.animatableProperties.tx.previous,
      y: this.animatableProperties.ty.previous,
    });

    this.firstRAFCycle = false;
    this.loopRender();
  }
}

class Menu {
  constructor(el) {
    this.DOM = { el: el };
    this.DOM.menuItems = this.DOM.el.querySelectorAll('.member-item');
    this.animatableProperties = {
      tx: { previous: 0, current: 0, amt: 0.08 },
      ty: { previous: 0, current: 0, amt: 0.08 },
    };
    this.menuItems = [];
    [...this.DOM.menuItems].forEach((item, pos) =>
      this.menuItems.push(new MenuItem(item, pos, this.animatableProperties))
    );
  }
}
