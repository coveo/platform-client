export interface FilterConditions {
    /**
     * The name of the field.
     * Example: status
     */
    field: string;
    /**
     * The operator to use to evaluate the condition.
     * Must be EQUALS or NOT_EQUALS
     */
    operator: 'EQUALS' | 'NOT_EQUALS';
    /**
     * The value to use for the condition.
     * Example: completed
     */
    value: string;
}
