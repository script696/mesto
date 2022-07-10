class Section {
  constructor({renderer, cardsContainerSelector}) {
    this._renderer = renderer;
    this._container = document.querySelector(cardsContainerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  rendererItems(items, userData) {
    items.forEach(item => {
      this._renderer(item, userData)
    });
  }
}

export default Section