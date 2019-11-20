import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input() leyenda = 'Leyenda';
  @Input() progreso = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtProgress', {static: false}) txtProgress: ElementRef;


  constructor() { }

  ngOnInit() {
  }

  public cambiarValor(value: number) {
    if ((this.progreso + Number(value) ) > 100) {
      return;
    }
    if ((this.progreso + Number(value) ) < 0) {
      return;
    }
    this.progreso += Number(value);
    this.cambioValor.emit(this.progreso);

    // El foco se aplica según donde se cambien los valores
    this.txtProgress.nativeElement.focus();

  }

  public onChanges(newValue: number) {

    // const elemHTML: any = document.getElementsByName('progreso')[0];

    // console.log(this.txtProgress);


    if ( newValue >= 100 ) {
      this.progreso = 100;
    } else if ( newValue <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    // elemHTML.value = Number(this.progreso);

    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit(this.progreso);
  }

}
