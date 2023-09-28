import { Component } from '@angular/core';
import { User } from '@app/models';
import { AccountService } from '@app/services';

@Component({
  standalone: true,
  selector: 'top-bar',

  template: `<div class="toolbar" role="banner">
    <span class="title">BookClub</span>
    <div class="spacer"></div>

    <div>
      <span>{{ user.username }} </span>
      <span id="followed-clubs-legend"
        >Fav Clubs ({{ user.favorites.length }})
      </span>
    </div>

    <a class="btn btn-link" (click)="logout()">Logout</a>
  </div>`,
})
export class TopbarComponent {
  user: User;
  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe((x) => (this.user = x));
  }

  logout() {
    this.accountService.logout();
  }
}
