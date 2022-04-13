import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Array<any> = [];

  @Input() viewMode = 'list';
  @Output() viewModeChange = new EventEmitter<string>();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((response) => {
      this.products = response;
    })
  }

  changeViewMode(mode: string) {
    this.viewMode = mode;
    this.viewModeChange.emit(mode);
  }
}
