import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ServicenotficationService } from '../../core/services/Servicenotfication/servicenotfication.service';
import { INotification } from '../../core/models/model';
@Component({
  selector: 'app-notfication',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './notfication.component.html',
  styleUrl: './notfication.component.css'
})
export class NotficationComponent {
notifications: INotification[] = [];
  constructor(private notficationService: ServicenotficationService) {
    this.loadnotifications();
}

  loadnotifications() {
    this.notficationService.getAllNotifications().subscribe({
      next: (res: any) => {
        this.notifications = res.notifications; // Assuming the response contains a 'notifications' array
        console.log('Notifications:', res);
        console.log('all Notifications:', this.notifications);
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
      }
    });
  }
}
