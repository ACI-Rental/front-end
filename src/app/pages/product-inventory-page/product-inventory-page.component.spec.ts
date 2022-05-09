import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInventoryPageComponent } from './product-inventory-page.component';

describe('ProductInventoryPageComponent', () => {
  let component: ProductInventoryPageComponent;
  let fixture: ComponentFixture<ProductInventoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInventoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInventoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
