import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../confs/configs.module';
import { Program } from './program'
import { share } from 'rxjs/operators';

@Injectable()
export class ProgramService {

  public programs: Program[];
  public program: Program;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig) { }

  getPrograms() {
    this.http.get<Program[]>(this.config.userEnd + '/programs').subscribe(
      programs => this.programs = programs,
      e => console.log(e)
    );
  }

  getProgram(program: Program) {
    let res = this.http.get<Program>(this.config.userEnd + '/programs/' + program.id).pipe(share());
    res.subscribe(
      program => {this.program = program as Program},
      e => console.log(e)
    );
    return res;
  }

  deleteProgram(program: Program) {
    let res = this.http.delete<Program>(this.config.userEnd + '/programs/' + program.id).pipe(share());
    res.subscribe(
      program => this.getPrograms(),
      e => console.log(e)
    );
    return res;

  }



  patch(program: Program, patch: any) {
    let res = this.http.patch<Program>(this.config.userEnd + '/programs/' + program.id, patch).pipe(share());
    res.subscribe(
      (data) => console.log(data)
    );
    return res;
  }

  create(program: Program) {
    let res = this.http.post<Program>(this.config.userEnd + '/programs', program).pipe(share());
    res.subscribe(
      (data) => {
        this.getPrograms();
      }
    );
    return res;
  }
}
