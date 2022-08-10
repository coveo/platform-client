import API from '../../../APICore';
import Members from '../Members/Members';
import Organization from '../Organization';
import {DefinitionModel, OrganizationCreationOrigin} from '../OrganizationInterfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Organization', () => {
    let organization: Organization;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        organization = new Organization(api, serverlessApi);
    });

    describe('updateSupportActivated', () => {
        it('should make a PUT call to the proper URL to activate support', () => {
            const organizationToBeUpdated = 'Organization-to-be-updated';
            const supportActivated = true;
            organization.updateSupportActivated(organizationToBeUpdated, supportActivated);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Organization.baseUrl}/${organizationToBeUpdated}/support?activate=${supportActivated}`
            );
        });

        it('should make a PUT call to the proper URL to disable support', () => {
            const organizationToBeUpdated = 'Organization-to-be-updated';
            const supportActivated = false;
            organization.updateSupportActivated(organizationToBeUpdated, supportActivated);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Organization.baseUrl}/${organizationToBeUpdated}/support?activate=${supportActivated}`
            );
        });
    });

    describe('list', () => {
        it('should make a GET call to the Organization base url', () => {
            organization.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Organization.baseUrl);
        });

        it('should make a paginated call when pagination parameters are passed', () => {
            organization.list({page: 0, filter: 'foo'});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Organization.baseUrl}?page=0&filter=foo`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the Organization base url with the parameters', () => {
            const name = 'OrgName';
            const creationOrigin = OrganizationCreationOrigin.TEST;

            organization.create({name, creationOrigin});
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${Organization.baseUrl}?name=${name}&creationOrigin=${creationOrigin}`
            );
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Organization url', () => {
            const organizationToDeleteId = 'Organization-to-be-deleted';
            organization.delete(organizationToDeleteId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Organization.baseUrl}/${organizationToDeleteId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Organization url', () => {
            const organizationToGetId = 'Organization-to-be-fetched';
            organization.get(organizationToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Organization.baseUrl}/${organizationToGetId}`);
        });

        it('should make a GET call with the specified options', () => {
            const organizationToGetId = 'Organization-to-be-fetched';
            organization.get(organizationToGetId, {
                additionalFields: 'status',
            });
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Organization.baseUrl}/${organizationToGetId}?additionalFields=status`
            );
        });

        it('should make a GET call with the multiple additional fields', () => {
            const organizationToGetId = 'Organization-to-be-fetched';
            organization.get(organizationToGetId, {
                additionalFields: ['status', 'license'],
            });
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Organization.baseUrl}/${organizationToGetId}?additionalFields=status&additionalFields=license`
            );
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Organization url', () => {
            const organizationModel = {
                id: 'organization-to-update-id',
                displayName: 'new name',
            };

            organization.update(organizationModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Organization.baseUrl}/${organizationModel.id}`, organizationModel);
        });
    });

    describe('status', () => {
        it('should make a GET call to the specific Organization status url', () => {
            const organizationToGetId = 'Organization-to-be-fetched';
            organization.status(organizationToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Organization.baseUrl}/${organizationToGetId}/status`);
        });

        it('should make a GET call to /rest/organizations/{organizationName}/status if the orgId is not specified', () => {
            organization.status();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/status`);
        });
    });

    describe('pause', () => {
        it('should make a POST call to the specific Organization url', () => {
            organization.pause();

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Organization.baseUrl}/${API.orgPlaceholder}/pause`);
        });
    });

    describe('resume', () => {
        it('should make a POST call to the specific Organization url', () => {
            organization.resume();

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Organization.baseUrl}/${API.orgPlaceholder}/resume`);
        });
    });

    describe('listPrivileges', () => {
        it('should make a GET call /rest/organizations/{organizationName}/privileges', () => {
            organization.listPrivileges();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/privileges');
        });
    });

    describe('listMyPrivileges', () => {
        it('should make a GET call /rest/organizations/{organizationName}/privileges/me', () => {
            organization.listMyPrivileges();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/privileges/me');
        });
    });

    describe('listApiKeysPrivileges', () => {
        it('should make a GET call /rest/organizations/{organizationName}/privileges/apikeys', () => {
            organization.listApiKeysPrivileges();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/privileges/apikeys');
        });
    });

    describe('Definitions', () => {
        describe('get', () => {
            it('should make a GET call to the specific Organization Definition url', () => {
                organization.getDefinition();

                expect(api.get).toHaveBeenCalledTimes(1);
                expect(api.get).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/definition`);
            });
        });

        describe('update', () => {
            it('should make a PUT call to the specific Organization Definition url', () => {
                const definitionModel: DefinitionModel = {
                    organizationId: 'organizationId',
                    baseLicenseTemplateId: 'baseLicenseTemplateId',
                    modifiers: [],
                    overrides: [],
                };
                organization.updateDefinition(definitionModel);

                expect(api.put).toHaveBeenCalledTimes(1);
                expect(api.put).toHaveBeenCalledWith(
                    `/rest/organizations/{organizationName}/definition`,
                    definitionModel
                );
            });
        });
    });

    describe('authentication providers', () => {
        it('should make a GET call to the specific Organization url', () => {
            const organizationId = 'Organization-to-be-fetched';
            organization.getAllowedAuthenticationProviders(organizationId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Organization.baseUrl}/${organizationId}/authproviders/allowed`);
        });

        it('should make a GET call /rest/organizations/{organizationName}/authproviders/allowed', () => {
            organization.getAllowedAuthenticationProviders();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Organization.baseUrl}/${API.orgPlaceholder}/authproviders/allowed`);
        });
    });

    it('registers the members resource', () => {
        expect(organization.members).toBeDefined();
        expect(organization.members).toBeInstanceOf(Members);
    });

    describe('additional information', () => {
        it('should make a GET call with additional information', () => {
            const organizationToGetId = 'Organization-to-be-fetched';
            organization.getAdditionalInformation(organizationToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Organization.baseUrl}/${organizationToGetId}/additionalinformation`
            );
        });
        it('should make a PUT call to put data in additional information', () => {
            const additionalInformationObj = {
                trialProgress: {
                    completedSource: true,
                },
            };
            organization.updateAdditionalInformation(additionalInformationObj);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Organization.baseUrl}/{organizationName}/additionalinformation`,
                additionalInformationObj
            );
        });
    });

    describe('experimental status', () => {
        it('should make a GET call to the specific Organization url', () => {
            const organizationToGetId = 'Organization-to-be-fetched';
            organization.getExperimentalStatus(organizationToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Organization.baseUrl}/${organizationToGetId}/machinelearning/orgconfiguration/servingExperimentAllowed`
            );
        });

        it('should make a PUT call to update experimental status with default false', () => {
            organization.updateExperimentalStatus();

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Organization.baseUrl}/{organizationName}/machinelearning/orgconfiguration/servingExperimentAllowed`,
                false
            );
        });

        it('should make a PUT call to update experimental status with passed value', () => {
            const isAllowed = true;
            organization.updateExperimentalStatus(isAllowed);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Organization.baseUrl}/{organizationName}/machinelearning/orgconfiguration/servingExperimentAllowed`,
                isAllowed
            );
        });
    });
});
