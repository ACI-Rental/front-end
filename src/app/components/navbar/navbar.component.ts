import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  position: any = null;
  open: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onProfileClick(event: any) {
    this.open = !this.open;
  }
}
