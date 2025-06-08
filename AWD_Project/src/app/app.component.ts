import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule,GoogleMapsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'AWD_Project';
}
