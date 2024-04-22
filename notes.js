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

module.exports = { addTask, deleteOldTasks, checkReminders, changePriority };
