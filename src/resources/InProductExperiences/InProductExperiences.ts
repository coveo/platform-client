import API from '../../APICore.js';
import Resource from '../Resource.js';
import SearchPages from '../SearchPages/SearchPages.js';
import {
    InProductExperienceModel,
    CreateInProductExperienceModel,
    UpdateInProductExperienceModel,
    InProductExperienceLoader,
    CreateInProductExperienceResponse,
} from './InProductExperiencesInterfaces.js';

/**
 * In-Product Experiences (also known as In App Widgets) Swagger documentation can
 * be found at https://platform.cloud.coveo.com/docs?urls.primaryName=Search%20Pages#/In-App,
 * and shares certain functionality related to IPX interfaces with Search Pages. Swagger
 * documentation for Search Pages can be found at
 * https://platform.cloud.coveo.com/docs?urls.primaryName=Search%20Pages#/Search%20pages
 */
export default class InProductExperiences extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}`;
    static ipxBaseUrl = `${InProductExperiences.baseUrl}/pages/inappwidget`;

    /**
     * IPX takes advantage of SearchPages for underlying the IPX interface management.
     * This provides a helper around some methods, but for complete support for e.g. JS/CSS
     * resource management, use this instance of `SearchPages` directly.
     */
    readonly searchPages: SearchPages;

    constructor(api: API, serverlessApi: API) {
        super(api, serverlessApi);
        this.searchPages = new SearchPages(api, serverlessApi);
    }

    create(ipx: CreateInProductExperienceModel) {
        return this.api.post<CreateInProductExperienceResponse>(InProductExperiences.ipxBaseUrl, ipx);
    }

    update(ipxId: string, ipx: UpdateInProductExperienceModel) {
        return this.api.put(`${InProductExperiences.ipxBaseUrl}/${ipxId}`, ipx);
    }

    list(name?: string) {
        return this.api.get<InProductExperienceModel[]>(this.buildPath(`${InProductExperiences.ipxBaseUrl}s`, {name}));
    }

    listByProject(projectId?: string) {
        return this.api.get<InProductExperienceModel[]>(
            this.buildPath(`${InProductExperiences.ipxBaseUrl}s/projectid`, {projectid: projectId}),
        );
    }

    getLoader(ipxId: string, access_token?: string) {
        return this.api.get<InProductExperienceLoader>(
            this.buildPath(`${InProductExperiences.baseUrl}/${ipxId}/inappwidget/loader`, {access_token}),
        );
    }

    /**
     * `delete` is a helper method based on observed behavior of the Coveo UI where deletion logic calls out to the
     * Search Pages endpoint to delete an IPX.
     */
    delete(ipxId: string) {
        return this.searchPages.delete(ipxId);
    }
}
