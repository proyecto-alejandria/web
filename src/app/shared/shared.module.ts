import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,

    LayoutModule,

    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule,
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,

    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule,
  ],
})
export class SharedModule { }
