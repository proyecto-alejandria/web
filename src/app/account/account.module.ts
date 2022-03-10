import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { ActivateAccountComponent } from './activate-account/activate-account.component';



@NgModule({
  declarations: [
    ActivateAccountComponent,
  ],
  imports: [
    SharedModule,

    AccountRoutingModule,
  ]
})
export class AccountModule { }
