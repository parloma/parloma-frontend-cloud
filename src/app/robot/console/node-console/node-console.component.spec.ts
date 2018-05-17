import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeConsoleComponent } from './node-console.component';

describe('NodeConsoleComponent', () => {
  let component: NodeConsoleComponent;
  let fixture: ComponentFixture<NodeConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
