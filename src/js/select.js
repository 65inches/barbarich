export default class Select {
  constructor(HTMLElement) {
    this.select = HTMLElement;
    this.wrapper = this.select.closest('.gform_wrapper');
    this.input = this.select.querySelector('input');
    this.hiddenSelect = document.getElementById(
      'input_' + this.select.getAttribute('data-id')
    );
    this.listOfOptions = Array.from(this.select.querySelectorAll('.option'));
    this.body = document.body;

    // if (this.wrapper.classList.contains("gform_validation_error")) {
    // 	this.input.value = this.hiddenSelect.value;
    // 	this.markSelectedOption();
    // }

    this.toggleSelect = this.toggleSelect.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.closeSelectFromOutside = this.closeSelectFromOutside.bind(this);

    this.initEventListeners();
  }

  markSelectedOption() {
    this.listOfOptions.forEach((option) => {
      option.classList.remove('selected');
    });

    const matchingOption = this.listOfOptions.find(
      (option) => option.textContent === this.hiddenSelect.value
    );
    if (matchingOption) {
      matchingOption.classList.add('selected');
    }
  }

  toggleSelect(event) {
    event.stopPropagation();
    this.closeAllOtherSelects();
    this.select.classList.toggle('opened');
  }

  closeAllOtherSelects() {
    const allSelects = document.querySelectorAll('.select');
    allSelects.forEach((otherSelect) => {
      if (otherSelect !== this.select) {
        otherSelect.classList.remove('opened');
      }
    });
  }

  selectOption(event) {
    this.listOfOptions.forEach((option) => {
      option.classList.remove('selected');
    });

    const selectedOptionText = event.currentTarget.textContent;
    event.currentTarget.classList.toggle('selected');
    this.input.value = selectedOptionText;
    this.hiddenSelect.value = selectedOptionText;
    const changeEvent = new Event('change', { bubbles: true }); // Ensure it bubbles if you need to catch it higher up
    this.hiddenSelect.dispatchEvent(changeEvent);
  }

  closeSelectFromOutside() {
    if (this.select.classList.contains('opened')) {
      this.select.classList.remove('opened');
    }
  }

  initEventListeners() {
    this.body.addEventListener('click', this.closeSelectFromOutside);
    this.listOfOptions.forEach((option) => {
      option.addEventListener('click', this.selectOption);
    });
    this.select.addEventListener('click', this.toggleSelect);
  }
}
