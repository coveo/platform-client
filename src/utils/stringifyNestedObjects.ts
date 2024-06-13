export const stringifyNestedObjects = (obj: object): object => {
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            obj[key] = JSON.stringify(value, null, 0);
        }
    });
    return obj;
};
