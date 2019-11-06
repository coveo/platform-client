export class HostUndefinedError extends Error {
    name = 'HostUndefinedError';
    constructor() {
        super(`The CoveoPlatform's host is undefined.`);
    }
}
