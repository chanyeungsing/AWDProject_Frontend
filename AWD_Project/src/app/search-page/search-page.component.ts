import { Component } from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form.component';
import { SearchResultTableComponent } from '../search-result-table/search-result-table.component';

@Component({
  selector: 'app-search-page',
  imports: [SearchFormComponent,SearchResultTableComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

}
