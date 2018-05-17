import { TestBed, inject } from '@angular/core/testing';

import { LocalRobotService } from './local-robot.service';

describe('LocalRobotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalRobotService]
    });
  });

  it('should be created', inject([LocalRobotService], (service: LocalRobotService) => {
    expect(service).toBeTruthy();
  }));
});
