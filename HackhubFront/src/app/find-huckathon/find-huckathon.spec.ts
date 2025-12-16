import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindHuckathon } from './find-huckathon';

describe('FindHuckathon', () => {
  let component: FindHuckathon;
  let fixture: ComponentFixture<FindHuckathon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindHuckathon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindHuckathon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
