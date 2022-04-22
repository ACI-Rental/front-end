import {KeycloakService, KeycloakOptions} from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export function initalizeKeycloakConfig(keycloak: KeycloakService): () => Promise<any> {
    const options: KeycloakOptions = {
        config: environment.keycloakConfig,
        initOptions: {
            onLoad: 'login-required',  // allowed values 'login-required', 'check-sso';
            flow: "standard"          // allowed values 'standard', 'implicit', 'hybrid';
        }, 
        loadUserProfileAtStartUp: true
    }

    return (): Promise<any> => keycloak.init(options);
}