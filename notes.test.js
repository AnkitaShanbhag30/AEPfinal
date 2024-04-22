const { addTask } = require('./notes');

describe('addTask', () => {
  it('adds a task to the list', () => {
    const tasks = [];
    const task = 'Learn Node.js';
    expect(addTask(tasks, task)).toContain(task);
  });
});