import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClubAddComponent } from './club-create/club-add.component';
import { LayoutComponent } from '@app/account/layout.component';
import { AuthGuard } from '@app/_helpers';

const routes: Routes = [
  {
    path: '',
    children: [{ path: 'create', component: ClubAddComponent }],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubRoutingModule {}
