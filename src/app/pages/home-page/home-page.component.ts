import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  filterOpen: boolean = false;

  @HostListener('document:click', ['$event'])
  onClick(ev: any) {
    const backdropRef: any = document.getElementsByClassName('product_filters_backdrop')[0];

    if (ev.target === backdropRef) {
      this.filterOpen = false;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }
}
