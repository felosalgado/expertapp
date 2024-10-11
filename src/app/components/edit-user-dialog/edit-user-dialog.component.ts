import { Component, Inject } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MatIconModule],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.sass',
  providers: [
    provideNativeDateAdapter()
  ]
})
export class EditUserDialogComponent {
  editUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editUserForm = this.fb.group({
      userName: [data.user.userName, Validators.required],
      userLastName: [data.user.userLastName, Validators.required],
      userEmail: [data.user.userEmail, [Validators.required, Validators.email]],
      userPhone: [data.user.userPhone, Validators.required],
      userDateBirth: [new Date(data.user.userDateBirth), []]
    });
  }

  public onSubmit(): void {
    if (this.editUserForm.valid) {
      this.dialogRef.close(this.editUserForm.value);
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  get userName() {
    return this.editUserForm.get('userName');
  }

  get userLastName() {
    return this.editUserForm.get('userLastName');
  }

  get userEmail() {
    return this.editUserForm.get('userEmail');
  }

  get userPhone() {
    return this.editUserForm.get('userPhone');
  }

  get userDateBirth() {
    return this.editUserForm.get('userDateBirth');
  }
}
