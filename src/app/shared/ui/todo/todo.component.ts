import { Component, Input } from '@angular/core';
import { Todo, TodoDelete } from '../../interfaces/todo';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @Input() todo: Todo | TodoDelete | null = null;

  isCompleted() {
    if (this.todo?.completed) {
      return 'completed';
    }
    else {
      return 'not completed'
    }
  }

  isDeleted() {
    if (this.todo) {
      if ('isDeleted' in this.todo)
      {
        return this.todo.isDeleted;
      }
    }
    return false;
  }

  getDeleteDate() {
    if (this.todo) {
      if ('deletedOn' in this.todo)
      {
        return this.todo.deletedOn;
      }
    }
    return new Date();
  }
}
