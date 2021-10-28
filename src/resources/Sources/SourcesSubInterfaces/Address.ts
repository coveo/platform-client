import {PatternType} from '../../Enums';

export interface AddressPattern {
    allowed?: boolean;
    expression?: string;
    patternType?: PatternType;
}
