import { Component, OnInit } from '@angular/core';
import { FlippedProps } from 'dist/flip-animation/lib/types';

interface Item {
  id: number;
  name: string;
  age: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  listData: Array<Item> = [
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

  constructor() {}

  ngOnInit(): void {}

  shuffle() {
    this.listData.sort(() => Math.random() - 0.5);
  }

  flippedProps(item: Item): FlippedProps {
    return {
      flipId: item.id,
    } as any;
  }

  flipId() {
    return this.listData.map((item) => item.id).join('-');
  }
}
