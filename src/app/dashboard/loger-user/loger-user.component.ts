import { Component } from '@angular/core';
import { LogerUserService } from '../../core/services/loger_user/loger-user.service';
import { ILogs } from '../../core/models/model';
import { isTokenValid } from '../../../environments/Token';
import { catchError } from 'rxjs/operators';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-loger-user',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './loger-user.component.html',
  styleUrl: './loger-user.component.css'
})
export class LogerUserComponent {
  logs: ILogs[] = [];
  constructor(private logerUserService: LogerUserService) {
    this.loadLogs();
  }
  loadLogs() {
    if (!isTokenValid()) {
      console.error('Token is invalid or expired');
      return;
    }
    this.logerUserService.logUserActivity().subscribe({
      next: (data: any) => {
        console.log('Data received:', data);
        if (data.logs) {
          this.logs = [data.logs];
        }
        else if (Array.isArray(data)) {
          this.logs = data;
        }
        else {
          this.logs = [];
        }
        console.log('Logs loaded successfully:', this.logs);
      }
      , error: (error) => {
        console.error('Error fetching logs:', error);
      }
    });
  }

  
}
