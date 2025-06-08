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

  selectedBranches!: any[] | null;

  submitted: boolean = false;

  @ViewChild('dt') dt!: Table;

  exportColumns!: ExportColumn[];

  cols!: Column[];

  dialogHeader: string = 'Create Branch';

  loading: boolean = false;

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

  closeDialog() {
    this.branchDialog = false;
    this.submitted = false;
  }

  editBranch(branch: any) {
    this.branch = {
      ...branch,
      latitude: branch.latitude ? branch.latitude : null,
      longitude: branch.longitude ? branch.longitude : null,
    };
    this.dialogHeader = 'Edit Branch';
    this.branchDialog = true;
  }

  deleteBranch(branch: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the branch?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'No',
        icon: 'pi pi-times',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Yes',
        icon: 'pi pi-check',
      },
      accept: async () => {
        try {
          const res: ApiResponse = await this.delete(branch.branch_key);
          if (res.header.success) {
            this.branch = {} as Branch;
            await this.loadAll();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Branch Deleted',
              life: 3000,
            });
          } else {
            this.showBackendErrorMessage(res);
          }
        } catch (err) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error Occured',
            detail: 'Failed to delete record',
            life: 3000,
          });
          console.error('delete function fail: ', err);
        }
      },
    });
  }

  deleteSelectedBranches() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected branches?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'No',
        icon: 'pi pi-times',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Yes',
        icon: 'pi pi-check',
      },
      accept: async () => {
        try {
          const branches = this.selectedBranches ?? [];
          if (branches.length > 0) {
            this.loading = true;
            await Promise.all(
              branches.map((item) => this.delete(item.branch_key))
            );
          }
          await this.loadAll();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Branches Deleted',
            life: 3000,
          });
        } catch (err) {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error Occured',
            detail: 'Failed to delete record',
            life: 3000,
          });
          console.error('delete function fail: ', err);
        }
      },
    });
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
      } else {
        this.branch['branch_key'] = '';
        this.create(this.branch);
      }

      this.branchDialog = false;
      this.branch = {} as Branch;
    }
  }

  async loadAll(): Promise<void> {
    try {
      this.loading = true;
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
      this.selectedBranches = null;
      this.loading = false;
    } catch (err) {
      this.loading = false;
      console.error('loadAll function fail: ', err);
    }
  }

  async delete(key: string): Promise<any> {
    return await this.crudService.deleteByKey('branch', key);
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
      const res: ApiResponse = await this.crudService.create(
        'branch',
        formData
      );
      if (res.header.success) {
        await this.loadAll();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Branch Created',
          life: 3000,
        });
      } else {
        this.showBackendErrorMessage(res);
      }
    } catch (err) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Occured',
        detail: 'Failed to create record',
        life: 3000,
      });
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
        branch_key,
        bank_key,
        district_key,
        branch_name,
        address,
        service_hours: this.replaceHtml(service_hours),
        latitude: branch.latitude ? branch.latitude : '',
        longitude: branch.longitude ? branch.longitude : '',
        'barrier-free_access': barrier_free_access,
        'barrier-free_access_code': '',
        is_active,
      };
      const res: ApiResponse = await this.crudService.updateByKey(
        'branch',
        formData
      );
      if (res.header.success) {
        await this.loadAll();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Branch Updated',
          life: 3000,
        });
      } else {
        this.showBackendErrorMessage(res);
      }
    } catch (err) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Occured',
        detail: 'Failed to update record',
        life: 3000,
      });
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

  showBackendErrorMessage(res: ApiResponse) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error Occured',
      detail: res.header.err_msg,
      life: 3000,
    });
  }

  exportCSV() {
    let exportData =
      (this.selectedBranches && this.selectedBranches.length > 0
        ? this.selectedBranches
        : null) ??
      this.dt.filteredValue ??
      this.dt.value;

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
    saveAs(blob, 'BranchData.csv');
  }
}
