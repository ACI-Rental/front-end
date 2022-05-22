import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, SimpleChanges, OnChanges } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() headers: Array<string> = [];
  @Input() data: Array<any> = [];

  @Input() title: string = "";
  @Input() totalCount: number = 0;

  selectOpen: boolean = false;
  rowsVisible: number = 5;
  options: Array<any> = [5, 10, 15, 20, 50];

  oldData: Array<any> = [];

  currentlySorting: any = {};

  Array = Array;

  pageNumber: number = 1;
  maxPages: number = 1;

  visibleRowAmount: number = 0;

  search: string = "";

  private justOpened = false;

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

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!_.isEmpty(changes["data"]?.currentValue)) {
      this.maxPages = Math.ceil(changes["data"]?.currentValue?.length / this.rowsVisible);

      this.visibleRowAmount = this.filterData()?.length;

      let updatedData = _.cloneDeep(changes["data"]?.currentValue);
      this.oldData = changes["data"]?.currentValue;

      const containsObject = updatedData.some((row: any) => typeof row[this.currentlySorting?.name] === 'object')
      updatedData = _.orderBy(updatedData, [containsObject ? `${this.currentlySorting?.name}.value` : this.currentlySorting?.name], [this.currentlySorting?.order])

      this.data = updatedData
    }
  }

  searchTable(e: any) {
    this.search = e.target.value;

    this.visibleRowAmount = this.filterData()?.length;
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
      this.oldData = [];
      this.currentlySorting = {};
    }
    else {
      if (order === 'desc' && _.isEmpty(this.currentlySorting)) {
        this.oldData = updatedData;
      }

      const containsObject = updatedData.some((row) => typeof row[updatedHeader] === 'object')
      updatedData = _.orderBy(updatedData, [containsObject ? `${updatedHeader}.value` : updatedHeader], [order])

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
    if (typeof data === 'object') {
      return typeof data?.value === 'boolean'
    }

    return typeof data === 'boolean';
  }

  isTrue(data: any) {
    if (typeof data === 'object') {
      return data?.value;
    }

    return data;
  }

  checkAlignment(header: string) {
    let alignment = null;

    this.data?.forEach((row) => {
      const colValue = row[this.turnStringToCamelCase(header)];

      if (typeof colValue === 'object') {
        alignment = colValue?.align;
      }
    })

    return alignment;
  }

  openSelect() {
    this.selectOpen = !this.selectOpen;
    this.justOpened = true;
    setTimeout(() => (this.justOpened = false), 200);
  }

  changeOption(key: any) {
    this.rowsVisible = key;
    this.maxPages = Math.ceil(this.data?.length / this.rowsVisible);

    this.visibleRowAmount = this.filterData()?.length;
  }

  changePage(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > this.maxPages) {
      return;
    }

    this.pageNumber = pageNumber;
    this.visibleRowAmount = this.filterData()?.length;
  }

  filterData() {
    return this.data?.
      filter((row) => {
        let showRow = false;

        _.forOwn(row, (value, key) => {
          if (typeof value === 'string' && value?.toLowerCase().includes(this.search.toLowerCase())) {
            showRow = true;
          }

          if (typeof value === 'object' && typeof value?.value === 'string' && value?.value?.toLowerCase().includes(this.search.toLowerCase())) {
            showRow = true;
          }
        })

        return showRow;
      })?.
      filter((row, index) => (index < (this.rowsVisible * this.pageNumber)) && (index >= (this.rowsVisible * (this.pageNumber - 1))))
  }

  containsActions() {
    return this.data?.some(item => Array.isArray(item?.actions))
  }
}