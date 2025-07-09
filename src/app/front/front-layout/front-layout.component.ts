import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-front-layout',
  standalone: true,
  imports: [FooterComponent,HeaderComponent,RouterOutlet],
  templateUrl: './front-layout.component.html',
  styleUrl: './front-layout.component.css'
})
export class FrontLayoutComponent {

}
