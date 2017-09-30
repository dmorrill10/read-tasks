describe('Project', () => {
  var Project = require('../lib/project');
  var Task = require('../lib/task');

  it('can be created with a default name', () => {
    var patient = new Project({
      task1: 'Description for task1'
    });
    expect(patient.projects).toEqual({});
    expect(patient.tasks).toEqual({
      task1: new Task('Description for task1', 'task1')
    });
  });

  it('can be nested', () => {
    var patient = new Project({
      subproject1: {
        task1: 'Description for subproject1 task1'
      },
      task1: 'Description for task1'
    });
    expect(patient.projects).toEqual({
      subproject1: new Project({
          task1: 'Description for subproject1 task1'
        },
        'subproject1'
      )
    });
    expect(patient.tasks).toEqual({
      task1: new Task('Description for task1', 'task1')
    });
  });
});
