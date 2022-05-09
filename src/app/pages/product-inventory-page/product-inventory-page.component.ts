import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-inventory-page',
  templateUrl: './product-inventory-page.component.html',
  styleUrls: ['./product-inventory-page.component.scss']
})
export class ProductInventoryPageComponent implements OnInit {
  headers: Array<string> = ['Name', 'Id', 'Description', 'Status'];
  data: Array<any> = [];

  constructor(private productServicee: ProductService) {  }

  ngOnInit(): void {
    this.productServicee.getAllProducts().subscribe((response) =>{
      this.data = response.map((product: any) =>({
        name: product.productName,
        id: product.productId,
        description: product.productDescription,
        status: product.ProductStatus,
      }));
    });
  }

}
