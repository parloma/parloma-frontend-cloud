import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EditorComponent } from './tools/editor/editor.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AceEditorModule } from 'ng2-ace-editor';

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { ConfigsModule } from './confs/configs.module';
import { AuthService, UserLoggedInGuard, UserNotLoggedInGuard, AdminLoggedInGuard } from './auth/auth.service';
import { ProgramService } from './tools/program.service';

import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicFormsFoundationUIModule } from "@ng-dynamic-forms/ui-foundation";
import { ReactiveFormsModule, FormsModule, NG_VALIDATORS } from '@angular/forms';
import { HomeComponent } from './main/home/home.component';
import { ProgramsComponent } from './tools/programs/programs.component';
import { RegisterComponent, matchingPasswords } from './auth/register/register.component';

import { routes } from './app-routes'

import { APP_CONFIG } from './confs/configs.module';
import { FinderComponent } from './robot/finder/finder.component'
import { RobotService } from './robot/robot.service';
import { UsersComponent } from './admin/users/users.component';
import { RobotsComponent } from './admin/robots/robots.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminService } from './admin/admin.service';
import { ConsoleComponent } from './robot/console/console.component';
import { RosService, RosConnectedGuard } from './robot/ros.service';
import { LogsConsoleComponent } from './robot/console/logs-console/logs-console.component';
import { TopicConsoleComponent } from './robot/console/topic-console/topic-console.component';
import { NodeConsoleComponent } from './robot/console/node-console/node-console.component';
import { JoyComponent } from './app/joy/joy.component';
import { RegisterSuccessComponent } from './auth/register-success/register-success.component';
import { RegisterConfirmComponent } from './auth/register/register-confirm/register-confirm.component';
import { ConfigureComponent } from './robot/configure/configure.component';
import { NewRobotComponent } from './robot/new-robot/new-robot.component';
import { LocalRobotService } from './robot/local-robot.service';
import { UserinfoComponent } from './main/userinfo/userinfo.component';
import { RegisterTokenComponent } from './admin/register-token/register-token.component';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('access_token');
    },
    whitelistedDomains: ["test.hotblackrobotics.com"]
  }
}


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    LoginComponent,
    HomeComponent,
    ProgramsComponent,
    RegisterComponent,
    FinderComponent,
    UsersComponent,
    RobotsComponent,
    AdminComponent,
    ConsoleComponent,
    LogsConsoleComponent,
    TopicConsoleComponent,
    NodeConsoleComponent,
    JoyComponent,
    RegisterSuccessComponent,
    RegisterConfirmComponent,
    ConfigureComponent,
    NewRobotComponent,
    UserinfoComponent,
    RegisterTokenComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AceEditorModule,
    ConfigsModule,
    HttpClientModule,
    JwtModule.forRoot({
          jwtOptionsProvider: {
            provide: JWT_OPTIONS,
            useFactory: jwtOptionsFactory
          }
        }),
    ReactiveFormsModule,
    DynamicFormsCoreModule.forRoot(),
    DynamicFormsFoundationUIModule,
    FormsModule
  ],
  providers: [
    UserLoggedInGuard,
    UserNotLoggedInGuard,
    AdminLoggedInGuard,
    RosConnectedGuard,
    AuthService,
    RobotService,
    ProgramService,
    AdminService,
    RosService,
    LocalRobotService,
    { provide: NG_VALIDATORS, useValue: matchingPasswords, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
