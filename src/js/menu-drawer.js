export default class Drawer {
  constructor(drawerId) {
    this.drawer = document.getElementById(drawerId);
    this.openButtons = document.querySelectorAll(
      `[data-drawer-show="${drawerId}"]`
    );
    this.closeButtons = document.querySelectorAll(
      `[data-drawer-hide="${drawerId}"]`
    );
    this.isOpen = false;
    this.backdrop = document.querySelector('.backdrop-drawer');

    this.init();
  }

  init() {
    this.openButtons.forEach((button) => {
      button.addEventListener('click', () => this.show());
    });

    this.closeButtons.forEach((button) => {
      button.addEventListener('click', () => this.hide());
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isOpen) {
        this.hide();
      }
    });
  }

  show() {
    this.drawer.classList.remove('translate-x-full');
    this.drawer.classList.add('translate-x-0');
    this.backdrop?.classList.remove('hidden');
    this.isOpen = true;
  }

  hide() {
    this.drawer.classList.remove('translate-x-0');
    this.drawer.classList.add('translate-x-full');
    this.backdrop?.classList.add('hidden');
    this.isOpen = false;
  }
}
