import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Itodo } from '../../models/todos';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { SnackBarService } from '../../services/snackbar.services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todosArr !: Itodo[];


  constructor(
    private _todoService: TodosService,
    private _matDialog: MatDialog,
    private _snackbar: SnackBarService
  ) { }

  ngOnInit(): void {
    this._todoService.fetchTodo()
      .subscribe({
        next: resp => {
          this.todosArr = resp;
        }, error: err => {
          this._snackbar.openSnackBar(err.msg);
        }
      });
  }

  trackByTodoID(index: number, todo: Itodo) {
    return todo.todoID;
  }

  onRemove(removeID: string) {
    let config = new MatDialogConfig();
    config.data = `Are you sure to remove this todoItem with id ${removeID}`;
    config.width = '400px';
    config.disableClose = true;
    let dialogRef = this._matDialog.open(GetConfirmComponent, config);
    dialogRef.afterClosed()
      .subscribe({
        next: resp => {
          if (resp) {
            this._todoService.removeTodo(removeID)
              .subscribe(resp => {
                this._snackbar.openSnackBar(resp.msg);
              })
          }
        },
        error: err => {
          this._snackbar.openSnackBar(err.msg);
        }
      })
  }

  onEdit(editTodo: Itodo) {
    this._todoService.editTodoSub$.next(editTodo)
  }

}
