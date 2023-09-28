import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ClubsListComponent } from './club-list/club-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';
import { ClubAddComponent } from './club-create/club-add.component';
import { ClubRoutingModule } from './club-routing.module';
import { TopbarComponent } from '@app/_components/topbar.component';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    ClubRoutingModule,
    TopbarComponent,
  ],
  declarations: [ClubsListComponent, ClubAddComponent],
  exports: [ClubsListComponent],
})
export class ClubModule {}
