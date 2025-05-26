import { Component } from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form.component';

@Component({
  selector: 'app-admin-page',
  imports: [SearchFormComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

}
