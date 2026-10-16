/**
 * Regression test for path traversal via unencoded resource ids (admin-ui audit ADUI-11438, "S1").
 *
 * A resource id is interpolated into a request path without encoding (e.g. `/apikeys/${id}`), and
 * react-router decodes `%2F` back to `/` in route params. An id such as
 * `..%2F..%2F<otherOrg>%2Fapikeys%2F<key>` therefore arrives as `../../<otherOrg>/apikeys/<key>`
 * and, once the browser resolves the `..` segments, the request would climb out of the caller's
 * `/rest/organizations/<org>/...` path into another organization.
 *
 * `getUrlFromRoute` now rejects any route whose path contains a `..` (or `.`) segment, so such a
 * request throws before a URL is produced. No legitimate route uses those segments.
 */
import {enableFetchMocks} from 'jest-fetch-mock';
import API from '../APICore.js';

enableFetchMocks();

describe('APICore path traversal guard', () => {
    const makeApi = () =>
        new API({host: 'https://platform.cloud.coveo.com', organizationId: 'caller-org', accessToken: 'caller-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        fetchMock.mockResponse(JSON.stringify({}));
    });

    it('rejects a route whose id segment traverses into another organization', async () => {
        const api = makeApi();
        const maliciousId = '../../victim-org/apikeys/stolen-key'; // decoded from ..%2F..%2Fvictim-org%2F...
        const route = `/rest/organizations/${API.orgPlaceholder}/apikeys/${maliciousId}`;

        await expect(api.get(route)).rejects.toThrow(/path traversal/);
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it('rejects a single "." segment', async () => {
        const api = makeApi();
        const route = `/rest/organizations/${API.orgPlaceholder}/apikeys/./x`;

        await expect(api.get(route)).rejects.toThrow(/path traversal/);
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it('allows a normal route and ids that merely contain dots', async () => {
        const api = makeApi();

        await expect(api.get(`/rest/organizations/${API.orgPlaceholder}/apikeys/abc-123`)).resolves.toBeDefined();
        // "a..b" is a single segment, not a traversal, and must not be blocked.
        await expect(api.get(`/rest/organizations/${API.orgPlaceholder}/apikeys/a..b`)).resolves.toBeDefined();
        expect(fetchMock).toHaveBeenCalledTimes(2);
    });
});
