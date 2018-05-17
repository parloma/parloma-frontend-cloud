import { NgModule } from '@angular/core';

export class AppConfig {
  url: string;
  userEnd: string;
  adminEnd: string;
  robot_local_ip: string;
}

export const APP_CONFIG: AppConfig = {
  url: 'http://test.hotblackrobotics.com',
  userEnd: 'http://test.hotblackrobotics.com'+'/api/users/1.0',
  adminEnd: 'http://test.hotblackrobotics.com'+'/api/admin/1.0',
  robot_local_ip: '192.168.29.1'
};

@NgModule({
  providers: [{
    provide: APP_CONFIG, useValue: APP_CONFIG
  }]
})
export class ConfigsModule { }
