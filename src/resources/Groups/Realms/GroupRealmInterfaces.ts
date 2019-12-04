import {AuthProvider} from '../../BaseInterfaces';

export interface RealmModel {
    id: string;
    provider: AuthProvider;
    displayName: string;
    samlIdentityProviderId?: string;
}
