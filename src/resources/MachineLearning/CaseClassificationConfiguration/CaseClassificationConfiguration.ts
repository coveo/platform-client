import API from '../../../APICore';
import {New} from '../../BaseInterfaces';
import Resource from '../../Resource';
import {
    CaseClassificationConfigurationModel,
    CaseClassificationContentFields,
    CaseClassificationContentFieldsParams,
    CaseClassificationDocumentGroupPreview,
    CaseClassificationDocumentGroupPreviewParams,
} from './CaseClassificationConfigurationInterfaces';

export default class CaseClassificationConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/caseclassif`;
    static modelUrl = `${CaseClassificationConfiguration.baseUrl}/model`;
    static fieldsUrl = `${CaseClassificationConfiguration.baseUrl}/fields`;
    static previewUrl = `${CaseClassificationConfiguration.baseUrl}/preview`;

    create(configModel: New<CaseClassificationConfigurationModel, 'modelId'>) {
        return this.api.post<CaseClassificationConfigurationModel>(
            CaseClassificationConfiguration.modelUrl,
            configModel
        );
    }

    delete(modelId: string) {
        return this.api.delete(`${CaseClassificationConfiguration.modelUrl}/${modelId}`);
    }

    get(modelId: string) {
        return this.api.get<CaseClassificationConfigurationModel>(
            `${CaseClassificationConfiguration.modelUrl}/${modelId}`
        );
    }

    update(configModel: CaseClassificationConfigurationModel) {
        return this.api.put<CaseClassificationConfigurationModel>(
            `${CaseClassificationConfiguration.modelUrl}/${configModel.modelId}`,
            configModel
        );
    }

    fields(params: CaseClassificationContentFieldsParams) {
        return this.api.post<CaseClassificationContentFields>(CaseClassificationConfiguration.fieldsUrl, params);
    }

    preview(params: CaseClassificationDocumentGroupPreviewParams) {
        return this.api.post<CaseClassificationDocumentGroupPreview>(
            CaseClassificationConfiguration.previewUrl,
            params
        );
    }
}
