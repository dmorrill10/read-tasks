describe('Task', () => {
  var Task = require('../lib/task');

  it('can be created with a default name', () => {
    var patient = new Task('Description for task1');
    expect(patient.name).toBe('');
    expect(patient.desc).toBe('Description for task1');
    expect(patient.deadline).toBe(null);
    expect(patient.urgency).toBe('neutral');
    expect(patient.notes).toEqual([]);
    expect(patient.done).toBe(false);
  });
  it('can be marked as done with an "x" prefix', () => {
    var patient = new Task('x Description for task1');
    expect(patient.name).toBe('');
    expect(patient.desc).toBe('Description for task1');
    expect(patient.deadline).toBe(null);
    expect(patient.urgency).toBe('neutral');
    expect(patient.notes).toEqual([]);
    expect(patient.done).toBe(true);
  });
});