import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { FlipperService } from './flipper.service';
import { FlippedProps } from './types';

@Directive({
  selector: '[flipped]',
})
export class FlipperDirective implements OnInit {
  @Input() flippedProps?: FlippedProps | null;

  constructor(private el: ElementRef, private flipperService: FlipperService) {}

  ngOnInit(): void {
    if (this.flippedProps) {
      const { flipId, inverseFlipId } = this.flippedProps;
      if (flipId) {
        this.flipperService.addFlippedElement({
          element: this.el.nativeElement,
          ...this.flippedProps,
        });
      }
      if (inverseFlipId) {
        this.flipperService.addInvertedElement({
          element: this.el.nativeElement,
          parent: this.el.nativeElement.parentElement,
          opacity: this.flippedProps.opacity ?? true,
          translate: this.flippedProps.translate ?? true,
          scale: this.flippedProps.scale ?? true,
          transformOrigin: this.flippedProps.transformOrigin ?? '',
        });
      }
    }
  }
}
