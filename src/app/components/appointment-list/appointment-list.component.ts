import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../../models/appointment.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
// import { CreateAppointmentDialogComponent } from '../create-appointment-dialog/create-appointment-dialog.component';
// import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
// import { EditAppointmentDialogComponent } from '../edit-appointment-dialog/edit-appointment-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { CreateAppointmentDialogComponent } from '../create-appointment-dialog/create-appointment-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditAppointmentDialogComponent } from '../edit-appointment-dialog/edit-appointment-dialog.component';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.sass'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class AppointmentListComponent implements OnInit {

  displayedColumns: string[] = ['patientName', 'appointmentDate', 'description', 'location', 'status', 'actions'];
  dataSource = new MatTableDataSource<Appointment>([]);

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private appointmentService: AppointmentService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadAppointments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private loadAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe(
      (appointments: Appointment[]) => {
        this.dataSource.data = appointments;
      },
      (error) => {
        this.openSnackBar('Error al cargar las citas.');
        console.error(error);
      }
    );
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public editAppointment(appointment: Appointment): void {
    const dialogRef = this.dialog.open(EditAppointmentDialogComponent, {
      disableClose: true,
      data: { appointment }
    });

    dialogRef.afterClosed().subscribe((result: Appointment | undefined) => {
      if (result) {
        this.updateAppointment(appointment.citaID, result);
      }
    });
  }

  private updateAppointment(appointmentId: number, appointmentData: Appointment): void {
    appointmentData.citaID = appointmentId;
    this.appointmentService.updateAppointment(appointmentId, appointmentData).subscribe({
      next: () => {
        this.openSnackBar(`Cita editada con éxito.`);
        this.loadAppointments();
      },
      error: (err) => {
        console.error('Error al actualizar la cita:', err);
      }
    });
  }

  public deleteAppointment(appointment: Appointment): void {
    console.log(appointment)
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `¿Estás seguro de que deseas eliminar la cita?` },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appointmentService.deleteAppointment(appointment.citaID).subscribe(
          () => {
            this.openSnackBar(`Cita eliminada con éxito.`);
            this.dataSource.data = this.dataSource.data.filter(a => a.citaID !== appointment.citaID);
            this.dataSource._updateChangeSubscription();
          },
          (error) => {
            this.openSnackBar('Error al eliminar la cita.');
            console.error(error);
          }
        );
      }
    });
  }

  public openCreateAppointmentDialog(): void {
    const dialogRef = this.dialog.open(CreateAppointmentDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: Appointment | undefined) => {
      if (result) {
        console.log(result)
        this.appointmentService.createAppointment(result).subscribe(
          (appointment: Appointment) => {
            this.openSnackBar(`Cita creada con éxito.`);
            this.dataSource.data = [...this.dataSource.data, appointment];
            this.dataSource._updateChangeSubscription();
          },
          (error) => {
            this.openSnackBar('Error al crear la cita.');
            console.error(error);
          }
        );
      }
    });
  }

  private openSnackBar(alert: string): void {
    this.snackBar.open(alert, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}