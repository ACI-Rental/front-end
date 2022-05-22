import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.scss']
})
export class ProductInventoryComponent implements OnInit {
  headers: Array<string> = ['Catalog Position', 'Name', 'Description', 'Location', 'Barcode', 'Category', 'Status', 'Archived', 'Requires approval'];
  data: Array<any> = [];

  totalCount: number = 0;

  modalOpen: boolean = false;
  productId: any = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.productService.getInventory().subscribe((response) => {
      this.data = response.map((product: any) => ({
        id: product?.id,
        name: product.name,
        description: product.description,
        location: product?.location,
        barcode: { value: "328472359", align: 'center' },
        category: { value: product?.categoryName, align: 'center' },
        status: { value: "Available", align: 'center', tag: true, tagAvailable: true },
        archived: { value: product?.archived, align: 'center' },
        requiresApproval: { value: product?.requiresApproval, align: 'center' },
        catalogPosition: { value: product?.catalogPosition + 1, align: 'center' },
        actions: [{
          icon: 'pencil',
          function: () => this.editProduct(product?.id),
          color: '#f0932b'
        },
        {
          icon: 'box-archive',
          function: () => this.archiveProduct(product?.id, !product?.archived),
          color: '#eb4d4b'
        }],
      }));

      this.totalCount = response?.length;
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

  archiveProduct(id: any, archived: boolean) {
    this.productService.archiveProduct({ id, archived }).subscribe(response => {
      if (!response.error) {
        this.getData();
        this.Notify('success', 'Product archived!')
      }
    },
      (err) => {
        this.Notify('error', err.error.message || 'Something went wrong.')
      })
  }

  Notify(status: SweetAlertIcon, message: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      title: message,
      icon: status,
    });
  }
}
