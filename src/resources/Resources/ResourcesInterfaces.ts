import {Paginated} from '../BaseInterfaces.js';

export type ResourceStatus = 'existingResources' | 'noAccessResources' | 'deletedResources';

export interface ResourceModel {
    /**
     * The unique identifier of a resource within a project
     */
    id: string;
    /**
     * The name of the resource
     */
    name: string;
    /**
     * The type of the resource
     */
    type?: string;
    /**
     * The version of the resource
     */
    version?: string;
    /**
     * Any additional information related to the resource
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    additionalInfo?: Record<string, any>;
}

export interface ResourceParams extends Paginated {
    /**
     * Term to filter resources by id or name
     */
    filter?: string;
}
