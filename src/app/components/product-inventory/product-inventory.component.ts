import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.scss']
})
export class ProductInventoryComponent implements OnInit {
  headers: Array<string> = ['Name', 'Description','Barcode', 'Category', 'Status', 'Archived', 'Requires approval', 'Actions'];
  data: Array<any> = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((response) => {
      this.data = response.map((product: any) => ({
        name: product.name,
        description: product.description,
        barcode: "328472359",
        category: product.categoryName,
        status: "Available",
        archived: product.isDeleted,
        requiresApproval: product.requiresApproval,
        actions: "",
      }));
    });
  }

  
}
