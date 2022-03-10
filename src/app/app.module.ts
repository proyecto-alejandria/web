import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiInterceptor } from 'api/api.interceptor';
import { AuthInterceptor } from 'auth/auth.interceptor';
import { MainService } from 'main.service';
import { SharedModule } from 'shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,

    SharedModule,

    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

    {
      provide: APP_INITIALIZER,
      useFactory: (main: MainService) => () => main.bootstrap(),
      deps: [MainService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
