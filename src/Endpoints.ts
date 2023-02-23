const regionPlaceholder = '{region}';

export enum Region {
    US = 'us',
    EU = 'eu',
    AU = 'au',
    CA = 'ca',
}

export enum Environment {
    dev = 'dev',
    stg = 'stg',
    prod = 'production',
    hipaa = 'hipaa',
}

const endpointTemplates: Record<Environment, string> = {
    [Environment.dev]: `https://platformdev${regionPlaceholder}.cloud.coveo.com`,
    [Environment.stg]: `https://platformstg${regionPlaceholder}.cloud.coveo.com`,
    [Environment.prod]: `https://platform${regionPlaceholder}.cloud.coveo.com`,
    [Environment.hipaa]: 'https://platformhipaa.cloud.coveo.com',
};

const serverlessEndpointTemplates: Record<Environment, string> = {
    [Environment.dev]: `https://apidev${regionPlaceholder}.cloud.coveo.com`,
    [Environment.stg]: `https://apistg${regionPlaceholder}.cloud.coveo.com`,
    [Environment.prod]: `https://api${regionPlaceholder}.cloud.coveo.com`,
    [Environment.hipaa]: 'https://apihipaa.cloud.coveo.com',
};

export default (environment = Environment.prod, region = Region.US, isServerlessHost = false): string => {
    const regionSuffix = region === Region.US ? '' : `-${region}`;
    const matcher = new RegExp(regionPlaceholder, 'g');

    const template = isServerlessHost ? serverlessEndpointTemplates[environment] : endpointTemplates[environment];

    return template?.replace(matcher, regionSuffix) ?? '';
};
