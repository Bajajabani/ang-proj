import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo, TodoDelete } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly http = inject(HttpClient);
  readonly baseUrl = 'https://dummyjson.com/todos';

  getTodo(id: number) {
    return this.http.get<Todo>(`${this.baseUrl}/${id}`);
  }

  getRandomTodo() {
    return this.http.get<Todo>(`${this.baseUrl}/random`);
  }

  addTodo(td: string, comp: boolean, ui: number) {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Todo>(`${this.baseUrl}/add`, JSON.stringify({
      todo: td,
      completed: comp,
      userId: ui,
    }), { headers });
  }

  updateTodo(id: number, td: string | null = null, comp: boolean | null = null, ui: number | null = null) {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const compIs = comp !== null;
    let body = `
    {
      ${td ? '"todo": ' + JSON.stringify(td) : ''}${td && (compIs || ui) ? ',' : ''}
      ${compIs ? '"completed": ' + String(comp) : ''}${compIs && ui ? ',' : ''}
      ${ui ? '"userId": ' + JSON.stringify(ui) : ''}
    }`;

    return this.http.put<Todo>(`${this.baseUrl}/${id}`, body, { headers });
  }

  deleteTodo(id: number) {
    return this.http.delete<TodoDelete>(`${this.baseUrl}/${id}`);
  }
}
