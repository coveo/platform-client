import API from '../../../APICore';
import {New} from '../../BaseInterfaces';
import Resource from '../../Resource';
import {CaseClassificationConfigurationModel} from './CaseClassificationConfigurationInterfaces';

export default class CaseClassificationConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/caseclassif/model`;

    create(configModel: New<CaseClassificationConfigurationModel>) {
        return this.api.post<CaseClassificationConfigurationModel>(
            CaseClassificationConfiguration.baseUrl,
            configModel
        );
    }

    delete(modelId: string) {
        return this.api.delete(`${CaseClassificationConfiguration.baseUrl}/${modelId}`);
    }

    get(modelId: string) {
        return this.api.get<CaseClassificationConfigurationModel>(
            `${CaseClassificationConfiguration.baseUrl}/${modelId}`
        );
    }

    update(configModel: CaseClassificationConfigurationModel) {
        return this.api.put<CaseClassificationConfigurationModel>(
            `${CaseClassificationConfiguration.baseUrl}/${configModel.modelId}`,
            configModel
        );
    }
}
