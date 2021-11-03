import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlipperDirective } from './flipped.directive';
import { FlipperComponent } from './flipper.component';

@NgModule({
  declarations: [FlipperComponent, FlipperDirective],
  imports: [CommonModule],
  exports: [FlipperComponent, FlipperDirective],
})
export class FlipToolkitModule {}
