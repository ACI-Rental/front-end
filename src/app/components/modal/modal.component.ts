import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnChanges {

  @Input() name: string = "";

  @Input() open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();

  @Input() padding: number = 0;

  @HostListener('document:click', ['$event'])
  onClick(ev: any) {
    ev.stopPropagation();
    const modalRef: any = document.getElementById(`modal-${this.name}`);

    if (
      ev.target === modalRef &&
      !this.justOpened
    ) {
      this.open = false;
      this.openChange.emit(false);
    }
  }

  openedBefore: boolean = false;
  justOpened: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['open']?.currentValue) {
      this.openedBefore = true;

      this.justOpened = true;
      setTimeout(() => this.justOpened = false, 200)
    }
  }
}
