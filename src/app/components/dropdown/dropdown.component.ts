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
  @Input() alignment: string = 'left'

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

  constructor() { }

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

    if (this.alignment === 'right') {
      this.position = {
        x: window.innerWidth - (anchorRect?.x + (anchorRect?.width * 1.1)) + (this.offset?.x || 0),
        y: anchorRect?.y + (this.offset?.y || 0),
      };
    }

    if (this.alignment === 'left') {
      this.position = {
        x: anchorRect?.x + (this.offset?.x || 0),
        y: anchorRect?.y + (this.offset?.y || 0),
      };
    }
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.handlePositioning();
  }
}
