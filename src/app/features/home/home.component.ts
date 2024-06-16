import { Component, inject } from '@angular/core';
import { Todo, TodoDelete } from '../../shared/interfaces/todo';
import { TodoService } from '../../shared/services/todo.service';
import { TodoComponent } from '../../shared/ui/todo/todo.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { tap } from 'rxjs';
import { TodoStorageService } from '../../shared/services/todo-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, TodoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
  private readonly todoService = inject(TodoService);
  private readonly todoStorageService = inject(TodoStorageService);
  
  todo: Todo | TodoDelete | null = null;

  getById(el: HTMLInputElement) {
    const inp = this.elToId(el);
    if (inp) {
      this.todoService.getTodo(inp).pipe(
        tap((response) => {
          this.todo = response;
          this.todoStorageService.pushTodo(response);
        })
      ).subscribe();
    }
  }

  getRand() {
    this.todoService.getRandomTodo().pipe(
      tap((response) => {
        this.todo = response;
        this.todoStorageService.pushTodo(response);
      })
    ).subscribe();
  }

  addTodo(todoEl: HTMLTextAreaElement, compEl: HTMLSelectElement, uiEl: HTMLInputElement) {
    if (todoEl.value === '' ) { return; }
    if (compEl.value !== 'true' && compEl.value !== 'false') { return; }
    if (isNaN(Number(uiEl.value)) || Number(uiEl.value) > 208) { return; }

    this.todoService.addTodo(todoEl.value, compEl.value === 'true', Number(uiEl.value)).pipe(
      tap((response) => {
        this.todo = response;
        this.todoStorageService.pushTodo(response);
      })
    ).subscribe();
  }
  
  updateTodo(el: HTMLInputElement, todoEl: HTMLTextAreaElement, compEl: HTMLSelectElement, uiEl: HTMLInputElement) {
    const inp = this.elToId(el);
    if (inp) {
      this.todoService.updateTodo(inp,
        todoEl.value === '' ? null : todoEl.value,
        compEl.value !== 'true' && compEl.value !== 'false' ? null : compEl.value === 'true',
        isNaN(Number(uiEl.value)) || Number(uiEl.value) > 208 ? null : Number(uiEl.value)
        ).pipe(
        tap((response) => {
          this.todo = response;
          this.todoStorageService.pushTodo(response);
        })
      ).subscribe();
    }
  }

  deleteId(el: HTMLInputElement) {
    const inp = this.elToId(el);
    if (inp) {
      this.todoService.deleteTodo(inp).pipe(
        tap((response) => {
          this.todo = response;
          this.todoStorageService.pushTodo(response);
        })
      ).subscribe();
    }
  }

  elToId(el: HTMLInputElement) {
    if (el !== null && el.value !== null && el.value !== '') {
      const inp = Number(el.value);
      if (!isNaN(inp) && inp < 255) {
        return inp;
      }
    }
    return null;
  }
}
