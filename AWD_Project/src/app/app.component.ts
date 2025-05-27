import { Component } from '@angular/core';
import { MatNavComponent } from './mat-nav/mat-nav.component';

@Component({
  selector: 'app-root',
  imports: [MatNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AWD_Project';
}
