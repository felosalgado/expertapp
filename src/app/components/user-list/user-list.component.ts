import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass'],
  standalone: true,
  imports: [
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
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['userName', 'userLastName', 'userEmail', 'userPhone', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.dataSource.data = users;
      },
      (error) => {
        this.openSnackBar('Error al cargar los usuarios.');
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

  public editUser(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      disableClose: true,
      data: { user }
    });

    dialogRef.afterClosed().subscribe((result: User | undefined) => {
      if (result) {
        this.updateUser(user.idUser, result);
      }
    });
  }

  private updateUser(userId: number, userData: User): void {
    userData.idUser = userId;
    this.userService.updateUser(userId, userData).subscribe({
      next: (response) => {
        this.openSnackBar(`Usuario ${userData.userName} ${userData.userLastName} editado con éxito.`);
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error al actualizar el usuario:', err);
        // Aquí puedes manejar el error mostrando un mensaje en la UI si es necesario
      }
    });
  }

  public deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `¿Estás seguro de que deseas eliminar al usuario ${user.userName} ${user.userLastName}?` },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Si el usuario confirma la eliminación
        this.userService.deleteUser(user.idUser).subscribe(
          () => {
            this.openSnackBar(`Usuario ${user.userName} ${user.userLastName} eliminado con éxito.`);
            // Eliminar el usuario de la tabla
            this.dataSource.data = this.dataSource.data.filter(u => u.idUser !== user.idUser);
            this.dataSource._updateChangeSubscription(); // Forzar la actualización de la tabla
          },
          (error) => {
            this.openSnackBar('Error al eliminar el usuario.');
            console.error(error);
          }
        );
      }
    });
  }

  public openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      disableClose: true // Esto evita que el diálogo se cierre con la tecla Esc
    });

    dialogRef.afterClosed().subscribe((result: User | undefined) => {
      if (result) {
        this.userService.createUser(result).subscribe(
          (user: User) => {
            this.openSnackBar(`Usuario ${result.userName} ${result.userLastName} creado con éxito.`);
            this.dataSource.data = [...this.dataSource.data, user];
            this.dataSource._updateChangeSubscription();
          },
          (error) => {
            this.openSnackBar('Error al crear el usuario.');
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