import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  listData = [
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
}
