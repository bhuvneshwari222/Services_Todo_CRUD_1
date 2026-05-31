import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable({
    providedIn: 'root'
})
export class SnackBarService{

    constructor(
        private _matSnackBar : MatSnackBar
    ){}

    openSnackBar(msg: string){
        this._matSnackBar.open(msg, 'Close', {
            data: msg,
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        })
    }
}