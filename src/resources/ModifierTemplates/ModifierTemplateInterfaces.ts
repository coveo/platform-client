export interface ModifierModel {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * English human friendly name
     */
    displayName: string;
    /**
     * Category the modifier belongs to.
     * LICENSE and SYSTEM are more for internal use and might need to be filtered out from display
     */
    modifierType: ModifierType;
    /**
     * List of statements contained in the modifier
     */
    statements: StatementModel[];
}

export interface StatementModel {
    /**
     * The statement key to apply the value to
     */
    key: string;
    /**
     * The value to set on the key, always a string so "0" or "true" are correct
     */
    value: string;
    /**
     * How the value will be applied if there are other statements on the same key
     */
    operation: StatementOperation;
}

export interface StatementDetailModel {
    /**
     * The statement key to apply the value to
     */
    statementKey: string;
    /**
     * The license property the statement affects
     */
    mapping: string;
    /**
     * The type of value that should be used in the license when recomputing the properties
     */
    valueType: StatementOperation;
    /**
     * The strategy that will be used to resolve conflicts for statements on the same key
     */
    mergeStrategy: MergeStrategy;
}

export enum ModifierType {
    system = 'SYSTEM',
    license = 'LICENSE',
    integration = 'INTEGRATION',
    extension = 'EXTENSION',
    feature = 'FEATURE',
}

export enum StatementOperation {
    set = 'SET',
    append = 'APPEND',
    remove = 'REMOVE',
}

export enum MergeStrategy {
    integerBiggerWins = 'INTEGER_BIGGER_WINS',
    integerLowerWins = 'INTEGER_LOWER_WINS',
    booleanFalseWins = 'BOOLEAN_FALSE_WINS',
    booleanTrueWins = 'BOOLEAN_TRUE_WINS',
    specificEnumValueWins = 'SPECIFIC_ENUM_VALUE_WINS',
    noMerge = 'NO_MERGE',
}
