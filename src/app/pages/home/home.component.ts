import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatSlideToggleModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  constructor(private router: Router) { }

  public goToUsers(): void {
    this.router.navigate(['/users']);
  }

  public goToAppointments(): void {
    this.router.navigate(['/appointments']);
  }

}
