import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'account/account.service';

enum ActivationStatus {
  LOADING,
  SUCCESS,
  ERROR,
};

@Component({
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  ActivationStatus = ActivationStatus;

  status: ActivationStatus = ActivationStatus.LOADING;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;

    this.accountService
      .activate(params['uid'], params['token'])
      .subscribe({
        next: () => this.status = ActivationStatus.SUCCESS,
        error: () => this.status = ActivationStatus.ERROR,
      });
  }

}
