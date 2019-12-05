import {AuthProvider} from '../../Enums';

export interface RealmModel {
    id: string;
    provider: AuthProvider;
    displayName: string;
    samlIdentityProviderId?: string;
}
