import { Component } from './Component.js';

export class Tooltip extends Component {
  constructor(closeNotifierFn, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFn;
    this.text = text;
    this.render();
  }

  closeTooltip() {
    this.delete(this.element);
    this.closeNotifier();
  }

  render() {
    const tooltipElement = document.createElement('div');
    tooltipElement.classList.add('card');
    const tooltipTemplate = document.getElementById('tooltip');
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector('p').textContent = this.text;
    tooltipElement.append(tooltipBody);

    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.clientHeight;
    const hostElScroll = this.hostElement.parentElement.scrollTop;

    const x = hostElPosLeft + 20;
    const y = hostElPosTop + hostElHeight - 10 - hostElScroll;

    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = x + 'px'; // will be a string for example 10px
    tooltipElement.style.top = y + 'px';

    tooltipElement.addEventListener('click', this.closeTooltip.bind(this));
    this.element = tooltipElement;
    this.add(this.element);
  }
}
