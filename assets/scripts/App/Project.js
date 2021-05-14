import { Tooltip } from './Tooltip.js';
import { DOMHelper } from '../Utility/DOMHelper.js';

export class Project {
  hasActiveTooltip = false;

  constructor(id, type, updateProjectListFunct) {
    this.id = id;
    this.updateProjectList = updateProjectListFunct;

    this.moreInfoBtn();
    this.switchBtn(type);
    this.connectDrag();
  }

  showMoreInfo() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    const tooltipText = projectElement.dataset.extraInfo;

    // projectElement.dataset.testInfo = 'some additional info';

    new Tooltip(
      () => {
        this.hasActiveTooltip = false;
      },
      tooltipText,
      this.id
    );
    this.hasActiveTooltip = true;
  }

  connectDrag() {
    const item = document.getElementById(this.id);

    item.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
    });

    item.addEventListener('dragend', (event) => {
      console.log(event);
    });
  }

  moreInfoBtn() {
    const projectItemElement = document.getElementById(this.id);
    const btn = projectItemElement.querySelector('button:first-of-type');
    btn.addEventListener('click', this.showMoreInfo.bind(this));
  }

  switchBtn(type) {
    const projectItemElement = document.getElementById(this.id);
    let btn = projectItemElement.querySelector('button:last-of-type');
    btn = DOMHelper.clearEventListeners(btn);
    btn.textContent = type === 'active-projects' ? 'Finish' : 'Active';
    btn.addEventListener('click', this.updateProjectList);
  }

  update(updateProjectListFunct, type) {
    this.updateProjectList = updateProjectListFunct;
    this.switchBtn(type);
  }
}
