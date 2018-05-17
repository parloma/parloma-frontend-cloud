import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoyComponent } from './joy.component';

describe('JoyComponent', () => {
  let component: JoyComponent;
  let fixture: ComponentFixture<JoyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
