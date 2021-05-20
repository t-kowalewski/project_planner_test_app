export class DOMHelper {
  static clearEventListeners(element) {
    const newElement = element.cloneNode(true);
    element.replaceWith(newElement);
    return newElement;
  }

  static moveElement(elementID, newDestinationSelector) {
    const element = document.getElementById(elementID);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
