import { Component } from '@angular/core';
import { User } from '../../../models/user.model';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user-dialog',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatButtonModule, CommonModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.sass',
  providers: [
    provideNativeDateAdapter()
  ]
})
export class CreateUserDialogComponent {
  user: User = { userName: '', userLastName: '', userEmail: '', userPhone: '', idUser: 0, userDateBirth: undefined };
  userForm: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CreateUserDialogComponent>) {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      userLastName: ['', [Validators.required, Validators.minLength(2)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      userDateBirth : []
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser: User = {
        userName: this.userForm.value.userName,
        userLastName: this.userForm.value.userLastName,
        userEmail: this.userForm.value.userEmail,
        userPhone: this.userForm.value.userPhone,
        idUser: 0,
        userDateBirth: this.userForm.value.userDateBirth
      };
      this.dialogRef.close(newUser);
    }
  }

  get userName() {
    return this.userForm.get('userName');
  }

  get userLastName() {
    return this.userForm.get('userLastName');
  }

  get userEmail() {
    return this.userForm.get('userEmail');
  }

  get userPhone() {
    return this.userForm.get('userPhone');
  }

  get userDateBirth() {
    return this.userForm.get('userDateBirth');
  }
}
