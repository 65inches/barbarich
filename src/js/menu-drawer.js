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
    this.backdrop = null;

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
    this.isOpen = true;
    this.addBackdrop();
  }

  hide() {
    this.drawer.classList.remove('translate-x-0');
    this.drawer.classList.add('translate-x-full');
    this.isOpen = false;
    this.removeBackdrop();
  }

  addBackdrop() {
    if (!this.backdrop) {
      this.backdrop = document.createElement('div');
      this.backdrop.setAttribute('drawer-backdrop', '');
      this.backdrop.className =
        'fixed inset-0 z-30 bg-white/80 backdrop-blur-[20px]';
      document.body.appendChild(this.backdrop);
      this.backdrop.addEventListener('click', () => this.hide());
    }
  }

  removeBackdrop() {
    if (this.backdrop) {
      this.backdrop.remove();
      this.backdrop = null;
    }
  }
}
