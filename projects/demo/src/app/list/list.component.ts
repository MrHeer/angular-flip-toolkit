import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  FlippedProps,
  FlipperProps,
} from 'dist/angular-flip-toolkit/lib/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Item {
  id: number;
  name: string;
  age: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnDestroy {
  listData$: BehaviorSubject<Array<Item>> = new BehaviorSubject([
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
  ]);

  flipperProps$: Observable<FlipperProps> = this.listData$.pipe(
    map((list) => ({
      flipKey: list.map((item) => item.id).join('-'),
    }))
  );

  ngOnDestroy(): void {
    this.listData$.unsubscribe();
  }

  shuffle() {
    const listData = this.listData$.getValue();
    const nextListData = [...listData].sort(() => 0.5 - Math.random());
    this.listData$.next(nextListData);
  }

  flippedProps(item: Item): FlippedProps {
    return {
      flipId: item.id,
    };
  }
}
