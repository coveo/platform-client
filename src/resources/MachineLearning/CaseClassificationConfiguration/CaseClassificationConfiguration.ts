import API from '../../../APICore.js';
import {New} from '../../BaseInterfaces.js';
import Resource from '../../Resource.js';
import {
    CaseClassificationConfigurationModel,
    CaseClassificationContentFields,
    CaseClassificationContentFieldsParams,
    CaseClassificationDocumentGroupPreview,
    CaseClassificationDocumentGroupPreviewParams,
    CaseClassificationFieldCountParams,
    FieldDocumentCount,
    FieldValueCount,
} from './CaseClassificationConfigurationInterfaces.js';

export default class CaseClassificationConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/caseclassif`;
    static modelUrl = `${CaseClassificationConfiguration.baseUrl}/model`;
    static fieldsUrl = `${CaseClassificationConfiguration.baseUrl}/fields`;

    static previewUrl = `${CaseClassificationConfiguration.baseUrl}/preview`;

    /**
     * @deprecated create(configModel: CaseClassificationConfigurationModel) is kept for backward compatibility. You should now use MachineLearning `register(registration: RegistrationModel)` instead.
     */
    create(configModel: New<CaseClassificationConfigurationModel, 'modelId'>) {
        return this.api.post<CaseClassificationConfigurationModel>(
            CaseClassificationConfiguration.modelUrl,
            configModel,
        );
    }

    /**
     * @deprecated delete(modelId: string) is kept for backward compatibility. You should now use Models `delete(modelId: string)` instead.
     */
    delete(modelId: string) {
        return this.api.delete(`${CaseClassificationConfiguration.modelUrl}/${modelId}`);
    }

    /**
     * @deprecated get(modelId: string) is kept for backward compatibility. You should now use Models `get(modelId: string)` instead.
     */
    get(modelId: string) {
        return this.api.get<CaseClassificationConfigurationModel>(
            `${CaseClassificationConfiguration.modelUrl}/${modelId}`,
        );
    }

    /**
     * @deprecated update(configModel: CaseClassificationConfigurationModel) is kept for backward compatibility. You should now use Models `update(modelId: string, update: RegistrationModel)` instead.
     */
    update(configModel: CaseClassificationConfigurationModel) {
        return this.api.put<CaseClassificationConfigurationModel>(
            `${CaseClassificationConfiguration.modelUrl}/${configModel.modelId}`,
            configModel,
        );
    }

    fields(params: CaseClassificationContentFieldsParams) {
        return this.api.post<CaseClassificationContentFields>(CaseClassificationConfiguration.fieldsUrl, params);
    }

    preview(params: CaseClassificationDocumentGroupPreviewParams) {
        return this.api.post<CaseClassificationDocumentGroupPreview>(
            CaseClassificationConfiguration.previewUrl,
            params,
        );
    }

    documentCount(fieldName: string, params: CaseClassificationFieldCountParams) {
        return this.api.post<FieldDocumentCount>(
            `${CaseClassificationConfiguration.fieldsUrl}/${fieldName}/documentCount`,
            params,
        );
    }

    valueCount(fieldName: string, params: CaseClassificationFieldCountParams) {
        return this.api.post<FieldValueCount>(
            `${CaseClassificationConfiguration.fieldsUrl}/${fieldName}/valueCount`,
            params,
        );
    }
}
