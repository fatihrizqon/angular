import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { CompanyService } from '../services/company.service';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FlashMessageModule, FlashMessage } from 'angular-flash-message';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { DataTracerComponent } from './data-tracer/data-tracer.component';
import { LoggedInComponent } from './snackbar/logged-in/logged-in.component';
import { IndexCompanyComponent } from './company/index-company/index-company.component';
import { CreateCompanyComponent } from './company/create-company/create-company.component';
import { ViewCompanyComponent } from './company/view-company/view-company.component';
import { UpdateCompanyComponent } from './company/update-company/update-company.component';
import { AdminIndexComponent } from './admin/admin-index/admin-index.component';
import { AdminSidenavComponent } from './templates/admin-sidenav/admin-sidenav.component';
import { AdminToolbarComponent } from './templates/admin-toolbar/admin-toolbar.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminCompaniesComponent } from './admin/admin-companies/admin-companies.component';
import { AdminReportComponent } from './admin/admin-report/admin-report.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminQuestionerComponent } from './admin/admin-questioner/admin-questioner.component';
import { AdminCreateCompanyComponent } from './admin/admin-companies/admin-create-company/admin-create-company.component';
import { AdminUpdateCompanyComponent } from './admin/admin-companies/admin-update-company/admin-update-company.component';
import { ReportComponent } from './report/report.component';
import { CompanyFilterPipe } from './dashboard/company-pipe.filter';
import { Page404Component } from './error/page404/page404.component';
import { Page403Component } from './error/page403/page403.component';
import { ReportService } from '../services/report.service';
import { ViewReportComponent } from './admin/admin-report/view-report/view-report.component';


const appRoutes:Routes =[
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'header',
    component: HeaderComponent
  },
  {
    path: 'admin',
    component: AdminIndexComponent
  },
  {
    path: 'admin/users',
    component: AdminUsersComponent
  },
  {
    path: 'admin/companies',
    component: AdminCompaniesComponent
  },
  {
    path: 'admin/companies/create',
    component: AdminCreateCompanyComponent
  },
  {
    path: 'admin/companies/update/:id',
    component: AdminUpdateCompanyComponent
  },
  {
    path: 'admin/report',
    component: AdminReportComponent
  },
  {
    path: 'admin/questioner',
    component: AdminQuestionerComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent 
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'data-tracer',
    component: DataTracerComponent
  },
  {
    path: 'company',
    component: IndexCompanyComponent
  },
  {
    path: 'company/addCompany',
    component: CreateCompanyComponent
  },
  {
    path: 'company/updateCompany/:id',
    component: UpdateCompanyComponent
  },
  {
    path: 'companies/:id',
    component: ViewCompanyComponent
  },
  {
    path: 'report/:id',
    component: ReportComponent
  },
  {
    path: 'view-report/:id',
    component: ViewReportComponent
  },
  {
    path: 'forbidden',
    component: Page403Component
  },
  {
    path: 'notfound',
    component: Page404Component
  }
]

@NgModule({
  declarations: [
    CompanyFilterPipe,
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    ProfileComponent,
    DataTracerComponent,
    LoggedInComponent,
    IndexCompanyComponent,
    CreateCompanyComponent,
    ViewCompanyComponent,
    UpdateCompanyComponent,
    AdminIndexComponent,
    AdminSidenavComponent,
    AdminToolbarComponent,
    AdminUsersComponent,
    AdminCompaniesComponent,
    AdminReportComponent,
    AdminComponent,
    AdminQuestionerComponent,
    AdminCreateCompanyComponent,
    AdminUpdateCompanyComponent,
    ReportComponent,
    Page404Component,
    Page403Component,
    ViewReportComponent,
  ],
  imports: [
    FlashMessageModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [ValidateService, AuthService, AuthGuard, AdminGuard, CompanyService, ReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
