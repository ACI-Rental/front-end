import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
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
export class DropdownComponent implements OnInit {
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

  IsElementOffscreen(el: any) {
    const rect = el?.getBoundingClientRect();

    const res = `${rect?.x < 0 ? 'left' : ''} ${rect?.y < 0 ? 'up' : ''} ${
      rect?.x + rect?.width > window.innerWidth ? 'right' : ''
    } ${rect?.y + rect?.height > window.innerHeight ? 'down' : ''}`;

    return res;
  }

  AdjustPosition() {
    const anchorRect = this.anchor?.getBoundingClientRect();

    const adjustment = {
      x: anchorRect?.x + (this.offset?.x || 0),
      y: anchorRect?.y + (this.offset?.y || 0),
    };
    const rect = this.dropdownRef?.nativeElement?.getBoundingClientRect();

    const isOffscreen = this.IsElementOffscreen(
      this.dropdownRef?.nativeElement
    );

    if (isOffscreen.includes('left')) {
      adjustment.x = 48;
    }

    if (isOffscreen.includes('right')) {
      adjustment.x = window.innerWidth - (rect.width + 48);
    }

    if (isOffscreen.includes('up')) {
      adjustment.y = 8;
    }

    if (isOffscreen.includes('down')) {
      adjustment.y = window.innerHeight - (rect.height + 8);
    }

    this.position = adjustment;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.handlePositioning();
  }
}
