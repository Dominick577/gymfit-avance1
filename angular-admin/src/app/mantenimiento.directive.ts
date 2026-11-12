import { Directive, ElementRef, Input, OnChanges, inject } from '@angular/core';
@Directive({ selector: '[appMantenimiento]', standalone: true })
export class MantenimientoDirective implements OnChanges {
  @Input('appMantenimiento') mantenimiento = false;
  private elemento = inject(ElementRef<HTMLElement>);
  ngOnChanges() { this.elemento.nativeElement.style.borderLeft = this.mantenimiento ? '5px solid #ffc107' : ''; }
}
