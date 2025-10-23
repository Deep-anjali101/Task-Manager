import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h3>Add New Task</h3>
      <form (ngSubmit)="onSubmit()" #taskForm="ngForm">
        <div class="form-group">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Task title"
            [(ngModel)]="newTask.title"
            name="title"
            required>
        </div>
        
        <div class="form-group">
          <textarea 
            class="form-control" 
            placeholder="Task description"
            [(ngModel)]="newTask.description"
            name="description"
            rows="3"></textarea>
        </div>
        
        <div class="form-group">
          <select class="form-control" [(ngModel)]="newTask.priority" name="priority">
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>
        
        <div class="form-group">
          <input 
            type="date" 
            class="form-control"
            [(ngModel)]="dueDateString"
            name="dueDate">
        </div>
        
        <button type="submit" class="btn btn-primary" [disabled]="!taskForm.valid">
          Add Task
        </button>
      </form>
    </div>
  `
})
export class TaskFormComponent {
  newTask = {
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    completed: false
  };
  
  dueDateString = '';

  constructor(private taskService: TaskService) {}

  onSubmit() {
    if (this.newTask.title.trim()) {
      this.taskService.addTask({
        ...this.newTask,
        dueDate: this.dueDateString ? new Date(this.dueDateString) : new Date()
      });
      
      this.newTask = {
        title: '',
        description: '',
        priority: 'medium',
        completed: false
      };
      this.dueDateString = '';
    }
  }
}