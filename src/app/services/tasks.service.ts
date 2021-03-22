import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  API_URI = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) { };

    getTasks(){
      return this.http.get(`${this.API_URI}`);
    }

    saveTask(task: Task){
      return this.http.post(`${this.API_URI}`, task);
    }

    deleteTask(id: string){
      return this.http.delete(`${this.API_URI}:${id}`);
    }

    updateTask(id : any, newTask: any){
      return this.http.put(`${this.API_URI}:${id}`, newTask);
    }

}
