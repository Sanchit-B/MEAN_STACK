import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KanbanService } from './kanban.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  task: FormGroup;
  taskList = [];
  columns = [
    {
      title: 'Backlog',
      stage: 0
    },
    {
      title: 'Open',
      stage: 1
    },
    {
      title: 'In Progress',
      stage: 2
    },
    {
      title: 'Close',
      stage: 3
    }
  ];

  constructor(
    private fb: FormBuilder,
    private taskService: KanbanService
  ) {
    this.task = fb.group({
      title: [],
      _id: [0],
      stage: [0]
    });
   }

  ngOnInit() {
    this.getTasks();
  }

  createTask() {
    if (!this.task.get('title').value) return;

    if (this.taskList.length > 0) {
      this.taskList = this.sortAsc(this.taskList);
      let nextId = this.taskList[this.taskList.length - 1]._id;
      this.task.get('_id').setValue(++nextId);
    }

    this.taskList.push(this.task.value);

    this.registerOrUpdateTask(this.task.value, false);
    this.task.get('title').setValue("");
  }

  sortAsc(sortList = []) {
    return Object.values(sortList).sort((t1, t2) => {
      return t1 - t2;
    });
  }

  moveBackward(task) {
    --task.stage;
    this.registerOrUpdateTask(task, true);
  }

  moveForward(task) {
    ++task.stage;
    this.registerOrUpdateTask(task, true);
  }

  delete(idx) {
    const id = this.taskList[idx]._id;
    this.deleteTaskById(id);
  }

  async registerOrUpdateTask(task, update) {
    let resp = await this.taskService.registerOrUpdateTask([task, update]);
    if (resp) {
      console.log(resp);
    }
  }

  async getTasks() {
    let allTasks: any = await this.taskService.getTasks();
    console.log(allTasks);
    if (Array.isArray(allTasks)) {
      console.log(Array.isArray(allTasks));
      this.taskList = allTasks;
    }
  }

  async deleteTaskById(id) {
    let resp = await this.taskService.deleteTaskById(id);
    if (resp) {
      const idx = this.taskList.findIndex(task => task._id === id);
      this.taskList.splice(idx, 1);
    }
  }

}
