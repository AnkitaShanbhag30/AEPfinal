function addTask(tasks, task, priority = 'Low', daysToDelete = null, reminderDays = null) {
    if (!task.trim() || !isNaN(task.trim())) {
      return tasks;
    }
    const taskWithMeta = {
      task: task.trim(),
      priority,
      creationDate: new Date(),
      deleteAfterDays: daysToDelete,
      reminderDays: reminderDays
    };
    tasks.push(taskWithMeta);
    return tasks;
  }
  
  function searchTasks(tasks, searchText) {
    return tasks.filter(task => task.task.toLowerCase().includes(searchText.toLowerCase()));
  }
  
  function filterTasksByPriority(tasks, priority) {
    return tasks.filter(task => task.priority === priority);
  }
  
  function filterTasksByDueDate(tasks, dueInDays) {
    const currentDate = new Date();
    return tasks.filter(task => {
      if (task.deleteAfterDays === null) return false;
      const dueDate = new Date(task.creationDate);
      dueDate.setDate(dueDate.getDate() + task.deleteAfterDays);
      const targetDate = new Date(currentDate);
      targetDate.setDate(currentDate.getDate() + dueInDays);
      return dueDate <= targetDate;
    });
  }

function changePriority(tasks, taskName, newPriority) {
const task = tasks.find(t => t.task === taskName);
if (task) {
    task.priority = newPriority;
}
return tasks;
}

function deleteOldTasks(tasks) {
const currentDate = new Date();
return tasks.filter(t => {
    if (t.deleteAfterDays === null) return true;
    const deleteDate = new Date(t.creationDate);
    deleteDate.setDate(deleteDate.getDate() + t.deleteAfterDays);
    return deleteDate > currentDate;
});
}

function checkReminders(tasks) {
const currentDate = new Date();
let reminders = [];
tasks.forEach(t => {
    if (t.reminderDays !== null) {
    const reminderDate = new Date(t.creationDate);
    reminderDate.setDate(reminderDate.getDate() + t.reminderDays);
    if (reminderDate <= currentDate) {
        reminders.push(`Reminder: ${t.task}`);
    }
    }
});
return reminders;
}

module.exports = { addTask, deleteOldTasks, checkReminders, changePriority, searchTasks, filterTasksByPriority, filterTasksByDueDate};
