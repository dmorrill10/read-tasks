#!/usr/bin/env node

var Project = require('../lib/project');
console.info(`Reading "${process.argv[2]}"\n`)
projects = Project.fromYmlFile(process.argv[2]);
var tasks = projects.flatOrderedByDeadlineAndUrgency();
for (var key in tasks) {
  console.log(tasks[key].toData());
}