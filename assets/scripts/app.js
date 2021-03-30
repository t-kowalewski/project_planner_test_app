class Tooltip {}

class Project {
  constructor(id) {
    this.id = id;

    this.moreInfoBtn();
    this.switchBtn();
  }

  moreInfoBtn() {
    const btn = document.querySelector('li button:first-of-type');
  }

  switchBtn() {
    const projectItemElement = document.getElementById(this.id);
    const btn = projectItemElement.querySelector('button:last-of-type');
    btn.addEventListener('click');
  }
}

class ProjectList {
  projects = [];

  constructor(type, switchHandlerFunction) {
    this.type = type;
    this.switchHandler = switchHandlerFunction;

    const listItems = document.querySelectorAll(`#${type} li`);

    for (const listItem of listItems) {
      this.projects.push(new Project(listItem.id));
    }
  }

  addProject() {}

  switchProject(projectId) {
    this.switchHandler(this.projects.find((p) => p.d === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjects = new ProjectList('active-projects');
    const finishedProjects = new ProjectList('finished-projects');
  }
}

App.init();
