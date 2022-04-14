import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category/category.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent implements OnInit {

  filters: Array<any> = [
    { name: 'Categories', options: [], type: 'checkbox', open: true },
    { name: 'Availability', options: [{ name: 'All', value: 0 }, { name: 'Available', value: 1 }, { name: 'Unavailable', value: 2 }], default: 'All', type: 'radio', open: true }
  ]

  moment: any = moment;

  startDate: any;
  endDate: any;

  startDateSub: Subscription = Subscription.EMPTY;
  endDateSub: Subscription = Subscription.EMPTY;

  constructor(private categoryService: CategoryService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.startDateSub = this.sharedService.startDate.subscribe(startDate => this.startDate = moment(startDate).format("MMM Do YYYY"))
    this.endDateSub = this.sharedService.endDate.subscribe(endDate => this.endDate = moment(endDate).format("MMM Do YYYY"))

    this.categoryService.getAllCategories().subscribe((response) => {
      const updatedFilters = this.filters;
      const catFilter = updatedFilters.find((filter) => filter.name.toLowerCase() === "categories");

      catFilter.options = response.map((category: any) => ({ name: category.name, value: category.id }))

      this.filters = updatedFilters;
    })
  }

  toggleOpen(filterName: string): void {
    const updatedFilters = this.filters;
    const filter = updatedFilters.find((filter) => filter.name.toLowerCase() === filterName.toLowerCase());

    filter.open = !filter.open;

    this.filters = updatedFilters;
  }
}
