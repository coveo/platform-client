import API from '../../APICore';
import {New} from '../BaseInterfaces';
import {RealmModel} from '../Groups';
import Resource from '../Resource';
import {SamlIdentityProviderEnabledModel, SamlIdentityProviderModel} from './SamlInterfaces';

export default class Saml extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/saml`;

    isEnabled() {
        return this.api.get<SamlIdentityProviderEnabledModel>(`${Saml.baseUrl}/enabled`);
    }

    listAvailableProviders() {
        return this.api.get<SamlIdentityProviderModel[]>(`${Saml.baseUrl}/availables`);
    }

    deleteProvider() {
        return this.api.delete(`${Saml.baseUrl}/identityprovider`);
    }

    getProvider() {
        return this.api.get<SamlIdentityProviderModel>(`${Saml.baseUrl}/identityprovider`);
    }

    create(identityProvider: New<SamlIdentityProviderModel>) {
        return this.api.post<SamlIdentityProviderModel>(`${Saml.baseUrl}/identityprovider`, identityProvider);
    }

    update(identityProvider: SamlIdentityProviderModel) {
        return this.api.put<SamlIdentityProviderModel>(`${Saml.baseUrl}/identityprovider`, identityProvider);
    }

    listRealms() {
        return this.api.get<RealmModel[]>(`${Saml.baseUrl}/identityprovider/realms`);
    }
}
