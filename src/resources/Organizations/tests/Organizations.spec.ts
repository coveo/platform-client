import API from '../../../APICore.js';
import Members from '../Members/Members.js';
import Organization from '../Organization.js';
import {DefinitionModel, OrganizationCreationOrigin, PrivilegeFilterType} from '../OrganizationInterfaces.js';

jest.mock('../../../APICore.js');

describe('Organization', () => {
    let organization: Organization;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        organization = new Organization(api, serverlessApi);
    });

    describe('updateSupportActivated', () => {
        it('should make a PUT call to the proper URL to activate support', async () => {
            const organizationToBeUpdated = 'Organization-to-be-updated';
            const supportActivated = true;
            await organization.updateSupportActivated(organizationToBeUpdated, supportActivated);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Organization.baseUrl}/${organizationToBeUpdated}/support?activate=${supportActivated}`,
            );
        });

        it('should make a PUT call to the proper URL to disable support', async () => {
            const organizationToBeUpdated = 'Organization-to-be-updated';
            const supportActivated = false;
            await organization.updateSupportActivated(organizationToBeUpdated, supportActivated);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Organization.baseUrl}/${organizationToBeUpdated}/support?activate=${supportActivated}`,
            );
        });
    });

    describe('list', () => {
        it('should make a GET call to the Organization base url', async () => {
            await organization.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Organization.baseUrl);
        });

        it('should make a paginated call when pagination parameters are passed', async () => {
            await organization.list({page: 0, filter: 'foo'});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Organization.baseUrl}?page=0&filter=foo`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the Organization base url with the parameters', async () => {
            const name = 'OrgName';
            const creationOrigin = OrganizationCreationOrigin.TEST;

            await organization.create({name, creationOrigin});
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${Organization.baseUrl}?name=${name}&creationOrigin=${creationOrigin}`,
            );
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Organization url', async () => {
            const organizationToDeleteId = 'Organization-to-be-deleted';
            await organization.delete(organizationToDeleteId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Organization.baseUrl}/${organizationToDeleteId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Organization url', async () => {
            const organizationToGetId = 'Organization-to-be-fetched';
            await organization.get(organizationToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Organization.baseUrl}/${organizationToGetId}`);
        });

        it('should make a GET call with the specified options', async () => {
            const organizationToGetId = 'Organization-to-be-fetched';
            await organization.get(organizationToGetId, {
                additionalFields: 'status',
            });
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Organization.baseUrl}/${organizationToGetId}?additionalFields=status`,
            );
        });

        it('should make a GET call with the multiple additional fields', async () => {
            const organizationToGetId = 'Organization-to-be-fetched';
            await organization.get(organizationToGetId, {
                additionalFields: ['status', 'license'],
            });
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Organization.baseUrl}/${organizationToGetId}?additionalFields=status&additionalFields=license`,
            );
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Organization url', async () => {
            const organizationModel = {
                id: 'organization-to-update-id',
                displayName: 'new name',
            };

            await organization.update(organizationModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Organization.baseUrl}/${organizationModel.id}`, organizationModel);
        });
    });

    describe('status', () => {
        it('should make a GET call to the specific Organization status url', async () => {
            const organizationToGetId = 'Organization-to-be-fetched';
            await organization.status(organizationToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Organization.baseUrl}/${organizationToGetId}/status`);
        });

        it('should make a GET call to /rest/organizations/{organizationName}/status if the orgId is not specified', async () => {
            await organization.status();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/status`);
        });
    });

    describe('pause', () => {
        it('should make a POST call to the specific Organization url', async () => {
            await organization.pause();

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Organization.baseUrl}/${API.orgPlaceholder}/pause`);
        });
    });

    describe('resume', () => {
        it('should make a POST call to the specific Organization url', async () => {
            await organization.resume();

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Organization.baseUrl}/${API.orgPlaceholder}/resume`);
        });
    });

    describe('listPrivileges', () => {
        it('should make a GET call /rest/organizations/{organizationName}/privileges', async () => {
            await organization.listPrivileges();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/privileges');
        });
    });

    describe('listMyPrivileges', () => {
        it('should make a GET call /rest/organizations/{organizationName}/privileges/me', async () => {
            await organization.listMyPrivileges();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/privileges/me');
        });
    });

    describe('listApiKeysPrivileges', () => {
        it('should make a GET call /rest/organizations/{organizationName}/privileges/apikeys with ALL filter', async () => {
            await organization.listApiKeysPrivileges();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                '/rest/organizations/{organizationName}/privileges/apikeys?filter=ALL',
            );
        });

        it('should make a GET call /rest/organizations/{organizationName}/privileges/apikeys with CUSTOM filter', async () => {
            await organization.listApiKeysPrivileges({filter: PrivilegeFilterType.CUSTOM});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                '/rest/organizations/{organizationName}/privileges/apikeys?filter=CUSTOM',
            );
        });
    });

    describe('Definitions', () => {
        describe('get', () => {
            it('should make a GET call to the specific Organization Definition url', async () => {
                await organization.getDefinition();

                expect(api.get).toHaveBeenCalledTimes(1);
                expect(api.get).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/definition`);
            });
        });

        describe('update', () => {
            it('should make a PUT call to the specific Organization Definition url', async () => {
                const definitionModel: DefinitionModel = {
                    organizationId: 'organizationId',
                    baseLicenseTemplateId: 'baseLicenseTemplateId',
                    modifiers: [],
                    overrides: [],
                };
                await organization.updateDefinition(definitionModel);

                expect(api.put).toHaveBeenCalledTimes(1);
                expect(api.put).toHaveBeenCalledWith(
                    `/rest/organizations/{organizationName}/definition`,
                    definitionModel,
                );
            });
        });
    });

    describe('authentication providers', () => {
        it('should make a GET call to the specific Organization url', async () => {
            const organizationId = 'Organization-to-be-fetched';
            await organization.getAllowedAuthenticationProviders(organizationId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Organization.baseUrl}/${organizationId}/authproviders/allowed`);
        });

        it('should make a GET call /rest/organizations/{organizationName}/authproviders/allowed', async () => {
            await organization.getAllowedAuthenticationProviders();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Organization.baseUrl}/${API.orgPlaceholder}/authproviders/allowed`);
        });
    });

    it('registers the members resource', () => {
        expect(organization.members).toBeDefined();
        expect(organization.members).toBeInstanceOf(Members);
    });

    describe('additional information', () => {
        it('should make a GET call with additional information', async () => {
            const organizationToGetId = 'Organization-to-be-fetched';
            await organization.getAdditionalInformation(organizationToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Organization.baseUrl}/${organizationToGetId}/additionalinformation`,
            );
        });
        it('should make a PUT call to put data in additional information', async () => {
            const additionalInformationObj = {
                trialProgress: {
                    completedSource: true,
                },
            };
            await organization.updateAdditionalInformation(additionalInformationObj);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Organization.baseUrl}/{organizationName}/additionalinformation`,
                additionalInformationObj,
            );
        });
    });

    describe('experimental status', () => {
        it('should make a PUT call to update experimental status with default true', async () => {
            await organization.updateExperimentalStatus();

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Organization.baseUrl}/{organizationName}/configuration/servingExperiment?allowed=true`,
            );
        });

        it('should make a PUT call to update experimental status with passed value', async () => {
            const isAllowed = false;
            await organization.updateExperimentalStatus(isAllowed);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Organization.baseUrl}/{organizationName}/configuration/servingExperiment?allowed=false`,
            );
        });
    });
});
