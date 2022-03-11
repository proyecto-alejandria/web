import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'auth/auth.service';

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
    private auth: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;

    this.auth
      .activate(params['uid'], params['token'])
      .subscribe({
        next: () => this.status = ActivationStatus.SUCCESS,
        error: () => this.status = ActivationStatus.ERROR,
      });
  }

}
