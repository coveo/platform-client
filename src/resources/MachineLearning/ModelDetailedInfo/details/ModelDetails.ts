import {ModelDetailsBuildingStats} from './ModelDetailsBuildingStats.js';
import {ModelDetailsLanguages} from './ModelDetailsLanguages.js';
import {ModelDetailsPreparationDetails} from './ModelDetailsPreparationDetails.js';
import {ModelDetailsSubModels} from './ModelDetailsSubModels.js';
import {ModelDetailsTrainingDetails} from './ModelDetailsTrainingDetails.js';

export interface ModelDetails {
    possibleRecommendations?: number;
    totalQueries?: number;
    userContextFields?: string[];
    contentIDKeys?: string[];
    candidatesPerFilters?: Record<string, number>;
    contextCandidateExamples?: Record<string, string[]>;
    languages?: Record<string, ModelDetailsLanguages>;
    candidateExamples?: Record<string, string[]>;
    candidatesPerLanguages?: Record<string, number>;
    minClickCountByLang?: Record<string, number>;
    subModels?: {[key: string]: ModelDetailsSubModels};
    candidates?: number;
    /**
     * The name of the encoder used to build the model. Indicates whether the model supports multilingual content.
     * @example MULTILINGUAL_E5_SMALL
     */
    encoderName?: string;
    /**
     * The name of the strategy used to split documents into chunks when building the model.
     * @example STRUCTURE_AWARE
     */
    chunkerStrategyName?: string;
    modelDetailedBuildingStats?: ModelDetailsBuildingStats;
    modelDetailedTrainingDetails: ModelDetailsTrainingDetails;
    modelDetailedPreparationDetails: ModelDetailsPreparationDetails;
}
