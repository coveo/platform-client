import {PrivilegeModel} from '../BaseInterfaces.js';
import {MemberModel, RealmModel} from '../Groups/index.js';

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
    level: string;
}

export interface TemporaryPrivilegeConfigurationModel {
    approbationType: 'AUTO_APPROVED' | 'DENIED';
    privilege: GlobalPrivilegeModel;
}
