import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Club, User } from '@app/models';
import { AccountService, AlertService } from '@app/services';

import { ClubService } from '@app/services/club.service';
import { debounceTime } from 'rxjs';

@Component({
  templateUrl: 'club-list.component.html',
  selector: 'club-list',
  styleUrls: ['./club-list.component.scss'],
})
export class ClubsListComponent {
  items: Club[] = [];
  isLoading = false;
  currentPage = 0;
  itemsPerPage = 10;
  noMoreItem = false;
  form: UntypedFormGroup;

  user: User;

  constructor(
    private paginationService: ClubService,
    private formBuilder: UntypedFormBuilder,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    this.user = this.accountService.userValue;
    this.form = this.formBuilder.group({
      name: [''],
      mode: ['all'],
    });
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((v) => {
      this.resetPaginator();
      this.loadData();
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  toggleLoading = () => (this.isLoading = !this.isLoading);

  loadData = () => {
    this.toggleLoading();
    this.paginationService
      .getItems({
        page: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        name: this.form.controls.name.value,
        mode: this.form.controls.mode.value,
      })
      .subscribe({
        next: (response) => (this.items = response),
        error: (err) => console.log(err),
        complete: () => this.toggleLoading(),
      });
  };

  appendData = () => {
    this.toggleLoading();
    this.paginationService
      .getItems({
        page: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        name: this.form.controls.name.value,
        mode: this.form.controls.mode.value,
      })
      .subscribe({
        next: (response) => {
          if (response.length > 0) this.items = [...this.items, ...response];
          else this.noMoreItem = true;
        },
        error: (err) => console.log(err),
        complete: () => this.toggleLoading(),
      });
  };

  onScroll = () => {
    this.currentPage++;
    this.appendData();
  };

  setFilter(mode: string) {
    this.form.controls.mode.setValue(mode);
  }

  get currentMode(): string {
    return this.form.controls.mode.value;
  }

  private resetPaginator(): void {
    this.items = [];
    this.isLoading = false;
    this.noMoreItem = false;
    this.currentPage = 0;
  }

  add(club: Club) {
    this.accountService.addFavorite(club).subscribe({
      next: (response) => {
        this.alertService.success(`Joined the club ${club.name}`, {
          keepAfterRouteChange: true,
          autoClose: true,
        });

        this.user.favorites.push(club._id);
        this.accountService.updateValueUser(this.user);

        if (this.currentMode === 'unfollowed') {
          const index = this.items.findIndex((i) => {
            return i._id === club._id;
          });

          this.items.splice(index, 1);
        }
      },
      error: (err) => console.log(err),
    });
  }

  remove(club: Club) {
    this.accountService.removeFavorite(club).subscribe({
      next: (response) => {
        this.alertService.warn(`Left the club ${club.name}`, {
          keepAfterRouteChange: true,
          autoClose: true,
        });
        const index = this.user.favorites.indexOf(club._id);

        this.user.favorites.splice(index, 1);
        this.accountService.updateValueUser(this.user);

        if (this.currentMode === 'followed') {
          const index = this.items.findIndex((i) => {
            return i._id === club._id;
          });

          this.items.splice(index, 1);
        }
      },
      error: (err) => console.log(err),
    });
  }

  isFavorite(club: Club): boolean {
    return this.user.favorites.some((f) => club._id === f);
  }
}
