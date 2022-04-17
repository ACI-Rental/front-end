import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() filterOpen: boolean = false;
  @Output() filterOpenChange = new EventEmitter<boolean>();

  filters: Array<any> = [
    { name: 'Categories', options: [], selected: [], type: 'checkbox', open: true },
    { name: 'Availability', options: [{ name: 'All', value: 0 }, { name: 'Available', value: 1 }, { name: 'Unavailable', value: 2 }], selected: 0, type: 'radio', open: true }
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

  updateFilter(filterName: any, value: any) {
    const updatedFilters = this.filters;
    const filter = updatedFilters.find((filter) => filter.name.toLowerCase() === filterName.toLowerCase());

    if (filter.type === 'radio') {
      filter.selected = value;
    }

    if (filter.type === 'checkbox') {
      const isSelected = filter.selected.some((option: any) => option === value)

      if (isSelected) {
        filter.selected.splice(filter.selected.indexOf(value), 1)
      }
      else {
        filter.selected.push(value)
      }
    }

    console.log(updatedFilters)

    this.filters = updatedFilters;
  }

  closeFilters() {
    this.filterOpen = false;
    this.filterOpenChange.emit(false)
  }
}
