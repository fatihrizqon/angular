import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateCompanyComponent } from './admin-update-company.component';

describe('AdminUpdateCompanyComponent', () => {
  let component: AdminUpdateCompanyComponent;
  let fixture: ComponentFixture<AdminUpdateCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUpdateCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
