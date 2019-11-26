import {PrivilegeModel} from '../BaseInterfaces';
import {MemberModel, RealmModel} from '../Groups';

export interface GlobalGroupModel {
    displayName: string;
    id: string;
    members: MemberModel[];
    organizationActivated: boolean;
    privileges: GlobalPrivilegeModel[];
    realms: RealmModel[];
    temporaryPrivilegeConfigurations: TemporaryPrivilegeConfigurationModel[];
}

export interface GlobalPrivilegeModel extends PrivilegeModel {
    global: boolean;
    level: string;
}

export interface TemporaryPrivilegeConfigurationModel {
    approbationType: 'AUTO_APPROVED' | 'DENIED';
    privilege: GlobalPrivilegeModel;
}
