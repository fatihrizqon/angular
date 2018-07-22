import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuestionerComponent } from './admin-questioner.component';

describe('AdminQuestionerComponent', () => {
  let component: AdminQuestionerComponent;
  let fixture: ComponentFixture<AdminQuestionerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQuestionerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuestionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
