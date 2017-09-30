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
  it('can flatten a nested task list', () => {
    var patient = new Project({
      subproject1: {
        task1: 'Description for subproject1 task1'
      },
      task1: 'Description for task1'
    });
    expect(patient.flat()).toEqual({
      '/task1': new Task('Description for task1', '/task1'),
      '/subproject1/task1': new Task(
        'Description for subproject1 task1',
        '/subproject1/task1'
      )
    });
  });
  it('can flatten and sort, according to deadline and urgency, a nested task list', () => {
    var patient = new Project({
      unimportant_task: {
        urgency: 'unimportant'
      },
      unimportant_task_w_early_deadline: {
        urgency: 'unimportant',
        deadline: new Date('2017-10-01')
      },
      unimportant_task_w_late_deadline: {
        urgency: 'unimportant',
        deadline: new Date('2017-10-02')
      },
      neutral_task: 'Description for neutral_task',
      subproject1: {
        neutral_task_w_early_deadline: {
          deadline: new Date('2017-10-01')
        },
        neutral_task_w_late_deadline: {
          deadline: new Date('2017-10-02')
        },
      },
      asap_task: {
        urgency: 'immediate'
      },
      asap_task_w_early_deadline: {
        urgency: 'immediate',
        deadline: new Date('2017-10-01')
      },
      asap_task_w_late_deadline: {
        urgency: 'immediate',
        deadline: new Date('2017-10-02')
      }
    });
    expect(patient.flatOrderedByDeadlineAndUrgency()).toEqual([
      new Task({
          desc: 'asap_task_w_early_deadline',
          urgency: 'immediate',
          deadline: new Date('2017-10-01')
        },
        '/asap_task_w_early_deadline'
      ),
      new Task({
          desc: 'neutral_task_w_early_deadline',
          deadline: new Date('2017-10-01')
        },
        '/subproject1/neutral_task_w_early_deadline'
      ),
      new Task({
          desc: 'unimportant_task_w_early_deadline',
          urgency: 'unimportant',
          deadline: new Date('2017-10-01')
        },
        '/unimportant_task_w_early_deadline'
      ),
      new Task({
          desc: 'asap_task_w_late_deadline',
          urgency: 'immediate',
          deadline: new Date('2017-10-02')
        },
        '/asap_task_w_late_deadline'
      ),
      new Task({
          desc: 'neutral_task_w_late_deadline',
          deadline: new Date('2017-10-02')
        },
        '/subproject1/neutral_task_w_late_deadline'
      ),
      new Task({
          desc: 'unimportant_task_w_late_deadline',
          urgency: 'unimportant',
          deadline: new Date('2017-10-02')
        },
        '/unimportant_task_w_late_deadline'
      ),
      new Task({
          desc: 'asap_task',
          urgency: 'immediate'
        },
        '/asap_task'
      ),
      new Task(
        'Description for neutral_task',
        '/neutral_task'
      ),
      new Task({
          desc: 'unimportant_task',
          urgency: 'unimportant'
        },
        '/unimportant_task'
      )
    ]);
  });
});
