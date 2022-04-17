import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  @Input() filterOpen: boolean = false;
  @Output() filterOpenChange = new EventEmitter<boolean>();

  moment: any = moment

  products: Array<any> = [{
    id: '348d01a3-7c0c-459a-9dcd-a1728a2dde4b',
    name: "Product name",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Maecenas mollis rutrum purus et tincidunt.Donec fermentum justo mauris, quis tincidunt sem porta ac.Ut faucibus lacus quis turpis vulputate, placerat commodo erat scelerisque.Donec a eros sodales, pretium magna pharetra, vestibulum tortor.Mauris fermentum elit quis urna elementum facilisis.Pellentesque a odio sed nisi porta convallis sed non lacus.Quisque aliquet ullamcorper rutrum.Etiam id arcu at arcu pretium euismod.',
  }, {
    id: 'a7bc38cc-4c00-4082-92f6-2570031c7713',
    name: "Product name",
    description: 'Insert some random product description'
  }, {
    id: '97d2d075-66a2-4867-84d1-ace72354e81d',
    name: "Product name",
    description: 'Insert some random product description'
  }, {
    id: '4ce733c9-95ed-4a90-a2ec-f7889c42f372',
    name: "Product name",
    description: 'Insert some random product description'
  }, {
    id: '7ab5fbaf-4c82-487d-b9ed-920d05ec440f',
    name: "Product name",
    description: 'Insert some random product description'
  }];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
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
}
