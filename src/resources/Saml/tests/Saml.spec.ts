import API from '../../../APICore.js';
import {New} from '../../BaseInterfaces.js';
import Saml from '../Saml.js';
import {SamlIdentityProviderModel} from '../SamlInterfaces.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Saml', () => {
    let saml: Saml;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        saml = new Saml(api, serverlessApi);
    });

    describe('isEnabled', () => {
        it('should make a GET call to "/saml/enabled"', () => {
            saml.isEnabled();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/saml/enabled');
        });
    });

    describe('listAvailableProviders', () => {
        it('should make a GET call to "/saml/availables"', () => {
            saml.listAvailableProviders();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/saml/availables');
        });
    });

    describe('getProvider', () => {
        it('should make a GET call to "/saml/identityprovider"', () => {
            saml.getProvider();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/saml/identityprovider');
        });
    });

    describe('listRealms', () => {
        it('should make a GET call to "/saml/identityprovider/realms"', () => {
            saml.listRealms();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/saml/identityprovider/realms');
        });
    });

    describe('deleteProvdier', () => {
        it('should make a DELETE call to "/saml/identityprovider"', () => {
            saml.deleteProvider();
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith('/rest/organizations/{organizationName}/saml/identityprovider');
        });
    });

    describe('create', () => {
        it('should make a POST call to "/saml/identityprovider"', () => {
            const provider: New<SamlIdentityProviderModel> = {
                displayName: 'My SAML SSO',
                entityId: 'whatever',
                organizationIds: [{id: 'org-1'}, {id: 'org-2'}],
                postBindingEndpoint: 'the-saml-endpoint',
                x509Certificate: 'my-certificate',
            };

            saml.create(provider);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                '/rest/organizations/{organizationName}/saml/identityprovider',
                provider,
            );
        });
    });

    describe('update', () => {
        it('should make a PUT call to "/saml/identityprovider"', () => {
            const provider: SamlIdentityProviderModel = {
                id: '123-abc',
                displayName: 'My SAML SSO',
                entityId: 'whatever',
                organizationIds: [{id: 'org-1'}, {id: 'org-2'}],
                postBindingEndpoint: 'the-saml-endpoint',
                x509Certificate: 'my-certificate',
            };

            saml.update(provider);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                '/rest/organizations/{organizationName}/saml/identityprovider',
                provider,
            );
        });
    });
});
