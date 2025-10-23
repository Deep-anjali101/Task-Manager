import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h3>Tasks</h3>
      <div *ngFor="let task of tasks$ | async" class="task-item" [class.completed]="task.completed">
        <div>
          <h4>{{ task.title }}</h4>
          <p>{{ task.description }}</p>
          <small>
            Priority: <span [style.color]="getPriorityColor(task.priority)">{{ task.priority }}</span> | 
            Due: {{ task.dueDate | date:'shortDate' }}
          </small>
        </div>
        <div class="task-actions">
          <button 
            class="btn" 
            [class.btn-success]="!task.completed"
            [class.btn-primary]="task.completed"
            (click)="toggleComplete(task.id)">
            {{ task.completed ? 'Undo' : 'Complete' }}
          </button>
          <button class="btn btn-danger" (click)="deleteTask(task.id)">
            Delete
          </button>
        </div>
      </div>
      
      <div *ngIf="(tasks$ | async)?.length === 0" style="text-align: center; color: #6b7280; padding: 40px;">
        No tasks yet. Add your first task above!
      </div>
    </div>
  `
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks();
  }

  ngOnInit() {}

  toggleComplete(id: number) {
    this.taskService.toggleComplete(id);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  }
}