class Tooltip {}

class Project {
  constructor(id, updateProjectListFunct) {
    this.id = id;
    this.updateProjectList = updateProjectListFunct;

    this.moreInfoBtn();
    this.switchBtn();
  }

  moreInfoBtn() {
    const btn = document.querySelector('li button:first-of-type');
  }

  switchBtn() {
    const projectItemElement = document.getElementById(this.id);
    const btn = projectItemElement.querySelector('button:last-of-type');
    btn.addEventListener('click', this.updateProjectList);
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;

    const listItems = document.querySelectorAll(`#${type} li`);

    for (const listItem of listItems) {
      this.projects.push(
        new Project(listItem.id, this.switchProject.bind(this))
      );
    }
  }

  setSwitchHandler(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject() {
    console.log(this);
  }

  switchProject(projectId) {
    this.switchHandler(this.projects.find((p) => p.d === projectId));
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
