import { Injectable } from "@angular/core";
import { Itodo, ItodoResp } from "../models/todos";
import { Observable, of, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TodosService {
    editTodoSub$: Subject<Itodo> = new Subject<Itodo>();

    todosData1: Itodo[] = [
        {
            todoItem: "Complete Angular assignment",
            todoID: "TD101"
        },
        {
            todoItem: "Practice TypeScript interfaces",
            todoID: "TD102"
        },
        {
            todoItem: "Revise JavaScript concepts",
            todoID: "TD103"
        },
        {
            todoItem: "Create portfolio project",
            todoID: "TD104"
        },
        {
            todoItem: "Watch Angular tutorial",
            todoID: "TD105"
        }
    ];

    fetchTodo(): Observable<Itodo[]> {
        return of(this.todosData1);
    }

    addTodo(newTodo: Itodo): Observable<ItodoResp<Itodo>> {
        this.todosData1.unshift(newTodo);
        return of({
            msg: `The new TodoItem is added!!!`,
            data: newTodo
        })
    }

    removeTodo(removeID: string): Observable<ItodoResp<string>> {
        let getIndex = this.todosData1.findIndex(t => t.todoID === removeID);
        let removedITem = this.todosData1.splice(getIndex, 1);
        return of({
            msg: `The todoItem ${removedITem[0].todoItem} is removed!!!`,
            data: removeID
        })
    }

    updateTodo(updatedTodo: Itodo): Observable<ItodoResp<Itodo>> {
        let getIndex = this.todosData1.findIndex(t => t.todoID === updatedTodo.todoID);
        this.todosData1[getIndex] = updatedTodo;
        return of({
            msg: `The todoItem ${updatedTodo.todoItem} is updated successfully!!!`,
            data: updatedTodo
        })
    }

}