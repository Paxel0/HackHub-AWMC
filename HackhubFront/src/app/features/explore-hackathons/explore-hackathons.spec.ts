import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExploreHackathonsComponent } from './explore-hackathons';
import { provideRouter } from '@angular/router';

describe('ExploreHackathonsComponent', () => {
  let component: ExploreHackathonsComponent;
  let fixture: ComponentFixture<ExploreHackathonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreHackathonsComponent],
      providers: [provideRouter([])]
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
