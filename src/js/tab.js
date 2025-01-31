export default class Tab {
  constructor(container) {
    this.container = container;
    this.tabHeaders = container.querySelectorAll('button[role="tab"]');

    this.tabContents = container.querySelectorAll('div[role="tabpanel"]');

    this.tabHeaders.forEach((btn) => {
      const target = btn.getAttribute('aria-controls');
      btn.addEventListener('click', () => this.show(target));
    });
  }

  show(targetId) {
    this.tabHeaders.forEach((btn) => {
      btn.setAttribute('aria-selected', 'false');
    });

    this.tabContents.forEach((panel) => {
      panel.classList.add('hidden');
    });

    const targetButton = Array.from(this.tabHeaders).find(
      (btn) => btn.getAttribute('aria-controls') === targetId
    );
    const targetPanel = this.container.querySelector(`#${targetId}`);

    console.log(targetButton, targetPanel);

    if (targetButton && targetPanel) {
      targetButton.setAttribute('aria-selected', 'true');

      targetPanel.classList.remove('hidden');
    }
  }
}
