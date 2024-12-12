import {ModelDetailsBuildingStats} from './ModelDetailsBuildingStats.js';
import {ModelDetailsLanguages} from './ModelDetailsLanguages.js';
import {ModelDetailsSubModels} from './ModelDetailsSubModels.js';

export interface ModelDetails {
    possibleRecommendations?: number;
    totalQueries?: number;
    recommendationsPerLanguage?: Map<string, number>;
    userContextFields?: string[];
    contentIDKeys?: string[];
    candidatesPerFilters?: Map<string, number>;
    contextCandidateExamples?: Map<string, string[]>;
    languages?: Map<string, ModelDetailsLanguages>;
    candidateExamples?: Map<string, string[]>;
    candidatesPerLanguages?: Map<string, number>;
    minClickCountByLang?: Map<string, number>;
    subModels?: {[key: string]: ModelDetailsSubModels};
    candidates?: number;
    modelDetailedBuildingStats?: ModelDetailsBuildingStats;
}
