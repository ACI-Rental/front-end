import {KeycloakService, KeycloakOptions} from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export function initalizeKeycloakConfig(keycloak: KeycloakService): () => Promise<any> {
    const options: KeycloakOptions = {
        config: environment.keycloakConfig,
        initOptions: {}
    }

    return (): Promise<any> => keycloak.init(options);
}