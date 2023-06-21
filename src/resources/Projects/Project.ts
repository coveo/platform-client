import API from '../../APICore.js';
import {PageModel} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import {ListProjectParams, ProjectModel} from './ProjectInterfaces.js';

export default class Project extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/projects`;

    list(params: ListProjectParams) {
        return this.api.get<PageModel<ProjectModel>>(this.buildPath(Project.baseUrl, params));
    }
}
