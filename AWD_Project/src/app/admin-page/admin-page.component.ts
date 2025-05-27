import { Component } from '@angular/core';
import { MatFormComponent } from '../mat-form/mat-form.component';
import { MatTableComponent } from '../mat-table/mat-table.component';

@Component({
  selector: 'app-admin-page',
  imports: [MatFormComponent,MatTableComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

}
