import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as _ from 'lodash';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() headers: Array<string> = [];
  @Input() data: Array<any> = [];

  oldData: Array<any> = [];

  selectOpen: boolean = false;
  currentOption: string = 'Select a category...';
  options: Array<any> = [];

  currentlySorting: any = {};

  Array = Array;

  private optionsRef: any;
  @ViewChild('optionsBx', { static: false }) set optionsBx(elRef: ElementRef) {
    this.optionsRef = elRef;
  }

  @HostListener('document:click', ['$event'])
  onClick(ev: any) {
    ev.stopPropagation();

    if (
      this.selectOpen &&
      ev.target !== this.optionsRef?.current &&
      !this.optionsRef?.current?.contains(ev.target) &&
      !this.justOpened
    ) {
      this.selectOpen = false;
    }
  }

  private justOpened = false;

  constructor(private categoryService: CategoryService) { }


  ngOnInit(): void {

    this.categoryService.getAllCategories().subscribe((response) => {
      this.options = response.map((category: any) => ({
        name: category?.name,
        key: category?.id,
        active: false
      }))
    });
  }

  openSelect() {
    this.selectOpen = !this.selectOpen;
    this.justOpened = true;
    setTimeout(() => (this.justOpened = false), 200);
  }

  changeOption(key: any) {
    const updatedOptions = this.options.map((child) => {
      if (key === child.key) {
        return { ...child, active: true };
      } else {
        return { ...child, active: false };
      }
    });


    this.options = updatedOptions;
    this.currentOption = updatedOptions?.find((option) => option.active)?.name;
  }

  sortTable(header: any) {
    let updatedData = _.cloneDeep(this.data);
    const updatedHeader = this.turnStringToCamelCase(header);
    let order: any = 'desc';

    if (this.currentlySorting?.name === updatedHeader) {
      if (this.currentlySorting?.order === 'asc') {
        order = 'none';
      }

      if (this.currentlySorting?.order === 'desc') {
        order = 'asc';
      }
    }

    if (order === 'none') {
      updatedData = this.oldData;
      this.currentlySorting = {};
    }
    else {
      if (order === 'desc' && _.isEmpty(this.currentlySorting)) {
        this.oldData = updatedData;
      }

      updatedData = _.orderBy(updatedData, [updatedHeader], [order])

      this.currentlySorting = { name: updatedHeader, order }
    }

    this.data = updatedData;
  }

  turnStringToCamelCase(string: string) {
    const words = string.split(" ").map((word, index) => {
      let newWord = word;

      if (/[/]+/.test(word)) {
        newWord = word
          .split("/")
          .map((w) => (w = w[0].toUpperCase() + w.substr(1)))
          .join("Or");
      }

      if (/[-]+/.test(word)) {
        newWord = word
          .split("-")
          .map((w) => (w = w[0].toUpperCase() + w.substr(1)))
          .join("");
      }

      if (index === 0) {
        newWord = newWord = newWord[0].toLowerCase() + newWord.substr(1);
      } else {
        newWord = newWord = newWord[0].toUpperCase() + newWord.substr(1);
      }

      return newWord;
    });

    return words.join("");
  }

  isBool(data: any) {
    return typeof data === 'boolean';
  }

  containsActions() {
    return this.data?.some(item => Array.isArray(item?.actions))
  }
}