import { Component, EventEmitter, inject, output, Output } from '@angular/core';

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
  banklist!: any;
  districtlist!: any;
  @Output() dataEmitter = new EventEmitter<any>();

  sendData(data:any){
    this.dataEmitter.emit(data)
  }

  constructor(http: HttpClient) {
    this.http = http;
  }

  private fb = inject(FormBuilder);
  BankBranchForm = this.fb.group({
    Bank: [null,],
    Branch: [null,],
    District: [null,],
  });
  
  onSubmit(formValue: any) {
    let bankKey = formValue['Bank']
    let districtKey = formValue['District']
    console.log(districtKey)
    //"http://localhost/awd/index.php?controller=branch&district_key=(key)&bank_key=(key)"
    let url = "http://localhost:80/awd/index.php?controller=branch&" 
    if (bankKey && districtKey) {
      url += "bank_key=" + bankKey + "&district_key=" + districtKey
    } else if (bankKey) {
      url += "bank_key=" + bankKey
    } else if (districtKey) {
      url += "district_key=" + districtKey
    } else {
      console.log('Please provide bank or district.')
      return;
    }

    console.log(url)
    let slave = this.http.get(url);
    slave.subscribe(
      {
        next: (res) => {
          console.log(res)
          this.sendData(res)

        },
        error: (err) => {
          console.log(err)
        }
      }
    )


  };

  ngOnInit() {
    this.getbanklist()
    this.getdistrictlist()
  };

  getbanklist() {
    let url = 'http://localhost:80/awd/index.php?controller=bank'
    let slave = this.http.get(url)
    slave.subscribe({
      next: (res) => {
        console.log(res)
        this.banklist = JSON.parse(JSON.stringify(res))['header'].result
      },
      error: (err) => {
        console.log(err);
      }
    })
  };

  getdistrictlist() {
    let url = 'http://localhost:80/awd/index.php?controller=district'
    let slave = this.http.get(url)
    slave.subscribe({
      next: (res) => {
        console.log(res)
        this.districtlist = JSON.parse(JSON.stringify(res))['header'].result
      },
      error: (err) => {
        console.log(err);
      }
    })
  };
}