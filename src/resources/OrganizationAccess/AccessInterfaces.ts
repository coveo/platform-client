export interface AccessModel {
    /*
     * The access level an API key must have to be included in the response.
     * Allowed values:
     *  - EDIT_ALL: API key can edit the organization.
     *  - CUSTOM: API key has custom access to the organization.
     *  - VIEW_ALL: API key can view the organization.
     *  - NONE: API key has no access to the organization.
     */
    accessLevel: string[];
    /*
     * The owner value an API key must have to be included in the response.
     * Example: 'PLATFORM'
     */
    privilegeOwner: string;
    /*
     * The targetDomain value an API key must have to be included in response.
     * Example: 'SOURCE'
     */
    privilegeTargetDomain: string;
}
