import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css'
})
export class SearchFormComponent {
  searchForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.searchForm = fb.group(
      {
        'bank': ['', Validators.required],
        'district': ['', Validators.required],
        'branch': ['', Validators.required],
      }
    );
  }
  onSubmit(formValue: any): void {
    console.log(formValue);

  }
}
