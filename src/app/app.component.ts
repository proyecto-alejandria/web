import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

  darkMode: boolean = true;

  isMobile: boolean = false;

  sidenavStartsOpened: boolean = true;

  private sub?: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.sidenavStartsOpened = !this.breakpointObserver.isMatched(Breakpoints.XSmall);

    this.sub = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .subscribe(result => this.isMobile = result.matches);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;

    if (this.darkMode) {
      this.renderer.removeClass(document.body, 'light-theme');
    } else {
      this.renderer.addClass(document.body, 'light-theme');
    }
  }

}
