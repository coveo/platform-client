export interface AuthInviteModel {
    /**
     * Invite ID.
     */
    id: string;
    /**
     * Invite group name.
     */
    displayName: string;
    /**
     * Organizations array will always have only one item.
     */
    organizations: Array<{
        /**
         * Org ID where the user is invited in a group.
         */
        id: string;
        /**
         * Org ID where the user is invited in a group.
         */
        displayName: string;
    }>;
}
