import { Injectable } from '@angular/core';
import { Todo, TodoDelete } from '../../shared/interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoStorageService {
  todos: (Todo|TodoDelete)[] = [];

  pushTodo(td: Todo|TodoDelete) {
    this.todos.push(td);
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  clearStorage() {
    this.todos = [];
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  loadStorage() {
    this.todos = JSON.parse(String(localStorage.getItem('todos')));
  }
}
