import {
    AuthenticationActionMethod,
    AuthenticationInputType,
    FormAuthenticationFailedMethod,
    FormInputType,
} from '../../Enums.js';

export interface FormAuthenticationFailedConfiguration {
    method: FormAuthenticationFailedMethod;
    values: string[];
}

export interface FormInput {
    name: string;
    value?: string;
    inputType: FormInputType;
}

export interface FormAuthenticationConfig {
    actionMethod?: string;
    actionUrl?: string;
    addFoundInputs?: boolean;
    authenticationFailed?: FormAuthenticationFailedConfiguration;
    enableJavaScript?: boolean;
    forceLogin?: boolean;
    formContentType?: string;
    formId?: string;
    formUrl?: string;
    inputs?: FormInput[];
    javaScriptLoadingDelayInMilliseconds?: number;
    customLoginSequence?: any;
}

export interface FormAuthenticationInput {
    name?: string;
    type?: AuthenticationInputType;
    value?: string;
}

export interface FormAuthentication {
    actionMethod?: AuthenticationActionMethod;
    actionURL?: string;
    formURL?: string;
    inputs?: FormAuthenticationInput[];
    reauthenticate?: boolean;
    secureURL?: string;
}
