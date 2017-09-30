# Read Tasks

Reads a task YAML file with the following form:

```yaml
Role1:
  task1: Description for Role1's task1
  task2:
    desc: Description for Role1's task2
  task_umbrella1:
    task3:
      desc: Description for Role1's task3 under task_umbrella1
Role2:
  asap_with_deadline:
    urgency: immediate
    deadline: 2017-11-01
  unimportant:
    urgency: unimportant
  neutral_with_note:
    urgency: neutral
    notes:
      - Short note
      - |
Long *Markdown* styled note.
```

into `TaskCompleter` object.
