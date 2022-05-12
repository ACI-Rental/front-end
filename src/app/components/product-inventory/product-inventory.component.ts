import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.scss']
})
export class ProductInventoryComponent implements OnInit {
  headers: Array<string> = ['Name', 'Description', 'Barcode', 'Category', 'Status', 'Archived', 'Requires approval'];
  data: Array<any> = [];


  modalOpen: boolean = false;
  productId: any = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.productService.getAllProducts().subscribe((response) => {
      this.data = response.map((product: any) => ({
        id: product?.id,
        name: product.name,
        description: product.description,
        barcode: "328472359",
        category: product.categoryName,
        status: { value: "Available", tag: true, tagAvailable: true },
        archived: product.isDeleted,
        requiresApproval: product.requiresApproval,
        align: 'center',
        actions: [{
          icon: 'pencil',
          function: () => this.editProduct(product?.id),
          color: '#f0932b'
        },
        {
          icon: 'box-archive',
          function: () => this.archiveProduct(product?.id, !product?.isDeleted),
          color: '#eb4d4b'
        }],
      }));
    });
  }

  productIdChange(value: any) {
    this.productId = value;

    if (value === null) {
      this.getData();
      this.modalOpen = false;
    }
  }

  editProduct(id: any) {
    this.productId = id;
    this.modalOpen = true;
  }

  archiveProduct(id: any, isDeleted: boolean) {
    this.productService.archiveProduct({ id, isDeleted }).subscribe(response => {
      console.log(response)
    })
  }
}
