import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.sass'
})
export class FormArrayComponent {
  pedidoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializamos el FormGroup con un FormArray vacío
    this.pedidoForm = this.fb.group({
      productos: this.fb.array([]) // FormArray que contendrá los productos
    });
  }

  // Getter para obtener el FormArray de productos
  get productos(): FormArray {
    return this.pedidoForm.get('productos') as FormArray;
  }

  // Método para agregar un producto al FormArray
  agregarProducto() {
    const productoForm = this.fb.group({
      nombre: ['', Validators.required], // Campo obligatorio
      cantidad: [1, [Validators.required, Validators.min(1)]] // Mínimo de 1 producto
    });
    this.productos.push(productoForm);
  }

  // Método para eliminar un producto del FormArray
  eliminarProducto(indice: number) {
    this.productos.removeAt(indice);
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.pedidoForm.valid) {
      console.log('Pedido enviado:', this.pedidoForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
