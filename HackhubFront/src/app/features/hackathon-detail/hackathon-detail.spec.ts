import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { HackathonDetailComponent } from './hackathon-detail';

describe('HackathonDetailComponent', () => {
  let component: HackathonDetailComponent;
  let fixture: ComponentFixture<HackathonDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HackathonDetailComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HackathonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
