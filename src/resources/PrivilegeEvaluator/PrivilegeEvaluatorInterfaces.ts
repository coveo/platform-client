import {PrivilegeModel} from '../BaseInterfaces.js';

export interface PrivilegeEvaluatorModel {
    /**
     * Whether the request has been approved.
     */
    approved?: boolean;
    /**
     * A privilege request evaluation report.
     */
    evaluationReport?: PrivilegeRequestEvaluationReportModel;
    /**
     * The unique identifier of the organization in which the target privilege applies.
     */
    organizationId?: string;
    /**
     * The unique identifier of the organization in which the target privilege applies.
     */
    requestedPrivilege: PrivilegeModel;
}

export enum PrivilegeRequestEvaluationReportModel {
    operationForbiddenForAnonymousAuthentication = 'OPERATION_FORBIDDEN_FOR_ANONYMOUS_AUTHENTICATION',
    operationForbiddenForAuthenticationBoundToDifferentOrganization = 'OPERATION_FORBIDDEN_FOR_AUTHENTICATION_BOUND_TO_DIFFERENT_ORGANIZATION',
    operationForbiddenForOrganization = 'OPERATION_FORBIDDEN_FOR_ORGANIZATION',
    operationForbiddenForOrganizationInReadOnly = 'OPERATION_FORBIDDEN_FOR_ORGANIZATION_IN_READ_ONLY',
    operationForbiddenFromRequestLocation = 'OPERATION_FORBIDDEN_FROM_REQUEST_LOCATION',
    operationForbiddenInvalidPrivilegeRequest = 'OPERATION_FORBIDDEN_INVALID_PRIVILEGE_REQUEST',
    operationGranted = 'OPERATION_GRANTED',
    operationNotAllowed = 'OPERATION_NOT_ALLOWED',
}
