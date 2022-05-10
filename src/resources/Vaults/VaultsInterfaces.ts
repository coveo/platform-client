import {Paginated} from '../BaseInterfaces';
import {VaultValueType, VaultVisibilityType} from '../Enums';
import {UnrecommendedPaginated} from '../InternalBaseInterface';
import {ResourceSnapshotType} from '../ResourceSnapshots';

export interface MissingVaultModel {
    /**
     * The list of vault entry keys used in errors.
     */
    missingVaultEntries: string[];
}

export interface VaultScopeModel {
    id: string;
    resourceType: ResourceSnapshotType;
}

export interface AttributeReferenceModel {
    jsonPath: string;
    resourceName: string;
    resourceType: ResourceSnapshotType;
}

export interface VaultEntryModel {
    attributeReferences?: AttributeReferenceModel[];
    key?: string;
    organizationId?: string;
    scopes?: VaultScopeModel[];
    value?: string;
    valueType?: VaultValueType;
    vaultVisibilityType?: VaultVisibilityType;
}

export type VaultEntryListOptions = Paginated | UnrecommendedPaginated;
