import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTracerComponent } from './data-tracer.component';

describe('DataTracerComponent', () => {
  let component: DataTracerComponent;
  let fixture: ComponentFixture<DataTracerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTracerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTracerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
