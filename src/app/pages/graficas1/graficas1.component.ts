import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {


  public graficos: any = {
    grafico1: {
      labels: ['Con Mermelada', 'Con Nutella', 'Con Mantequilla'],
      data: [24, 30, 46],
      type: 'doughnut',
      leyenda: 'En el desayuno, el pan se come con'
    },
    grafico2: {
      labels: ['Hombres', 'Mujeres'],
      data: [4500, 6000],
      type: 'doughnut',
      leyenda: 'Entrevistados'
    },
    grafico3: {
      labels: ['Si', 'No'],
      data: [95, 5],
      type: 'doughnut',
      leyenda: '¿Le dan dolores de estomago al comer mucho en el desayuno?'
    },
    grafico4: {
      labels: ['No', 'Si'],
      data: [85, 15],
      type: 'doughnut',
      leyenda: '¿Le importa los dolores?'
    },
  };


  constructor() { }

  ngOnInit() {
  }



  
}
