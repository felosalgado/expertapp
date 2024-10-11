import { Component, OnInit, ViewChild } from '@angular/core';
import { CitaService } from '../../services/Cita.service';
import { Cita } from '../../../models/Cita.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
// import { CreateCitaDialogComponent } from '../create-cita-dialog/create-cita-dialog.component';
// import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
// import { EditCitaDialogComponent } from '../edit-cita-dialog/edit-cita-dialog.component';
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
import { CreateCitaDialogComponent } from '../create-cita-dialog/create-cita-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditCitaDialogComponent } from '../edit-cita-dialog/edit-cita-dialog.component';

@Component({
  selector: 'app-cita-list',
  templateUrl: './cita-list.component.html',
  styleUrls: ['./cita-list.component.sass'],
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
export class CitaListComponent implements OnInit {

  displayedColumns: string[] = ['patientName', 'CitaDate', 'description', 'location', 'status', 'actions'];
  dataSource = new MatTableDataSource<Cita>([]);

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private CitaService: CitaService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadCitas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private loadCitas(): void {
    this.CitaService.getAllCitas().subscribe(
      (Citas: Cita[]) => {
        this.dataSource.data = Citas;
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

  public editCita(Cita: Cita): void {
    const dialogRef = this.dialog.open(EditCitaDialogComponent, {
      disableClose: true,
      data: { Cita }
    });

    dialogRef.afterClosed().subscribe((result: Cita | undefined) => {
      if (result) {
        this.updateCita(Cita.citaID, result);
      }
    });
  }

  private updateCita(CitaId: number, CitaData: Cita): void {
    CitaData.citaID = CitaId;
    this.CitaService.updateCita(CitaId, CitaData).subscribe({
      next: () => {
        this.openSnackBar(`Cita editada con éxito.`);
        this.loadCitas();
      },
      error: (err) => {
        console.error('Error al actualizar la cita:', err);
      }
    });
  }

  public deleteCita(Cita: Cita): void {
    console.log(Cita)
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `¿Estás seguro de que deseas eliminar la cita?` },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.CitaService.deleteCita(Cita.citaID).subscribe(
          () => {
            this.openSnackBar(`Cita eliminada con éxito.`);
            this.dataSource.data = this.dataSource.data.filter(a => a.citaID !== Cita.citaID);
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

  public openCreateCitaDialog(): void {
    const dialogRef = this.dialog.open(CreateCitaDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: Cita | undefined) => {
      if (result) {
        console.log(result)
        this.CitaService.createCita(result).subscribe(
          (Cita: Cita) => {
            this.openSnackBar(`Cita creada con éxito.`);
            this.dataSource.data = [...this.dataSource.data, Cita];
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
