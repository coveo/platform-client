import { PrivilegeModel } from "../BaseInterfaces.js";

export interface ApiKeyTemplateModel {
    /**
     * The unique identifier of the API key template.
     */
    id?: string; 
    /**
     * The displaye name of the Api key template.
     */
    displayName?: string;
    /**
     * The descirption of the Api key template.
     */
    description?: string;
    /**
     * A set of IP addresses allowed to use the Api key template.
     */
    allowedIps?: string[];
    /**
     * A set of IP addresses that will be denied access when attempting to use the API key template.
     */
    deniedIps?: string[];
    /**
     * A set of privileges binded to an api key template.
     */
    privileges?: PrivilegeModel[];
}