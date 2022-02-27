import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainService } from 'main.service';
import { SharedModule } from 'shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    SharedModule,

    AppRoutingModule,
  ],
  providers: [
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
