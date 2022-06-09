import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationRequestsComponent } from './reservation-requests.component';

describe('ReservationRequestsComponent', () => {
  let component: ReservationRequestsComponent;
  let fixture: ComponentFixture<ReservationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
