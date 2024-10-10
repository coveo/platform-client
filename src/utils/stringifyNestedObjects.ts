export const stringifyNestedObjects = <T extends object>(obj: T): T => {
    Object.keys(obj).forEach((key) => {
        const value = obj[key as keyof T];
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            obj[key] = JSON.stringify(value, null, 0);
        }
    });
    return obj;
};
