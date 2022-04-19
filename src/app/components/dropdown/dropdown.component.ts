import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, OnChanges {
  @Input() anchor: any;
  @Input() offset: any = {};
  @Input() open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();

  private dropdownRef: any;
  @ViewChild('dropdown', { static: false }) set dropdown(elRef: ElementRef) {
    this.dropdownRef = elRef;
  }

  @HostListener('document:click', ['$event'])
  onClick(ev: any) {
    if (
      this.open &&
      ev.target !== this.dropdownRef?.nativeElement?.current &&
      !this.dropdownRef?.nativeElement?.contains(ev.target) &&
      !this.justOpened
    ) {
      this.open = false;
      this.openChange.emit(false);
    }
  }

  justOpened: boolean = false;
  openedBefore: boolean = false;
  position: any = null;

  constructor() {}

  handlePositioning() {
    if (!open) {
      return;
    }

    this.AdjustPosition();

    this.justOpened = true;
    setTimeout(() => (this.justOpened = false), 200);
  }

  AdjustPosition() {
    const anchorRect = this.anchor?.getBoundingClientRect();
    const dropdownRect =
      this.dropdownRef?.nativeElement?.getBoundingClientRect();

    const dimensions = {
      height: dropdownRect?.height,
      width: dropdownRect?.width,
    };

    const adjustment = {
      x: anchorRect?.x + (this.offset?.x || 0),
      y: anchorRect?.y + (this.offset?.y || 0),
    };

    const isOffscreen = this.IsElementOffscreen(dimensions, adjustment);

    console.log(isOffscreen);

    if (isOffscreen.includes('left')) {
      adjustment.x = 24;
    }

    if (isOffscreen.includes('right')) {
      adjustment.x = window.innerWidth - (dimensions?.width + 24);
    }

    if (isOffscreen.includes('up')) {
      adjustment.y = 24;
    }

    if (isOffscreen.includes('down')) {
      adjustment.y = window.innerHeight - (dimensions?.height + 24);
    }

    this.position = adjustment;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['open']?.currentValue) {
      this.openedBefore = true;
    }

    this.handlePositioning();
  }

  private IsElementOffscreen(size: any = null, pos: any = null) {
    console.log(pos, size);
    const res = `${pos?.x < 16 ? 'left' : ''} ${pos?.y < 16 ? 'up' : ''} ${
      pos?.x + size?.width > window.innerWidth - 16 ? 'right' : ''
    } ${pos?.y + size?.height > window.innerHeight - 16 ? 'down' : ''}`;

    return res;
  }
}
