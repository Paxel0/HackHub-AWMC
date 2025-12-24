import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HackathonCard } from './hackathon-card';

describe('HackathonCard', () => {
  let component: HackathonCard;
  let fixture: ComponentFixture<HackathonCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HackathonCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HackathonCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
