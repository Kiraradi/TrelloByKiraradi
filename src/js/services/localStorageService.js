export default class SaveToLocalStorage {
  static pushTask(column, task) {
    const tasks = this.getTasks(column);
    tasks.push(task);
    localStorage.setItem(column, JSON.stringify(tasks));
  }

  static getTasks(column) {
    const tasksString = localStorage.getItem(column);
    const tasks = tasksString ? JSON.parse(tasksString) : [];
    return tasks;
  }
}
