import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-reactivo',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './form-reactivo.component.html',
  styleUrl: './form-reactivo.component.sass'
})
export class FormReactivoComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['',[Validators.required,Validators.minLength(10)]]
    });
  }

  onSubmit(){
    if(this.contactForm.valid) {
      console.log('Formulario de contacto enviado:', this.contactForm.value);
    } else
     console.log('El formulario es invalido');

  }

}
