import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, httpResource } from '@angular/common/http';


@Component({
  selector: 'app-mat-form',
  templateUrl: './mat-form.component.html',
  styleUrl: './mat-form.component.css',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class MatFormComponent {
  http: HttpClient;
  banklist: any;
  districtlist: any;

  constructor(http: HttpClient) {
    this.http = http;
  }


  private fb = inject(FormBuilder);
  BankBranchForm = this.fb.group({
    Bank: [null,],
    Branch: [null,],
    District: [null,],
  });


  hasUnitNumber = false;






  ngOnInit() {
    // get banklist
    //this.banklist = this.getbanklist()
    //this.districtlist = this.getdistrictlist()
    this.banklist = [
            {
                "bank_key": "1",
                "bank_name_en": "Industrial and Commercial Bank of China (Asia) Limited",
                "bank_name_tc": null,
                "bank_name_sc": null
            },
            {
                "bank_key": "2",
                "bank_name_en": "Bank of  Communications (Hong Kong) Limited",
                "bank_name_tc": null,
                "bank_name_sc": null
            }
    ];
    this.districtlist =[
      
    ]

  }

  onSubmit(formValue: any) {
    let controller = '';
    if (formValue['Bank']) {
      controller = 'bank'
    } else if (formValue['District']) {
      controller = 'district'
    } else if (formValue['Branch']) {
      controller = 'branch'
    }
    console.log(controller);
    let url = "http://localhost:80/awd/index.php?controller=";
    url += controller;
    console.log(url);
    console.log(formValue);
  }
  /* 
    getbanklist() {
      let url = 'http://localhost:80/awd/index.php?controller=bank'
      let slave = this.http.get(url)
      slave.subscribe({
        next: (res) => {
          console.log(res)
          return JSON.parse(JSON.stringify(res))
        },
        error: (err) => {
          console.log(err);
        }
      })
    } 
  */

  getdistrictlist() {
    let url = 'http://localhost:80/awd/index.php?controller=district'
    let slave = this.http.get(url)
    slave.subscribe({
      next: (res) => {
        console.log(res)
        return JSON.parse(JSON.stringify(res))
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
