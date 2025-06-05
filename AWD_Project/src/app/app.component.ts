import { Component } from '@angular/core';
import { MatNavComponent } from './mat-nav/mat-nav.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  // styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AWD_Project';
}
