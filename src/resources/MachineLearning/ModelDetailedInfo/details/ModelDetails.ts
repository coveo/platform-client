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
    modelDetailedBuildingStats?: ModelDetailsBuildingStats;
    modelDetailedTrainingDetails: ModelDetailsTrainingDetails;
    modelDetailedPreparationDetails: ModelDetailsPreparationDetails;
}
