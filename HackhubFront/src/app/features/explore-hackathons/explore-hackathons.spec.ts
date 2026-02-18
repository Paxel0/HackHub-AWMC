import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ExploreHackathonsComponent } from './explore-hackathons';

describe('ExploreHackathonsComponent', () => {
  let component: ExploreHackathonsComponent;
  let fixture: ComponentFixture<ExploreHackathonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreHackathonsComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreHackathonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
