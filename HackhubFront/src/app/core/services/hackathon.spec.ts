import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { HackathonService } from './hackathon';

describe('HackathonService', () => {
  let service: HackathonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        HackathonService
      ]
    });
    service = TestBed.inject(HackathonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
