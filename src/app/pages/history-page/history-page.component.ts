import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit {

  userId: string = "";

  constructor(private readonly keycloak: KeycloakService) { }

  async ngOnInit() {
    const userProfile: any = await this.keycloak.getKeycloakInstance().loadUserInfo();

    this.userId = userProfile.sub;
  }
}
