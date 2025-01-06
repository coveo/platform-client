import {ModelDetailsBuildingStats} from './ModelDetailsBuildingStats.js';
import {ModelDetailsLanguages} from './ModelDetailsLanguages.js';
import {ModelDetailsSubModels} from './ModelDetailsSubModels.js';

export interface ModelDetails {
    possibleRecommendations?: number;
    totalQueries?: number;
    recommendationsPerLanguage?: Record<string, number>;
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
}
