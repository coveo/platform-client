import {Paginated} from '../BaseInterfaces.js';

export type ResourceStatus = 'existingResources' | 'deletedResources';

export interface ResourceModel {
    /**
     * The unique identifier of a resource within a project
     */
    id: string;
    /**
     * The name of the resouce
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
}

export interface ResourceParams extends Paginated {
    /**
     * Term to filter resources by id or name
     */
    filter?: string;
}
