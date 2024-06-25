import API from '../../../APICore.js';
import {ExtensionLanguageType} from '../../Enums.js';
import Extension from '../Extensions.js';
import {CreateExtension, ExtensionCompileCode} from '../ExtensionsInterfaces.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Extension', () => {
    let extension: Extension;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        extension = new Extension(api, serverlessApi);
    });

    describe('create', () => {
        it('should make a post call to the specific Extension url', () => {
            const testExtension: CreateExtension = {
                name: 'Test',
                content: 'print("hello world")',
            };
            extension.create(testExtension);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Extension.baseUrl, testExtension);
        });
    });

    describe('update', () => {
        it('should make a put call to the specific Extension url', () => {
            const extensionId = '1';
            const testExtension: CreateExtension = {
                name: 'Test',
                content: 'print("hello worlds")',
            };
            extension.update(extensionId, testExtension);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Extension.baseUrl}/${extensionId}`, testExtension);
        });
    });

    describe('delete', () => {
        it('should make a delete call to the specific Extension url', () => {
            const extensionId = '1';
            extension.delete(extensionId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Extension.baseUrl}/${extensionId}`);
        });
    });

    describe('enable', () => {
        it('should make a post call to the specific Extension url to enable an extension', () => {
            const extensionId = '1';
            extension.enable(extensionId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Extension.baseUrl}/${extensionId}/enable`);
        });
    });

    describe('disable', () => {
        it('should make a post call to the specific Extension url to disable an extension', () => {
            const extensionId = '1';
            extension.disable(extensionId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Extension.baseUrl}/${extensionId}/disable`, {});
        });

        it('should make a post call to the specific Extension url to disable an extension with a reason', () => {
            const extensionId = '1';
            const reason = 'maintenance';
            extension.disable(extensionId, reason);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Extension.baseUrl}/${extensionId}/disable`, {reason});
        });
    });

    describe('get', () => {
        it('should make a get call to the specific Extension url', () => {
            const extensionId = '1';
            extension.get(extensionId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Extension.baseUrl}/${extensionId}`);
        });
    });

    describe('list', () => {
        it('should make a GET call to the specific Extension url', () => {
            extension.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Extension.baseUrl);
        });
    });

    describe('validateCode', () => {
        it('should make a POST call to the specific Extension url', () => {
            const testExtensionCode: ExtensionCompileCode = {
                code: 'print("hello world")',
                language: ExtensionLanguageType.PYTHON3,
            };
            extension.validateCode(testExtensionCode);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Extension.baseUrl}/test/compile`, testExtensionCode);
        });
    });

    describe('listVersions', () => {
        it('makes a GET call to the specific extension versions url', () => {
            const extensionId = '1';
            extension.listVersions(extensionId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/extensions/1/versions');
        });
    });

    describe('getVersion', () => {
        it('make a get call to the extension version url', () => {
            const extensionId = '1';
            const versionId = 'a';
            extension.getVersion(extensionId, versionId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/extensions/1/versions/a');
        });
    });
});
