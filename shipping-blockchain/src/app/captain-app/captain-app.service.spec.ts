import { TestBed, inject } from '@angular/core/testing';

import { CaptainAppService } from './captain-app.service';

describe('CaptainAppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaptainAppService]
    });
  });

  it('should ...', inject([CaptainAppService], (service: CaptainAppService) => {
    expect(service).toBeTruthy();
  }));
});
