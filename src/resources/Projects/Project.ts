import API from '../../APICore.js';
import {PageModel} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import {ListProjectParams, NewProjectModel, ProjectModel} from './ProjectInterfaces.js';

export default class Project extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/projects`;

    /**
     * Returns a paginated list of projects.
     *
     * @param {ListProjectParams} params
     */
    list(params?: ListProjectParams) {
        return this.api.get<PageModel<ProjectModel>>(this.buildPath(Project.baseUrl, params));
    }

    /**
     * Creates and returns a new project.
     *
     * @param {ProjectModel} project
     */
    create(project: NewProjectModel) {
        return this.api.post<ProjectModel>(this.buildPath(Project.baseUrl), project);
    }

    /**
     * Updates a project with the model sent and returns the updated project.
     *
     * @param {string} projectId
     * @param {NewProjectModel} newProjectModel
     */
    update(projectId: string, newProjectModel: NewProjectModel) {
        return this.api.put<ProjectModel>(this.buildPath(`${Project.baseUrl}/${projectId}`), newProjectModel);
    }

    /**
     * Returns a project.
     * 
     * @param {string} projectId 
=    */
    get(projectId: string) {
        return this.api.get<ProjectModel>(this.buildPath(`${Project.baseUrl}/${projectId}`));
    }

    /**
     * Deletes a project.
     *
     * @param {string} projectId
     */
    delete(projectId: string) {
        return this.api.delete(this.buildPath(`${Project.baseUrl}/${projectId}`));
    }
}
