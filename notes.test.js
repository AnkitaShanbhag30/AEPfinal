const { addTask, deleteOldTasks, checkReminders } = require('./notes');

describe('Todo functionalities', () => {
  const baseDate = new Date(2020, 0, 1); // January 1, 2020
  jest.useFakeTimers().setSystemTime(baseDate);

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

  it('adds a task with delete and reminder options', () => {
    const tasks = [];
    addTask(tasks, "Learn Jest", 7, 3);
    expect(tasks.length).toBe(1);
    expect(tasks[0].deleteAfterDays).toBe(7);
    expect(tasks[0].reminderDays).toBe(3);
  });

});
