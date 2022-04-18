import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product/product.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  @Input() filterOpen: boolean = false;
  @Output() filterOpenChange = new EventEmitter<boolean>();

  modalOpen: boolean = false;

  moment: any = moment

  products: Array<any> = [];

  product: any = null;

  startDate: any;
  endDate: any;

  startDateSub: Subscription = Subscription.EMPTY;
  endDateSub: Subscription = Subscription.EMPTY;

  constructor(private sharedService: SharedService, private productService: ProductService, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.startDateSub = this.sharedService.startDate.subscribe(startDate => this.startDate = startDate)
    this.endDateSub = this.sharedService.endDate.subscribe(endDate => this.endDate = endDate)

    this.productService.getAllProducts().subscribe((response) => {
      this.products = response;
    })
  }

  ngAfterViewInit() {
    const productDescriptions = document.getElementsByClassName('product_description');

    for (let i = 0; i < productDescriptions.length; i++) {
      const productDescriptionEl: any = productDescriptions[i];

      if (productDescriptionEl.offsetHeight < productDescriptionEl.scrollHeight ||
        productDescriptionEl.offsetWidth < productDescriptionEl.scrollWidth) {
        productDescriptionEl.nextSibling.classList.add('show')
      } else {
        productDescriptionEl.nextSibling.classList.remove('show')
      }
    }
  }

  openFilters() {
    this.filterOpen = true;
    this.filterOpenChange.emit(true)
  }

  openModal(product: any) {
    this.modalOpen = true;

    this.product = product;
  }

  reserveProduct() {
    if (this.endDate == null || this.startDate == null) {
      return;
    }

    const data = {
      productId: this.product.id,
      renterId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      startDate: this.startDate?.toDate(),
      endDate: this.endDate?.toDate()
    }

    this.reservationService.ReserveProduct(data).subscribe((response) => {
      this.products = response;
    })
  }
}
