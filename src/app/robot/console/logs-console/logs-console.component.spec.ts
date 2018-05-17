import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsConsoleComponent } from './logs-console.component';

describe('LogsConsoleComponent', () => {
  let component: LogsConsoleComponent;
  let fixture: ComponentFixture<LogsConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
