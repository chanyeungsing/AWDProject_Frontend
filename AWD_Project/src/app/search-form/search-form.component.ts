import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { HttpClient, HttpResponse } from '@angular/common/http';



@Component({
  selector: 'app-search-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css'
})
export class SearchFormComponent {
  searchForm: FormGroup;
  //http: HttpClient;

  constructor(fb: FormBuilder,) {
    //this.http = HttpClient
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
    //const itemCourt = new URLSearchParams(params).size;
    //let url = "http://localhost/index.php?controller=bank";


  }
}
