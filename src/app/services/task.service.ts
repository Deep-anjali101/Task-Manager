import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Complete Angular project',
      description: 'Build a task management application with Angular',
      completed: false,
      priority: 'high',
      dueDate: new Date('2024-12-01'),
      createdAt: new Date()
    },
    {
      id: 2,
      title: 'Review code',
      description: 'Review pull requests from team members',
      completed: true,
      priority: 'medium',
      dueDate: new Date('2024-11-15'),
      createdAt: new Date()
    }
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  public tasks$ = this.tasksSubject.asObservable();

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>): void {
    const newTask: Task = {
      ...task,
      id: Math.max(...this.tasks.map(t => t.id), 0) + 1,
      createdAt: new Date()
    };
    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]);
  }

  updateTask(id: number, updates: Partial<Task>): void {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updates };
      this.tasksSubject.next([...this.tasks]);
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next([...this.tasks]);
  }

  toggleComplete(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.tasksSubject.next([...this.tasks]);
    }
  }

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const highPriority = this.tasks.filter(t => t.priority === 'high' && !t.completed).length;
    
    return { total, completed, pending, highPriority };
  }
}