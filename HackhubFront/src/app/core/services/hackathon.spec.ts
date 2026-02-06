import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HackathonService } from './hackathon';

describe('HackathonService', () => {
  let service: HackathonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HackathonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
