import { Component, computed, inject, signal } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DigitOnlyDirective } from '../../shared/directives/digit-only.directive';
import { MurCurrencyPipe } from '../../shared/pipes/mur-currency.pipe';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpService } from '../../shared/services/http.service';
import { ClientFormComponent } from './client-form/client-form.component';

@Component({
    selector: 'app-clients',
    imports: [
        TableModule,
        MultiSelectModule,
        SelectModule,
        InputIconModule,
        TagModule,
        InputTextModule,
        ToggleButtonModule,
        ToastModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        RatingModule,
        RippleModule,
        IconFieldModule,
        DialogModule,
        ClientFormComponent,
        MurCurrencyPipe,
        DigitOnlyDirective,
        DeleteConfirmationDialogComponent
    ],
    templateUrl: './clients.component.html',
    styleUrl: './clients.component.scss'
})
export class ClientsComponent {
    httpService = inject(HttpService);
    clients: any = [];
    clientsSignal = computed(() => signal(this.clients()));
    loading: unknown;

    name: any;
    make: any;
    model: any;
    year: any;
    color: any;
    vehicleTypes: any[] | undefined;
    type: any;
    regNo: any;
    ownerName: any;

    contactNumber: any;

    isCreateClientDialogVisible = false;

    client = {
        make: '',
        model: '',
        year: '',
        color: '',
        type: '',
        regNo: '',
        ownerName: '',
        contactNumber: ''
    };

    constructor() {
        this.clients = toSignal(this.httpService.getClients());
    }

    onDeleteClientCLick(arg0: any) {
        throw new Error('Method not implemented.');
    }
    updateClient(_t34: any, arg1: string, $event: FocusEvent) {
        throw new Error('Method not implemented.');
    }
    onGlobalFilter(_t15: Table, $event: Event) {
        throw new Error('Method not implemented.');
    }
    clear(_t15: Table) {
        throw new Error('Method not implemented.');
    }
    showNewClientDialog() {
        this.isCreateClientDialogVisible = true;
    }
    hideCreateClientDialog() {
        this.isCreateClientDialogVisible = false;
    }

    createClient() {
        this.isCreateClientDialogVisible = false;
        this.client.year = String(new Date(this.client.year).getFullYear());
        this.clientsSignal().update((c) => [...c, this.client]);
        this.httpService.createClient(this.client).subscribe((response) => {
            this.resetClient();
            console.log(response);
        });
        console.log(this.client);
    }

    resetClient() {
        this.client = {
            make: '',
            model: '',
            year: '',
            color: '',
            type: '',
            regNo: '',
            ownerName: '',
            contactNumber: ''
        };
    }
}
