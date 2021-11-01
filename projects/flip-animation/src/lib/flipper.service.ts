import { Injectable } from '@angular/core';
import { Flipper } from 'flip-toolkit';
import {
  FlippedProps,
  HandleEnterUpdateDelete,
  OnFlipperComplete,
  SpringOption,
  StaggerConfig,
} from './types';

interface Options {
  element: HTMLElement;
  staggerConfig?: StaggerConfig;
  spring?: SpringOption;
  applyTransformOrigin?: boolean;
  handleEnterUpdateDelete?: HandleEnterUpdateDelete;
  debug?: boolean;
  onComplete?: OnFlipperComplete;
}

@Injectable()
export class FlipperService {
  private flipInstance?: Flipper;

  init(options: Options) {
    this.flipInstance = new Flipper(options);
  }

  recordBeforeUpdate() {
    this.flipInstance?.recordBeforeUpdate();
  }

  update(prevDecisionData: any, currentDecisionData: any) {
    this.flipInstance?.update(prevDecisionData, currentDecisionData);
  }

  addFlippedElement(options: FlippedProps & { element: HTMLElement }) {
    this.flipInstance?.addFlipped(options);
  }

  addInvertedElement(options: {
    element: HTMLElement;
    parent: HTMLElement;
    opacity: boolean;
    translate: boolean;
    scale: boolean;
    transformOrigin: string;
  }) {
    this.flipInstance?.addInverted(options);
  }
}
