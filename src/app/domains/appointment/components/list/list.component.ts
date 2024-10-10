import { Component, inject, OnInit } from '@angular/core';

import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { Appointment } from '../../interfaces/appointment';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.sass'
})
export class ListComponent implements OnInit {
  appointmentList: Appointment[] = [];

  private appointmentService = inject(AppointmentService);

  ngOnInit(): void {
    this.appointmentList = this.appointmentService.Get();
  }
}
