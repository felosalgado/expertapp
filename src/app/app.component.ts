import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LifecycleComponent } from './pages/lifecycle/lifecycle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, LifecycleComponent],
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
