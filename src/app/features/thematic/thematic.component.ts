import { Component, OnInit, inject } from '@angular/core';
import { Todo, TodoDelete } from '../../shared/interfaces/todo';
import { TodoStorageService } from '../../shared/services/todo-storage.service';
import { TodoComponent } from '../../shared/ui/todo/todo.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-thematic',
  standalone: true,
  imports: [TodoComponent, MatButtonModule],
  templateUrl: './thematic.component.html',
  styleUrl: './thematic.component.scss'
})
export default class ThematicComponent implements OnInit{
  private readonly todoStorageService = inject(TodoStorageService);
  todos: (Todo|TodoDelete)[] = [];

  ngOnInit(): void {
    this.todoStorageService.loadStorage();
    this.todos = this.todoStorageService.todos;
  }

  clear() {
    this.todoStorageService.clearStorage();
    this.todos = this.todoStorageService.todos;
  }
}
