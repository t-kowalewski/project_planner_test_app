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

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }

    this.insertBefore = insertBefore;
  }

  delete(element) {
    if (element) {
      element.remove();
    }
  }

  add(element) {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? 'afterbegin' : 'beforeend',
      element
    );
  }
}

class Tooltip extends Component {
  constructor(closeNotifierFn) {
    super();
    this.closeNotifier = closeNotifierFn;
    this.render();
  }

  closeTooltip() {
    this.delete(this.element);
    this.closeNotifier();
  }

  render() {
    const tooltipElement = document.createElement('div');
    tooltipElement.classList.add('card');
    tooltipElement.textContent = 'Dummy!';
    tooltipElement.addEventListener('click', this.closeTooltip.bind(this));
    this.element = tooltipElement;
    this.add(this.element);
  }
}

class Project {
  hasActiveTooltip = false;

  constructor(id, type, updateProjectListFunct) {
    this.id = id;
    this.updateProjectList = updateProjectListFunct;

    this.moreInfoBtn();
    this.switchBtn(type);
  }

  showMoreInfo() {
    if (this.hasActiveTooltip) {
      return;
    }
    new Tooltip(() => {
      this.hasActiveTooltip = false;
    });
    this.hasActiveTooltip = true;
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
