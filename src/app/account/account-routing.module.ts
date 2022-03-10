import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedOutGuard } from 'auth/guards/logged-out.guard';
import { ActivateAccountComponent } from './activate-account/activate-account.component';

const routes: Routes = [
  {
    path: 'activar/:uid/:token',
    component: ActivateAccountComponent,
    canActivate: [LoggedOutGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
