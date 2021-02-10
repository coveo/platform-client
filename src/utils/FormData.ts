export const getFormData = (): FormData => {
    // Non browser environment does not support FormData
    if (typeof FormData !== 'undefined') {
        return new FormData();
    }
    // eslint-disable-next-line
    const formDataNode = require('form-data');
    const formDataNodeInstance = new formDataNode();
    // formData.set not available in node.
    formDataNodeInstance.set = formDataNodeInstance.append;
    return formDataNodeInstance;
};
