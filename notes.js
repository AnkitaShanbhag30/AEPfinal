function addTask(tasks, task) {
    // Trim the task to remove spaces from both ends and check if it's empty or numeric
    if (!task.trim() || !isNaN(task.trim())) {
      return tasks;
    }
    tasks.push(task.trim());
    return tasks;
  }
  
  module.exports = { addTask };
  

  