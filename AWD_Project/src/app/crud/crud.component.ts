import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
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
import { HttpClient } from '@angular/common/http';
// import branch from 'src/assets/data/branch.json';

interface Column {
    field: string;
    header: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

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
        ConfirmDialogModule
    ],
    templateUrl: './crud.component.html',
    providers: [MessageService, ConfirmationService]
})
export class CrudComponent implements OnInit {
    districtResult: any[] = [{ "district_key": 1, "district_en": "Yuen Long", "district_tc": null, "district_sc": null }, { "district_key": 2, "district_en": "Yau Tsim Mong", "district_tc": null, "district_sc": null }, { "district_key": 3, "district_en": "Wong Tai Sin", "district_tc": null, "district_sc": null }, { "district_key": 4, "district_en": "Wan Chai", "district_tc": null, "district_sc": null }, { "district_key": 5, "district_en": "Tuen Mun", "district_tc": null, "district_sc": null }, { "district_key": 6, "district_en": "Tsuen Wan", "district_tc": null, "district_sc": null }, { "district_key": 7, "district_en": "Tai Po", "district_tc": null, "district_sc": null }, { "district_key": 8, "district_en": "Southern", "district_tc": null, "district_sc": null }, { "district_key": 9, "district_en": "Sham Shui Po", "district_tc": null, "district_sc": null }, { "district_key": 10, "district_en": "Sha Tin", "district_tc": null, "district_sc": null }, { "district_key": 11, "district_en": "Sai Kung", "district_tc": null, "district_sc": null }, { "district_key": 12, "district_en": "Peng Chau", "district_tc": null, "district_sc": null }, { "district_key": 13, "district_en": "Outlying Islands", "district_tc": null, "district_sc": null }, { "district_key": 14, "district_en": "Northern", "district_tc": null, "district_sc": null }, { "district_key": 15, "district_en": "Lantau Island", "district_tc": null, "district_sc": null }, { "district_key": 16, "district_en": "Lamma Island", "district_tc": null, "district_sc": null }, { "district_key": 17, "district_en": "Kwun Tong", "district_tc": null, "district_sc": null }, { "district_key": 18, "district_en": "Kwai Tsing", "district_tc": null, "district_sc": null }, { "district_key": 19, "district_en": "Kowloon City", "district_tc": null, "district_sc": null }, { "district_key": 20, "district_en": "Islands", "district_tc": null, "district_sc": null }, { "district_key": 21, "district_en": "Eastern", "district_tc": null, "district_sc": null }, { "district_key": 22, "district_en": "Cheung Chau", "district_tc": null, "district_sc": null }, { "district_key": 23, "district_en": "Central and Western", "district_tc": null, "district_sc": null }];

    bankResult: any[] = [{ "bank_key": 1, "bank_name_en": "Industrial and Commercial Bank of China (Asia) Limited", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 2, "bank_name_en": "Bank of Communications (Hong Kong) Limited", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 3, "bank_name_en": "Standard Chartered Bank (Hong Kong) Limited", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 4, "bank_name_en": "Hang Seng Bank Limited", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 5, "bank_name_en": "The Hongkong and Shanghai Banking Corporation Limited", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 6, "bank_name_en": "The Bank of East Asia Limited", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 7, "bank_name_en": "Shanghai Commercial Bank Limited", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 8, "bank_name_en": "Public Bank (Hong Kong) Limited", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 9, "bank_name_en": "OCBC Bank (Hong Kong) Limited", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 10, "bank_name_en": "Nanyang Commercial Bank,Limited", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 11, "bank_name_en": "Fubon Bank (Hong Kong) Limited", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 12, "bank_name_en": "Dah Sing Bank", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 13, "bank_name_en": "DBS Bank (Hong Kong) Limited", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 14, "bank_name_en": "Citibank (Hong Kong) Limited", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 15, "bank_name_en": "Chong Hing Bank", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 16, "bank_name_en": "China Construction Bank (Asia)", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 17, "bank_name_en": "China CITIC Bank International Limited", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 18, "bank_name_en": "CMB Wing Lung Bank", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 19, "bank_name_en": "Bank of China (Hong Kong) Limited", "bank_name_tc": null, "bank_name_sc": null }, { "bank_key": 20, "bank_name_en": "Chiyu Banking Corporation Limited", "bank_name_tc": null, "bank_name_sc": null }];

    branchResult: any[] = [{ "branch_key": 1, "district_key": 1, "bank_key": 1, "branch_name": "Yuen Long Branch", "address": "G/F,197-199 Castle Peak Road,Yuen Long,New Territories", "service_hours": "Mon-Thu,09:00 - 17:00;;Fri,09:00 - 17:30; ;Sat,09:00 - 13:00;;Closed on Sun and public holiday", "latitude": "22.44472", "longitude": "114.02617", "barrier_free_access": "Assisted listening systems available,Wheelchair accessible counters or meeting rooms,Guide dogs welcome", "barrier_free_access_code": "", "is_active": 1 }, { "branch_key": 2, "district_key": 1, "bank_key": 2, "branch_name": "Yuen Long Branch", "address": "Shop 2A-2B,G/F,Man Yu Building,2-14 Tai Fung Street,Yuen Long,New Territories", "service_hours": "Mon - Fri :9:00 AM to 5:00 PM,Sat :9:00 AM to 1:00 PM", "latitude": "22.445801", "longitude": "114.030125", "barrier_free_access": "Permanent or temporary ramp,Call button,Guide dogs welcome,Assisted listening systems available", "barrier_free_access_code": "", "is_active": 1 }, { "branch_key": 3, "district_key": 1, "bank_key": 2, "branch_name": "Tin Shui Wai Branch", "address": "+WOO (Phase 1),12-18 Tin Yan Road,Tin Shui Wai,New Territories", "service_hours": "Mon - Fri :9:00 AM to 5:00 PM,Sat :9:00 AM to 1:00 PM", "latitude": "22.457611", "longitude": "114.002472", "barrier_free_access": "Permanent or temporary ramp,Call button,Guide dogs welcome,Assisted listening systems available", "barrier_free_access_code": "", "is_active": 1 }, { "branch_key": 4, "district_key": 1, "bank_key": 3, "branch_name": "Yuen Long Branch", "address": "Shops G4-G6,G/F and Shops 101,108-110,1/F,Yuen Long Landmark,123 Castle Peak Road - Yuen Long,Yuen Long,New Territories", "service_hours": "Monday:09:00 AM - 05:00 PM<br>...", "latitude": "22.4445733", "longitude": "114.0282491", "barrier_free_access": "Call button,Guide Dogs Welcome,Hotline number of the branch displayed,Permanent or temporary ramp,Provision of Assistive Listening System,Wheelchair accessible counters or meeting rooms", "barrier_free_access_code": "", "is_active": 0 }, { "branch_key": 5, "district_key": 1, "bank_key": 3, "branch_name": "Tin Shui Wai North Express Banking Centre", "address": "Shop 105F,1/F,Tin Chak Shopping Centre,77 Tin Shui Road,Tin Shui Wai,New Territories", "service_hours": "Monday:09:00 AM - 11:00 AM & 12:30 PM - 05:00 PM<br>...", "latitude": "22.4683451", "longitude": "113.9986694", "barrier_free_access": "Guide Dogs Welcome,Hotline number of the branch displayed,Provision of Assistive Listening System,Wheelchair accessible counters or meeting rooms", "barrier_free_access_code": "", "is_active": 1 }, { "branch_key": 6, "district_key": 1, "bank_key": 3, "branch_name": "Tin Shui Wai Branch", "address": "Shop L105,1/F,Tin Yiu Plaza,Tin Yiu Estate,Tin Shui Wai,New Territories", "service_hours": "Monday:09:00 AM - 05:00 PM<br>...", "latitude": "22.450789", "longitude": "114.00231", "barrier_free_access": "Guide Dogs Welcome,Hotline number of the branch displayed,Provision of Assistive Listening System,Wheelchair accessible counters or meeting rooms", "barrier_free_access_code": "", "is_active": 1 }, { "branch_key": 7, "district_key": 1, "bank_key": 4, "branch_name": "Yuen Long Branch", "address": "93 Castle Peak Road - Yuen Long", "service_hours": "Monday:09:00-17:00; Tuesday:09:00-17:00; Wednesday:09:00-17:00; Thursday:09:00-17:00; Friday:09:00-17:00; Saturday:09:00-13:00", "latitude": "22.4447119", "longitude": "114.0290114", "barrier_free_access": "Wheelchair accessible counters or meeting rooms,Guide dogs welcome,Assisted listening systems,Call button", "barrier_free_access_code": "", "is_active": 1 }, { "branch_key": 8, "district_key": 1, "bank_key": 4, "branch_name": "Yuen Long (Kau Yuk Road) Branch", "address": "1/F,Fu Ho Building,5 Kau Yuk Road", "service_hours": "Monday:09:00-17:00; Tuesday:09:00-17:00; Wednesday:09:00-17:00; Thursday:09:00-17:00; Friday:09:00-17:00; Saturday:09:00-13:00", "latitude": "22.4428813", "longitude": "114.0281532", "barrier_free_access": "Wheelchair accessible counters or meeting rooms,Guide dogs welcome,Assisted listening systems", "barrier_free_access_code": "", "is_active": 1 }, { "branch_key": 9, "district_key": 1, "bank_key": 4, "branch_name": "Tin Shui Wai Branch", "address": "Shop 122,1/F,+WOO (Phase 2),12-18 Tin Yan Road,Tin Shui Wai", "service_hours": "Monday:09:00-17:00; Tuesday:09:00-17:00; Wednesday:09:00-17:00; Thursday:09:00-17:00; Friday:09:00-17:00; Saturday:09:00-13:00", "latitude": "22.4568918", "longitude": "114.0035091", "barrier_free_access": "Wheelchair accessible counters or meeting rooms,Guide dogs welcome,Assisted listening systems", "barrier_free_access_code": "", "is_active": 1 }, { "branch_key": 10, "district_key": 1, "bank_key": 4, "branch_name": "Mobile Branch - Long Shin Estate (Every Tuesday)", "address": "Site near Shin Leung House,Long Shin Estate", "service_hours": "Tuesday:09:30-17:00", "latitude": "22.442257", "longitude": "114.045284", "barrier_free_access": "Wheelchair accessible counters or meeting rooms,Guide dogs welcome,Assisted listening systems", "barrier_free_access_code": "", "is_active": 1 }, { "branch_key": 11, "district_key": 1, "bank_key": 4, "branch_name": "Mobile Branch - Hung Fuk Estate (Every Friday)", "address": "Loading / Unloading space near Hung Lok House,Hung Fuk Estate", "service_hours": "Friday:09:30-17:00", "latitude": "22.4372618", "longitude": "113.9981308", "barrier-free_access": "Wheelchair accessible counters or meeting rooms,Guide dogs welcome,Assisted listening systems", "barrier-free_access_code": "", "is_active": 1 }, { "branch_key": 12, "district_key": 1, "bank_key": 5, "branch_name": "Yuen Long Premier Centre", "address": "1/F,HSBC Building Yuen Long,150-160 Castle Peak Road,Yuen Long,New Territories", "service_hours": "Monday:09:00-16:30<br>Tuesday:09:00-16:30<br>Wednesday:09:00-16:30<br>Thursday:09:00-16:30<br>Friday:09:00-17:00<br>Saturday:09:00-13:00", "latitude": "22.444287", "longitude": "114.027399", "barrier-free_access": "Permanent or temporary ramp,Wheelchair accessible counters or meeting rooms,Guide dogs welcome,Assisted listening systems available", "barrier-free_access_code": "", "is_active": 1 }, { "branch_key": 13, "district_key": 1, "bank_key": 5, "branch_name": "Yuen Long Branch", "address": "Basement,G/F & 2/F,HSBC Building Yuen Long,150-160 Castle Peak Road,Yuen Long,New Territories", "service_hours": "Monday:09:00-16:30<br>Tuesday:09:00-16:30<br>Wednesday:09:00-16:30<br>Thursday:09:00-16:30<br>Friday:09:00-17:00<br>Saturday:09:00-13:00", "latitude": "22.444299", "longitude": "114.027452", "barrier-free_access": "Permanent or temporary ramp,Wheelchair accessible counters or meeting rooms,Guide dogs welcome,Assisted listening systems available", "barrier-free_access_code": "", "is_active": 1 }, { "branch_key": 14, "district_key": 1, "bank_key": 5, "branch_name": "Tin Shui Wai Branch", "address": "+WOO Phase 2,Tin Shui Wai", "service_hours": "Monday:09:00-16:30<br>...", "latitude": "22.456582", "longitude": "114.003406", "barrier-free_access": "...", "barrier-free_access_code": "", "is_active": 1 }, { "branch_key": 15, "district_key": 1, "bank_key": 5, "branch_name": "Mobile Branch - Tin Heng Estate (Every Thursday)", "address": "Tin Heng Estate,Tin Shui Wai", "service_hours": "Thursday:09:00-17:00", "latitude": "22.469562", "longitude": "113.998429", "barrier-free_access": "...", "barrier-free_access_code": "", "is_active": 1 }, { "branch_key": 16, "district_key": 1, "bank_key": 5, "branch_name": "Mobile Branch - South Site of Light Public Housing at Yau Pok Road", "address": "South Site of Light Public Housing at Yau Pok Road", "service_hours": "Monday:09:00-17:00", "latitude": "22.474802", "longitude": "114.050392", "barrier-free_access": "...", "barrier-free_access_code": "", "is_active": 1 }, { "branch_key": 17, "district_key": 1, "bank_key": 6, "branch_name": "Yuen Long i-Teller", "address": "G/F,77 Castle Peak Road,Yuen Long", "service_hours": "Mon-Sat,09:00 - 19:00", "latitude": "22.444588", "longitude": "114.029541", "barrier-free_access": "...", "barrier-free_access_code": "", "is_active": 1 }, { "branch_key": 18, "district_key": 1, "bank_key": 6, "branch_name": "Yuen Long SupremeGold Centre", "address": "1/F,77 Castle Peak Road,Yuen Long", "service_hours": "Mon-Fri,09:00 - 17:00", "latitude": "22.444588", "longitude": "114.029541", "barrier-free_access": "...", "barrier-free_access_code": "", "is_active": 1 }, { "branch_key": 19, "district_key": 1, "bank_key": 6, "branch_name": "Yuen Long Branch", "address": "G/F,77 Castle Peak Road,Yuen Long", "service_hours": "Mon-Fri,09:00 - 17:00", "latitude": "22.444588", "longitude": "114.029541", "barrier-free_access": "...", "barrier-free_access_code": "", "is_active": 1 }, { "branch_key": 20, "district_key": 1, "bank_key": 6, "branch_name": "Tin Shui Wai i-Teller", "address": "+WOO Phase 2,Tin Shui Wai", "service_hours": "Mon-Sat,09:00 - 19:00", "latitude": "22.457358", "longitude": "114.004225", "barrier-free_access": "...", "barrier-free_access_code": "", "is_active": 1 }, { "branch_key": 21, "district_key": 1, "bank_key": 6, "branch_name": "Tin Shui Wai One Sky Mall i-Teller", "address": "One Sky Mall,Tin Shui Wai", "service_hours": "Mon-Sat,09:00 - 19:00", "latitude": "22.4644", "longitude": "114.003754", "barrier-free_access": "...", "barrier-free_access_code": "", "is_active": 1 }];

    districtOptions: any;

    bankOptions: any;

    branchDialog: boolean = false;

    branches = signal<any[]>([]);

    branch!: any;

    selectedBranchs!: any[] | null;

    submitted: boolean = false;

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private http: HttpClient
    ) { }

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.districtOptions = this.districtResult.map(item => ({ district: item.district_en, key: item.district_key }));
        this.bankOptions = this.bankResult.map(item => ({ bank: item.bank_name_en, key: item.bank_key }));
        this.refreshBranches(this.branchResult);

        this.cols = [
            { field: 'branch_key', header: 'Branch Key' },
            { field: 'district_en', header: 'District' },
            { field: 'bank_name_en', header: 'Bank Name' },
            { field: 'branch_name', header: 'Branch Name' },
            { field: 'address', header: 'Address' },
            { field: 'is_active', header: 'Active' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    refreshBranches(res: any[]){
        res = res.map(item => ({ ...item, 'district_en': this.districtResult.find(d => d.district_key == item.district_key).district_en })).map(item => ({ ...item, 'bank_name_en': this.bankResult.find(b => b.bank_key == item.bank_key).bank_name_en }));
        this.branches.set(res);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.branch = {};
        this.submitted = false;
        this.branchDialog = true;
    }

    editBranch(branch: any) {
        this.branch = { ...branch };
        this.branchDialog = true;
    }

    deleteSelectedBranchs() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected branches?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.branches.set(this.branches().filter((val) => !this.selectedBranchs?.includes(val)));
                this.selectedBranchs = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Branchs Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.branchDialog = false;
        this.submitted = false;
    }

    deleteBranch(branch: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the branch?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.refreshBranches(this.branches().filter((val) => val.id !== branch.id));
                this.branch = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Branch Deleted',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.branches().length; i++) {
            if (this.branches()[i].branch_key === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    saveBranch() {
        this.submitted = true;
        let _branches = this.branches();
        if (this.branch.district_key && this.branch.bank_key && this.branch.branch_name && this.branch.address && this.branch.is_active) {
            if (this.branch.id) {
                _branches[this.findIndexById(this.branch.branch_key)] = this.branch;
                this.refreshBranches([..._branches]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Branch Updated',
                    life: 3000
                });
            } else {
                this.branch.image = 'branch-placeholder.svg';
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Branch Created',
                    life: 3000
                });
                this.refreshBranches([..._branches, this.branch]);
            }

            this.branchDialog = false;
            this.branch = {};
        }
    }
}
