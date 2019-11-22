import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  public titulo: string;

  constructor(private router: Router, private title: Title, private meta: Meta) {
    this.getDataRoute().subscribe(event => {
      this.titulo = event;
      this.title.setTitle(this.titulo);
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };

      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {}

  private getDataRoute(): Observable<string> {
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd && evento.snapshot.data.titulo !== undefined),
      map((evento: ActivationEnd) => evento.snapshot.data.titulo)
    );
  }


}
