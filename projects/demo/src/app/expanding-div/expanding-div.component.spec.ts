import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandingDivComponent } from './expanding-div.component';

describe('ExpandingDivComponent', () => {
  let component: ExpandingDivComponent;
  let fixture: ComponentFixture<ExpandingDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandingDivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandingDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
