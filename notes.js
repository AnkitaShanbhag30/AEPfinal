function addTask(tasks, task) {

    if (!task.trim() || !isNaN(task.trim())) {
      return tasks;
    }
    tasks.push(task.trim());
    return tasks;
  }
  
  module.exports = { addTask };
  

  