import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {


  public progreso1 = 20;
  public progreso2 = 70;

  constructor() { }

  ngOnInit() {
  }



}
