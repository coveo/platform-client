const regionPlaceholder = '{region}';

export enum Region {
    US = 'us',
    EU = 'eu',
    AU = 'au',
}

export enum Environment {
    dev = 'dev',
    staging = 'staging',
    prod = 'production',
    hipaa = 'hipaa',
}

const endpointTemplates: Record<Environment, string> = {
    [Environment.dev]: `https://platformdev${regionPlaceholder}.cloud.coveo.com`,
    [Environment.staging]: `https://platformqa${regionPlaceholder}.cloud.coveo.com`,
    [Environment.prod]: `https://platform${regionPlaceholder}.cloud.coveo.com`,
    [Environment.hipaa]: `https://platformhipaa.cloud.coveo.com`,
};

export default (environment = Environment.prod, region = Region.US): string => {
    const regionSuffix = region === Region.US ? '' : `-${region}`;
    const matcher = new RegExp(regionPlaceholder, 'g');
    return endpointTemplates[environment]?.replace(matcher, regionSuffix) ?? '';
};
