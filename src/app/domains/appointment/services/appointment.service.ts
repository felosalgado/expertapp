import { Injectable, signal } from '@angular/core';
import { Appointment } from '../interfaces/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private appoinmentList = signal<Appointment[]>([]);

  constructor() {
    this.MockAppoinments();
  }
  private MockAppoinments() {
    const mockAppoinmentList: Appointment[] = [
      {
        Id: 1, AppointmentDate: new Date(), UserId: 1, Description: "Odontologia", Site: "Sura 1", State: "Active", CreationDate: new Date(), UpdateDate: new Date()
      },
      { Id: 2, AppointmentDate: new Date(), UserId: 3, Description: "General", Site: "Sura 2", State: "Active", CreationDate: new Date(), UpdateDate: new Date() },
      { Id: 3, AppointmentDate: new Date(), UserId: 2, Description: "General", Site: "Sura 1", State: "Active", CreationDate: new Date(), UpdateDate: new Date() },
      { Id: 4, AppointmentDate: new Date(), UserId: 5, Description: "Pediatria", Site: "Sura 1", State: "Active", CreationDate: new Date(), UpdateDate: new Date() },

    ];
    this.appoinmentList.set(mockAppoinmentList);
  }
  public Get(): Appointment[] {
    return this.appoinmentList();
  }
  GetById(id: number): Appointment | null {
    return this.appoinmentList().find(app => app.Id === id) || null;
  }
  public Add(newAppointment: Appointment): void {
    this.appoinmentList.set([...this.appoinmentList(), newAppointment]);
  }
  Update(appointmentUpdated: Appointment): void {
    const appoinmentsUpdated = this.appoinmentList().map(appointment =>
      appointment.Id === appointmentUpdated.Id ? appointmentUpdated : appointment

    );
    this.appoinmentList.set(appoinmentsUpdated);
  }

  Delete(id: number): void {
    const appoinmentsUpdated = this.appoinmentList().filter(appoinment => appoinment.Id !== id);
    this.appoinmentList.set(appoinmentsUpdated);  // Actualiza el signal con la lista filtrada
  }
}
