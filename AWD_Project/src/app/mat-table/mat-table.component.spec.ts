import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableComponent } from './mat-table.component';

describe('MatTableComponent', () => {
  let component: MatTableComponent;
  let fixture: ComponentFixture<MatTableComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
