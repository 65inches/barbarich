class MenuMobile {
  constructor(selector) {
    this.el = document.querySelector(selector);
    this.btn = document.querySelector('.menu-mobile-button');

    this.btn.addEventListener('click', this.handleButtonClick.bind(this));

    this.opened = false;

    this.panels = this.el.querySelectorAll('.menu-panel');
    this.buttons = this.el.querySelectorAll('.menu-listitem__btn');

    this.navBar = this.el.querySelector('.menu-navbar');
    this.prevButtons = this.el.querySelectorAll('.menu-btn--prev');
    this.prevButtons.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        this.handlePrevButtonClick(event);
      });
    });

    this.currentPanels = [];

    this._initAnchors();
  }

  handleButtonClick() {
    this.opened = !this.opened;
    this.el.classList.toggle('menu--open');
    this.btn.setAttribute('aria-expanded', this.opened.toString());
    document.body.classList.toggle('menu-opened');

    setTimeout(() => {
      this.closePanel(this.currentPanels);
    }, 300);
  }

  openPanel(target) {
    const submenu = this.el.querySelector(`${target}`);
    if (submenu) {
      submenu.classList.add('menu-panel--opened');
      this.currentPanels.push(submenu);
      this.currentPanels.at(-1).setAttribute('aria-hidden', 'false');
    }
  }

  closePanel(submenu) {
    if (!submenu) return;

    if (Array.isArray(submenu)) {
      // Close each panel in the array
      submenu.forEach((panel) => {
        panel.classList.remove('menu-panel--opened');
        panel.setAttribute('aria-hidden', 'true');
      });
      // Clear all closed panels from currentPanels
      this.currentPanels = [];
    } else {
      // Single panel case
      submenu.classList.remove('menu-panel--opened');
      this.currentPanels.at(-1)?.setAttribute('aria-hidden', 'true');
      this.currentPanels.pop();
    }
  }

  _initAnchors() {
    this.buttons.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target.getAttribute('href');
        if (target) {
          this.openPanel(target);
        }
      });
    });
  }

  handlePrevButtonClick(event) {
    event.preventDefault();
    this.closePanel(this.currentPanels.at(-1));
  }
}

export default MenuMobile;
