import { Component } from '@angular/core';
import { ServiceopenviewService } from '../../core/services/Serviceopenview/serviceopenview.service';
import { Iopenview } from '../../core/models/model';
import { isTokenValid } from '../../../environments/Token';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-openview',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './openview.component.html',
  styleUrl: './openview.component.css'
})
export class OpenviewComponent {

  token = localStorage.getItem('token') || '';

  openviewform! : FormGroup;
  constructor(private serviceOpenview: ServiceopenviewService , private fb : FormBuilder) {
    this.initilaizeForm();
}
  initilaizeForm() {
    this.openviewform = this.fb.group({
      rating: [''],
    comment: [''],
    });
  }

  openviews: Iopenview[] = [];

  ngOnInit() {
    this.loadOpenViews();
  }
  loadOpenViews() {
    this.serviceOpenview.getAllOpenViews().subscribe({
      next: (data: any) => {
        console.log('Data received:', data);
        this.openviews = data.dismoin 
        console.log('Open views loaded successfully:', this.openviews);
      },
      error: (error) => {
        console.error('Error fetching open views:', error);
      }
    });
  }


  postOpenView() {
    if (!isTokenValid()) {
      console.error('Token is invalid or expired');
      return;
    }
    const data = this.openviewform.value;
    this.serviceOpenview.createOpenView(data).subscribe({
      next: (data: any) => {
        console.log('Open view created successfully:', data);
        this.openviewform.reset();
        this.loadOpenViews(); // Refresh the reviews list after successful submission
      },
      error: (error) => {
        console.error('Error creating open view:', error);
      }
    });
  }

  onsubmit() {
    if (!isTokenValid()) {
      console.error('Token is invalid or expired');
      return;
    }
    if (this.openviewform.invalid) {
      console.error('Form is invalid');
      return;
    }
    console.log('Form submitted:', this.openviewform.value);
    this.postOpenView();
  }

  resetForm() {
    this.openviewform.reset();
    console.log('Form reset');
  }
}

