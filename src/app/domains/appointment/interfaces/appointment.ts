export interface Appointment {
    Id: number,
    UserId: number;
    AppointmentDate: Date;
    Description: string;
    Site: string;
    State: string;
    CreationDate: Date;
    UpdateDate?: Date;
}
