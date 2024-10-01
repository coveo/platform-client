import API from '../../../APICore.js';
import {ExtensionLanguageType} from '../../Enums.js';
import Extension from '../Extensions.js';
import {CreateExtension, ExtensionCompileCode} from '../ExtensionsInterfaces.js';

jest.mock('../../../APICore.js');

describe('Extension', () => {
    let extension: Extension;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        extension = new Extension(api, serverlessApi);
    });

    describe('create', () => {
        it('should make a post call to the specific Extension url', async () => {
            const testExtension: CreateExtension = {
                name: 'Test',
                content: 'print("hello world")',
            };
            await extension.create(testExtension);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Extension.baseUrl, testExtension);
        });
    });

    describe('update', () => {
        it('should make a put call to the specific Extension url', async () => {
            const extensionId = '1';
            const testExtension: CreateExtension = {
                name: 'Test',
                content: 'print("hello worlds")',
            };
            await extension.update(extensionId, testExtension);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Extension.baseUrl}/${extensionId}`, testExtension);
        });
    });

    describe('delete', () => {
        it('should make a delete call to the specific Extension url', async () => {
            const extensionId = '1';
            await extension.delete(extensionId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Extension.baseUrl}/${extensionId}`);
        });
    });

    describe('enable', () => {
        it('should make a post call to the specific Extension url to enable an extension', async () => {
            const extensionId = '1';
            await extension.enable(extensionId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Extension.baseUrl}/${extensionId}/enable`);
        });
    });

    describe('disable', () => {
        it('should make a post call to the specific Extension url to disable an extension', async () => {
            const extensionId = '1';
            await extension.disable(extensionId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Extension.baseUrl}/${extensionId}/disable`, {});
        });

        it('should make a post call to the specific Extension url to disable an extension with a reason', async () => {
            const extensionId = '1';
            const reason = 'maintenance';
            await extension.disable(extensionId, reason);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Extension.baseUrl}/${extensionId}/disable`, {reason});
        });
    });

    describe('get', () => {
        it('should make a get call to the specific Extension url', async () => {
            const extensionId = '1';
            await extension.get(extensionId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Extension.baseUrl}/${extensionId}`);
        });
    });

    describe('list', () => {
        it('should make a GET call to the specific Extension url', async () => {
            await extension.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Extension.baseUrl);
        });
    });

    describe('validateCode', () => {
        it('should make a POST call to the specific Extension url', async () => {
            const testExtensionCode: ExtensionCompileCode = {
                code: 'print("hello world")',
                language: ExtensionLanguageType.PYTHON3,
            };
            await extension.validateCode(testExtensionCode);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Extension.baseUrl}/test/compile`, testExtensionCode);
        });
    });

    describe('listVersions', () => {
        it('makes a GET call to the specific extension versions url', async () => {
            const extensionId = '1';
            await extension.listVersions(extensionId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/extensions/1/versions');
        });
    });

    describe('getVersion', () => {
        it('make a get call to the extension version url', async () => {
            const extensionId = '1';
            const versionId = 'a';
            await extension.getVersion(extensionId, versionId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/extensions/1/versions/a');
        });
    });
});
