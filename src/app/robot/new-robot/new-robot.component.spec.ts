import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRobotComponent } from './new-robot.component';

describe('NewRobotComponent', () => {
  let component: NewRobotComponent;
  let fixture: ComponentFixture<NewRobotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRobotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
