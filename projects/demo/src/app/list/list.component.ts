import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  FlippedProps,
  FlipperProps,
} from 'dist/angular-flip-toolkit/lib/types';
import { spring } from 'flip-toolkit';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';

interface Item {
  id: number;
  name: string;
  age: string;
}

const INIT_DATA: Array<Item> = [
  {
    id: 1,
    name: 'John',
    age: '20',
  },
  {
    id: 2,
    name: 'Tom',
    age: '30',
  },
  {
    id: 3,
    name: 'Jerry',
    age: '40',
  },
  {
    id: 4,
    name: 'Mike',
    age: '50',
  },
  {
    id: 5,
    name: 'Peter',
    age: '60',
  },
];

const onElementAppear: FlippedProps['onAppear'] = (el, index) =>
  spring({
    onUpdate: (val) => {
      el.style.opacity = val.toString();
    },
    delay: index * 50,
  });

const onExit: FlippedProps['onExit'] = (el, index, removeElement) => {
  spring({
    config: { overshootClamping: true },
    onUpdate: (val) => {
      el.style.transform = `scaleY"(${1 - Number(val)})`;
    },
    delay: index * 50,
    onComplete: removeElement,
  });

  return () => {
    el.style.opacity = '';
    removeElement();
  };
};

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements AfterViewChecked, OnDestroy {
  listData$: BehaviorSubject<Array<Item>> = new BehaviorSubject([...INIT_DATA]);
  afterViewChecked$: Subject<boolean> = new Subject();

  flipperProps$: Observable<FlipperProps> = this.listData$.pipe(
    map((list) => ({
      flipKey: list.map((item) => item.id).join('-'),
    }))
  );

  ngOnDestroy(): void {
    this.listData$.unsubscribe();
    this.afterViewChecked$.unsubscribe();
  }

  shuffle() {
    const listData = this.listData$.getValue();
    const nextListData = [...listData].sort(() => 0.5 - Math.random());
    this.listData$.next(nextListData);
  }

  reset() {
    this.listData$.next([...INIT_DATA]);
  }

  removeItem(item: Item) {
    const listData = this.listData$.getValue();
    const nextListData = listData.filter((i) => i.id !== item.id);
    this.listData$.next(nextListData);
  }

  flippedProps(item: Item): FlippedProps {
    return {
      flipId: item.id,
      onAppear: onElementAppear,
      onExit: onExit,
      delayUntil: item.id,
    };
  }

  ngAfterViewChecked(): void {
    this.afterViewChecked$.next(true);
  }

  drop(event: CdkDragDrop<string[]>) {
    const listData = this.listData$.getValue();
    moveItemInArray(listData, event.previousIndex, event.currentIndex);
    this.afterViewChecked$.pipe(take(1)).subscribe(() => {
      this.listData$.next(listData);
    });
  }
}
