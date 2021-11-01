import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { FlipperService } from './flipper.service';
import { FlippedProps } from './types';

@Directive({
  selector: '[flipped]',
})
export class FlipperDirective implements OnInit {
  @Input() flip?: FlippedProps;
  @Input() inverseFlip?: {
    parent: HTMLElement;
    opacity: boolean;
    translate: boolean;
    scale: boolean;
    transformOrigin: string;
  };

  constructor(private el: ElementRef, private flipperService: FlipperService) {}

  ngOnInit(): void {
    if (this.flip) {
      this.flipperService.addFlippedElement({
        element: this.el.nativeElement,
        ...this.flip,
      });
    } else if (this.inverseFlip) {
      this.flipperService.addInvertedElement({
        element: this.el.nativeElement,
        ...this.inverseFlip,
      });
    }
  }
}
