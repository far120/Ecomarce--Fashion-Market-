import { Component } from '@angular/core';
import { ServiceopenviewService } from '../../core/services/Serviceopenview/serviceopenview.service';
import { Iopenview } from '../../core/models/model';
import { isTokenValid } from '../../../environments/Token';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-openviewowner',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './openviewowner.component.html',
  styleUrl: './openviewowner.component.css'
})
export class OpenviewownerComponent {
  openviews: Iopenview[] = [];
  constructor(private serviceOpenview: ServiceopenviewService) {
    this.loadOpenViews();
  }
  loadOpenViews() {
    if (!isTokenValid()) {
      console.error('Token is invalid or expired');
      return;
    }
    this.serviceOpenview.getOpenView().subscribe({
      next: (data: any) => {
        console.log('Data received:', data);
        this.openviews = data.dismoin; 
        console.log('Open views loaded successfully:', this.openviews);
      },
      error: (error) => {
        console.error('Error fetching open views:', error);
      }
    });
  }

  patchOpenView(id: string) {
    if (!isTokenValid()) {
      console.error('Token is invalid or expired');
      return;
    }
    this.serviceOpenview.approveOpenView(id).subscribe({
      next: (data: any) => {
        console.log('Open view updated successfully:', data); 
        this.loadOpenViews(); // Refresh the reviews list after successful update
      }
      , error: (error) => {
        console.error('Error updating open view:', error);
      }
    });
  }



}
