import { Component, HostBinding, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {

  constructor(private tasksService: TasksService) { }
  tasksList;
  task: Task = {
    tasks_text: '',
    tasks_status: false
  };

  ngOnInit() {
    this.getTasks();
  }

//obtener las tareas de la base de datos
  getTasks() {
    this.tasksService.getTasks().subscribe(
      res => {
        this.tasksList = res;
      },
      err => console.log(err)
    );
  }

  //agregar una tarea a la lista
  addTask() {
    this.tasksService.saveTask(this.task)
      .subscribe(
        res => {
          this.ngOnInit();
          this.task.tasks_text = '';
        },
        err => console.log(err)
      );
  }
  //advertir al usuario de que el textfield esta vacio
  notify() {
    alert("El text field está vacío.");
  }

  //modificar una tarea de la lista
  updateTask(id: string, oldTask: Task) {
    const task: Task = {
      tasks_id: oldTask.tasks_id,
      tasks_status: !oldTask.tasks_status,
      tasks_text: oldTask.tasks_text
    }
    this.tasksService.updateTask(id, task)
      .subscribe(
        res => {
        },
        err => console.log(err)
      );
  }
  //borrar una tarea de la lista
  deleteTask(id: string) {
    this.tasksService.deleteTask(id)
      .subscribe(
        res => {
          this.ngOnInit();
        },
        err => console.log(err)
      );;
  }
}