var yaml = require('js-yaml');
var fs = require('fs');
var Task = require('./task');


class Project {
  constructor(data, name = '') {
    this.name = name;
    this.tasks = {};
    this.projects = {};
    for (var key in data) {
      var element = data[key]
      if (key == 'subtasks') {
        for (var i = 0; i < element.length; ++i) {
          this.tasks[key] = new Task(element[i], i);
        }
      } else {
        if (Task.isTaskData(element)) {
          this.tasks[key] = new Task(element, key);
        } else {
          this.projects[key] = new Project(element, key);
        }
      }
    }
  }
  flat() {
    var tasks = {};
    var prefix = this.name + '/';
    for (var key in this.tasks) {
      var t = this.tasks[key];
      var k = prefix + t.name;
      tasks[k] = new Task(t.toData(), k);
    }
    for (var key in this.projects) {
      var projectTasks = this.projects[key].flat();
      for (var subkey in projectTasks) {
        var k = prefix + subkey;
        tasks[k] = new Task(projectTasks[subkey].toData(), k);
      }
    }
    return tasks;
  }
  flatOrderedByDeadlineAndUrgency(reverse = false) {
    var flattened = this.flat();
    var r = reverse ? -1 : 1;
    return Object.values(flattened).sort(function (a, b) {
      if (a.deadline) {
        if (b.deadline) {
          if (a.deadline < b.deadline) {
            return r * 1;
          } else if (b.deadline < a.deadline) {
            return r * -1;
          }
          return r * (a.urgencyCode() - b.urgencyCode());
        }
        return r * 1;
      } else if (b.deadline) {
        return r * -1;
      }
      return r * (a.urgencyCode() - b.urgencyCode());
    });
  }
}

Project.fromYml = function (yml_data) {
  return new this(yaml.safeLoad(yml_data));
}
Project.fromYmlFile = function (file_name) {
  return this.fromYml(fs.readFileSync(file_name, 'utf8'));
}

module.exports = Project;