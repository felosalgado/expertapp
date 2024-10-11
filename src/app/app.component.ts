import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LifecycleComponent } from './pages/lifecycle/lifecycle.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, LifecycleComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  showComponent = true;
  inputData = signal('Valor inicial');

  toggleComponent() {
    this.showComponent = !this.showComponent;
  }
}
