import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/services';
import { ClubService } from '@app/services/club.service';

@Component({ templateUrl: 'club-add.component.html' })
export class ClubAddComponent implements OnInit {
  form: UntypedFormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private clubService: ClubService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.clubService
      .create({ name: this.f.name.value, text: this.f.text.value })
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page

          this.router.navigateByUrl('/');
          this.alertService.success(
            `The club ${this.f.name.value} has been created`,
            {
              keepAfterRouteChange: true,
              autoClose: true,
            }
          );
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }
}
