import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component'
import { EditorComponent } from './tools/editor/editor.component'
import { ProgramsComponent } from './tools/programs/programs.component'
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component'
import { UserNotLoggedInGuard, UserLoggedInGuard, AdminLoggedInGuard } from  './auth/auth.service';
import { AdminComponent } from './admin/admin/admin.component';
import { RobotsComponent } from './admin/robots/robots.component';
import { UsersComponent } from './admin/users/users.component';
import { ConsoleComponent } from './robot/console/console.component';
import { RosConnectedGuard } from './robot/ros.service';
import { JoyComponent } from './app/joy/joy.component';
import { RegisterSuccessComponent } from './auth/register-success/register-success.component';
import { RegisterConfirmComponent } from './auth/register/register-confirm/register-confirm.component';
import { NewRobotComponent } from './robot/new-robot/new-robot.component';
import { RegisterTokenComponent } from './admin/register-token/register-token.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'tools', children: [
      { path: 'edit',
        component: EditorComponent,
        canActivate: [UserLoggedInGuard],
      },
      {
        path: 'console',
        component: ConsoleComponent,
        canActivate: [RosConnectedGuard]
      },
      { path: 'programs',
        component: ProgramsComponent,
        canActivate: [UserLoggedInGuard],
      },
    ]},
    {
      path: 'app', children: [
        {
        path: 'joy',
        component: JoyComponent
      }
      ]
    },
    { path: 'auth', children: [
      { path: 'login',
        component: LoginComponent,
        canActivate: [UserNotLoggedInGuard]
      },
      { path: 'register',
        children: [
          {
            path: '', component: RegisterComponent
          },
          {
            path: 'success', component: RegisterSuccessComponent
          },
          {
            path: 'confirm', component: RegisterConfirmComponent
          }
        ]
      },
    ]},
    {
      path: 'robot',
      children: [
        {
          path: 'new',
          component: NewRobotComponent
        },
      ]
    },
    { path: 'admin', 
      canActivate: [AdminLoggedInGuard],
      children: [
      { path: "", component: AdminComponent },
      { path: 'users',
        component: UsersComponent,
      },
      { path: 'robots', component: RobotsComponent},
      { path: 'tokens', component: RegisterTokenComponent}
    ]}

  ];
  