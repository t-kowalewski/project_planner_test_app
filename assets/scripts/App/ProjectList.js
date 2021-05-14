import { Project } from './Project.js';
import { DOMHelper } from '../Utility/DOMHelper.js';

export class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;

    const listItems = document.querySelectorAll(`#${type} li`);

    for (const listItem of listItems) {
      this.projects.push(
        new Project(
          listItem.id,
          this.type,
          this.switchProject.bind(this, listItem.id)
        )
      );
    }

    this.connectDrop();
  }

  connectDrop() {
    const list = document.querySelector(`#${this.type} ul`);

    list.addEventListener('dragenter', (event) => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        list.parentElement.classList.add('droppable');
        event.preventDefault();
      }
    });

    list.addEventListener('dragover', (event) => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
      }
    });

    list.addEventListener('dragleave', (event) => {
      if (
        event.relatedTarget.closest &&
        event.relatedTarget.closest(`#${this.type} ul`) !== list
      ) {
        list.parentElement.classList.remove('droppable');
      }
    });

    list.addEventListener('drop', (event) => {
      event.preventDefault(); //not required for Chrome

      const projectId = event.dataTransfer.getData('text/plain');
      if (this.projects.find((project) => project.id === projectId)) {
        list.parentElement.classList.remove('droppable');
        return;
      }

      document
        .getElementById(projectId)
        .querySelector('button:last-child')
        .click();

      list.parentElement.classList.remove('droppable');
    });
  }

  setSwitchHandler(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type} ul`);

    project.update(this.switchProject.bind(this, project.id), this.type);
  }

  switchProject(projectId) {
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}
