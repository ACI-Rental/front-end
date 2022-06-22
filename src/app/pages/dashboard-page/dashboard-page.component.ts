import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  productModalOpen: boolean = false;
  categoryModalOpen: boolean = false; 
  public userProfile: any | null = null;
  packageSlipModalOpen: boolean = false;

  constructor(private readonly keycloak: KeycloakService) { }

  public async ngOnInit() {
    const userProfile = await this.keycloak.getKeycloakInstance().loadUserInfo();

    this.userProfile = userProfile;
  }

  openProductModal() {
    this.productModalOpen = true;
  }

  openCategoryModal() {
    this.categoryModalOpen = true;
  }

  openPackageSlipModal() {
    this.packageSlipModalOpen = true
  }
}

