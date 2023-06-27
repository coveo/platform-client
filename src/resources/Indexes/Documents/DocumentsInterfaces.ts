import {Paginated} from '../../BaseInterfaces.js';
import {EffectivePermissionType, SinglePermissionState} from '../../Enums.js';

export interface ListEffectivePermissionsOptions extends Paginated {
    /**
     * The states of effective permissions to allow in the response, i.e., only security identities whose state correspond to the specified values may be retrieved.
     *
     * Allowed values:
     * - UP_TO_DATE: Security identity successfully updated.
     * - NOT_UPDATED: Security identity not updated yet.
     * - OUT_OF_DATE: Last update failed, but the security identity has previously been updated successfully.
     * - IN_ERROR: Last update failed with an error.
     * - DISABLED: The security identity may have been deleted in the corresponding indexed system.
     * - UNKNOWN
     *
     * Example: UNKNOWN,IN_ERROR
     *
     * By default, permissions of all states are included in the response.
     */
    states?: SinglePermissionState[];

    /**
     * The beginning of the range for which to list effective permissions, in W3C format (see [Date and Time Formats](https://www.w3.org/TR/NOTE-datetime)).
     *
     * Example: 2018-5-21T19:57:09.714Z
     */
    from?: string;

    /**
     * The end of the range for which to list effective permissions, in W3C format (see [Date and Time Formats](https://www.w3.org/TR/NOTE-datetime)).
     *
     * Example: 2018-5-22T19:57:09.714Z
     */

    to?: string;

    /**
     * The type of effective permissions to retrieve.
     *
     * Allowed values:
     * - ALL: All permissions.
     * - ALLOWED: Allowed permissions.
     * - DENIED: Denied permissions.
     *
     * Default: ALL.
     */

    includedEntities?: EffectivePermissionType;
}
