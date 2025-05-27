import { Component } from '@angular/core';
import { MatFormComponent } from '../mat-form/mat-form.component';
import { MatTableComponent } from '../mat-table/mat-table.component';

@Component({
  selector: 'app-search-page',
  imports: [MatFormComponent,MatTableComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

}
