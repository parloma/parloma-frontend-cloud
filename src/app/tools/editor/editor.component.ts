import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProgramService } from '../program.service'
import { Router } from '@angular/router'
import { RosService } from '../../robot/ros.service';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {

  text:string;
  @ViewChild('editor') editor;

  options:any = { 
    tabSize: 4, 
    useSoftTabs: true,
    fontSize: "12pt",
    autoScrollEditorIntoView: true,
    minLines: 100
  }
  constructor(
    public programService: ProgramService,
    private router: Router,
    private rosService: RosService  
    ) {

    }

  ngOnInit() {
    if (this.programService.program != undefined) {
      this.text = this.programService.program.code;
    } else {
      this.router.navigate(['/tools/programs'])
    }
  }

  ngAfterViewInit() {
    this.editor.getEditor().commands.addCommand({
      name: "showOtherCompletions",
      bindKey: {
        win: "Ctrl-S",
        mac: "Command-S",
      },
      sender: "editor",
      exec: (editor) => {
        this.save();
      }
  })
}

  save() {
    console.log(this.programService.program);
    this.programService.patch(this.programService.program, {code: this.text})
  }

  test() {
  }

  run() {
    console.log(this.programService.program);
    this.rosService.runNode(this.text, this.programService.program.id);
  }

}
