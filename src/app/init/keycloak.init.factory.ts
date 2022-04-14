import {KeycloakService, KeycloakOptions} from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<any> {
    const options: KeycloakOptions = {
        config: environment.keycloakConfig,
        initOptions: {
            
        //   onLoad: 'check-sso',
        //   silentCheckSsoRedirectUri:
        //     window.location.origin + '/assets/silent-check-sso.html'
        }
    }

    return (): Promise<any> => keycloak.init(options);
}