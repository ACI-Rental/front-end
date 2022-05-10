import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  selectOpen: boolean = false;
  currentOption: string = 'Angular';
  options: Array<any> = [
    {
      name: 'Angular',
      abbr: 'angular',
      active: true,
    },
    {
      name: 'Is',
      abbr: 'is',
      active: true,
    },
    {
      name: 'Kak',
      abbr: 'kak',
      active: true,
    },
  ];

  private justOpened = false;

  private optionsRef: any;
  @ViewChild('optionsBx', { static: false }) set optionsBx(elRef: ElementRef) {
    this.optionsRef = elRef;
  }

  @HostListener('document:click', ['$event'])
  onClick(ev: any) {
    if (
      this.selectOpen &&
      ev.target !== this.optionsRef?.current &&
      !this.optionsRef?.current?.contains(ev.target) &&
      !this.justOpened
    ) {
      this.selectOpen = false;
    }
  }

  constructor() {}

  ngOnInit(): void {}

  openSelect() {
    this.selectOpen = !this.selectOpen;
    this.justOpened = true;
    setTimeout(() => (this.justOpened = false), 200);
  }

  changeOption(abbr: any) {
    const updatedOptions = this.options.map((child) => {
      if (abbr === child.abbr) {
        return { ...child, active: true };
      } else {
        return { ...child, active: false };
      }
    });

    this.options = updatedOptions;
    this.currentOption = updatedOptions?.find((option) => option.active)?.name;
  }
}
