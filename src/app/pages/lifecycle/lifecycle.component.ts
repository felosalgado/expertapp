import { Component, Input, OnChanges, OnInit, DoCheck, OnDestroy, SimpleChanges, Signal, signal, effect  } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.sass'
})
export class LifecycleComponent implements OnChanges, OnInit, DoCheck, OnDestroy {
  @Input() dataSignal = signal('');  // Entrada para observar los cambios

  constructor() {
    effect(() => {
      console.log('El valor de dataSignal ha cambiado:', this.dataSignal());
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges: Se detectaron cambios en @Input', changes);
  }

  ngOnInit(): void {
    console.log('ngOnInit: El componente ha sido inicializado');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck: Cambio detectado, Angular realiza una verificación manual');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy: El componente está a punto de ser destruido');
  }

  updateData(newValue: string) {
    this.dataSignal.set(newValue);  // Actualizamos el Signal con el nuevo valor
  }
}
