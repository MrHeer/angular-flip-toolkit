import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlipAnimationModule } from 'flip-animation';
import { ButtonComponent } from './button/button.component';
import { ExpandingDivComponent } from './expanding-div/expanding-div.component';

@NgModule({
  declarations: [AppComponent, ListComponent, ButtonComponent, ExpandingDivComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    FlipAnimationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
