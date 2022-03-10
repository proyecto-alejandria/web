import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedOutGuard } from 'auth/guards/logged-out.guard';
import { LoginComponent } from 'auth/login/login.component';
import { HomeComponent } from 'home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'acceder',
    component: LoginComponent,
    canActivate: [LoggedOutGuard],
  },

  {
    path: 'cuenta',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
