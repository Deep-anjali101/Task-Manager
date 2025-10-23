import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { TaskFormComponent } from './components/task-form.component';
import { TaskListComponent } from './components/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    DashboardComponent, 
    TaskFormComponent, 
    TaskListComponent
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>🚀 Task Manager Pro</h1>
        <p>Stay organized and boost your productivity</p>
      </div>
      
      <app-dashboard></app-dashboard>
      <app-task-form></app-task-form>
      <app-task-list></app-task-list>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'task-manager';
}