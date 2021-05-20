import { ProjectList } from './App/ProjectList.js';

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
    analyticsScript.src = 'assets/scripts/Utility/Analytics.js';
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

App.init();
