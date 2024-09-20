import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validator, Validators, FormControl } from '@angular/forms';
import { Usuario } from '../../../../domains/users/interfaces/usuario';

@Component({
  selector: 'app-form-reactivo-st',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-reactivo-st.component.html',
  styleUrl: './form-reactivo-st.component.sass'
})
export class FormReactivoStComponent {
  // Aquí vinculamos la interfaz Usuario al FormGroup
  usuarioForm: FormGroup<{ [K in keyof Usuario]: FormControl<Usuario[K]> }>;

  constructor(private fb: FormBuilder) {
    // Definimos el formulario basado en la interfaz Usuario con tipos fuertes
    this.usuarioForm = this.fb.group({
      idUsuario: new FormControl<number>(0),  // Campo opcional
      nombre: new FormControl<string>('', Validators.required),
      apellido: new FormControl<string>('', Validators.required),
      telefono: new FormControl<string>('', [Validators.required, Validators.pattern('^[0-9]*$')]), // Solo números
      estado: new FormControl<string>('', Validators.required),
      fechaCreacion: new FormControl<Date>(new Date(), Validators.required)
    }) as FormGroup<{ [K in keyof Usuario]: FormControl<Usuario[K]> }>;
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      // El tipo de usuarioForm.value ya es Usuario, no necesitamos el cast explícito
      const usuario = this.usuarioForm.value as Partial<Usuario>;   
      console.log('Formulario de usuario enviado:', usuario);
    } else {
      console.log('El formulario es inválido');
    }
  }
}
