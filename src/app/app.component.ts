import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'auth/auth.service';
import { User } from 'auth/user.model';
import { Subscription } from 'rxjs';
import { UIService } from 'shared/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

  darkMode: boolean = true;

  isMobile: boolean = false;

  sidenavStartsOpened: boolean = true;

  user: User | null = null;

  private subs: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private breakpointObserver: BreakpointObserver,
    private renderer: Renderer2,
    private ui: UIService,
  ) { }

  ngOnInit(): void {
    this.sidenavStartsOpened = !this.breakpointObserver.isMatched(Breakpoints.XSmall);

    this.subs.push(
      this.breakpointObserver
        .observe(Breakpoints.XSmall)
        .subscribe(result => this.isMobile = result.matches)
    );

    this.subs.push(
      this.auth.currentUser.subscribe(user => this.user = user)
    );
  }

  ngOnDestroy(): void {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;

    if (this.darkMode) {
      this.renderer.removeClass(document.body, 'light-theme');
    } else {
      this.renderer.addClass(document.body, 'light-theme');
    }
  }

  logout(): void {
    this.auth.logout();
    this.ui.message('Has cerrado sesión correctamente');
  }

}
