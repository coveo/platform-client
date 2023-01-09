import {PatternType} from '../../Enums.js';

export interface AddressPattern {
    allowed?: boolean;
    expression?: string;
    patternType?: PatternType;
}
