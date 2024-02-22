import {EnrichedRequestInit} from '..';
import {handleRequest} from '../RequestHandlers';

describe('RequestHandlers', () => {
    it('returns provided init options if no handlers are provided', () => {
        const mockRequest = {
            method: 'POST',
            body: JSON.stringify('A random body'),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        };

        const requestInit = handleRequest('/rest/random', mockRequest);

        expect(requestInit).toEqual({
            method: 'POST',
            body: JSON.stringify('A random body'),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            url: '/rest/random',
        });
    });

    it('returns provided init options if handlers are an empty array', () => {
        const mockRequest = {
            method: 'POST',
            body: JSON.stringify('A random body'),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        };

        const requestInit = handleRequest('/rest/random', mockRequest, []);

        expect(requestInit).toEqual({
            method: 'POST',
            body: JSON.stringify('A random body'),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            url: '/rest/random',
        });
    });

    it('returns init options modified by provided handlers', () => {
        const mockHandler1 = {
            canProcess: () => true,
            process: (request: EnrichedRequestInit) => ({
                ...request,
                body: JSON.stringify(`This handler clears and sets a new body`),
            }),
        };

        const mockHandler2 = {
            canProcess: () => true,
            process: (request: EnrichedRequestInit) => ({
                ...request,
                headers: new Headers({
                    'Content-Type': 'text/xml',
                }),
            }),
        };

        const mockRequest = {
            method: 'POST',
            body: JSON.stringify('A random body'),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        } as RequestInit;

        const requestInit = handleRequest('/rest/random', mockRequest, [mockHandler1, mockHandler2]);

        expect(requestInit).toEqual({
            method: 'POST',
            body: JSON.stringify(`This handler clears and sets a new body`),
            headers: new Headers({
                'Content-Type': 'text/xml',
            }),
            url: '/rest/random',
        });
    });

    it('returns provided init optons error if there are no processable handlers', () => {
        const mockHandler1 = {
            canProcess: () => false,
            process: (request: EnrichedRequestInit) => ({
                ...request,
                body: JSON.stringify(`This handler clears and sets a new body`),
            }),
        };

        const mockRequest = {
            method: 'POST',
            body: JSON.stringify('A random body'),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        };

        const requestInit = handleRequest('/rest/random', mockRequest, [mockHandler1]);

        expect(requestInit).toEqual({
            method: 'POST',
            body: JSON.stringify('A random body'),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            url: '/rest/random',
        });
    });
});
