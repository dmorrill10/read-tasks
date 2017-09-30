var yaml = require('js-yaml');
var fs = require('fs');

class Task {
  constructor(data, name = '/') {
    this.name = name;
    this.urgency = 'neutral';
    this.deadline = null;
    this.notes = [];
    this.desc = name;
    if (typeof data === 'string') {
      this.desc = data;
    } else {
      if ('desc' in data) {
        this.desc = data.desc;
      }
      if ('urgency' in data) {
        this.urgency = data.urgency;
      }
      if ('deadline' in data) {
        this.deadline = data.deadline;
      }
      if ('notes' in data) {
        this.notes = data.notes;
      }
    }
  }
}

Task.isTaskData = function (data) {
  return (
    (typeof data === 'string') ||
    ('desc' in data) ||
    ('urgency' in data) ||
    ('deadline' in data) ||
    ('notes' in data)
  );
}

module.exports = Task;
