export enum Environment {
    dev = 'development',
    staging = 'staging',
    prod = 'production',
    hipaa = 'hipaa',
}

export const EndpointTemplates: Record<Environment, string> = {
    [Environment.dev]: 'https://platformdev.cloud.coveo.com',
    [Environment.staging]: 'https://platformqa.cloud.coveo.com',
    [Environment.prod]: 'https://platform.cloud.coveo.com',
    [Environment.hipaa]: 'https://platformhipaa.cloud.coveo.com',
};
