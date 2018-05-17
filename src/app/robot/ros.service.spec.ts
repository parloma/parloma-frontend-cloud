import { TestBed, inject } from '@angular/core/testing';

import { RosService } from './ros.service';

describe('RosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RosService]
    });
  });

  it('should be created', inject([RosService], (service: RosService) => {
    expect(service).toBeTruthy();
  }));
});
