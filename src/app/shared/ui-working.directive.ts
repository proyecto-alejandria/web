import { Directive, ElementRef, OnDestroy, OnInit, Optional } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { UIService } from './ui.service';

@Directive({
  selector: '[appUiWorking]'
})
export class UiWorkingDirective implements OnDestroy, OnInit {

  private sub?: Subscription;

  constructor(
    private el: ElementRef<HTMLInputElement>,
    @Optional() private matButton: MatButton,
    private ui: UIService,
  ) { }

  ngOnInit(): void {
    this.sub = this.ui.working.subscribe(working => {
      if (this.matButton) {
        this.matButton.disabled = working;
      } else {
        this.el.nativeElement.disabled = working;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
