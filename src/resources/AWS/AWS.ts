import Resource from '../Resource';
import {AWSAgentInstanceModel} from './AWSInterfaces';

export interface AWSListOptions {
    organizationId: string;
}

export default class AWS extends Resource {
    static baseUrl = `/rest/aws/instances/agents`;

    list(options: AWSListOptions = {organizationId: this.api.organizationId}) {
        return this.api.get<AWSAgentInstanceModel[]>(this.buildPath(AWS.baseUrl, options));
    }
}
