import API from '../../../APICore';
import {New} from '../../BaseInterfaces';
import Saml from '../Saml';
import {SamlIdentityProviderModel} from '../SamlInterfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Saml', () => {
    let saml: Saml;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        saml = new Saml(api);
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
        it('should make a GET call to "/saml/identityProvider"', () => {
            saml.getProvider();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/saml/identityProvider');
        });
    });

    describe('listRealms', () => {
        it('should make a GET call to "/saml/identityProvider/realms"', () => {
            saml.listRealms();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/saml/identityProvider/realms');
        });
    });

    describe('deleteProvdier', () => {
        it('should make a DELETE call to "/saml/identityProvider"', () => {
            saml.deleteProvider();
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith('/rest/organizations/{organizationName}/saml/identityProvider');
        });
    });

    describe('create', () => {
        it('should make a POST call to "/saml/identityProvider"', () => {
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
                '/rest/organizations/{organizationName}/saml/identityProvider',
                provider
            );
        });
    });

    describe('update', () => {
        it('should make a PUT call to "/saml/identityProvider"', () => {
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
                '/rest/organizations/{organizationName}/saml/identityProvider',
                provider
            );
        });
    });
});
