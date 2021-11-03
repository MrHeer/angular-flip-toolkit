import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { ExpandingDivComponent } from './expanding-div/expanding-div.component';
import { ListComponent } from './list/list.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'button',
    component: ButtonComponent,
  },
  {
    path: 'expanding-div',
    component: ExpandingDivComponent,
  },
  {
    path: '',
    component: NavComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
