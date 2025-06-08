import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import {
  GoogleMap,
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { ApiResponse, Branch } from '../crud/crud.model';
import { CrudService } from '../crud/crud.service';

@Component({
  selector: 'app-map',
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
    GoogleMapsModule,
  ],
  templateUrl: './map.component.html',
  providers: [MessageService, ConfirmationService],
})
export class MapComponent implements OnInit {
  branches!: Branch[];

  branch = {} as Branch;

  @ViewChild('map') map!: GoogleMap;

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  userPosition!: google.maps.LatLngLiteral;

  center: google.maps.LatLngLiteral = { lat: 22.3193, lng: 114.1694 };

  zoom = 16;

  userIcon: google.maps.Symbol = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    fillColor: '#4285F4',
    fillOpacity: 1,
    strokeColor: 'white',
    strokeWeight: 2,
  };

  bankIcon: google.maps.Icon = {
    url: 'assets/image/bankIcon.png',
    scaledSize: new google.maps.Size(32, 48),
    anchor: new google.maps.Point(16, 48),
  };

  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.loadAll();
    this.goToCurrentLocation();
  }

  async loadAll(): Promise<void> {
    try {
      const branch: ApiResponse = await this.crudService.getAll<ApiResponse>(
        'branch'
      );
      this.branches = branch.header.result;
    } catch (err) {
      console.error('loadAll function fail: ', err);
    }
  }

  goToCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          this.userPosition = coords;
          this.center = coords;
        },
        (err) => {
          console.warn('Geolocation getCurrentPosition function fail', err);
        },
        { timeout: 10000 }
      );
    }
  }

  toNumber(val: string): number {
    return parseFloat(val);
  }

  openInfoWindow(marker: MapMarker, b: Branch) {
    this.branch = b;
    this.infoWindow.open(marker);
  }
}
