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
    element.scrollIntoView({ behavior: 'smooth' });
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

class Project {
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

    // document
    //   .getElementById('start-analytics-btn')
    //   .addEventListener('click', this.startAnalytics);

    // Analytics - Timer Sandbox
    // const timerId = setTimeout(this.startAnalytics, 3000); //3 sec in ms

    // document
    //   .getElementById('stop-analytics-btn')
    //   .addEventListener('click', () => {
    //     clearTimeout(timerId);
    //   });
  }

  static startAnalytics() {
    const analyticsScript = document.createElement('script');
    analyticsScript.src = 'assets/scripts/analytics.js';
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

App.init();
