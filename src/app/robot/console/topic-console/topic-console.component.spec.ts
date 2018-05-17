import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicConsoleComponent } from './topic-console.component';

describe('TopicConsoleComponent', () => {
  let component: TopicConsoleComponent;
  let fixture: ComponentFixture<TopicConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
