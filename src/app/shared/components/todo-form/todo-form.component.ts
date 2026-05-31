import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodosService } from '../../services/todos.service';
import { SnackBarService } from '../../services/snackbar.services';
import { Itodo } from '../../models/todos';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  isInEditMode: boolean = false
  @ViewChild('todoForm') todoForm !: NgForm
  editTodoObj !: Itodo;

  constructor(
    private _todoService: TodosService,
    private _snackbar: SnackBarService
  ) { }

  ngOnInit(): void {
     this.patchEditTodo()
  }

  patchEditTodo() {
    this._todoService.editTodoSub$.subscribe({
      next: resp => {
        this.todoForm.form.patchValue(resp);
        this.isInEditMode = true;
        this.editTodoObj = resp;
      },
      error: err => {
        this._snackbar.openSnackBar(err.msg);
      }
    })
  }

  onSubmit() {
    if (this.todoForm.valid) {
      let newTodo = { ...this.todoForm.value, todoID: Date.now().toString() }
      this._todoService.addTodo(newTodo)
        .subscribe({
          next: resp => {
            this._snackbar.openSnackBar(resp.msg);
            this.todoForm.resetForm();
          },
          error: err => {
            this._snackbar.openSnackBar(err.msg);
          }
        })
    }
  }

  onUpdate() {
    let updatedTodo: Itodo = { ...this.todoForm.value, todoID: this.editTodoObj.todoID };
    this._todoService.updateTodo(updatedTodo)
      .subscribe({
        next: resp => {
          this._snackbar.openSnackBar(resp.msg);
          this.todoForm.resetForm();
          this.isInEditMode = false;
        },
        error: err => {
          this._snackbar.openSnackBar(err.msg);
        }
      })
  }

}
