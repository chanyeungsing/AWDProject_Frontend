import { Component } from '@angular/core';
import { MatFormComponent } from '../mat-form/mat-form.component';
import { MatTableComponent } from '../mat-table/mat-table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-admin-page',
  imports: [MatFormComponent, MatTableComponent, MatToolbarModule, MatIcon, DialogComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

}
