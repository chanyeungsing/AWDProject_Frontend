import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CrudService } from '../crud/crud.service';
import {
  ApiResponse,
  Bank,
  Branch,
  Column,
  District,
  ExportColumn,
} from '../crud/crud.model';
import { SearchService } from './search.service';

interface Criteria {
  district_key: string;
  bank_key: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    EditorModule,
    RatingModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule,
  ],
  templateUrl: './search.component.html',
  providers: [MessageService, ConfirmationService],
})
export class SearchComponent implements OnInit {
  districtResult!: District[];

  bankResult!: Bank[];

  branchResult!: Branch[];

  districtOptions: any;

  bankOptions: any;

  criteria = {} as Criteria;

  branches = signal<any[]>([]);

  branchDialog: boolean = false;

  branch!: Branch;

  selectedBranchs!: any[] | null;

  @ViewChild('dt') dt!: Table;

  exportColumns!: ExportColumn[];

  cols!: Column[];

  nextBranchKey!: string;

  isShowResults: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private crudService: CrudService,
    private searchService: SearchService
  ) {}
  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    await this.loadAll();

    this.cols = [
      { field: 'branch_key', header: 'Branch Key' },
      { field: 'district_en', header: 'District' },
      { field: 'bank_name_en', header: 'Bank Name' },
      { field: 'branch_name', header: 'Branch Name' },
      { field: 'address', header: 'Address' },
      { field: 'is_active', header: 'Active' },
    ];
  }

  async loadAll(): Promise<void> {
    try {
      const district: ApiResponse = await this.crudService.getAll<ApiResponse>(
        'district'
      );
      const bank: ApiResponse = await this.crudService.getAll<ApiResponse>(
        'bank'
      );
      this.districtResult = district.header.result;
      this.bankResult = bank.header.result;

      this.districtOptions = this.districtResult.map((item) => ({
        name: item.district_en,
        key: item.district_key,
      }));
      this.bankOptions = this.bankResult.map((item) => ({
        name: item.bank_name_en,
        key: item.bank_key,
      }));
    } catch (err) {
      console.error('loadAll function fail: ', err);
    }
  }

  refreshBranches(res: any[]) {
    res = res.map((item) => ({
      ...item,
      district_en: this.districtResult.find(
        (d) => d.district_key == item.district_key
      )?.district_en,
      bank_name_en: this.bankResult.find((b) => b.bank_key == item.bank_key)
        ?.bank_name_en,
      branch_key: Number(item.branch_key),
      latitude: item.latitude == 'null' ? null : item.latitude,
      longitude: item.longitude == 'null' ? null : item.longitude,
    }));
    this.branches.set(res);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openDetail(branch: any) {
    this.branch = { ...branch };
    this.branchDialog = true;
  }

  closeDialog() {
    this.branchDialog = false;
  }

  async search(): Promise<void> {
    try {
      this.isShowResults = true;
      const branch: ApiResponse =
        await this.searchService.getByKey<ApiResponse>('branch', this.criteria);
      this.branchResult = branch.header.result;

      this.refreshBranches(this.branchResult);
    } catch (err) {
      console.error('search function fail: ', err);
    }
  }

  reset() {
    this.criteria = {} as Criteria;
    this.isShowResults = false;
    this.branches.set([]);
  }
}
