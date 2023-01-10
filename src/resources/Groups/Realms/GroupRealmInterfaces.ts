import {AuthProvider} from '../../Enums.js';

export interface RealmModel {
    id: string;
    provider: AuthProvider;
    displayName: string;
    samlIdentityProviderId?: string;
}
