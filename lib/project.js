var yaml = require('js-yaml');
var fs = require('fs');
var Task = require('./task');


class Project {
  constructor(data, name = '/') {
    this.name = name;
    this.tasks = {};
    this.projects = {};
    for (var key in data) {
      var element = data[key]
      if (Task.isTaskData(element)) {
        this.tasks[key] = new Task(element, key);
      } else {
        this.projects[key] = new Project(element, key);
      }
    }
  }
}

Project.fromYml = function (yml_data) {
  return new Project(yaml.safeLoad(yml_data));
}
Project.fromYmlFile = function (file_name) {
  return this.fromYml(fs.readFileSync(file_name, 'utf8'));
}

module.exports = Project;
