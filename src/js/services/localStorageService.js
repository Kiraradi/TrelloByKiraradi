const taskArray = 'taskArray';

export default class localStorageService {
  static pushTask(task) {
    const tasks = this.getTasks(taskArray);
    tasks.push(task);
    localStorage.setItem(taskArray, JSON.stringify(tasks));
  }

  static getTasks() {
    const tasksString = localStorage.getItem(taskArray);
    const tasks = tasksString ? JSON.parse(tasksString) : [];
    return tasks;
  }

  static setTasks(tasks) {
    localStorage.setItem(taskArray, JSON.stringify(tasks));
  }
}
