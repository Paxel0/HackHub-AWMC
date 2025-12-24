import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindHackathon } from './find-hackathon';

describe('FindHackathon', () => {
  let component: FindHackathon;
  let fixture: ComponentFixture<FindHackathon>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindHackathon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindHackathon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
