import { NgModule } from '@angular/core';
import { FlipperDirective } from './flipped.directive';
import { FlipperComponent } from './flipper.component';

@NgModule({
  declarations: [FlipperComponent, FlipperDirective],
  imports: [],
  exports: [FlipperComponent, FlipperDirective],
})
export class FlipAnimationModule {}
