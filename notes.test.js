const { addTask } = require('./notes');

describe('addTask', () => {
  it('adds a task to the list', () => {
    const tasks = [];
    const task = 'Learn Node.js';
    expect(addTask(tasks, task)).toContain(task);
  });

  it('does not add an empty task to the list', () => {
    const tasks = [];
    const task = '';
    addTask(tasks, task);
    expect(tasks).not.toContain(task);
  });

  it('does not add a task that is only spaces', () => {
    const tasks = [];
    const task = '   ';
    addTask(tasks, task);
    expect(tasks).not.toContain(task);
  });

});
