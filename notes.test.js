const { addTask, deleteOldTasks, checkReminders, changePriority,searchTasks, filterTasksByPriority, filterTasksByDueDate } = require('./notes');  // assuming the file is named 'notes.js'

describe('Todo functionalities', () => {
  const baseDate = new Date(2020, 0, 1); // January 1, 2020
  jest.useFakeTimers().setSystemTime(baseDate);
  const tasks = [];
  beforeEach(() => {
    // Setup some tasks for testing
    addTask(tasks, 'Complete the project documentation', 'High', 30, 10);
    addTask(tasks, 'Prepare presentation slides', 'Medium', 7, 5);
    addTask(tasks, 'Call project manager', 'Low', 3, 1);
    addTask(tasks, 'Buy groceries for the week', 'Low', 10, 3);
    addTask(tasks, 'Project review meeting', 'High', 5, 2);
  });

  // Test basic task addition and validation
  it('adds a task to the list', () => {
    const tasks = [];
    const task = 'Learn Node.js';
    const result = addTask(tasks, task);
    expect(result.some(t => t.task === task)).toBeTruthy();
  });

  it('does not add an empty task to the list', () => {
    const tasks = [];
    const task = '';
    addTask(tasks, task);
    expect(tasks).toEqual([]);
  });

  it('does not add a task that is only spaces', () => {
    const tasks = [];
    const task = '   ';
    addTask(tasks, task);
    expect(tasks).toEqual([]);
  });

  it('does not add a task that is only numeric', () => {
    const tasks = [];
    const task = '12345';
    addTask(tasks, task);
    expect(tasks).toEqual([]);
  });

  // Test task deletion and reminders
  it('adds a task with delete and reminder options', () => {
    const tasks = [];
    addTask(tasks, "Learn Jest", 'Low', 7, 3);
    expect(tasks.length).toBe(1);
    expect(tasks[0].deleteAfterDays).toBe(7);
    expect(tasks[0].reminderDays).toBe(3);
  });

  it('should delete tasks after the specified number of days', () => {
    const tasks = [
      { task: "Old Task", creationDate: new Date(2019, 11, 25), deleteAfterDays: 7 }, // December 25, 2019
    ];
    jest.advanceTimersByTime(8 * 24 * 60 * 60 * 1000); // Advance time by 8 days
    const updatedTasks = deleteOldTasks(tasks);
    expect(updatedTasks.length).toBe(0);
  });

  it('should get reminders when due', () => {
    const tasks = [
      { task: "Review PR", creationDate: new Date(2019, 11, 28), reminderDays: 5 } // December 28, 2019
    ];
    jest.advanceTimersByTime(5 * 24 * 60 * 60 * 1000); // Advance time by 5 days
    const reminders = checkReminders(tasks);
    expect(reminders).toContain("Reminder: Review PR");
  });

  it('adds a task with medium priority', () => {
    const tasks = [];
    addTask(tasks, 'Complete assignment', 'Medium');
    expect(tasks.some(t => t.task === 'Complete assignment' && t.priority === 'Medium')).toBeTruthy();
  });

  it('changes task priority from medium to high', () => {
    const tasks = [];
    addTask(tasks, 'Prepare presentation', 'Medium');
    changePriority(tasks, 'Prepare presentation', 'High');
    expect(tasks.some(t => t.task === 'Prepare presentation' && t.priority === 'High')).toBeTruthy();
  });

  it('changes task priority from high to low', () => {
    const tasks = [];
    addTask(tasks, 'Update documentation', 'High');
    changePriority(tasks, 'Update documentation', 'Low');
    expect(tasks.some(t => t.task === 'Update documentation' && t.priority === 'Low')).toBeTruthy();
  });

  it('searches tasks by text', () => {
    const results = searchTasks(tasks, 'project');
    expect(results.length).toBe(33);
    expect(results.some(t => t.task === 'Complete the project documentation')).toBeTruthy();
    expect(results.some(t => t.task === 'Call project manager')).toBeTruthy();
    expect(results.some(t => t.task === 'Project review meeting')).toBeTruthy();
  });

});
