import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { EditorModule } from 'primeng/editor';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CrudService } from './crud.service';
import {
  District,
  Bank,
  Branch,
  ExportColumn,
  Column,
  ApiResponse,
} from './crud.model';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-crud',
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
  templateUrl: './crud.component.html',
  providers: [MessageService, ConfirmationService],
})
export class CrudComponent implements OnInit {
  districtResult!: District[];

  bankResult!: Bank[];

  branchResult!: Branch[];

  districtOptions: any;

  bankOptions: any;

  branchDialog: boolean = false;

  branches = signal<any[]>([]);

  branch!: Branch;

  selectedBranchs!: any[] | null;

  submitted: boolean = false;

  @ViewChild('dt') dt!: Table;

  exportColumns!: ExportColumn[];

  cols!: Column[];

  nextBranchKey!: string;

  dialogHeader: string = 'Create Branch';

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private crudService: CrudService
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

    const colsTest = [
      { field: 'branch_key', header: 'Branch Key' },
      { field: 'district_en', header: 'District' },
      { field: 'bank_name_en', header: 'Bank Name' },
      { field: 'branch_name', header: 'Branch Name' },
      { field: 'address', header: 'Address' },
    ];

    this.exportColumns = colsTest.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  findNextBranchKey() {
    const branchKeys = this.branchResult.map((item) => Number(item.branch_key));
    this.nextBranchKey = (Math.max(...branchKeys) + 1).toString();
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

  openNew() {
    this.branch = {} as Branch;
    this.branch['is_active'] = 1;
    this.dialogHeader = 'Create Branch';
    this.submitted = false;
    this.branchDialog = true;
  }

  editBranch(branch: any) {
    this.branch = { ...branch };
    this.dialogHeader = 'Edit Branch';
    this.branchDialog = true;
  }

  deleteBranch(branch: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the branch?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        icon: 'pi pi-times',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Save',
        icon: 'pi pi-check',
      },
      accept: async () => {
        this.delete(branch.branch_key);
        this.branch = {} as Branch;
        await this.loadAll();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Branch Deleted',
          life: 3000,
        });
      },
    });
  }

  deleteSelectedBranchs() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected branches?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        icon: 'pi pi-times',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Save',
        icon: 'pi pi-check',
      },
      accept: async () => {
        this.selectedBranchs?.forEach((element) => {
          this.delete(element.branch_key);
        });
        await this.loadAll();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Branchs Deleted',
          life: 3000,
        });
      },
    });
  }

  closeDialog() {
    this.branchDialog = false;
    this.submitted = false;
  }

  saveBranch() {
    this.submitted = true;
    if (
      this.branch.district_key &&
      this.branch.bank_key &&
      this.branch.branch_name &&
      this.branch.address
    ) {
      if (this.branch.branch_key) {
        this.updateByKey(this.branch);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Branch Updated',
          life: 3000,
        });
      } else {
        this.branch['branch_key'] = this.nextBranchKey;
        this.create(this.branch);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Branch Created',
          life: 3000,
        });
      }

      this.branchDialog = false;
      this.branch = {} as Branch;
    }
  }

  async loadAll(): Promise<void> {
    try {
      const district: ApiResponse = await this.crudService.getAll<ApiResponse>(
        'district'
      );
      const bank: ApiResponse = await this.crudService.getAll<ApiResponse>(
        'bank'
      );
      const branch: ApiResponse = await this.crudService.getAll<ApiResponse>(
        'branch'
      );
      this.districtResult = district.header.result;
      this.bankResult = bank.header.result;
      this.branchResult = branch.header.result;

      this.districtOptions = this.districtResult.map((item) => ({
        name: item.district_en,
        key: item.district_key,
      }));
      this.bankOptions = this.bankResult.map((item) => ({
        name: item.bank_name_en,
        key: item.bank_key,
      }));
      this.refreshBranches(this.branchResult);
      this.findNextBranchKey();
      this.selectedBranchs = null;
    } catch (err) {
      console.error('loadAll function fail: ', err);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.crudService.deleteByKey('branch', key);
    } catch (err) {
      console.error('delete function fail: ', err);
    }
  }

  async create(branch: any): Promise<void> {
    try {
      const {
        branch_key,
        bank_key,
        district_key,
        branch_name,
        address,
        service_hours,
        latitude,
        longitude,
        'barrier-free_access': barrier_free_access,
        is_active,
      } = branch;
      const formData = {
        branch_key,
        bank_key,
        district_key,
        branch_name,
        address,
        service_hours: this.replaceHtml(service_hours),
        latitude,
        longitude,
        'barrier-free_access': barrier_free_access,
        'barrier-free_access_code': '',
        is_active,
      };
      await this.crudService.create('branch', formData);
      await this.loadAll();
    } catch (err) {
      console.error('create function fail: ', err);
    }
  }

  async updateByKey(branch: any): Promise<void> {
    try {
      const {
        branch_key,
        bank_key,
        district_key,
        branch_name,
        address,
        service_hours,
        latitude,
        longitude,
        'barrier-free_access': barrier_free_access,
        is_active,
      } = branch;
      const formData = {
        key: branch_key,
        branch_key,
        bank_key,
        district_key,
        branch_name,
        address,
        service_hours: this.replaceHtml(service_hours),
        latitude,
        longitude,
        'barrier-free_access': barrier_free_access,
        'barrier-free_access_code': '',
        is_active,
      };
      await this.crudService.updateByKey('branch', formData);
      await this.loadAll();
    } catch (err) {
      console.error('update function fail: ', err);
    }
  }

  replaceHtml(html: string) {
    return (
      html
        ?.replace(/<p>/gi, '')
        .replace(/<\/p>/gi, '<br>')
        .replace(/(<br>\s*)+$/i, '') || ''
    );
  }

  exportCSV() {
    let exportData =
      this.dt.filteredValue ?? this.selectedBranchs ?? this.dt.value;

    exportData = exportData.map((item) => ({
      ...item,
      is_active: item.is_active == '1' ? 'Yes' : 'No',
    }));

    const cols = [
      { field: 'branch_key', header: 'Branch Key' },
      { field: 'district_en', header: 'District' },
      { field: 'bank_name_en', header: 'Bank Name' },
      { field: 'branch_name', header: 'Branch Name' },
      { field: 'address', header: 'Address' },
      { field: 'service_hours', header: 'Service Hours' },
      { field: 'barrier-free_access', header: 'Barrier Free Access' },
      { field: 'latitude', header: 'Latitude' },
      { field: 'longitude', header: 'Longitude' },
      { field: 'is_active', header: 'Active' },
    ];
    const headers = cols.map((c) => c.header).join(',');
    const rows = exportData.map((row) =>
      cols.map((c) => `"${('' + row[c.field]).replace(/"/g, '""')}"`).join(',')
    );
    const csv = [headers, ...rows].join('\r\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'branches.csv');
  }
}
