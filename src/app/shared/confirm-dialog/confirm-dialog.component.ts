import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogConfig {

  question: string;

  wait?: boolean;

};

@Component({
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent implements OnInit {

  disabled: boolean;

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public config: ConfirmDialogConfig,
  ) {
    this.disabled = !!config.wait;
  }

  ngOnInit(): void {
    if (this.config.wait) {
      this.timeoutId = setTimeout(() => this.disabled = false, 400);
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }
  }

}
