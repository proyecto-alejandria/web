import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface ErrorDialogConfiguration {

  title: string;

  description?: string;

  errors: string[];

};


@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
})
export class ErrorDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public config: ErrorDialogConfiguration,
  ) { }

  ngOnInit(): void {
  }

}
