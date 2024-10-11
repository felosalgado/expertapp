import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-reactivo',
  standalone: true,
  imports: [CommonModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-reactivo.component.html',
  styleUrl: './form-reactivo.component.sass'
})
export class FormReactivoComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Se crea el FormGroup utilizando FormBuilder
    this.contactForm = this.fb.group({
      // Se crean los FormControls con sus validaciones
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

    onSubmit() {
      if (this.contactForm.valid) {
        console.log('Formulario de contacto enviado:', this.contactForm.value);
        // Lógica para manejar el envío del formulario, como una petición a un API
      } else {
        console.log('El formulario es inválido.');
      }
    }
  
}


