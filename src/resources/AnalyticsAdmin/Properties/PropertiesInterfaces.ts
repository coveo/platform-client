import {Paginated} from '../../BaseInterfaces.js';

export interface PropertyModel {
    trackingId: string;
    displayName: string;
}

export interface PropertiesResponseMessage {
    message: string;
}

export interface ListPropertiesParams extends Paginated {
    filter?: string;
}