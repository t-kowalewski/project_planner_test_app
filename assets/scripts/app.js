class DOMHelper {
  static clearEventListeners(element) {
    const newElement = element.cloneNode(true);
    element.replaceWith(newElement);
    return newElement;
  }

  static moveElement(elementID, newDestinationSelector) {
    const element = document.getElementById(elementID);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
  }
}

class Tooltip {}

class Project {
  constructor(id, type, updateProjectListFunct) {
    this.id = id;
    this.updateProjectList = updateProjectListFunct;

    this.moreInfoBtn();
    this.switchBtn(type);
  }

  moreInfoBtn() {
    // const btn = document.querySelector('li button:first-of-type');
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

class ProjectList {
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

class App {
  static init() {
    const activeProjects = new ProjectList('active-projects');
    const finishedProjects = new ProjectList('finished-projects');

    activeProjects.setSwitchHandler(
      finishedProjects.addProject.bind(finishedProjects)
    );
    finishedProjects.setSwitchHandler(
      activeProjects.addProject.bind(activeProjects)
    );
  }
}

App.init();
