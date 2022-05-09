import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  position: any = null;
  open: boolean = false;

  public isLoggedIn = false;
  public userProfile: any | null = null;

  constructor(private readonly keycloak: KeycloakService) { }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      const userProfile = await this.keycloak.getKeycloakInstance().loadUserInfo();

      this.userProfile = userProfile;
      console.log(userProfile)
    }
  }

  onProfileClick() {
    this.open = !this.open;
  }

  async Logout() {
    await this.keycloak.logout();
  }
}
