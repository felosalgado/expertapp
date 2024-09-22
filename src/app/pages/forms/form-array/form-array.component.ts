import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.sass'
})
export class FormArrayComponent {
  pedidoForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.pedidoForm = this.fb.group({
      productos: this.fb.array([])
    });
  }

  get productos(): FormArray {
    return this.pedidoForm.get('productos') as FormArray;
  }

  agregarProducto(){
    const productoForm = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
    this.productos.push(productoForm);
  }

  eliminarProducto(indice: number){
    this.productos.removeAt(indice);
  }

  onSubmit(){
    if (this.pedidoForm.valid){
      console.log('Pedido enviado:', this.pedidoForm.value);
    } else {
      console.log('Formulario invalido');
    }
  }

}
