export interface AdvancedRegistrationConfigFile {
    fileContents?: string;
    lastModified?: string;
    modelId?: RegistrationId;
    orgId?: Record<string, string>;
}

export interface RegistrationId {
    modelId?: string;
}

export interface AdvancedRegistrationConfigFileCreationResponse {
    filePath?: Record<string, string>;
    modelId?: RegistrationId;
}

export interface ModelConfigurationUpdateArgs {
    modelConfigFileContents: string;
    languageCode?: string;
}
