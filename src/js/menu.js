class MenuDesktop {
  constructor(delay) {
    this.header = document.querySelector('.site-header');

    this.menuLinks = document.querySelectorAll(
      '.header__nav-link[data-target]'
    );

    this.subMenus = new Map();

    this.activeLink = null;
    this.activeSubmenu = null;

    this.submenuTimeout = null;
    this.delay = delay || 300;

    this.searchCloseButton = document.querySelector('.search__close');

    this.initialize();
  }

  initialize() {
    const subMenus = Array.from(document.querySelectorAll('.submenu'));
    subMenus.forEach((submenu) => {
      const submenuId = submenu.dataset.id;
      this.subMenus.set(submenuId, submenu);
    });

    this.menuLinks.forEach((menuLink) => {
      const targetId = menuLink.getAttribute('data-target');
      const targetSubmenu = this.subMenus.get(targetId);

      if (targetSubmenu && targetId !== 'search') {
        menuLink.addEventListener('mouseenter', () => {
          this.showSubmenu(menuLink, targetSubmenu);
        });

        targetSubmenu.addEventListener('mouseenter', () => {
          this.showSubmenu(menuLink, targetSubmenu);
        });

        menuLink.addEventListener('mouseleave', () => {
          this.hideSubMenu(menuLink, targetSubmenu);
        });

        targetSubmenu.addEventListener('mouseleave', () => {
          this.hideSubMenu(menuLink, targetSubmenu);
        });
      }

      if (targetId === 'search') {
        menuLink.addEventListener('click', (event) => {
          event.preventDefault();
          this.toggleSearchMenu(menuLink, targetSubmenu);
        });

        this.searchCloseButton.addEventListener('click', (event) => {
          event.preventDefault();
          this.hideSubMenu(menuLink, targetSubmenu, false);
        });
      }
    });

    this.header.addEventListener('mouseleave', () => {
      this.hideSubMenu(this.activeLink, this.activeSubmenu);
    });
  }

  showSubmenu(link, submenu) {
    clearTimeout(this.submenuTimeout);

    if (this.activeSubmenu) {
      this.activeSubmenu.classList.remove('show');
      this.activeSubmenu.setAttribute('aria-hidden', 'true');
    }

    if (this.activeLink) {
      this.activeLink.classList.remove('active');
    }

    this.activeSubmenu = submenu;
    this.activeLink = link;

    submenu.classList.add('show');
    submenu.setAttribute('aria-hidden', 'false');
    link.classList.add('active');
  }

  hideSubMenu(link, submenu, timeout = true) {
    if (submenu === null) return;

    const delay = timeout ? this.delay : 0;

    this.submenuTimeout = setTimeout(() => {
      submenu.classList.remove('show');
      submenu.setAttribute('aria-hidden', 'true');
      link.classList.remove('active');
    }, delay);
  }

  toggleSearchMenu(link, submenu) {
    if (submenu.classList.contains('show')) {
      this.hideSubMenu(link, submenu, false);
    } else {
      this.showSubmenu(link, submenu);
    }
  }
}
