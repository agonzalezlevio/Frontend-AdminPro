import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {


  public subscription: Subscription;

  constructor() {


    this.subscription = this.regresaObservable().pipe(
    ).subscribe(
      numero => console.log('Subs', numero), // next
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino')
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La página se va a cerrar');
    this.subscription.unsubscribe();
  }

  public regresaObservable(): Observable<any> {
    return new Observable(observer => {

      let contador = 0;



      const intervalo = setInterval(() => {

        contador++;
        // observer.next( contador );

        const salida = {
          valor: contador
        };

        observer.next(salida);


        /* if (contador === 10) {
          clearInterval(intervalo);
          observer.complete();
        } */

        /* if ( contador === 2 ) {
          // clearInterval(intervalo);
          observer.error('Auxilio');
        } */

      }, 1000);
    }).pipe(
      map((respuesta: any) => {
        return respuesta.valor;
      }
      ),
      filter((respuesta, index) => {

        if ((respuesta % 2 === 1)) {
          // impar
          return true;
        } else {
          // par
          return false;
        }

      })
    );
  }

}
