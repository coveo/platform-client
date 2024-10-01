import API from '../../APICore.js';
import {PageModel} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import {ResourceModel, ResourceParams, ResourceStatus} from '../Resources/index.js';
import {
    ListProjectParams,
    ProjectModel,
    BaseProjectModel,
    ProjectResourceType,
    ListAssociatedProjectsModel,
    UpdatedProjectResourceAssociationsModel,
} from './ProjectInterfaces.js';

export default class Project extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/projects`;

    /**
     * Returns a paginated list of projects.
     * @param params
     * @returns A paginated list of projects
     */
    list(params?: ListProjectParams): Promise<PageModel<ProjectModel>> {
        return this.api.get<PageModel<ProjectModel>>(this.buildPath(Project.baseUrl, params));
    }

    /**
     * Creates and returns a new project.
     * @param project
     * @returns The newly created project
     */
    create(project: BaseProjectModel): Promise<ProjectModel> {
        return this.api.post<ProjectModel>(this.buildPath(Project.baseUrl), project);
    }

    /**
     * Updates a project with the model sent and returns the updated project.
     * @param projectId
     * @param updateProjectModel
     * @returns The updated project
     */
    update(projectId: string, updateProjectModel: ProjectModel): Promise<ProjectModel> {
        return this.api.put<ProjectModel>(this.buildPath(`${Project.baseUrl}/${projectId}`), updateProjectModel);
    }

    /**
     * Returns a project.
     * @param projectId
     * @returns The project specified by the provided id
     */
    get(projectId: string): Promise<ProjectModel> {
        return this.api.get<ProjectModel>(this.buildPath(`${Project.baseUrl}/${projectId}`));
    }

    /**
     * Deletes a project.
     * @param projectId
     */
    delete(projectId: string): Promise<void> {
        return this.api.delete(this.buildPath(`${Project.baseUrl}/${projectId}`));
    }

    /**
     * Returns resource IDs grouped by resource status, for a given project.
     * @param projectId
     * @returns A series of resource IDs grouped by their status and resource type.
     */
    listResourcesByStatus(projectId: string): Promise<Record<ResourceStatus, Record<ProjectResourceType, string[]>>> {
        return this.api.get<Record<ResourceStatus, Record<ProjectResourceType, string[]>>>(
            this.buildPath(`${Project.baseUrl}/${projectId}/resources`),
        );
    }

    /**
     * Returns a paginated list of resources associated to a project.
     * @param projectId
     * @param resourceType
     * @param params
     * @returns A paginated list of resources associated to a project.
     */
    listResources(
        projectId: string,
        resourceType: ProjectResourceType,
        params?: ResourceParams,
    ): Promise<PageModel<ResourceModel>> {
        return this.api.get<PageModel<ResourceModel>>(
            this.buildPath(`${Project.baseUrl}/${projectId}/resources/${resourceType}`, params),
        );
    }

    /**
     * Returns a list of project IDs associated to the provided resource IDs.
     * @param resourceType
     * @param resourceIds
     * @returns List of project IDs associated to the provided resource IDs.
     */
    listAssociatedProjects(
        resourceType: ProjectResourceType,
        resourceIds: string[],
    ): Promise<ListAssociatedProjectsModel[]> {
        return this.api.post<ListAssociatedProjectsModel[]>(
            this.buildPath(`${Project.baseUrl}/resources/ids`, {resourceType}),
            resourceIds,
        );
    }

    /**
     * Modifies project-resource associations and returns a list of updated projects.
     * @param resourceType
     * @param updatedProjectResourceAssociation
     * @returns Returns a list of updated projects.
     */
    updateProjectResourceAssociation(
        resourceType: ProjectResourceType,
        updatedProjectResourceAssociation: UpdatedProjectResourceAssociationsModel,
    ): Promise<ProjectModel[]> {
        return this.api.put<ProjectModel[]>(
            this.buildPath(`${Project.baseUrl}/resources/modify/${resourceType}`),
            updatedProjectResourceAssociation,
        );
    }
}
