import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedModule } from "../shared/shared.module"

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }

  goBack() {
    window.history.back();
  }

}
